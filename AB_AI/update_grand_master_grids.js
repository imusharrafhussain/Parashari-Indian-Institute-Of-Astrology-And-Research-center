const fs = require('fs');
const path = require('path');

const files = fs.readdirSync('courses').filter(f => f.endsWith('-grand-master.html'));

for (const f of files) {
    const p = path.join('courses', f);
    let html = fs.readFileSync(p, 'utf8');

    // 1. Add wrappers to naked images inside .cvd-learn-item
    const missingWrapperRegex = /<div class="cvd-learn-item">\s*<img src="([^"]+)" alt="([^"]+)">/g;
    html = html.replace(missingWrapperRegex, `<div class="cvd-learn-item">\n          <div class="cvd-learn-item-img-wrapper">\n            <img src="$1" alt="$2">\n          </div>`);

    // 2. Change border-radius: 0 to border-radius: 50% for cvd-learn-item-img-wrapper img
    // We match the specific CSS block or replace it globally.
    // Be careful, it might not exist at all, or might be border-radius: 0;
    html = html.replace(/(\.cvd-learn-item-img-wrapper img\s*\{[^}]*?border-radius:\s*)0(;|(?=\s*\}))/g, '$150%$2');

    // If the CSS block is missing entirely but there is a <style> block containing .cvd-learn-item, let's inject it.
    // Or if someone has .cvd-learn-item we can add it, but replacing 0 with 50% usually catches it since most files have the template.

    fs.writeFileSync(p, html, 'utf8');
    console.log(`Processed grids in ${f}`);
}
