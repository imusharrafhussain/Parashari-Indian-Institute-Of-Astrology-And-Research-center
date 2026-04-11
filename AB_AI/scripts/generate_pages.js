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
        s.remove();
    }
});

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

// Add custom style for body to prevent clipping since search bar css might be removed
// We don't need to add anything special, it's just a refactor.

const finalTemplateHTML = templateDom.serialize();

setTimeout(() => {
    const window = dom.window;
    // Execute scripts by appending script elements
    const script1 = window.document.createElement('script');
    script1.textContent = levelDataCode.replace('const LEVEL_DATA', 'window.LEVEL_DATA'); // ensure global
    
    // Also patch COURSE_REGISTRY inside levelDataCode
    script1.textContent = script1.textContent.replace('const COURSE_REGISTRY', 'window.COURSE_REGISTRY');
    const script2 = window.document.createElement('script');
    script2.textContent = overridesCode;
    window.document.head.appendChild(script2);

 // Use JSDOM to load the scripts and execute the environments
const dom = new JSDOM(renderHtml, {
    url: "http://localhost/level-detail.html",
    runScripts: "dangerously",
    resources: "usable"
});
    
    // Some courses defined in COURSE_REGISTRY inside level-data.js
    const registry = window.COURSE_REGISTRY;
    if (!registry) {
        console.error("COURSE_REGISTRY not found! Scripts failed to load properly.");
        return;
    }

    const slugs = Object.keys(registry);
    console.log(`Found ${slugs.length} courses to generate.`);
    
    let generatedCount = 0;
    
    // Original template for resetting ld-main innerHTML
    const originalLdMainHtml = `
    <section id="ld-hero" class="ld-hero"></section>
    <section id="ld-outcomes" class="ld-outcomes"></section>
    <section id="ld-modules" class="ld-modules"></section>
    <section id="ld-case" class="ld-case"></section>
    <section id="ld-diff" class="ld-diff"></section>
    <section id="ld-applications" class="ld-applications"></section>
    <section id="ld-journey" class="ld-journey"></section>
    <section id="ld-locked" class="ld-locked" style="display:none"></section>
    <section id="ld-final-cta" class="ld-final-cta-section"></section>
    `;

    for (const slug of slugs) {
        for (const level of levels) {
            // Push URL state so initLevelDetailPage reads it correctly
            window.history.pushState({}, '', `?course=${slug}&level=${level}`);
            
            // RESET the DOM first!
            const mainContainer = window.document.getElementById('ld-main');
            if (mainContainer) {
                mainContainer.innerHTML = originalLdMainHtml;
            }
            
            // Re-run the main generation function
            if (typeof window.initLevelDetailPage === 'function') {
                window.initLevelDetailPage();
            } else {
                console.error("initLevelDetailPage not found!");
                continue;
            }

            // Get generated content
            const ldMain = window.document.getElementById('ld-main');
            if (ldMain) {
                let innerContent = ldMain.innerHTML;
                
                // Rewrite asset paths in innerContent
                innerContent = innerContent.replace(/(src|href)="assets\//g, '$1="../assets/');
                
                // Combine with template
                const pageDom = new JSDOM(finalTemplateHTML);
                const pMain = pageDom.window.document.getElementById('ld-main');
                pMain.innerHTML = innerContent;
                pMain.className = 'static-course-page';

                // update title
                pageDom.window.document.title = window.document.title;

                const outPath = path.join(outputDir, `${slug}-${level}.html`);
                
                // Also fix background url in inline styles if any (like url('assets/...'))
                const pageHtml = pageDom.serialize().replace(/url\(['"]?assets\//g, "url('../assets/");
                
                fs.writeFileSync(outPath, pageHtml, 'utf8');
                generatedCount++;
            }
        }
    }
    console.log(`Successfully generated ${generatedCount} pages!`);
    }, 500);
}, 1500); // 1.5s wait for JSDOM initial loads just in case
