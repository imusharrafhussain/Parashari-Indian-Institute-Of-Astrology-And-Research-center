const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const dir = path.join(__dirname, '..', 'assets', 'images-optimized');
const htmlFile = path.join(__dirname, '..', 'courses.html');

async function processImages() {
  try {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      if (file.match(/\.(png|jpeg|jpg)$/i)) {
        const filePath = path.join(dir, file);
        const webpPath = path.join(dir, file.replace(/\.(png|jpeg|jpg)$/i, '.webp'));
        
        console.log(`Converting ${file} to webp...`);
        await sharp(filePath).webp().toFile(webpPath);
        fs.unlinkSync(filePath);
        console.log(`Converted and deleted ${file}`);
      }
    }
    
    console.log("Replacing .webp/.webp in courses.html to .webp");
    let htmlContent = fs.readFileSync(htmlFile, 'utf8');
    htmlContent = htmlContent.replace(/\.webp"/g, '.webp"').replace(/\.webp"/g, '.webp"').replace(/\.webp"/g, '.webp"');
    fs.writeFileSync(htmlFile, htmlContent, 'utf8');
    
    console.log("Conversion complete and HTML updated!");
  } catch (error) {
    console.error("Error:", error);
  }
}

processImages();
