const fs = require('fs');
const path = require('path');
const dir = 'courses';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(f => {
    let html = fs.readFileSync(path.join(dir, f), 'utf8');
    const startStr = '<!-- PROGRESSION LADDER -->';
    const endStr = '<!-- END PROGRESSION LADDER -->';
    
    let startIdx = html.indexOf(startStr);
    let endIdx = html.indexOf(endStr);
    
    if (startIdx === -1 || endIdx === -1) return;
    
    endIdx += endStr.length;
    let asideIdx = html.indexOf('<aside class="cvd-sidebar"');
    
    // Only move if progression is currently AFTER the sidebar (i.e. out of the left iframe)
    if (startIdx > asideIdx && asideIdx !== -1) {
        // Extract the chunk
        let chunk = html.substring(startIdx, endIdx);
        // Remove the chunk from the html
        html = html.substring(0, startIdx) + html.substring(endIdx);
        
        // After removal, find the updated asideIdx
        asideIdx = html.indexOf('<aside class="cvd-sidebar"');
        
        // Find the '</div>' right before asideIdx
        let insertPos = html.lastIndexOf('</div>', asideIdx);
        if (insertPos !== -1) {
            html = html.substring(0, insertPos) + chunk + '\n\n' + html.substring(insertPos);
            fs.writeFileSync(path.join(dir, f), html, 'utf8');
            console.log('Fixed ' + f);
        }
    }
});
