const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// 1. Copy the new image
const srcImg = "D:\\Parashari website new\\Nakshatra\\what you'll learn\\a-mystical-digital-illustration-depictin_PveQDaVORVCvEFl4ystb_g_uswo0IRNRT6j_RsV9OVTPA_sd.jpeg";
const destDir = "assets/images-optimized/nakshatra/what-it-offers";
const destImg = path.join(destDir, 'understand-planetary-effects.jpeg');
if (fs.existsSync(srcImg)) {
    fs.copyFileSync(srcImg, destImg);
    console.log('Copied new image.');
}

// 2. Process all images in what-it-offers with sharp
async function normalizeImages() {
    const files = fs.readdirSync(destDir).filter(f => f.match(/\.(png|jpe?g|webp)$/i) && !f.startsWith('temp_'));
    for (const f of files) {
        const filePath = path.join(destDir, f);
        const tempPath = path.join(destDir, 'temp_' + f);
        
        try {
            await sharp(filePath)
                .trim()
                .resize(600, 600, {
                    fit: 'contain',
                    background: { r: 255, g: 255, b: 255, alpha: 0 }
                })
                .toFile(tempPath);
                
            fs.renameSync(tempPath, filePath);
            console.log('Normalized ' + f);
        } catch(e) {
             console.log('Could not normalize ' + f + ' ' + e);
        }
    }
}

// 3. Update HTML files
function updateHtml() {
    const coursesDir = 'courses';
    const files = ['nakshatra-diploma.html', 'nakshatra-bachelors.html', 'nakshatra-masters.html', 'nakshatra-grand-master.html'];
    
    const oldHero = `<section style="width: 100%; border-bottom: 1px solid #e0d5c8;">
            <img src="../assets/images-optimized/nakshatra/header1.webp" alt="Grah Nakshatra" style="width: 100%; height: auto; display: block;">
        </section>`;
        
    const newHero = `<section style="position: relative; width: 100%; border-bottom: 1px solid #e0d5c8; overflow: hidden; display: flex; align-items: center;">
            <img src="../assets/images-optimized/nakshatra/header1.webp" alt="Grah Nakshatra" style="width: 100%; height: auto; display: block;">
            <div style="position: absolute; top: auto; left: 8%; z-index: 10; text-align: left;">
                <h1 style="font-family: 'Times New Roman', serif; font-size: clamp(2rem, 5vw, 4.5rem); color: #FFF2D1; font-weight: bold; margin: 0; text-shadow: 2px 2px 6px rgba(0,0,0,0.6), 0 0 20px rgba(0,0,0,0.4);">Grah Nakshatra</h1>
                <p style="font-family: Arial, sans-serif; font-size: clamp(0.9rem, 1.8vw, 1.6rem); color: #FFDF80; margin: 8px 0 0 2px; font-weight: 500; text-shadow: 1px 1px 4px rgba(0,0,0,0.7); letter-spacing: 0.5px;">Unlock Your Destiny Through Vedic Astrology</p>
            </div>
        </section>`;
        
    for (const f of files) {
        const p = path.join(coursesDir, f);
        if (!fs.existsSync(p)) continue;
        
        let html = fs.readFileSync(p, 'utf8');
        
        // Update hero section
        if (html.includes(oldHero)) {
             html = html.replace(oldHero, newHero);
        } else if (html.includes('header1.webp')) {
             html = html.replace(/<section style="\s*width:\s*100%;\s*border-bottom:\s*1px\s*solid\s*#e0d5c8;\s*">\s*<img src="\.\.\/assets\/images-optimized\/nakshatra\/header1\.webp"[^>]+>\s*<\/section>/, newHero);
        }
        
        // Update image path
        html = html.replace('understand-planetary-effects.webp', 'understand-planetary-effects.jpeg');
        
        fs.writeFileSync(p, html, 'utf8');
        console.log('Updated ' + f);
    }
}

async function run() {
    updateHtml();
    await normalizeImages();
}
run();
