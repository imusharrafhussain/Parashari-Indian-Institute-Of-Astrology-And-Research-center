/**
 * inject_ladder.js
 * 
 * Injects the progression ladder (Diploma → Bachelors → Masters → Grand Master)
 * into every course page:
 *   1. All static pages in /courses/ (60 missing + skip 20 that already have it)
 *   2. All root comparison pages (reiki.html, gemstone.html, nakshatra.html, palmistry.html, etc.)
 *
 * Placed just above the footer in each page.
 */
const fs = require('fs');
const path = require('path');

const ROOT = 'd:/Parashari website new/AB_AI';
const COURSES_DIR = path.join(ROOT, 'courses');

// Map of course slugs used in /courses/ filenames → root HTML filename
const SLUG_TO_ROOT = {
    'vedic-astrology': 'astrology',
    'reiki': 'reiki',
    'tarot': 'tarot',
    'gemstone-science': 'gemstone',
    'nakshatra': 'nakshatra',
    'palmistry': 'palmistry',
    'face-reading': 'face-reading',
    'numerology': 'numerology',
    'vastu': 'vastu',
    'rudraksha': 'rudraksha',
    'crystal-healing': 'crystal-healing',
    'kp-astrology': 'kp-astrology',
    'lal-kitab': 'lal-kitab',
    'bnn-astrology': 'bnn-astrology',
    'nadi-jyotish': 'nadi-jyotish',
    'medical-astrology': 'medical-astrology',
    'complete-astrology': 'complete-astrology',
    'remedy-course': 'remedy-course',
    'astrology': 'astrology',
    'gemstone': 'gemstone',
};

const LEVEL_ORDER = ['diploma', 'bachelors', 'masters', 'grand-master'];
const LEVEL_NAMES = {
    'diploma': 'Diploma',
    'bachelors': 'Bachelors',
    'masters': 'Masters',
    'grand-master': 'Grand Master'
};
const LEVEL_ICONS = {
    'diploma': 'fa-book-open',
    'bachelors': 'fa-chart-pie',
    'masters': 'fa-compass',
    'grand-master': 'fa-crown'
};
const LEVEL_SUBTITLES = {
    'diploma': 'THE FOUNDATION',
    'bachelors': 'THE PRACTITIONER',
    'masters': 'THE ADVANCED GUIDE',
    'grand-master': 'THE AUTHORITY'
};

/**
 * Build the ladder HTML for a given course slug and current level.
 * @param {string} courseSlug - e.g. 'reiki', 'vedic-astrology'
 * @param {string} currentLevel - e.g. 'diploma', 'masters', or null for root pages
 * @param {boolean} isSubdir - true if in /courses/ (needs ../ prefix for links)
 */
function buildLadder(courseSlug, currentLevel, isSubdir) {
    const currentIdx = currentLevel ? LEVEL_ORDER.indexOf(currentLevel) : -1;
    const prefix = isSubdir ? '' : 'courses/';
    
    const nodes = LEVEL_ORDER.map((lv, i) => {
        let stateClass = '';
        if (currentLevel) {
            if (i < currentIdx) stateClass = 'completed';
            else if (i === currentIdx) stateClass = 'current';
            else stateClass = 'future';
        }
        
        const href = `${prefix}${courseSlug}-${lv}.html`;
        const youAreHere = (lv === currentLevel) 
            ? '<span class="ld-journey-you">YOU ARE HERE</span>' 
            : '';
        
        const connector = (i < LEVEL_ORDER.length - 1)
            ? `<div class="ld-journey-connector ${i < currentIdx ? 'filled' : ''}"></div>`
            : '';

        return `
          <a href="${href}" class="ld-journey-node ${stateClass}">
            <div class="ld-journey-icon"><i class="fas ${LEVEL_ICONS[lv]}"></i></div>
            <span class="ld-journey-label">${LEVEL_NAMES[lv]}</span>
            <span class="ld-journey-subtitle">${LEVEL_SUBTITLES[lv]}</span>
            ${youAreHere}
          </a>
          ${connector}`;
    }).join('\n');

    return `
<!-- PROGRESSION LADDER -->
<section class="course-progression-ladder">
  <div class="container text-center">
    <h2 class="card-section-title" style="margin-bottom: 8px;">Your Learning Journey</h2>
    <p style="color:#666;max-width:600px;margin:0 auto 35px;font-size:1rem;">A clear path from foundation to authority. Upgrade at any time.</p>
    <div class="ld-journey-track">
      ${nodes}
    </div>
  </div>
</section>
<!-- END PROGRESSION LADDER -->`;
}

