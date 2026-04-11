const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const srcDir = 'D:/Parashari website new';
const destDir = 'D:/Parashari website new/AB_AI/assets/images-optimized';

const conversions = [
  { in: path.join(srcDir, 'harshit sir (gemstone  science).webp'), out: path.join(destDir, 'gemstone-science', 'harshit-sir.webp') },
  { in: path.join(srcDir, 'harshit sir (vedic astrology).webp'), out: path.join(destDir, 'vedic-astrology', 'harshit-sir.webp') },
  { in: path.join(srcDir, 'harshit sir(lal kitaab).webp'), out: path.join(destDir, 'lal-kitab', 'harshit-sir.webp') }
];

async function run() {
  for (const c of conversions) {
    try {
      if (!fs.existsSync(path.dirname(c.out))) {
          fs.mkdirSync(path.dirname(c.out), { recursive: true });
      }
      await sharp(c.in).webp({ quality: 80 }).toFile(c.out);
      console.log('Converted:', c.out);
    } catch(e) {
      console.error('Error with', c.in, e.message);
    }
  }
}
run();
