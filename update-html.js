const fs = require('fs').promises;
const path = require('path');

const DIR = path.join(__dirname, 'AB_AI');

async function getFiles(dir) {
    let files = [];
    try {
        const items = await fs.readdir(dir, { withFileTypes: true });
        for (const item of items) {
            if (item.name === 'node_modules') continue;
            const fullPath = path.join(dir, item.name);
            if (item.isDirectory()) {
                files = files.concat(await getFiles(fullPath));
            } else if (item.isFile() && fullPath.endsWith('.html')) {
                files.push(fullPath);
            }
        }
    } catch(err) {
        console.error(err);
    }
    return files;
}

async function main() {
    console.log(`Scanning HTML files in ${DIR}...`);
    const files = await getFiles(DIR);
    console.log(`Found ${files.length} HTML files.`);
    
    let changedFiles = 0;
    for (const file of files) {
        let content = await fs.readFile(file, 'utf8');
        const regex = /assets\/images\/([^"'>\s]+)\.(jpg|jpeg|png)/gi;
        
        // Count matches before replacing
        const matches = content.match(regex);
        
        if (matches && matches.length > 0) {
            const newContent = content.replace(regex, 'assets/images-optimized/$1.webp');
            await fs.writeFile(file, newContent, 'utf8');
            changedFiles++;
            console.log(`[UPDATED] ${path.relative(DIR, file)} (${matches.length} tags replaced)`);
        }
    }
    console.log(`\nSuccess! Updated image tags in ${changedFiles} HTML files.`);
}

main().catch(console.error);
