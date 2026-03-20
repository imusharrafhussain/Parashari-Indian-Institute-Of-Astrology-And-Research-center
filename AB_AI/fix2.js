const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');
content = content.replace(/<span class="header-top-icon">.*?<\/span><a\s+href="mailto:info@astrobharatai\.com">/s, '<span class="header-top-icon">✉️</span><a\\n            href="mailto:info@astrobharatai.com">');
fs.writeFileSync('index.html', content, 'utf8');
