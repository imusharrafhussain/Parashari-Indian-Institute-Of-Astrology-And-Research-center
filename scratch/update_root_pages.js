const fs = require('fs');
const path = require('path');

const dir = 'd:/Parashari website new/AB_AI';
const palmistry = fs.readFileSync(path.join(dir, 'palmistry.html'), 'utf8');

// Extract the two sections from palmistry
const heroStart = palmistry.indexOf('<section class="premium-overview-section">');
const heroEnd = palmistry.indexOf('</section>', heroStart) + 10;
const tiersStart = palmistry.indexOf('<section class="learning-tiers-section">');
const tiersEnd = palmistry.indexOf('</section>', tiersStart) + 10;

const templateHero = palmistry.substring(heroStart, heroEnd);
const templateTiers = palmistry.substring(tiersStart, tiersEnd);

const configs = {
    'reiki.html': {
        title: 'Master the Art of Reiki Healing',
        titleIcon: '<i class="fa-solid fa-hands-holding-circle"></i>',
        subtitle: 'Channeling Universal Life Energy for Holistic Well-Being.',
        image: 'assets/images-optimized/healing.webp',
        hero1Title: 'Master Universal Channeling',
        hero1Desc: 'Tap into the infinite life force to heal physical and emotional blockages naturally.',
        hero2Title: 'Attune Your Subconscious',
        hero2Desc: 'Harness sacred symbols for power, harmony, and advanced distance healing treatments.',
        hero3Title: 'Ascend to Clinical Mastery',
        hero3Desc: 'Develop the capability to conduct professional sessions and highly guarded remedies.',
        slug: 'reiki',
        t1: ['Master the 24 hand positions for self-healing', 'Learn powerful Level 1 & 2 attunements', 'Safely step into energetic wellness'],
        t2: ['Transition to Distance & Time healing', 'Access the Dai Ko Myo mastery symbol', 'Identify and clear deep energetic imbalances'],
        t3: ['Perform highly guarded psychic surgery', 'Adapt healing for animals and nature', 'Master clinical practice & ethics'],
        t4: ['Unrivaled mastery of crystal-infused Reiki', 'Command premium authority as a Grand Master', 'Highest spiritual frequencies unlocked']
    },
    'gemstone.html': {
        title: 'Master Gemstone Science (Ratna Vigyan)',
        titleIcon: '<i class="fa-regular fa-gem"></i>',
        subtitle: 'Harness the Astrological Power of Natural Gemstones.',
        image: 'assets/images-optimized/gemstone.webp',
        hero1Title: 'Authenticate Natural Gemstones',
        hero1Desc: 'Distinguish natural gems from synthetics with absolute confidence and precision.',
        hero2Title: 'Prescribe with Precision',
        hero2Desc: 'Analyze birth charts and planetary afflictions to prescribe the exact gemstone remedy needed.',
        hero3Title: 'Unlock Potent Remedial Power',
        hero3Desc: 'Discover the optimal weight, metal, and time for wearing, ensuring maximum planetary activation.',
        slug: 'gemstone-science',
        t1: ['Master basic mineralogy & identification', 'Distinguish authentic gems from fakes', 'Gain absolute clarity on planetary associations'],
        t2: ['Analyze horoscopes to prescribe exact remedies', 'Determine correct weights and metals', 'Transition from theory to remedial application'],
        t3: ['Master complex gemstone synergies', 'Prescribe with unshakeable confidence', 'In-depth substitution analysis'],
        t4: ['Unrivaled mastery of rare and semi-precious gems', 'Command premium authority in remedial consultations', 'Elite spiritual market positioning']
    },
    'nakshatra.html': {
        title: 'Master Nakshatra Astrology',
        titleIcon: '<i class="fa-solid fa-star-half-stroke"></i>',
        subtitle: 'Unlock the Mysteries of the 27 Lunar Mansions.',
        image: 'assets/images-optimized/nakshatra_diploma_1775113764359.webp',
        hero1Title: 'Command the Lunar Mansions',
        hero1Desc: 'Move beyond basic zodiac signs and identify the true psychological patterns mapped by 27 Nakshatras.',
        hero2Title: 'Pinpoint Predictive Timing',
        hero2Desc: 'Utilize advanced Navatara and Chakra systems to determine exact timing of life-altering events.',
        hero3Title: 'Prescribe Star-Specific Remedies',
        hero3Desc: 'Prescribe exact Nakshatra-based mantras and remedies to alleviate specific karmic blockages.',
        slug: 'nakshatra',
        t1: ['Master mythology, symbols & deities of 27 stars', 'Explore the 108 Padas and Navamsha correlation', 'Gain absolute clarity on planetary strength'],
        t2: ['Transition to Nadi Nakshatras and Navatara', 'Calculate highly precise Muhurta timings', 'Evaluate intense relationship compatibility'],
        t3: ['Unlock the secrets of Abhijit and Gandanta points', 'Master Advanced Chakras like Sarvatobhadra', 'Prescribe potent star-specific remedies safely'],
        t4: ['Unrivaled mastery of secretive Vedic formulas', 'Synthesize Nakshatra with KP and traditional Vedic', 'Command premium authority in consultations']
    }
};

