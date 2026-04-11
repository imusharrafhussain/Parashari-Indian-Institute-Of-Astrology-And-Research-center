const fs = require('fs');
let c = fs.readFileSync('D:/Parashari website new/AB_AI/assets/js/level-data.js', 'utf8');

// Remove the erroneously injected blocks:
// e.g. <section class="cvd-hero-banner"><img src="assets/images-optimized/vedic-astrology/harshit-sir.webp" ... /></section>
// that the previous fuzzy sed-like replace broke.
const regex = /[ \t]*<section class="cvd-hero-banner">\s*<img src="assets\/images-optimized\/[^/]+\/harshit-sir\.webp"[^>]+>\s*<\/section>\s*/g;
c = c.replace(regex, '');

// Actually rename the original header image references to harshit-sir.webp
c = c.replace(/assets\/images-optimized\/vedic-astrology\/header image\.webp/g, 'assets/images-optimized/vedic-astrology/harshit-sir.webp');
c = c.replace(/assets\/images-optimized\/gemstone-science\/header image\.webp/g, 'assets/images-optimized/gemstone-science/harshit-sir.webp');
c = c.replace(/assets\/images-optimized\/lal-kitab\/header image\.webp/g, 'assets/images-optimized/lal-kitab/harshit-sir.webp');

fs.writeFileSync('D:/Parashari website new/AB_AI/assets/js/level-data.js', c);
console.log('Cleaned and replaced!');
