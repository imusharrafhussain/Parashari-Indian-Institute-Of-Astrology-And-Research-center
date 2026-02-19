const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, '../');

// Files to update
const htmlFiles = [
    path.join(directoryPath, 'index.html'),
    path.join(directoryPath, 'courses.html')
];

// New button HTML structure
const createNewButton = (href, text = 'Learn More') => {
    return `<a href="${href}" class="learn-more">
              <span class="circle" aria-hidden="true">
                <span class="icon arrow"></span>
              </span>
              <span class="button-text">${text}</span>
            </a>`;
};

// Process each HTML file
htmlFiles.forEach(filePath => {
    if (!fs.existsSync(filePath)) {
        console.log(`❌ File not found: ${filePath}`);
        return;
    }

    let content = fs.readFileSync(filePath, 'utf8');

    // Replace all Learn More buttons
    // Pattern 1: <a href="..." class="hero-card-btn">Learn more</a>
    content = content.replace(
        /<a\s+href="([^"]+)"\s+class="hero-card-btn">Learn more<\/a>/gi,
        (match, href) => createNewButton(href, 'Learn More')
    );

    // Pattern 2: <a href="..." class="btn btn-primary btn-full">Learn More</a>
    content = content.replace(
        /<a\s+href="([^"]+)"\s+class="btn btn-primary btn-full">Learn More<\/a>/gi,
        (match, href) => createNewButton(href, 'Learn More')
    );

    // Pattern 3: <a href="..." class="btn btn-primary">Learn More</a>
    content = content.replace(
        /<a\s+href="([^"]+)"\s+class="btn btn-primary">Learn More<\/a>/gi,
        (match, href) => createNewButton(href, 'Learn More')
    );

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Updated ${path.basename(filePath)}`);
});

console.log('\\n✨ All Learn More buttons updated successfully!');
