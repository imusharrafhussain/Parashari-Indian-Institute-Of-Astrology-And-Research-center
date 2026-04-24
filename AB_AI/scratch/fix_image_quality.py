import os
import glob
import re

files = glob.glob('d:/Parashari website new/AB_AI/crash-courses/*.html')
files.append('d:/Parashari website new/AB_AI/archive/plrt.html')

css_hero_replacement = '''
        /* Extra Hero Image Sizing Override */
        @media (min-width: 1600px) {
            .cc-palmistry-landing .hero-grid {
                grid-template-columns: 1fr 1.2fr !important; /* Gentle expansion on ultrawide monitors */
                align-items: center;
            }
            .cc-palmistry-landing .hero-img,
            .cc-palmistry-landing .hero-img-wrap,
            .cc-palmistry-landing .hero-img-inner {
                max-width: 100% !important; /* Free the width limitation on ultrawide */
                width: 100%;
            }
        }
        /* Keep native size and clarity for standard laptops (1366px - 1599px) */
'''

wyg_css_replacement = '''        /* Static Centered Image and Glass Value Card CSS */
        @media (min-width: 992px) {
            .cc-palmistry-landing .wyg-grid {
                grid-template-columns: 1fr 1fr !important; /* Restored to standard 50/50 split for normal laptops */
                gap: 5rem;
            }
        }
        @media (min-width: 1600px) {
            .cc-palmistry-landing .wyg-grid {
                grid-template-columns: 1.2fr 1fr !important; /* Expands ONLY when the screen size gets massive */
            }
        }
        .cc-palmistry-landing .wyg-img-wrap {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            position: relative;
            transform: none; /* REMOVED FAKE SCALING WHICH DEGRADES QUALITY! */
            margin-bottom: 2rem;
            padding: 1rem;
        }
        .cc-palmistry-landing .glass-value-card {
            position: relative;
            margin-top: 2rem;
            background: rgba(255, 255, 255, 0.85);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.5);
            border-radius: 1rem;
            padding: 1.25rem;
            box-sizing: border-box;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1), 0 0 15px rgba(204, 163, 56, 0.2);
            width: 100%;
            max-width: 380px; 
            z-index: 10;
        }'''

for filepath in files:
    if not os.path.exists(filepath): continue
    with open(filepath, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # 1. Replace Hero CSS Override
    content = re.sub(
        r'/\*\s*Extra Hero Image Sizing Override\s*\*/.*?@media \(min-width: 1600px\) \{.*?\}[\s]*\}', 
        css_hero_replacement, 
        content, 
        flags=re.DOTALL
    )
    
    # 2. Replace WYG CSS
    content = re.sub(
        r'/\*\s*Static Centered Image and Glass Value Card CSS\s*\*/.*?\.cc-palmistry-landing \.glass-value-card \{.*?\}',
        wyg_css_replacement,
        content,
        flags=re.DOTALL
    )
    
    with open(filepath, 'w', encoding='utf-8') as file:
        file.write(content)
    print(f"Updated: {os.path.basename(filepath)}")
