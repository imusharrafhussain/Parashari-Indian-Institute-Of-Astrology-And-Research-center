const fs = require('fs');
const path = require('path');

const filesToMigrate = [
    'bnn-astrology-grand-master.html',
    'complete-astrology-grand-master.html',
    'medical-astrology-grand-master.html',
    'nadi-jyotish-grand-master.html',
    'remedy-course-grand-master.html'
];

// CSS to inject for layout logic
const sidebarCSS = `
      @media (min-width: 992px) {
        .cvd-main-content, .cvd-sidebar {
          height: calc(100vh - 120px);
          overflow-y: scroll;
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* IE and Edge */
        }
        .cvd-main-content::-webkit-scrollbar, .cvd-sidebar::-webkit-scrollbar {
          display: none; /* Chrome, Safari, Opera */
        }
        .cvd-sidebar {
          position: sticky;
          top: 100px;
          border-radius: 8px;
          padding: 15px;
        }
      }
      .cvd-module-card {
        background: #FFF;
        border-radius: 8px;
        padding: 25px 20px;
        margin-bottom: 25px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.04);
        border: 1px solid #EAEAEA;
        border-top: 4px solid #C48E44;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }
      .cvd-module-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 25px rgba(0,0,0,0.08);
      }
      .cvd-module-title {
        font-family: 'Times New Roman', serif;
        font-size: 1.25rem;
        font-weight: bold;
        color: #591C21;
        margin-bottom: 8px;
      }
      .cvd-module-weeks {
        font-size: 1.05rem;
        color: #333;
        font-weight: 600;
        margin-bottom: 10px;
      }
      .cvd-sidebar-heading { font-family: 'Times New Roman', serif; font-size: 1.8rem; color: #591C21; font-weight: bold; margin-bottom: 25px; text-align: center; position: relative; }
      .cvd-sidebar-heading::after { content: ''; display: block; width: 60px; height: 3px; background: #C48E44; margin: 10px auto 0 auto; }
      @media (max-width: 991px) {
        .cvd-layout-container { flex-direction: column; overflow-x: hidden; }
        .cvd-sidebar { width: 100% !important; position: static !important; margin-top: 40px; }
      }
`;

for (const f of filesToMigrate) {
    const p = path.join('courses', f);
    if (!fs.existsSync(p)) continue;
    
    let html = fs.readFileSync(p, 'utf8');

    // Skip if already migrated
    if (html.includes('cvd-layout-container')) {
        console.log(`Skipping ${f}, already migrated.`);
        continue;
    }

    // 1. Inject CSS
    html = html.replace('</style>\n</head>', `\n${sidebarCSS}\n</style>\n</head>`);

    // 2. Extract the modules section
    const moduleSectionRegex = /<section id="ld-modules" class="ld-modules">([\s\S]*?)<\/section>/;
    const match = moduleSectionRegex.exec(html);
    
    if (match) {
        let moduleContent = match[1];

        // We build the aside HTML from the ld-module-block structures
        let asideHTML = `<aside class="cvd-sidebar" id="cvd-dynamic-sidebar" style="width: 380px; flex-shrink: 0; padding-top: 20px;">\n<h3 class="cvd-sidebar-heading">Grand Master Course Curriculum</h3>\n`;

        // Extract each module block
        const blockRegex = /<div class="ld-module-block[^>]*>[\s\S]*?<span class="ld-module-num">([^<]+)<\/span>\s*<span class="ld-module-weeks">([^<]+)<\/span>[\s\S]*?<h3 class="ld-module-title">([\s\S]*?)<\/h3>[\s\S]*?<div class="ld-module-body">\s*(<ul>[\s\S]*?<\/ul>\s*)<\/div>[\s\S]*?<\/div>/g;
        
        let blockMatch;
        while ((blockMatch = blockRegex.exec(moduleContent)) !== null) {
            let num = blockMatch[1].trim(); // e.g. Module 1
            let weeks = blockMatch[2].trim(); // e.g. Week 1-2
            let titleHTML = blockMatch[3].trim(); // e.g. Foundation
            let ulHTML = blockMatch[4].trim(); // The UL list

            // the user already has `<span class="gm-premium-badge">Advanced</span>` in titleHTML because we ran the previous script globally!
            
            asideHTML += `
        <div class="cvd-module-card">
          <div class="cvd-module-title">${titleHTML}</div>
          <div class="cvd-module-weeks">${num}: ${weeks}</div>
          ${ulHTML}
        </div>\n`;
        }
        asideHTML += `\n</aside>\n`;

        // 3. Remove the entire <section id="ld-modules"> from the body
        html = html.replace(moduleSectionRegex, "");

        // 4. Wrap everything between <div id="ld-main" class="static-course-page">\n<style>...</style> AND <!-- PROGRESSION LADDER -->
        // We will do a generic replacement:
        
        // Find where the real content starts (after <style></style> right after ld-main)
        // Usually it's:
        // <div id="ld-main" class="static-course-page">
        // <style></style>
        // <section id="ld-hero" ...
        
        html = html.replace(/(<div id="ld-main" class="static-course-page">\s*(?:<style>[\s\S]*?<\/style>\s*)?)(<section id="ld-hero"[\s\S]*?)<!-- PROGRESSION LADDER -->/, (m, p1, p2) => {
            return `${p1}
<!-- START MAIN LAYOUT WITH SIDEBAR -->
<div class="cvd-layout-container" style="display: flex; flex-wrap: wrap; gap: 50px; max-width: 100%; margin: 20px auto 0 auto; align-items: flex-start; padding: 0 20px;">
  <div class="cvd-main-content" style="flex: 1; min-width: 0;">
    ${p2}
  </div> <!-- end cvd-main-content -->
  ${asideHTML}
</div> <!-- end cvd-layout-container -->
<!-- PROGRESSION LADDER -->`;
        });
        
        fs.writeFileSync(p, html, 'utf8');
        console.log(`Migrated layout for ${f}`);
    } else {
        console.log(`Could not find ld-modules in ${f}`);
    }
}
