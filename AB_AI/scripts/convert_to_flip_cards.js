// Script to convert zodiac cards to flip card structure

const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '../index.html');
let content = fs.readFileSync(indexPath, 'utf8');

// Find the zodiac section
const sectionStart = content.indexOf('<section class="hero-with-bg">');
const sectionEnd = content.indexOf('</section>', sectionStart) + 10;

const zodiacData = [
    { name: 'Aries', image: 'aries-card.png', desc: 'As the first sign of the zodiac, Aries trails the blaze. Energetic, ambitious, and competitive, they are the pioneers of the universe, always ready to take on new challenges with unwavering confidence.' },
    { name: 'Taurus', image: 'taurus-card.png', desc: 'Anchored by the earth, Taurus embodies stability and practicality. Driven by a desire for comfort and luxury, they are reliable, patient, and devoted, often serving as the graceful rock for those around them.' },
    { name: 'Gemini', image: 'gemini-card.png', desc: 'Governed by Mercury, Gemini is the celestial twin of versatility. Expressive, quick-witted, and sociable, they seamlessly blend duality with intellect, making them excellent communicators and adaptable thinkers.' },
    { name: 'Cancer', image: 'cancer-card.png', desc: 'Ruled by the moon, Cancer is deeply intuitive and sentimental. Protective and empathetic, they prioritize family and home, weaving a tapestry of emotional depth and unwavering loyalty for their loved ones.' },
    { name: 'Leo', image: 'leo-card.png', desc: 'Radiant like the sun, Leo is the regal ruler of the celestial jungle. Passionate, creative, and dramatic, they bring warmth and leadership, captivating audiences with their flair and generous spirit.' },
    { name: 'Virgo', image: 'virgo-card.jpg', desc: 'Meticulous and logical, Virgo is the perfectionist of the zodiac. With a keen eye for detail and a hardworking nature, they are practical problem-solvers dedicated to serving others with grace and efficiency.' },
    { name: 'Libra', image: 'libra-card.png', desc: 'Symbolized by the scales, Libra seeks balance and harmony. Diplomatic, gracious, and social, they are the peacemakers who value fairness and partnership, always striving for beauty and equilibrium in life.' },
    { name: 'Scorpio', image: 'scorpio-card.png', desc: 'Intense and mysterious, Scorpio is a water sign of profound depth. Resourceful, brave, and passionate, they navigate the complexities of life with emotional power and an unyielding will to transform.' },
    { name: 'Sagittarius', image: 'sagittarius-card.png', desc: 'The eternal traveler, Sagittarius is fueled by curiosity and optimism. Generous and idealistic, they seek wisdom and truth, always ready to explore new horizons with an adventurous spirit.' },
    { name: 'Capricorn', image: 'capricorn-card.png', desc: 'Disciplined and persistent, Capricorn is the master of self-control. Responsible and practical, they climb the mountain of success with patience and ambition, building a legacy of structure and reliability.' },
    { name: 'Aquarius', image: 'aquarius-card.png', desc: 'Visionary and independent, Aquarius beats to their own drum. Progressive and original, they are the humanitarians of the zodiac, driven by intellect and a desire to innovative for the greater good.' },
    { name: 'Pisces', image: 'pisces-card.png', desc: 'Dreamy and compassionate, Pisces navigates the world through intuition. Artistic, gentle, and wise, they are the empaths of the zodiac, seamlessly blending reality with the imaginative realm of emotions.' }
];

// Generate new HTML
let newSection = `  <section class="hero-with-bg zodiac-section">
    <div class="hero-3d-scene">
      <div class="hero-3d-scroll-track">
`;

//Add original 12 cards
zodiacData.forEach(zodiac => {
    newSection += `
        <div class="hero-card zodiac-card">
          <div class="zodiac-card-inner">
            <div class="zodiac-card-front">
              <img src="assets/images/${zodiac.image}" alt="${zodiac.name}">
              <h3>${zodiac.name}</h3>
            </div>
            <div class="zodiac-card-back">
              <h3>${zodiac.name}</h3>
              <p>${zodiac.desc}</p>
              <a href="astrology.html" class="btn-zodiac">Learn More</a>
            </div>
          </div>
        </div>
`;
});

// Add clones for infinite scroll
zodiacData.forEach(zodiac => {
    newSection += `<div class="hero-card zodiac-card">
          <div class="zodiac-card-inner">
            <div class="zodiac-card-front">
              <img src="assets/images/${zodiac.image}" alt="${zodiac.name}">
              <h3>${zodiac.name}</h3>
            </div>
            <div class="zodiac-card-back">
              <h3>${zodiac.name}</h3>
              <p>${zodiac.desc}</p>
              <a href="astrology.html" class="btn-zodiac">Learn More</a>
            </div>
          </div>
        </div>`;
});

newSection += `</div>
    </div>
  </section>
`;

// Replace the section
content = content.substring(0, sectionStart) + newSection + content.substring(sectionEnd);

fs.writeFileSync(indexPath, content, 'utf8');
console.log('✅ Successfully converted zodiac cards to flip card structure');
