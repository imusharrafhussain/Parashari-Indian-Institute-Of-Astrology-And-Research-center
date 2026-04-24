import os
import glob
import re

files = glob.glob('d:/Parashari website new/AB_AI/crash-courses/*.html')
files.append('d:/Parashari website new/AB_AI/archive/plrt.html')

new_css_block = '''        /* Static Centered Image and Glass Value Card CSS */
        .cc-palmistry-landing .wyg-img-wrap {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            position: relative;
            transform: scale(1.05); /* slightly larger image as requested */
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
            max-width: 320px;
            z-index: 10;
        }
        .cc-palmistry-landing .gvc-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 0.5rem;
            font-size: 0.9rem;
            font-weight: 600;
        }
        .cc-palmistry-landing .gvc-strike {
            color: var(--muted);
            text-decoration: line-through;
        }
        .cc-palmistry-landing .gvc-offer {
            color: var(--primary);
            font-size: 1.05rem;
            font-weight: 800;
        }
        .cc-palmistry-landing .gvc-divider {
            height: 1px;
            background: rgba(0,0,0,0.1);
            margin: 0.75rem 0;
        }
        .cc-palmistry-landing .gvc-save {
            color: hsl(125, 60%, 25%);
            font-size: 0.95rem;
            font-weight: 800;
            margin-bottom: 0;
        }
'''

for filepath in files:
    if not os.path.exists(filepath): continue
    with open(filepath, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # We replace from /* Sticky image and Glass Value Card CSS */ up to just before /* Nuke horizontal sliders
    pattern = r'/\*\s*Sticky image and Glass Value Card CSS\s*\*/.*?((?=\/\*\s*Nuke horizontal sliders)|</style>)'
    
    if re.search(pattern, content, flags=re.DOTALL):
        new_content = re.sub(pattern, new_css_block, content, flags=re.DOTALL)
        with open(filepath, 'w', encoding='utf-8') as file:
            file.write(new_content)
        print(f"Updated: {os.path.basename(filepath)}")
    else:
        print(f"Skipped/already updated or pattern not found: {os.path.basename(filepath)}")
