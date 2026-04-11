const sharp = require('sharp');
const path = require('path');

async function convert() {
  const srcBase = 'D:/Parashari website new/Nakshatra';
  const destBase = 'D:/Parashari website new/AB_AI/assets/images-optimized/nakshatra';
  const files = [
    { src: path.join(srcBase, '697b54f6-c0f5-4887-b9f0-5903ce6363f1.webp'), dest: path.join(destBase, 'header1.webp') },
    { src: path.join(srcBase, 'aff66279-6871-4d19-9493-21b6aed17255.webp'), dest: path.join(destBase, 'header2.webp') },
    { src: path.join(srcBase, 'middle elements/relationship confusion.webp'), dest: path.join(destBase, 'middle-elements/relationship-compatibility.webp') },
    { src: path.join(srcBase, 'middle elements/future prediction and quality.webp'), dest: path.join(destBase, 'middle-elements/career-and-success.webp') },
    { src: path.join(srcBase, 'middle elements/mental stress and anxiety.webp'), dest: path.join(destBase, 'middle-elements/health-and-wellbeing.webp') },
    { src: path.join(srcBase, 'middle elements/planetry influence analysis.webp'), dest: path.join(destBase, 'middle-elements/spiritual-growth.webp') },
    { src: path.join(srcBase, "what you'll learn/Detailed Birth Chart Analysis (Kundli Breakdown).webp"), dest: path.join(destBase, 'what-it-offers/know-your-birth-chart.webp') },
    { src: path.join(srcBase, "what you'll learn/career and financial growth guidance.webp"), dest: path.join(destBase, 'what-it-offers/understand-planetary-effects.webp') },
    { src: path.join(srcBase, "what you'll learn/love and relationship prediction.webp"), dest: path.join(destBase, 'what-it-offers/get-personalized-guidance.webp') },
    { src: path.join(srcBase, "what you'll learn/\u{1F9D8} Easy Remedies (Mantras, Rituals, Lifestyle changes).webp"), dest: path.join(destBase, 'what-it-offers/navigate-lifes-challenges.webp') }
  ];
  for (const f of files) {
    try {
      await sharp(f.src).webp({ quality: 80 }).toFile(f.dest);
      console.log('OK: ' + path.basename(f.dest));
    } catch(e) {
      console.log('FAIL: ' + path.basename(f.dest) + ' - ' + e.message);
    }
  }
}
convert();
