const fs = require('fs');
const d = 'd:/Parashari website new/AB_AI/courses/';
fs.readdirSync(d).filter(f => f.endsWith('.html')).forEach(f => {
  const c = fs.readFileSync(d + f, 'utf8');
  if (c.includes('<!-- PROGRESSION LADDER -->')) {
    const idx = c.indexOf('<!-- PROGRESSION LADDER -->');
    const before = c.substring(idx - 15, idx);
    // Let's see if there's any file where the progression ladder didn't inject just before a div boundary or the word placeholder
    if (!before.includes('</div>') && !before.includes('placeholder')) {
       console.log(f, 'has weird injection context:', JSON.stringify(before));
    }
  }
});
