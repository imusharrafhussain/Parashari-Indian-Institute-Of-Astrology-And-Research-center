const fs = require('fs');
const path = require('path');

const directory = __dirname;

const replacements = {
    "ðŸ“ž": "📞",
    "âœ‰ï¸ ": "✉️",
    "âœ“": "✓",
    "â‚¹": "₹",
    "ðŸ§ ": "🧠",
    "ðŸŽ“": "🎓",
    "ðŸŒŽ": "🌎",
    "â€”": "—",  // Em Dash 
    "â€\"": "—", // Sometimes em dash is mangled differently
    "ðŸ“ ": "📍",
    "ðŸ’¼": "💼",
    "ðŸŒŸ": "🌟",
    "ðŸŽ¯": "🎯",
    "âœ¨": "✨",
    "ðŸš€": "🚀",
    "ðŸ’°": "💰",
    "ðŸŒ±": "🌱",
    "ðŸ§˜": "🧘",
    "â€™": "'",
    "â€œ": '"',
    "â€\u009d": '"',
    "â€¦": "…",
    "Â": " ",
    "â€‹": "",
    "ðŸ‘¨â€\u008dðŸ’»": "👨‍💻",
    "ðŸ“š": "📚",
    "â¤ï¸ ": "❤️",
    "ðŸ™\u008f": "🙏",
    "â˜€ï¸ ": "☀️",
    "ðŸ’Ž": "💎",
    "ðŸ”—": "🔗",
    "ðŸ‘\u008d": "👍",
    "ðŸš©": "🚩",
    "ðŸ’¡": "💡",
    "ðŸ”´": "🔴",
    "ðŸŸ¢": "🟢"
};

function fixEncoding(filePath) {
    if (!filePath.endsWith('.html')) return;
    
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    
    for (const [bad, good] of Object.entries(replacements)) {
        content = content.split(bad).join(good);
    }
    
    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log("Fixed " + path.basename(filePath));
    }
}

function processDirectory(dir) {
    const items = fs.readdirSync(dir);
    for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory() && item !== 'node_modules') {
            processDirectory(fullPath);
        } else if (stat.isFile()) {
            fixEncoding(fullPath);
        }
    }
}

console.log("Starting text replacement...");
processDirectory(directory);
console.log("Done.");
