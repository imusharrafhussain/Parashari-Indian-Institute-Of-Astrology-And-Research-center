import os
import glob
import re

files = glob.glob('d:/Parashari website new/AB_AI/crash-courses/*.html')
files.append('d:/Parashari website new/AB_AI/archive/plrt.html')

badges_old = r'<div class="badges animate-fade-in">\s*<span class="badge">🛡️ Govt\. Approved</span>\s*</div>'
badges_new = '''<div class="badges animate-fade-in" style="display: flex; flex-wrap: wrap; gap: 1rem;">
                    <span class="badge">🛡️ Govt. Approved</span>
                    <span class="badge">👶 Beginner Friendly</span>
                    <span class="badge">🔥 Most Demanding</span>
                </div>'''

css_override = '''
        /* Extra Hero Image Sizing Override */
        @media (min-width: 1200px) {
            .cc-palmistry-landing .hero-grid {
                grid-template-columns: 1fr 1.15fr !important; /* Force image column to be significantly larger on desktop */
                align-items: center;
            }
            .cc-palmistry-landing .hero-img,
            .cc-palmistry-landing .hero-img-wrap,
            .cc-palmistry-landing .hero-img-inner {
                max-width: 100% !important; /* Remove max-width bounds so it can natively stretch to grid width */
                width: 100%;
            }
            .cc-palmistry-landing .hero-img {
                transform: scale(1.1); /* Slight zoom for hero image */
                margin-top: 1rem;
            }
        }
        @media (min-width: 1600px) {
            .cc-palmistry-landing .hero-grid {
                grid-template-columns: 1fr 1.35fr !important; /* Massive image column on ultrawide */
            }
            .cc-palmistry-landing .hero-img {
                transform: scale(1.15); /* More zoom on ultrawide */
            }
        }
'''

for filepath in files:
    if not os.path.exists(filepath): continue
    with open(filepath, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Replace Badges
    content = re.sub(badges_old, badges_new, content)
    
    # Inject CSS Override right before </style> or right after /* Nuke horizontal sliders
    if "/* Extra Hero Image Sizing Override */" not in content:
        content = re.sub(r'</style>', css_override + '\n    </style>', content)
        
    with open(filepath, 'w', encoding='utf-8') as file:
        file.write(content)
    print(f"Updated: {os.path.basename(filepath)}")
