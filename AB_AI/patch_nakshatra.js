const fs = require('fs');
const path = require('path');

function updateHtml() {
    const coursesDir = 'courses';
    const files = ['nakshatra-diploma.html', 'nakshatra-bachelors.html', 'nakshatra-masters.html', 'nakshatra-grand-master.html'];
    
    for (const f of files) {
        const p = path.join(coursesDir, f);
        if (!fs.existsSync(p)) continue;
        
        let html = fs.readFileSync(p, 'utf8');
        
        // 1. Regex to replace the hero section block entirely
        const heroRegex = /<section style="position: relative; width: 100%; border-bottom: 1px solid #e0d5c8; overflow: hidden; display: flex; align-items: center;">[\s\S]*?<\/section>/;
        
        const newHero = `<section style="position: relative; overflow: hidden; padding: 120px 20px; text-align: center; border-bottom: 2px solid #D4AF37; background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url('../assets/images-optimized/nakshatra/header1.webp') center/cover no-repeat fixed;">
            <div style="position: relative; z-index: 10; text-align: center; max-width: 900px; margin: 0 auto;">
                <h1 style="font-family: 'Cinzel', 'Times New Roman', serif; font-size: clamp(2.5rem, 5vw, 4.5rem); color: #FFF; font-weight: 800; margin: 0; text-shadow: 0 4px 15px rgba(0,0,0,0.9);">Grah <span style="color: #D4AF37;">Nakshatra</span></h1>
                <p style="font-family: Arial, sans-serif; font-size: clamp(1rem, 2vw, 1.4rem); color: #e5e7eb; margin: 15px auto 0 auto; max-width: 700px; font-weight: 500; text-shadow: 0 2px 10px rgba(0,0,0,0.9); line-height: 1.6;">Unlock Your Destiny Through Vedic Astrology</p>
            </div>
        </section>`;
        
        if (html.match(heroRegex)) {
            html = html.replace(heroRegex, newHero);
        } else {
            console.log("Could not find hero match in " + f);
        }
        
        // 2. Fix the circle crop for the image globally in the file CSS
        const cssRegex1 = /\.cvd-learn-item-img-wrapper img\s*\{([^}]*)border-radius:\s*0;([^}]*)\}/g;
        if(html.match(cssRegex1)) {
           html = html.replace(cssRegex1, `.cvd-learn-item-img-wrapper img {$1border-radius: 50%;$2}`);
        } else {
           // Fallback in case border-radius: 0 wasn't exactly there
           html = html.replace(/\.cvd-learn-item-img-wrapper img\s*\{/, `.cvd-learn-item-img-wrapper img { border-radius: 50%; `);
        }
        
        fs.writeFileSync(p, html, 'utf8');
        console.log('Updated ' + f);
    }
}
updateHtml();