// Inline CSS for the ladder (self-contained, no dependency on level-detail.css)
const LADDER_CSS = `
<style>
/* === Progression Ladder === */
.course-progression-ladder { padding: 60px 0 50px; background: linear-gradient(180deg, #fdfbf7 0%, #f5eedc 100%); }
.ld-journey-track { display: flex; align-items: flex-start; justify-content: center; flex-wrap: wrap; gap: 0; margin-top: 10px; }
.ld-journey-node { display: flex; flex-direction: column; align-items: center; text-decoration: none; padding: 10px 22px; position: relative; transition: transform 0.3s ease; }
.ld-journey-node:hover { transform: translateY(-4px); }
.ld-journey-icon { width: 64px; height: 64px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.35rem; background: #e8e3db; color: #999; transition: all 0.3s ease; border: 3px solid #fff; box-shadow: 0 5px 15px rgba(0,0,0,0.08); }
.ld-journey-node.completed .ld-journey-icon { background: #4a1a1a; color: #fff; }
.ld-journey-node.current .ld-journey-icon { background: #c8960c; color: #fff; transform: scale(1.2); box-shadow: 0 0 25px rgba(200,150,12,0.45); }
.ld-journey-node.future .ld-journey-icon { background: #f0ece6; color: #bbb; }
.ld-journey-label { margin-top: 10px; font-size: 0.9rem; font-weight: 800; color: #4a1a1a; letter-spacing: 0.3px; }
.ld-journey-node.current .ld-journey-label { color: #c8960c; }
.ld-journey-node.future .ld-journey-label { color: #999; }
.ld-journey-subtitle { font-size: 0.65rem; color: #999; font-weight: 700; text-transform: uppercase; letter-spacing: 1.2px; margin-top: 2px; }
.ld-journey-node.current .ld-journey-subtitle { color: #c8960c; }
.ld-journey-you { font-size: 0.6rem; color: #c8960c; font-weight: 900; text-transform: uppercase; letter-spacing: 1.5px; margin-top: 5px; animation: pulseYou 2s ease-in-out infinite; }
@keyframes pulseYou { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
.ld-journey-connector { width: 55px; height: 3px; background: #ddd; margin-top: 32px; border-radius: 2px; }
.ld-journey-connector.filled { background: linear-gradient(90deg, #4a1a1a, #c8960c); }
@media (max-width: 768px) {
  .ld-journey-connector { width: 25px; }
  .ld-journey-node { padding: 8px 10px; }
  .ld-journey-icon { width: 48px; height: 48px; font-size: 1rem; }
  .ld-journey-label { font-size: 0.75rem; }
  .ld-journey-subtitle { font-size: 0.55rem; }
  .course-progression-ladder { padding: 40px 0 30px; }
}
</style>`;

// ============================================================
// PART 1: Inject into /courses/ pages
// ============================================================
const courseFiles = fs.readdirSync(COURSES_DIR).filter(f => f.endsWith('.html'));
let injectedCourses = 0;
let skippedCourses = 0;

for (const file of courseFiles) {
    const filePath = path.join(COURSES_DIR, file);
    let html = fs.readFileSync(filePath, 'utf8');
    
    // Skip if already has our new ladder
    if (html.includes('course-progression-ladder')) {
        skippedCourses++;
        continue;
    }
    
    // Remove any old ld-journey section if present (the one from generate_all.js)
    html = html.replace(/<section id="ld-journey"[\s\S]*?<\/section>/g, '');
    
    // Parse slug and level from filename
    const match = file.match(/^(.+)-(diploma|bachelors|masters|grand-master)\.html$/);
    if (!match) {
        console.log(`  SKIP (can't parse): ${file}`);
        continue;
    }
    const courseSlug = match[1];
    const level = match[2];
    
    const ladder = buildLadder(courseSlug, level, true);
    
    // Find injection point: just before footer-placeholder or marquee-placeholder
    let injectionTarget = null;
    let injectionIdx = -1;
    
    // Try marquee-placeholder first (it comes before footer)
    injectionIdx = html.indexOf('<div id="marquee-placeholder">');
    if (injectionIdx === -1) {
        // Try footer-placeholder
        injectionIdx = html.indexOf('<div id="footer-placeholder">');
    }
    if (injectionIdx === -1) {
        // Try </body>
        injectionIdx = html.indexOf('</body>');
    }
    
    if (injectionIdx === -1) {
        console.log(`  SKIP (no injection point): ${file}`);
        continue;
    }
    
    // Inject CSS into <head> and ladder HTML before footer
    if (!html.includes('course-progression-ladder')) {
        // Add CSS to head
        html = html.replace('</head>', LADDER_CSS + '\n</head>');
        
        // RECALCULATE INJECTION INDEX AFTER HTML LENGTH CHNAGED!
        injectionIdx = html.indexOf('<div id="marquee-placeholder">');
        if (injectionIdx === -1) injectionIdx = html.indexOf('<div id="footer-placeholder">');
        if (injectionIdx === -1) injectionIdx = html.indexOf('</body>');

        // Add ladder HTML before footer
        html = html.substring(0, injectionIdx) + ladder + '\n' + html.substring(injectionIdx);
    }
    
    fs.writeFileSync(filePath, html, 'utf8');
    injectedCourses++;
}

