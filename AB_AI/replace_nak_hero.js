const fs = require('fs');
const path = require('path');

function updateHtml() {
    const coursesDir = 'courses';
    const files = ['nakshatra-diploma.html', 'nakshatra-bachelors.html', 'nakshatra-masters.html', 'nakshatra-grand-master.html'];
    
    for (const f of files) {
        const p = path.join(coursesDir, f);
        if (!fs.existsSync(p)) continue;
        
        let html = fs.readFileSync(p, 'utf8');
        
        // Match the recently added hero block exactly or broadly
        const heroRegex = /<section style="position: relative; overflow: hidden; padding: 120px 20px; text-align: center; border-bottom: 2px solid #D4AF37; background: linear-gradient[^>]+>[\s\S]*?<\/section>/;
        
        const newHero = `<section style="position: relative; width: 100%; border-bottom: 2px solid #D4AF37; overflow: hidden; display: flex; align-items: center; justify-content: center; text-align: center;">
            <img src="../assets/images-optimized/nakshatra/header1.webp" alt="Grah Nakshatra" style="width: 100%; height: auto; display: block;">
            
            <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)); z-index: 1;"></div>
            
            <div style="position: absolute; z-index: 10; text-align: center; width: 90%; max-width: 900px;">
                <h1 style="font-family: 'Cinzel', 'Times New Roman', serif; font-size: clamp(1.4rem, 4.5vw, 4.5rem); color: #FFF; font-weight: 800; margin: 0; text-shadow: 0 4px 15px rgba(0,0,0,0.9);">Grah <span style="color: #D4AF37;">Nakshatra</span></h1>
                <p style="font-family: Arial, sans-serif; font-size: clamp(0.7rem, 2vw, 1.4rem); color: #e5e7eb; margin: 2% auto 0 auto; max-width: 700px; font-weight: 500; text-shadow: 0 2px 10px rgba(0,0,0,0.9); line-height: 1.4;">Unlock Your Destiny Through Vedic Astrology</p>
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
