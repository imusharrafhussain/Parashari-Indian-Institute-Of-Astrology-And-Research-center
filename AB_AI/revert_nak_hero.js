const fs = require('fs');
const path = require('path');

function revertHtml() {
    const coursesDir = 'courses';
    const files = ['nakshatra-diploma.html', 'nakshatra-bachelors.html', 'nakshatra-masters.html', 'nakshatra-grand-master.html'];
    
    for (const f of files) {
        const p = path.join(coursesDir, f);
        if (!fs.existsSync(p)) continue;
        
        let html = fs.readFileSync(p, 'utf8');
        
        // Match the current hero section with overlays
        const heroRegex = /<section style="position: relative; width: 100%; border-bottom: 2px solid #D4AF37; overflow: hidden; display: flex; align-items: center; justify-content: center; text-align: center;">[\s\S]*?<\/section>/;
        
        // Clean, plain image — no effects, no overlays, no text  
        const plainHero = `<section style="width: 100%; border-bottom: 1px solid #e0d5c8;">
            <img src="../assets/images-optimized/nakshatra/header1.webp" alt="Grah Nakshatra" style="width: 100%; height: auto; display: block;">
        </section>`;
        
        if (html.match(heroRegex)) {
            html = html.replace(heroRegex, plainHero);
            fs.writeFileSync(p, html, 'utf8');
            console.log('Reverted ' + f + ' to plain image');
        } else {
            console.log('No match found in ' + f);
        }
    }
}
revertHtml();