console.log(`\n=== COURSES DIRECTORY ===`);
console.log(`Injected: ${injectedCourses} | Skipped (already had): ${skippedCourses}`);

// ============================================================
// PART 2: Inject into root comparison pages
// ============================================================
const ROOT_PAGES = [
    { file: 'reiki.html',              slug: 'reiki' },
    { file: 'gemstone.html',           slug: 'gemstone-science' },
    { file: 'nakshatra.html',          slug: 'nakshatra' },
    { file: 'palmistry.html',          slug: 'palmistry' },
    { file: 'astrology.html',          slug: 'vedic-astrology' },
    { file: 'face-reading.html',       slug: 'face-reading' },
    { file: 'numerology.html',         slug: 'numerology' },
    { file: 'vastu.html',              slug: 'vastu' },
    { file: 'rudraksha.html',          slug: 'rudraksha' },
    { file: 'crystal-healing.html',    slug: 'crystal-healing' },
    { file: 'kp-astrology.html',       slug: 'kp-astrology' },
    { file: 'lal-kitab.html',          slug: 'lal-kitab' },
    { file: 'bnn-astrology.html',      slug: 'bnn-astrology' },
    { file: 'nadi-jyotish.html',       slug: 'nadi-jyotish' },
    { file: 'medical-astrology.html',  slug: 'medical-astrology' },
    { file: 'complete-astrology.html',  slug: 'complete-astrology' },
    { file: 'remedy-course.html',       slug: 'remedy-course' },
    { file: 'tarot.html',              slug: 'tarot' },
];

let injectedRoot = 0;

for (const { file, slug } of ROOT_PAGES) {
    const filePath = path.join(ROOT, file);
    if (!fs.existsSync(filePath)) {
        console.log(`  ROOT SKIP (not found): ${file}`);
        continue;
    }
    
    let html = fs.readFileSync(filePath, 'utf8');
    
    if (html.includes('course-progression-ladder')) {
        console.log(`  ROOT SKIP (already has): ${file}`);
        continue;
    }
    
    // Root pages show all tiers, no "current" level highlighted
    const ladder = buildLadder(slug, null, false);
    
    // Find injection point: before <footer>, or before urgency marquee
    let injectionIdx = html.indexOf('<footer>');
    if (injectionIdx === -1) injectionIdx = html.indexOf('</body>');
    
    // Also look for the urgency marquee — inject BEFORE it
    const marqueeIdx = html.indexOf('urgency-marquee-container');
    if (marqueeIdx !== -1) {
        // Find the opening <div of the marquee
        const divStart = html.lastIndexOf('<div', marqueeIdx);
        if (divStart !== -1 && divStart < injectionIdx) {
            injectionIdx = divStart;
        }
    }
    
    if (injectionIdx === -1) {
        console.log(`  ROOT SKIP (no injection point): ${file}`);
        continue;
    }
    
    // Add CSS to head
    html = html.replace('</head>', LADDER_CSS + '\n</head>');
    
    // RECALCULATE INJECTION INDEX AFTER HTML LENGTH CHANGED!
    injectionIdx = html.indexOf('<footer>');
    if (injectionIdx === -1) injectionIdx = html.indexOf('</body>');
    const newMarqueeIdx = html.indexOf('urgency-marquee-container');
    if (newMarqueeIdx !== -1) {
        const divStart = html.lastIndexOf('<div', newMarqueeIdx);
        if (divStart !== -1 && divStart < injectionIdx) {
            injectionIdx = divStart;
        }
    }

    // Inject ladder
    html = html.substring(0, injectionIdx) + '\n' + ladder + '\n\n' + html.substring(injectionIdx);
    
    fs.writeFileSync(filePath, html, 'utf8');
    injectedRoot++;
    console.log(`  ROOT DONE: ${file}`);
}

console.log(`\n=== ROOT PAGES ===`);
console.log(`Injected: ${injectedRoot}`);
console.log(`\nAll done!`);
