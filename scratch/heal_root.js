const fs = require('fs');
const path = require('path');

const COURSES_DIR = path.join(__dirname, 'courses');
const ROOT = __dirname;

const ROOT_PAGES = [
    'reiki.html', 'gemstone.html', 'nakshatra.html', 'palmistry.html', 'astrology.html',
    'face-reading.html', 'numerology.html', 'vastu.html', 'rudraksha.html', 'crystal-healing.html',
    'kp-astrology.html', 'lal-kitab.html', 'bnn-astrology.html', 'nadi-jyotish.html',
    'medical-astrology.html', 'complete-astrology.html', 'remedy-course.html', 'tarot.html'
];

for (const file of ROOT_PAGES) {
    const filePath = path.join(ROOT, file);
    if (!fs.existsSync(filePath)) continue;
    
    let html = fs.readFileSync(filePath, 'utf8');
    
    // Find the ladder start and end
    const startIdx = html.indexOf('\n\n<!-- PROGRESSION LADDER -->');
    if (startIdx === -1) {
        // try without double newline
        const altIdx = html.indexOf('\n<!-- PROGRESSION LADDER -->');
        if (altIdx !== -1) {
             const endIdx = html.indexOf('<!-- END PROGRESSION LADDER -->\n\n', altIdx);
             if (endIdx !== -1) {
                  html = html.substring(0, altIdx) + html.substring(endIdx + '<!-- END PROGRESSION LADDER -->\n\n'.length);
             }
        }
    } else {
        const endIdx = html.indexOf('<!-- END PROGRESSION LADDER -->\n\n', startIdx);
        if (endIdx !== -1) {
             html = html.substring(0, startIdx) + html.substring(endIdx + '<!-- END PROGRESSION LADDER -->\n\n'.length);
        }
    }
    
    // Also remove the ladder css from head! It was injected right before </head>
    // Actually the css was injected like: `<style>\n/* === Progression Ladder === */...`
    const cssStart = html.indexOf('<style>\n/* === Progression Ladder === */');
    if (cssStart !== -1) {
        const cssEnd = html.indexOf('</style>\n</head>', cssStart);
        if (cssEnd !== -1) {
            html = html.substring(0, cssStart) + html.substring(cssEnd + '</style>\n'.length);
        }
    }
    
    fs.writeFileSync(filePath, html, 'utf8');
    console.log("Healed", file);
}
