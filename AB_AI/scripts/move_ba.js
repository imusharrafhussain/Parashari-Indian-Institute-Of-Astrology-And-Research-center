const fs = require('fs');
const path = require('path');

const dir = 'd:/Parashari website new/AB_AI/courses';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

let count = 0;
for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Find the exact Before/After section using standard JS regex strings (no escaping issues here)
  const baRegex = /<section class="cvd-section cvd-section-bg">\s*<div class="cvd-ba-container">[\s\S]*?<\/section>/;
  const match = content.match(baRegex);
  
  if (match) {
    const baBlock = match[0];
    
    // Check if it's already moved (i.e. if it appears AFTER cvd-layout-container)
    const layoutEndIndex = content.indexOf('</div> <!-- end cvd-layout-container -->');
    const baIndex = content.indexOf('<div class="cvd-ba-container">');
    
    if (layoutEndIndex !== -1 && baIndex < layoutEndIndex) {
      // Remove it from its current position inside cvd-main-content
      content = content.replace(baRegex, '');
      
      // Insert it after cvd-layout-container
      const newLayoutEndIndex = content.indexOf('</div> <!-- end cvd-layout-container -->');
      const insertPosition = newLayoutEndIndex + '</div> <!-- end cvd-layout-container -->'.length;
      
      content = content.slice(0, insertPosition) + '\n\n    <!-- BEFORE/AFTER SECTION MOVED -->\n    ' + baBlock + content.slice(insertPosition);
      
      fs.writeFileSync(filePath, content);
      count++;
      console.log('Fixed:', file);
    }
  }
}
console.log('Total files updated:', count);
