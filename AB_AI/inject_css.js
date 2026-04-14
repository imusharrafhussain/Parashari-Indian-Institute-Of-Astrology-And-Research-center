const fs = require('fs');

const files = [
    'courses/palmistry-grand-master.html',
    'courses/rudraksha-grand-master.html',
    'courses/vastu-grand-master.html'
];

const cssBlock = `
      .gm-premium-badge {
        background: linear-gradient(135deg, #d4af37 0%, #ffdf70 50%, #d4af37 100%);
        color: #5a1e1e;
        padding: 2px 8px;
        border-radius: 4px;
        font-size: 0.65em;
        font-weight: 800;
        margin-left: 8px;
        border: 1px solid #ffd700;
        box-shadow: 0 0 8px rgba(212, 175, 55, 0.6), inset 0 0 5px rgba(255, 255, 255, 0.5);
        text-transform: uppercase;
      }
`;

files.forEach(f => {
    let html = fs.readFileSync(f, 'utf8');
    
    // Check if it already exists
    if (!html.includes('.gm-premium-badge {')) {
        // Find the FIRST </style> tag and inject before it
        html = html.replace('</style>', cssBlock + '\n</style>');
        fs.writeFileSync(f, html, 'utf8');
        console.log(`Injected CSS into ${f}`);
    } else {
        console.log(`CSS already exists in ${f}`);
    }
});
