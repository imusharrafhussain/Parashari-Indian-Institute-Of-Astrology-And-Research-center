const fs = require('fs');
const path = require('path');

const filesToFix = [
    'bnn-astrology-grand-master.html',
    'complete-astrology-grand-master.html',
    'medical-astrology-grand-master.html',
    'nadi-jyotish-grand-master.html',
    'remedy-course-grand-master.html'
];

for (const f of filesToFix) {
    const p = path.join('courses', f);
    if (!fs.existsSync(p)) continue;
    
    let html = fs.readFileSync(p, 'utf8');
    let changed = false;

    // FIX 1: Remove the stray </div> that was the old closing of ld-main
    // It appears as: </div>\n  </div> <!-- end cvd-main-content -->
    // The </div> on its own line before the cvd-main-content close is the old ld-main close
    // We need to remove it. Pattern: </div>\n     \n\n  </div> <!-- end cvd-main-content -->
    // Actually looking at the file, line 660 has </div> which closes ld-main, then line 662 has </div> <!-- end cvd-main-content -->
    // We should remove the extra </div> on line 660
    
    if (html.includes('</div>\r\n    \r\n\n  </div> <!-- end cvd-main-content -->')) {
        html = html.replace('</div>\r\n    \r\n\n  </div> <!-- end cvd-main-content -->', '\n  </div> <!-- end cvd-main-content -->');
        changed = true;
        console.log(`  Fixed stray </div> in ${f}`);
    } else if (html.includes('</div>\n    \n\n  </div> <!-- end cvd-main-content -->')) {
        html = html.replace('</div>\n    \n\n  </div> <!-- end cvd-main-content -->', '\n  </div> <!-- end cvd-main-content -->');
        changed = true;
        console.log(`  Fixed stray </div> (unix) in ${f}`);
    }

    // FIX 2: Add "Advanced" badge to ALL cvd-module-title divs that don't already have the badge
    html = html.replace(/<div class="cvd-module-title">([^<]*(?:<(?!span class="gm-premium-badge")[^>]*>[^<]*)*)<\/div>/g, (match, inner) => {
        if (match.includes('gm-premium-badge')) return match;
        return `<div class="cvd-module-title">${inner} <span class="gm-premium-badge">Advanced</span></div>`;
    });

    // FIX 3: Add "Advanced" badge to ALL cvd-module-weeks divs that don't already have the badge
    html = html.replace(/<div class="cvd-module-weeks">([^<]*(?:<(?!span class="gm-premium-badge")[^>]*>[^<]*)*)<\/div>/g, (match, inner) => {
        if (match.includes('gm-premium-badge')) return match;
        return `<div class="cvd-module-weeks">${inner} <span class="gm-premium-badge">Advanced</span></div>`;
    });

    // FIX 4: Add sticky sidebar and module card list styling CSS if missing
    if (!html.includes('position: sticky')) {
        const stickyCSS = `
      @media (min-width: 992px) {
        .cvd-main-content, .cvd-sidebar {
          height: calc(100vh - 120px);
          overflow-y: scroll;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .cvd-main-content::-webkit-scrollbar, .cvd-sidebar::-webkit-scrollbar {
          display: none;
        }
        .cvd-sidebar {
          position: sticky;
          top: 100px;
          border-radius: 8px;
          padding: 15px;
        }
      }
`;
        // Insert before the first </style>
        html = html.replace('</style>', stickyCSS + '</style>');
        changed = true;
        console.log(`  Added sticky sidebar CSS in ${f}`);
    }

    // FIX 5: Add cvd-module-card ul/li styling if missing
    if (!html.includes('.cvd-module-card li::before')) {
        const listCSS = `
      .cvd-module-card ul {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      .cvd-module-card li {
        font-size: 0.95rem;
        color: #555;
        margin-bottom: 10px;
        position: relative;
        padding-left: 15px;
        line-height: 1.5;
      }
      .cvd-module-card li::before {
        content: '▸';
        color: #C48E44;
        position: absolute;
        left: 0;
        top: 0;
        font-size: 1rem;
      }
`;
        html = html.replace('</style>', listCSS + '</style>');
        changed = true;
        console.log(`  Added module card list styles in ${f}`);
    }

    fs.writeFileSync(p, html, 'utf8');
    console.log(`Completed fixes for ${f}`);
}
