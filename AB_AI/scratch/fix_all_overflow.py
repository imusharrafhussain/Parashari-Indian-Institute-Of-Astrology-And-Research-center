import os
import glob

files = glob.glob('d:/Parashari website new/AB_AI/crash-courses/*.html')
files.append('d:/Parashari website new/AB_AI/archive/plrt.html')

css_to_add = '''
        /* Nuke horizontal sliders specifically on mobile viewports without destroying desktop sticky interactions */
        @media (max-width: 991px) {
            html, body {
                overflow-x: hidden !important;
                max-width: 100vw;
            }
            .cc-palmistry-landing {
                overflow-x: hidden !important;
                width: 100%;
            }
        }
'''

for filepath in files:
    if not os.path.exists(filepath): continue
    with open(filepath, 'r', encoding='utf-8') as file:
        content = file.read()
    
    if css_to_add not in content and '</style>' in content:
        new_content = content.replace("</style>", css_to_add + "\n    </style>")
        with open(filepath, 'w', encoding='utf-8') as file:
            file.write(new_content)
        print(f"Updated: {os.path.basename(filepath)}")
    else:
        print(f"Skipped/already updated: {os.path.basename(filepath)}")
