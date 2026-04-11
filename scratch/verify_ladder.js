const fs = require('fs');
const c = fs.readFileSync('d:/Parashari website new/AB_AI/courses/nakshatra-masters.html', 'utf8');
const idx = c.indexOf('Your Learning Journey');
const block = c.substring(idx, idx + 1500);
const hrefs = block.match(/href="[^"]+"/g);
console.log('Nakshatra Masters ladder links:');
hrefs.forEach(h => console.log(' ', h));

console.log('\n---');
const c2 = fs.readFileSync('d:/Parashari website new/AB_AI/nakshatra.html', 'utf8');
const idx2 = c2.indexOf('Your Learning Journey');
const block2 = c2.substring(idx2, idx2 + 1500);
const hrefs2 = block2.match(/href="[^"]+"/g);
console.log('Root nakshatra.html ladder links:');
hrefs2.forEach(h => console.log(' ', h));

// Also verify the "current" state
console.log('\n---');
console.log('Masters page - current node:', block.includes('current') ? 'YES (Masters highlighted)' : 'NO');
console.log('Root page - no current:', !block2.includes('current') ? 'YES (no level highlighted)' : 'All neutral');
