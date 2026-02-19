// Clean up duplicate zodiac cards section
const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '../index.html');
let content = fs.readFileSync(indexPath, 'utf8');

// Find and delete from first duplicate card (line 577) to the section end (line 942)
const lines = content.split('\n');

// Keep lines 1-576 and 945+ 
const cleanLines = [
    ...lines.slice(0, 576),  // Everything before duplicate
    '',
    ...lines.slice(945)       // Everything after duplicate
];

content = cleanLines.join('\n');

fs.writeFileSync(indexPath, content, 'utf8');
console.log('✅ Successfully removed duplicate zodiac cards');
