const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const outputDir = path.join(__dirname, '../courses');
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

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

// Read level-data.js for data
const levelDataCode = fs.readFileSync(path.join(__dirname, '../assets/js/level-data.js'), 'utf8');
const overridesCode = fs.existsSync(path.join(__dirname, '../assets/js/course-overrides.js')) 
    ? fs.readFileSync(path.join(__dirname, '../assets/js/course-overrides.js'), 'utf8') 
    : '';

// Then just use the layout from an existing generated file as the shell
const existingPage = fs.readFileSync(path.join(__dirname, '../crash-course-template.html'), 'utf8');
const templateDom = new JSDOM(existingPage);
const tDoc = templateDom.window.document;

// Clean up placeholders in the template
const header = tDoc.querySelector('header');
if (header) {
    const ph = tDoc.createElement('div');
    ph.id = 'navbar-placeholder';
    header.parentNode.replaceChild(ph, header);
}
const footer = tDoc.querySelector('footer');
if (footer) {
    const ph = tDoc.createElement('div');
    ph.id = 'footer-placeholder';
    footer.parentNode.replaceChild(ph, footer);
}

// Rewrite assets paths
tDoc.querySelectorAll('link[href^="assets/"]').forEach(el => {
    el.setAttribute('href', '../' + el.getAttribute('href'));
});
tDoc.querySelectorAll('script[src^="assets/"]').forEach(el => {
    // We remove level-data.js and course-overrides.js entirely since they're dynamic
    const src = el.getAttribute('src');
    if (src.includes('level-data.js') || src.includes('course-overrides.js')) {
        el.remove();
    } else {
        el.setAttribute('src', '../' + src);
    }
});

// Add our load-components.js
const loadComp = tDoc.createElement('script');
loadComp.src = '../assets/js/load-components.js';
tDoc.body.appendChild(loadComp);

const finalTemplateHTML = templateDom.serialize();

// Extract registry safely using a temporary JSDOM
let slugs = [];
try {
    const tempDom = new JSDOM(renderHtml, { runScripts: "dangerously" });
    const s1 = tempDom.window.document.createElement('script');
        s1.textContent = levelDataCode
        .replace('const LEVEL_DATA', 'var LEVEL_DATA')
        .replace('const COURSE_REGISTRY', 'var COURSE_REGISTRY');
    tempDom.window.document.head.appendChild(s1);
    const registry = tempDom.window.COURSE_REGISTRY || {};
    slugs = Object.keys(registry);
} catch (e) {
    console.warn("Could not extract slugs from registry:", e);
}

if (!slugs.length) {
    console.error("COURSE_REGISTRY not found or empty! Scripts failed to load properly.");
    process.exit(1);
}

const levels = ['diploma', 'bachelors', 'masters', 'grand-master'];

console.log(`Found ${slugs.length} courses to generate.`);

let generatedCount = 0;

for (const slug of slugs) {
    for (const level of levels) {
        
        const dom = new JSDOM(renderHtml, {
            url: `http://localhost/level-detail.html?course=${slug}&level=${level}`,
            runScripts: "dangerously",
            resources: "usable"
        });
        
        const win = dom.window;
        
        // Execute scripts by appending script elements
        const script1 = win.document.createElement('script');
        script1.textContent = levelDataCode
            .replace('const LEVEL_DATA', 'var LEVEL_DATA')
            .replace('const COURSE_REGISTRY', 'var COURSE_REGISTRY');
        win.document.head.appendChild(script1);
        
        if (overridesCode) {
            const script2 = win.document.createElement('script');
            script2.textContent = overridesCode;
            win.document.head.appendChild(script2);
        }

        // Run extraction
        if (typeof win.initLevelDetailPage === 'function') {
            try {
                win.initLevelDetailPage();
            } catch (e) {
                console.error(`Error generating ${slug}-${level}:`, e.message);
                continue;
            }
        } else {
            console.error(`initLevelDetailPage not found in ${slug}-${level}!`);
            continue;
        }

        // Get generated content
        const ldMain = win.document.getElementById('ld-main');
        if (ldMain) {
            let innerContent = ldMain.innerHTML;
            
            // Rewrite asset paths in innerContent
            innerContent = innerContent.replace(/(src|href)="assets\//g, '$1="../assets/');
            innerContent = innerContent.replace(/url\(['"]?assets\//g, "url('../assets/");
            
            // Combine with template
            const pageDom = new JSDOM(finalTemplateHTML);
            const pMain = pageDom.window.document.getElementById('ld-main');
            pMain.innerHTML = innerContent;
            pMain.className = 'static-course-page';

            // update title
            pageDom.window.document.title = win.document.title || `${slug}-${level}`;

            const outPath = path.join(outputDir, `${slug}-${level}.html`);
            
            const pageHtml = pageDom.serialize();
            
            fs.writeFileSync(outPath, pageHtml, 'utf8');
            generatedCount++;
        }
    }
}
console.log(`Successfully generated ${generatedCount} pages!`);
