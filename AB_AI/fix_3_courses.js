const fs = require('fs');
const path = require('path');

const filesToFix = [
    'palmistry-grand-master.html',
    'rudraksha-grand-master.html',
    'vastu-grand-master.html'
];

filesToFix.forEach(f => {
    const p = path.join('courses', f);
    let html = fs.readFileSync(p, 'utf8');

    // 1. Extract the Progression Ladder
    const ladderMatch = html.match(/<!-- PROGRESSION LADDER -->[\s\S]*?<!-- END PROGRESSION LADDER -->/);
    if (!ladderMatch) {
       console.log("Could not find progression ladder in", f);
       return;
    }
    const ladderHtml = ladderMatch[0];
    
    // Only remove ladder if we also find the sidebar
    const asideRegex = /<\/div>[\s\S]*?<aside class="cvd-sidebar"[\s\S]*?<\/aside>\s*<\/div>/;
    const asideMatch = html.match(asideRegex);
    
    if (!asideMatch) {
       console.log("Could not find sidebar block in", f);
       return;
    }
    const asideHtml = asideMatch[0];
    
    // Check if parts are already moved (if the file was partially fixed or fixed by previous run)
    if (html.indexOf(asideHtml) > html.indexOf('class="cvd-faq"')) {
        console.log(`Sidebar is already after FAQ in ${f}. Skipping.`);
        return;
    }

    // Remove them
    html = html.replace(ladderHtml, '');
    html = html.replace(asideHtml, '');

    // 3. Find the end of the FAQ section and remove stray </div>s
    html = html.replace(/<\/section>\s*<\/div>\s*<div id="marquee-placeholder">/, '</section>\n\n<div id="marquee-placeholder">');
    html = html.replace(/<\/section>\s*<div id="marquee-placeholder">/, '</section>\n\n<div id="marquee-placeholder">');
    
    // Same for stray script tags or anything right before marquee
    html = html.replace(/<\/section>\s*<\/div>\s*<\/div>\s*<div id="marquee-placeholder">/, '</section>\n\n<div id="marquee-placeholder">');
    
    const parts = html.split('<div id="marquee-placeholder"></div>');
    if (parts.length >= 2) {
        // Build new HTML
        const newHtml = parts[0] + 
            '\n' + ladderHtml + '\n' +
            asideHtml + '\n' + 
            '<div id="marquee-placeholder"></div>' + parts[1];
            
        fs.writeFileSync(p, newHtml, 'utf8');
        console.log(`Successfully fixed structure for ${f}`);
    } else {
        console.log(`Could not find marquee-placeholder in ${f}`);
    }
});
