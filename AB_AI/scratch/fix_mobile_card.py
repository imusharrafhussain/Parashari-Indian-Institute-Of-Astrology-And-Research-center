import os
import glob
import re

files = glob.glob('d:/Parashari website new/AB_AI/crash-courses/*.html')
files.append('d:/Parashari website new/AB_AI/archive/plrt.html')

search_str = '''        @media (max-width: 991px) {
            .cc-palmistry-landing .wyg-img-wrap {
                position: relative;
                top: 0;
                margin-bottom: 2.5rem;
            }
            .cc-palmistry-landing .glass-value-card {
                right: 50%;
                transform: translateX(50%);
                bottom: -25px;
            }
        }'''

replace_str = '''        @media (max-width: 991px) {
            .cc-palmistry-landing .wyg-img-wrap {
                position: relative;
                top: 0;
                margin-bottom: 4rem;
                display: flex;
                justify-content: center;
            }
            .cc-palmistry-landing .glass-value-card {
                right: auto;
                left: 50%;
                transform: translateX(-50%);
                bottom: -35px;
                width: 90%;
                max-width: 260px;
            }
        }'''

for filepath in files:
    if not os.path.exists(filepath): continue
    with open(filepath, 'r', encoding='utf-8') as file:
        content = file.read()
        
    if search_str in content:
        new_content = content.replace(search_str, replace_str)
        with open(filepath, 'w', encoding='utf-8') as file:
            file.write(new_content)
        print(f"Updated: {os.path.basename(filepath)}")
    else:
        print(f"Skipped/already updated: {os.path.basename(filepath)}")
