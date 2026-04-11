const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const outputDir = path.join(__dirname, '../courses');
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

// Read level-data.js and course-overrides.js
const levelDataCode = fs.readFileSync(path.join(__dirname, '../assets/js/level-data.js'), 'utf8');
const overridesCode = fs.readFileSync(path.join(__dirname, '../assets/js/course-overrides.js'), 'utf8');

// The original level-detail structure used for generation context
const renderHtml = `<!DOCTYPE html><html><head></head><body>
<div id="ld-main" class="static-course-page">
  <style></style>
  <section id="ld-hero" class="ld-hero"></section>
  <section id="ld-outcomes" class="ld-outcomes"></section>
  <section id="ld-modules" class="ld-modules"></section>
  <section id="ld-case" class="ld-case"></section>
  <section id="ld-diff" class="ld-diff"></section>
  <section id="ld-applications" class="ld-applications"></section>
  <section id="ld-journey" class="ld-journey"></section>
  <section id="ld-locked" class="ld-locked" style="display:none"></section>
  <section id="ld-final-cta" class="ld-final-cta-section"></section>
</div>
</body></html>`;

// The actual page shell we want to inject into
const existingPage = fs.readFileSync(path.join(__dirname, '../crash-course-template.html'), 'utf8');
const templateDom = new JSDOM(existingPage);
const tDoc = templateDom.window.document;



tDoc.body.innerHTML = `
    <div id="navbar-placeholder"></div>
    <div id="ld-main" class="static-course-page"></div>
    <div id="marquee-placeholder"></div>
    <div id="footer-placeholder"></div>
`;

const scriptsToAdd = ['navbar.js', 'main.js', 'loader.js', 'search.js', 'chatbot.js', 'layout-balancer.js'];
scriptsToAdd.forEach(script => {
    const s = tDoc.createElement('script');
    s.src = `../assets/js/${script}`;
    tDoc.body.appendChild(s);
});

const loadComp = tDoc.createElement('script');
loadComp.src = '../assets/js/load-components.js';
loadComp.defer = true;
tDoc.body.appendChild(loadComp);



// To get the registry, we uniquely evaluate a part of levelDataCode
const registryMatch = levelDataCode.match(/const COURSE_REGISTRY = (\{[\s\S]*?\});/);
if(!registryMatch) throw new Error("Could not parse COURSE_REGISTRY");
let COURSE_REGISTRY;
eval(`COURSE_REGISTRY = ${registryMatch[1]}`);

const slugs = Object.keys(COURSE_REGISTRY);
// Remove aliases
const filteredSlugs = slugs.filter(slug => slug !== 'astrology' && slug !== 'crystal' && slug !== 'kp astrology');
const levels = ['diploma', 'bachelors', 'masters', 'grand-master'];

let count = 0;

for (const slug of filteredSlugs) {
  for (const level of levels) {
    if(COURSE_REGISTRY[slug].skipLevels && COURSE_REGISTRY[slug].skipLevels.includes(level)) continue;
    
    const dom = new JSDOM(renderHtml, {
      url: `http://localhost/level-detail.html?course=${slug}&level=${level}`,
      runScripts: "dangerously",
      resources: "usable"
    });
    const win = dom.window;
    
    // Inject scripts
    const s1 = win.document.createElement('script');
    s1.textContent = levelDataCode
      .replace('const LEVEL_DATA', 'window.LEVEL_DATA')
      .replace('const COURSE_REGISTRY', 'window.COURSE_REGISTRY');
    win.document.head.appendChild(s1);
    
    const s2 = win.document.createElement('script');
    s2.textContent = overridesCode;
    win.document.head.appendChild(s2);
    
    try {
      if (typeof win.initLevelDetailPage === 'function') {
        win.initLevelDetailPage();
      } else continue;
    } catch(e) {
      console.error(`Error rendering ${slug}-${level}: ${e.message}`);
      continue;
    }
    
    const ldMain = win.document.getElementById('ld-main');
    if (!ldMain || !ldMain.innerHTML.trim()) continue;
    
    let innerContent = ldMain.innerHTML;
    innerContent = innerContent.replace(/(src|href)="assets\//g, '$1="../assets/');
    innerContent = innerContent.replace(/url\(['"]?assets\//g, "url('../assets/");
    
    // REPAIR PROCESS!
    // Bring full-width components inside cvd-main-content
    // Find where the layout ends and sidebar starts
    const mainContentEndStr = '</div> <!-- end cvd-main-content -->';
    const layoutEndStr = '</div> <!-- end cvd-layout-container -->';
    const mainContentEndIdx = innerContent.indexOf(mainContentEndStr);
    const layoutEndIdx = innerContent.indexOf(layoutEndStr);
    
    if (mainContentEndIdx !== -1 && layoutEndIdx !== -1) {
        // Extract everything AFTER layoutEndStr to the end of innerContent
        const bottomSectionStart = layoutEndIdx + layoutEndStr.length;
        const bottomContent = innerContent.substring(bottomSectionStart).trim();
        
        // Construct the new inner content
        // Put bottomContent verbatim inside cvd-main-content
        innerContent = 
            innerContent.substring(0, mainContentEndIdx) + 
            '\n\n<!-- MOVED COMPONENTS INTO MAIN -->\n' + 
            bottomContent + '\n' +
            mainContentEndStr + '\n' +
            innerContent.substring(mainContentEndIdx + mainContentEndStr.length, layoutEndIdx + layoutEndStr.length);
    }
    
    // Clone template and save
    const pageDom = new JSDOM(templateDom.serialize());
    const finalMain = pageDom.window.document.getElementById('ld-main');
    finalMain.innerHTML = innerContent;
    finalMain.className = 'static-course-page';
    pageDom.window.document.title = win.document.title || `${slug} ${level}`;
    
    const outPath = path.join(outputDir, `${slug}-${level}.html`);
    let finalHtmlString = pageDom.serialize();
    finalHtmlString = finalHtmlString.replace(/(src|href)="assets\//g, '$1="../assets/');
    finalHtmlString = finalHtmlString.replace(/url\(['"]?assets\//g, "url('../assets/");
    
    // Fix root web page links
    const urlMap = {
        'vedic-astrology': 'astrology',
        'reiki-healing': 'reiki',
        'tarot-reading': 'tarot',
        'gemstone-science': 'gemstone'
    };
    const rootPageName = urlMap[slug] || slug;
    
    // Fix the price comparison buttons by mapping to the exact root HTML
    finalHtmlString = finalHtmlString.replace(new RegExp(`href="${slug}.html"`, 'g'), `href="../${rootPageName}.html"`);
    
    fs.writeFileSync(outPath, finalHtmlString, 'utf8');
    count++;
    console.log(`  - Generated ${slug}-${level}.html`);
  }
}
console.log(`Done! Generated ${count} pages successfully.`);
