const fs = require('fs');

const files = [
    'courses/palmistry-grand-master.html',
    'courses/rudraksha-grand-master.html',
    'courses/vastu-grand-master.html'
];

files.forEach(f => {
    const lines = fs.readFileSync(f, 'utf8').split(/\r?\n/);
    
    // Find Progression Ladder
    const ladderStart = lines.findIndex(l => l.includes('<!-- PROGRESSION LADDER -->'));
    const ladderEnd = lines.findIndex(l => l.includes('<!-- END PROGRESSION LADDER -->'));
    
    // Find Sidebar Block
    const asideStart = lines.findIndex(l => l.includes('<aside class="cvd-sidebar"'));
    const asideEnd = lines.findIndex(l => l.includes('</aside>'));
    
    // We need to find the `</div>` that closed cvd-main-content BEFORE the aside
    let mainCloseIdx = asideStart - 1;
    while (mainCloseIdx > ladderEnd && !lines[mainCloseIdx].includes('</div>')) {
        mainCloseIdx--;
    }
    
    // We need to find the `</div>` that closed cvd-layout-container AFTER the aside
    let layoutCloseIdx = asideEnd + 1;
    while (layoutCloseIdx < lines.length && !lines[layoutCloseIdx].includes('</div>')) {
        layoutCloseIdx++;
    }
    
    console.log(`${f}:\n Ladder: ${ladderStart}-${ladderEnd}\n Sidebar Block: ${mainCloseIdx}-${layoutCloseIdx}`);
    
    if (ladderStart === -1 || ladderEnd === -1 || asideStart === -1 || asideEnd === -1) {
        console.log(`Skipping ${f} - missing blocks`);
        return;
    }
    
    // Find where marquee-placeholder is to target the insertion point
    const marqueeIdx = lines.findIndex(l => l.includes('marquee-placeholder'));
    
    // Find stray </div> before marquee to remove
    let lastValidSectionIdx = marqueeIdx - 1;
    let strayDivsToRemove = [];
    while (lastValidSectionIdx > 0 && !lines[lastValidSectionIdx].includes('</section>')) {
        if (lines[lastValidSectionIdx].includes('</div>')) {
            strayDivsToRemove.push(lastValidSectionIdx);
        }
        lastValidSectionIdx--;
    }
    
    console.log(` Marquee: ${marqueeIdx}\n Stray divs to remove:`, strayDivsToRemove);

    // Extract blocks
    const ladderBlock = lines.slice(ladderStart, ladderEnd + 1);
    const sidebarBlock = lines.slice(mainCloseIdx, layoutCloseIdx + 1);
    
    // Create new array of lines
    let newLines = [];
    for (let i = 0; i < lines.length; i++) {
        // Skip collected blocks
        if (i >= ladderStart && i <= ladderEnd) continue;
        if (i >= mainCloseIdx && i <= layoutCloseIdx) continue;
        // Skip stray divs
        if (strayDivsToRemove.includes(i)) continue;
        
        // At marquee placeholder, insert our blocks FIRST
        if (i === marqueeIdx) {
            newLines.push('');
            newLines.push(...ladderBlock);
            newLines.push(...sidebarBlock);
            newLines.push('');
        }
        
        newLines.push(lines[i]);
    }
    
    fs.writeFileSync(f, newLines.join('\n'), 'utf8');
    console.log(`Fixed ${f}`);
});
