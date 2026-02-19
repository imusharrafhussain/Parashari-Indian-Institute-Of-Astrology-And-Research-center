const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '../index.html');

let content = fs.readFileSync(indexPath, 'utf8');

// Wrap all hero-card images in a wrapper div
// Pattern: <img src="..." alt="..." class="hero-card-image">
// Replace with: <div class="hero-card-image-wrapper"><img src="..." alt="..." class="hero-card-image"></div>

content = content.replace(
    /<img\s+src="([^"]+)"\s+alt="([^"]+)"\s+class="hero-card-image">/g,
    '<div class="hero-card-image-wrapper">\n          <img src="$1" alt="$2" class="hero-card-image">\n        </div>'
);

fs.writeFileSync(indexPath, content, 'utf8');

console.log('✅ Successfully wrapped all 12 zodiac card images in hero-card-image-wrapper');
