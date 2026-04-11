/**
 * generate_gemstone.js
 * 
 * Targeted generator for gemstone course pages only.
 * Uses the same structure as existing course pages (e.g., vastu-diploma.html)
 * but with gemstone-specific content extracted from level-data.js.
 */
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const outputDir = path.join(__dirname, '../courses');

// We'll use the original level-detail.html BACKUP (from Git or level-data-broken.js reference)
// Since level-detail is currently a redirect, we need to build the full HTML context.

// Read level-data.js for data
const levelDataCode = fs.readFileSync(path.join(__dirname, '../assets/js/level-data.js'), 'utf8');
const overridesCode = fs.readFileSync(path.join(__dirname, '../assets/js/course-overrides.js'), 'utf8');

// Read the original level-detail structure from an existing generated page
const existingPage = fs.readFileSync(path.join(outputDir, 'vastu-diploma.html'), 'utf8');

// Extract the outer shell (everything except ld-main's inner content)
const templateDom = new JSDOM(existingPage);
const templateDoc = templateDom.window.document;
const templateMain = templateDoc.getElementById('ld-main');

// Now, create a full rendering context
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

const levels = ['diploma', 'bachelors', 'masters'];
const slugs = ['gemstone'];

let count = 0;

for (const slug of slugs) {
  for (const level of levels) {
    console.log(`Generating ${slug}-${level}...`);
    
    const dom = new JSDOM(renderHtml, {
      url: `http://localhost/level-detail.html?course=${slug}&level=${level}`,
      runScripts: "dangerously",
      resources: "usable",
      pretendToBeVisual: true
    });
    
    const win = dom.window;
    
    // Inject level-data.js
    const s1 = win.document.createElement('script');
    s1.textContent = levelDataCode
      .replace('const LEVEL_DATA', 'window.LEVEL_DATA')
      .replace('const COURSE_REGISTRY', 'window.COURSE_REGISTRY');
    win.document.head.appendChild(s1);
    
    // Inject overrides
    const s2 = win.document.createElement('script');
    s2.textContent = overridesCode;
    win.document.head.appendChild(s2);
    
    // Wait a moment then call init directly
    // We need synchronous execution, so let's call init immediately
    try {
      if (typeof win.initLevelDetailPage === 'function') {
        win.initLevelDetailPage();
      } else {
        console.error(`  initLevelDetailPage not found for ${slug}-${level}`);
        continue;
      }
    } catch(e) {
      console.error(`  Error rendering ${slug}-${level}: ${e.message}`);
      continue;
    }
    
    const ldMain = win.document.getElementById('ld-main');
    if (!ldMain || !ldMain.innerHTML.trim()) {
      console.error(`  No content generated for ${slug}-${level}`);
      continue;
    }
    
    let innerContent = ldMain.innerHTML;
    // Rewrite asset paths
    innerContent = innerContent.replace(/(src|href)="assets\//g, '$1="../assets/');
    innerContent = innerContent.replace(/url\(['"]?assets\//g, "url('../assets/");
    
    // Clone the template and insert content
    const pageDom = new JSDOM(templateDom.serialize());
    const pMain = pageDom.window.document.getElementById('ld-main');
    pMain.innerHTML = innerContent;
    pMain.className = 'static-course-page';
    
    // Update title
    pageDom.window.document.title = win.document.title || `Gemstone Science ${level} — Parashari Institute`;
    
    const outPath = path.join(outputDir, `${slug}-${level}.html`);
    fs.writeFileSync(outPath, pageDom.serialize(), 'utf8');
    count++;
    console.log(`  ✓ ${slug}-${level}.html generated!`);
    
    dom.window.close();
  }
}

console.log(`\nDone! Generated ${count} gemstone pages.`);
