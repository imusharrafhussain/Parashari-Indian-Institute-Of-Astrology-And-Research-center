const fs = require('fs');
const c = fs.readFileSync('d:/Parashari website new/AB_AI/courses/vedic-astrology-diploma.html', 'utf8');

const regex = /class="[^"]*cvd-main-content[^"]*"/g;
let match;
while ((match = regex.exec(c)) !== null) {
  console.log(`Found at index ${match.index}:`);
  console.log(c.substring(Math.max(0, match.index - 50), match.index + 100));
}
