const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..', 'AB_AI');
const COURSES_DIR = path.join(ROOT_DIR, 'courses');

// 1. Remove from all ROOT pages
const ROOT_PAGES = [
    'reiki.html', 'gemstone.html', 'nakshatra.html', 'palmistry.html', 'astrology.html',
    'face-reading.html', 'numerology.html', 'vastu.html', 'rudraksha.html', 'crystal-healing.html',
    'kp-astrology.html', 'lal-kitab.html', 'bnn-astrology.html', 'nadi-jyotish.html',
    'medical-astrology.html', 'complete-astrology.html', 'remedy-course.html', 'tarot.html'
];
for(const file of ROOT_PAGES) {
    const fPath = path.join(ROOT_DIR, file);
    if(fs.existsSync(fPath)) {
        let h = fs.readFileSync(fPath, 'utf8');
        h = h.replace(/\n*<!-- PROGRESSION LADDER -->[\s\S]*?<!-- END PROGRESSION LADDER -->\n*/g, '\n');
        h = h.replace(/<style>\n\/\* === Progression Ladder === \*\/[\s\S]*?<\/style>\n*/g, '');
        fs.writeFileSync(fPath, h, 'utf8');
    }
}

// 2. Move ladder to right below the FAQ section on course pages
const courseFiles = fs.readdirSync(COURSES_DIR).filter(f => f.endsWith('.html'));
for(const file of courseFiles) {
    const fPath = path.join(COURSES_DIR, file);
    let h = fs.readFileSync(fPath, 'utf8');
    
    // Extract the ladder
    const match = h.match(/<!-- PROGRESSION LADDER -->[\s\S]*?<!-- END PROGRESSION LADDER -->/);
    if (!match) continue;
    
    let ladderChunk = match[0];
    
    // Remove the ladder from its current bottom position
    h = h.replace(/\n*<!-- PROGRESSION LADDER -->[\s\S]*?<!-- END PROGRESSION LADDER -->\n*/g, '\n');
    
    // Find the FAQ section location
    // Typically it's defined like this:
    // <div class="cvd-faq"> ... </div>
    // </section>
    
    // We can't just find </section> easily, but we can look for cvd-faq-answer or the end of the section
    const faqIdx = h.indexOf('cvd-faq');
    if (faqIdx !== -1) {
        // Find the END of the section that contains the FAQ.
        // Usually, the FAQ section ends right before </div> <!-- end cvd-main-content -->
        const mainContentEndIdx = h.indexOf('</div> <!-- end cvd-main-content -->');
        if (mainContentEndIdx !== -1) {
            // We inject it right before the main content ends!
            // Wait, does the FAQ section end exactly there?
            // Yes, structurally, FAQ is the last element in cvd-main-content in our current template
            h = h.substring(0, mainContentEndIdx) + 
                '\n\n' + ladderChunk + '\n\n' + 
                h.substring(mainContentEndIdx);
        } else {
             // Fallback if main content end not found
             // Just inject right after the faq div
             h = h.replace(/(<div class="cvd-faq">[\s\S]*?<\/div>\s*<\/section>)/, "$1\n\n" + ladderChunk + "\n");
        }
    } else {
        // Fallback for pages without FAQ (like legacy simple pages)
        const mainContentEndIdx = h.indexOf('</div> <!-- end cvd-main-content -->');
        if (mainContentEndIdx !== -1) {
             h = h.substring(0, mainContentEndIdx) + '\n\n' + ladderChunk + '\n\n' + h.substring(mainContentEndIdx);
        } else {
             // Put it back before footer
             const footIdx = h.indexOf('<div id="marquee-placeholder">');
             h = h.substring(0, footIdx) + '\n\n' + ladderChunk + '\n\n' + h.substring(footIdx);
        }
    }
    
    fs.writeFileSync(fPath, h, 'utf8');
}
console.log('Update complete!');
