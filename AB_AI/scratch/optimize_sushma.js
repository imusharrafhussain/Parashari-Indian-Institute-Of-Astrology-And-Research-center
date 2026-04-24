const sharp = require('sharp');
const path = require('path');

const inputPath = path.join(process.cwd(), 'assets', 'images-optimized', 'sushma mam (2).webp');
const outputPath = path.join(process.cwd(), 'assets', 'images-optimized', 'dr-sushma-bharti.webp');

sharp(inputPath)
  .resize(400, 400, { fit: 'cover' }) // Resizing to standard profile size
  .webp({ quality: 80 })
  .toFile(outputPath)
  .then(() => {
    console.log('Successfully optimized and saved to:', outputPath);
  })
  .catch(err => {
    console.error('Error optimizing image:', err);
    process.exit(1);
  });
