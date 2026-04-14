const fs = require('fs');
const path = require('path');

function updateHtml() {
    const coursesDir = 'courses';
    const files = ['nakshatra-diploma.html', 'nakshatra-bachelors.html', 'nakshatra-masters.html', 'nakshatra-grand-master.html'];
    
    for (const f of files) {
        const p = path.join(coursesDir, f);
        if (!fs.existsSync(p)) continue;
        
        let html = fs.readFileSync(p, 'utf8');
        
        // Match the current plain hero
        const heroRegex = /<section style="width: 100%; border-bottom: 1px solid #e0d5c8;">\s*<img src="\.\.\/assets\/images-optimized\/nakshatra\/header1\.webp" alt="Grah Nakshatra" style="width: 100%; height: auto; display: block;">\s*<\/section>/;
        
        // Image as-is with text overlay (no dark filter/gradient on the image)
        const newHero = `<section style="position: relative; width: 100%; border-bottom: 1px solid #e0d5c8;">
            <img src="../assets/images-optimized/nakshatra/header1.webp" alt="Grah Nakshatra" style="width: 100%; height: auto; display: block;">
            <div style="position: absolute; bottom: 12%; left: 8%; z-index: 10; text-align: left;">
                <h1 style="font-family: 'Times New Roman', serif; font-size: clamp(1.6rem, 4.5vw, 4rem); color: #FFF2D1; font-weight: bold; margin: 0; text-shadow: 2px 2px 8px rgba(0,0,0,0.8), 0 0 25px rgba(0,0,0,0.5);">Grah Nakshatra</h1>
                <p style="font-family: Arial, sans-serif; font-size: clamp(0.65rem, 1.6vw, 1.4rem); color: #FFDF80; margin: 6px 0 0 2px; font-weight: 500; text-shadow: 1px 1px 6px rgba(0,0,0,0.9); letter-spacing: 0.5px;">Unlock Your Destiny Through Vedic Astrology</p>
            </div>
        </section>`;
        
        if (html.match(heroRegex)) {
            html = html.replace(heroRegex, newHero);
            fs.writeFileSync(p, html, 'utf8');
            console.log('Updated ' + f);
        } else {
            console.log('No match found in ' + f);
        }
    }
}
updateHtml();
