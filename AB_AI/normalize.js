const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const dir = 'assets/images-optimized/palmistry/what-youll-learn/';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.png'));

async function processImages() {
    for (const f of files) {
        if (f.startsWith('temp_')) continue;
        const filePath = path.join(dir, f);
        const tempPath = path.join(dir, 'temp_' + f);
        
        await sharp(filePath)
            .trim()
            .resize(600, 600, {
                fit: 'contain',
                background: { r: 255, g: 255, b: 255, alpha: 0 }
            })
            .toFile(tempPath);
            
        fs.renameSync(tempPath, filePath);
        console.log('Normalized ' + f);
    }
}
processImages().catch(console.error);
