const fs = require('fs');
const path = require('path');

const files = fs.readdirSync('courses').filter(f => f.endsWith('-grand-master.html'));
const badge = '<span class="gm-premium-badge">Advanced</span>';

for (const f of files) {
    const p = path.join('courses', f);
    let html = fs.readFileSync(p, 'utf8');
    
    // First, remove any incorrectly placed badges (outside of module cards)
    // Keep the CSS definition and badges inside cvd-module-weeks or cvd-module-title
    // Remove stray badges that ended up in wrong places (like footer)
    
    // Approach: Process line by line
    const lines = html.split('\n');
    const cleanedLines = [];
    
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        
        // If line has gm-premium-badge but is NOT a CSS definition and NOT inside a module card div
        if (line.includes('gm-premium-badge') && 
            !line.includes('.gm-premium-badge') &&  // Not CSS 
            !line.includes('cvd-module-weeks') &&     // Not module weeks
            !line.includes('cvd-module-title')) {      // Not module title
            // Remove the badge span from this line
            line = line.replace(/<span class="gm-premium-badge">Advanced<\/span>/g, '');
        }
        
        cleanedLines.push(line);
    }
    
    html = cleanedLines.join('\n');
    
    // Now inject badge into every cvd-module-weeks div that doesn't have one
    // Pattern: <div class="cvd-module-weeks">...text...</div>
    // We need to insert the badge before </div>
    html = html.replace(/<div class="cvd-module-weeks">([\s\S]*?)<\/div>/g, (match, content) => {
        if (match.includes('gm-premium-badge')) return match; // Already has it
        return `<div class="cvd-module-weeks">${content} ${badge}</div>`;
    });
    
    fs.writeFileSync(p, html, 'utf8');
    
    // Count results
    const finalLines = html.split('\n');
    let badgesInCards = 0;
    finalLines.forEach(line => {
        if (line.includes('cvd-module-weeks') && line.includes('gm-premium-badge')) badgesInCards++;
    });
    console.log(`${f}: ${badgesInCards} badges in module weeks`);
}
