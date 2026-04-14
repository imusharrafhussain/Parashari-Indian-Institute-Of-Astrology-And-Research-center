const fs = require('fs');
const path = require('path');

const files = fs.readdirSync('courses').filter(f => f.endsWith('-grand-master.html'));

let brokenFiles = [];

files.forEach(f => {
    const content = fs.readFileSync(path.join('courses', f), 'utf8');
    
    const sidebarIdx = content.indexOf('<aside class="cvd-sidebar');
    const learnIdx = content.indexOf('cvd-learn-section');
    const faqIdx = content.indexOf('class="cvd-faq"');
    const stripIdx = content.indexOf('class="cvd-strip"');
    
    // The correct structure is that cvd-sidebar should be positioned side-by-side with cvd-main-content
    // This means whatever is inside cvd-main-content should appear BEFORE the closing </div> of cvd-main-content.
    // If elements like cvd-learn-section, cvd-faq, or cvd-strip appear AFTER the layout-container closes (which is usually right after the sidebar ends), they break the layout.
    
    const mainCloseIdx = content.indexOf('</div>\n      \n      <aside class="cvd-sidebar"');
    if (mainCloseIdx === -1) {
        // Try alternate closing formats
        // check if </aside> is followed by </div> then <section id="cvd-learn-section"
        const sidebarCloseIdx = content.indexOf('</aside>');
        if (sidebarCloseIdx > -1) {
            const afterSidebar = content.substring(sidebarCloseIdx);
            if (afterSidebar.includes('cvd-learn-section') || afterSidebar.includes('cvd-strip') || afterSidebar.includes('cvd-faq')) {
                brokenFiles.push(f);
            }
        }
    }
});

console.log('Files with components placed AFTER the sidebar/layout container:');
console.log(brokenFiles);
