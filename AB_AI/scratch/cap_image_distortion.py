import os
import glob
import re

files = glob.glob('d:/Parashari website new/AB_AI/crash-courses/*.html')
files.append('d:/Parashari website new/AB_AI/archive/plrt.html')

css_hero_replacement = '''
        /* Extra Hero Image Sizing Override */
        @media (min-width: 1600px) {
            .cc-palmistry-landing .hero-grid {
                grid-template-columns: 1fr 1.1fr !important; 
                align-items: center;
            }
            .cc-palmistry-landing .hero-img {
                max-width: 36rem !important; /* Cap explicitly to prevent pixel distortion on zoomed out screens */
                width: 100%;
            }
            .cc-palmistry-landing .wyg-img {
                max-width: 32rem !important; /* Cap pricing image natively */
                width: 100%;
            }
        }
'''

for filepath in files:
    if not os.path.exists(filepath): continue
    with open(filepath, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Replace Hero CSS Override
    content = re.sub(
        r'/\*\s*Extra Hero Image Sizing Override\s*\*/.*?@media \(min-width: 1600px\) \{.*?\}[\s]*\}', 
        css_hero_replacement.strip(), 
        content, 
        flags=re.DOTALL
    )
    
    with open(filepath, 'w', encoding='utf-8') as file:
        file.write(content)
    print(f"Updated bounds: {os.path.basename(filepath)}")
