const fs = require('fs');
const path = require('path');

const files = fs.readdirSync('courses').filter(f => f.endsWith('-grand-master.html'));

const cssToAdd = `
      .gm-premium-badge {
        background: linear-gradient(135deg, #d4af37 0%, #ffdf70 50%, #d4af37 100%);
        color: #5a1e1e;
        padding: 2px 8px;
        border-radius: 4px;
        font-size: 0.65em;
        font-weight: 800;
        margin-left: 8px;
        border: 1px solid #ffd700;
        box-shadow: 0 0 8px rgba(212, 175, 55, 0.6), inset 0 0 5px rgba(255, 255, 255, 0.5);
        text-transform: uppercase;
      }
`;

for (const f of files) {
    const p = path.join('courses', f);
    let html = fs.readFileSync(p, 'utf8');

    // Add CSS if missing
    if (!html.includes('.gm-premium-badge')) {
        html = html.replace('</style>', cssToAdd + '\n</style>');
    }

    // Add badge to .cvd-module-weeks
    // Example: <div class="cvd-module-weeks">Module 1: ...</div>
    html = html.replace(/(<div class="cvd-module-weeks">[^<]*(?:<(?!span class="gm-premium-badge")[^>]*>[^<]*)*)(<\/div>)/g, (match, p1, p2) => {
        if (!match.includes('gm-premium-badge')) {
            return p1 + ' <span class="gm-premium-badge">Advanced</span>' + p2;
        }
        return match;
    });

    // Add badge to .ld-module-title for unmigrated courses
    // Example: <h3 class="ld-module-title">...</h3>
    html = html.replace(/(<h3 class="ld-module-title">[^<]*(?:<(?!span class="gm-premium-badge")[^>]*>[^<]*)*)(<\/h3>)/g, (match, p1, p2) => {
        if (!match.includes('gm-premium-badge')) {
            return p1 + ' <span class="gm-premium-badge">Advanced</span>' + p2;
        }
        return match;
    });

    fs.writeFileSync(p, html, 'utf8');
    console.log(`Processed badges in ${f}`);
}