for (const [filename, conf] of Object.entries(configs)) {
    let fileHtml = fs.readFileSync(path.join(dir, filename), 'utf8');
    
    // Find where the old sections are.
    // In these files:
    // Section 1: <section style="padding-top: 60px;"> ... </section>
    // Section 2: <section class="light-bg"> ... </section> (the one BEFORE the comparison-section)
    
    const oldHeroStart = fileHtml.indexOf('<section style="padding-top: 60px;">');
    const oldHeroEnd = fileHtml.indexOf('</section>', oldHeroStart) + 10;
    
    // Find the light-bg that contains 'category-filter-container'
    let oldTiersStart = fileHtml.indexOf('<section class="light-bg"', oldHeroEnd);
    if (!fileHtml.substring(oldTiersStart, oldTiersStart + 1000).includes('category-filter-container')) {
        // Fallback
    }
    const oldTiersEnd = fileHtml.indexOf('</section>', oldTiersStart) + 10;

    // Generate new texts
    let newHero = templateHero
        .replace('Master the Science of Palmistry', conf.titleIcon + ' ' + conf.title)
        .replace('Decode patterns that shape real lives.', conf.subtitle)
        .replace('assets/images-optimized/Picture13.webp', conf.image) // Assuming palmistry image
        .replace('Move from Curiosity to Confidence', conf.hero1Title)
        .replace('Translate abstract cosmic symbols into precise, actionable life readings for yourself and others.', conf.hero1Desc)
        .replace('Understand Systems, Not Just Symbols', conf.hero2Title)
        .replace('Master the underlying mathematical and spiritual framework that makes this discipline devastatingly accurate.', conf.hero2Desc)
        .replace('Real-World Remedial Power', conf.hero3Title)
        .replace('Learn highly guarded remedies to actively mitigate difficult periods and enhance auspicious ones.', conf.hero3Desc);
        
    // Also remove the fa-star-half-stroke if it already included the title
    if (newHero.includes('<h2 class="card-section-title"')) {
        // Adjust the header style a bit if needed
        newHero = newHero.replace('<h2 class="card-section-title" style="margin-bottom: 15px; font-size: 2.8rem; line-height: 1.2;">', 
                                  '<h2 class="card-section-title" style="margin-bottom: 15px; font-size: 2.5rem; line-height: 1.2;">');
    }

    let newTiers = templateTiers
        .replace('href="courses/-.html"', `href="courses/${conf.slug}-diploma.html"`)
        .replace('href="courses/-.html"', `href="courses/${conf.slug}-bachelors.html"`)
        .replace('href="courses/-.html"', `href="courses/${conf.slug}-masters.html"`)
        .replace('href="courses/-.html"', `href="courses/${conf.slug}-grand-master.html"`)
        
    // Replace Diploma tier facts
    let ulStart1 = newTiers.indexOf('<ul class="tier-benefits">');
    let ulEnd1 = newTiers.indexOf('</ul>', ulStart1);
    let newUl1 = '<ul class="tier-benefits">\n' + conf.t1.map(t => `              <li><i class="fas fa-check"></i> ${t}</li>`).join('\n') + '\n            ';
    newTiers = newTiers.substring(0, ulStart1) + newUl1 + newTiers.substring(ulEnd1);
    
    // Replace Bachelors tier facts
    let ulStart2 = newTiers.indexOf('<ul class="tier-benefits">', ulStart1 + 10);
    let ulEnd2 = newTiers.indexOf('</ul>', ulStart2);
    let newUl2 = '<ul class="tier-benefits">\n' + conf.t2.map(t => `              <li><i class="fas fa-check"></i> ${t}</li>`).join('\n') + '\n            ';
    newTiers = newTiers.substring(0, ulStart2) + newUl2 + newTiers.substring(ulEnd2);

    // Replace Masters tier facts
    let ulStart3 = newTiers.indexOf('<ul class="tier-benefits">', ulStart2 + 10);
    let ulEnd3 = newTiers.indexOf('</ul>', ulStart3);
    let newUl3 = '<ul class="tier-benefits">\n' + conf.t3.map(t => `              <li><i class="fas fa-check"></i> ${t}</li>`).join('\n') + '\n            ';
    newTiers = newTiers.substring(0, ulStart3) + newUl3 + newTiers.substring(ulEnd3);

    // Replace Grand Master tier facts
    let ulStart4 = newTiers.indexOf('<ul class="tier-benefits">', ulStart3 + 10);
    let ulEnd4 = newTiers.indexOf('</ul>', ulStart4);
    let newUl4 = '<ul class="tier-benefits">\n' + conf.t4.map(t => `              <li><i class="fas fa-check"></i> ${t}</li>`).join('\n') + '\n            ';
    newTiers = newTiers.substring(0, ulStart4) + newUl4 + newTiers.substring(ulEnd4);
    
    let combinedHTML = fileHtml.substring(0, oldHeroStart) + newHero + '\n\n' + newTiers + '\n\n' + fileHtml.substring(oldTiersEnd);
    
    fs.writeFileSync(path.join(dir, filename), combinedHTML, 'utf8');
    console.log('Updated', filename);
}
