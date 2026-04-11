const fs = require('fs');

const path = 'd:/Parashari website new/AB_AI/assets/js/level-data.js';
let code = fs.readFileSync(path, 'utf8');

// The block to insert for the hero image
const blockToInsert = `
              <div style="margin-top: 25px;">
                <a href="\${courseSlug}.html" style="color: #B27C31; font-weight: 600; text-decoration: underline; font-size: 1rem;">
                  For price comparison follow this <i class="fas fa-arrow-right" style="font-size: 0.8rem;"></i>
                </a>
              </div>`;

// The block to insert for the regular lower strip button
const stripBlockToInsert = `
          <div>
            <a href="\${courseSlug}.html" class="cvd-strip-btn"><i class="far fa-file-alt"></i> Get Started Now!</a>
          </div>
          <a href="\${courseSlug}.html" class="cvd-strip-link">For price comparison follow this</a>`;

// 1. Fixing the Hero section
// We find all `<div class="cvd-hero-save">...</div>`
// and check if they are immediately followed by `<div style="margin-top: 25px;">...For price comparison`
let replacedHero = false;
let counter = 0;
code = code.replace(/<div class="cvd-hero-save">[\s\S]*?<\/div>/g, (match, offset, str) => {
    // Check if what follows immediately contains "For price comparison follow this"
    // (We inspect the next 500 characters so we accurately detect it)
    let followingText = str.substring(offset + match.length, offset + match.length + 500);
    if (!followingText.includes('For price comparison')) {
        counter++;
        replacedHero = true;
        return match + '\n' + blockToInsert;
    }
    return match;
});

// 2. Fixing the Strip section
// Some lower strips have the button but miss the link "For price comparison"
let replacedStrip = false;
let stripCounter = 0;
// Strip replacement matches `<a href="...">Get Started Now!</a>\n          </div>` 
// and appends `<a href="..." class="cvd-strip-link">For price comparison follow this</a>`
code = code.replace(/<a href="\$\{courseSlug\}\.html" class="cvd-strip-btn"><i class="far fa-file-alt"><\/i> Get Started Now!<\/a>\s*<\/div>/g, (match, offset, str) => {
    let followingText = str.substring(offset + match.length, offset + match.length + 200);
    if (!followingText.includes('For price comparison')) {
        stripCounter++;
        replacedStrip = true;
        return match + `\n          <a href="\${courseSlug}.html" class="cvd-strip-link">For price comparison follow this</a>`;
    }
    return match;
});

if(replacedHero || replacedStrip) {
    fs.writeFileSync(path, code);
    console.log(`Updated! Injected ${counter} hero links and ${stripCounter} strip links.`);
} else {
    console.log(`Nothing to update! All courses had links already.`);
}
