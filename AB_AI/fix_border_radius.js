const fs = require('fs');
const path = require('path');

const files = fs.readdirSync('courses').filter(f => f.endsWith('-grand-master.html'));

for (const f of files) {
    const p = path.join('courses', f);
    let html = fs.readFileSync(p, 'utf8');
    
    if (!html.includes('cvd-learn-item-img-wrapper')) continue;

    // Replace ALL remaining border-radius: 0 within .cvd-learn-item-img-wrapper img blocks
    // The pattern is: .cvd-learn-item-img-wrapper img { ... border-radius: 0; ... }
    html = html.replace(
        /\.cvd-learn-item-img-wrapper img\s*\{([^}]*?)border-radius:\s*0;/g,
        '.cvd-learn-item-img-wrapper img {$1border-radius: 50%;'
    );

    fs.writeFileSync(p, html, 'utf8');
    console.log(`Fixed remaining border-radius in ${f}`);
}
