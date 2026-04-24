import os
import glob

directory = 'd:/Parashari website new/AB_AI/crash-courses/'
pattern = os.path.join(directory, '*.html')
files = glob.glob(pattern)

pill_css_original = '''        .cc-palmistry-landing .pill {
            display: flex;
            align-items: flex-start;
            gap: 0.75rem;
            border-radius: var(--radius);
            border: 1px solid rgba(250, 245, 235, 0.1);
            background: rgba(250, 245, 235, 0.05);
            padding: 0.75rem;
            backdrop-filter: blur(4px);
        }

        .cc-palmistry-landing .pill-icon {
            font-size: 1.5rem;
        }

        .cc-palmistry-landing .pill-title {
            font-size: 0.875rem;
            font-weight: 600;
            color: var(--gold-light);
        }

        .cc-palmistry-landing .pill-desc {
            font-size: 0.875rem;
            color: rgba(250, 245, 235, 0.6);
        }'''

pill_css_new = '''        .cc-palmistry-landing .pill {
            display: flex;
            align-items: center;
            gap: 1rem;
            border-radius: var(--radius);
            border: 1px solid rgba(250, 245, 235, 0.15);
            background: rgba(250, 245, 235, 0.05);
            padding: 1rem 1.25rem;
            backdrop-filter: blur(4px);
        }

        .cc-palmistry-landing .pill-icon {
            font-size: 1.75rem;
            line-height: 1;
            display: flex;
            align-items: center;
        }

        .cc-palmistry-landing .pill-title {
            font-size: 1rem;
            font-weight: 700;
            color: var(--gold-light);
            margin: 0 0 0.3rem 0;
            line-height: 1.2;
        }

        .cc-palmistry-landing .pill-desc {
            font-size: 0.85rem;
            color: rgba(250, 245, 235, 0.7);
            margin: 0;
            line-height: 1.4;
        }'''

for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as file:
        content = file.read()
    
    if pill_css_original in content:
        new_content = content.replace(pill_css_original, pill_css_new)
        with open(filepath, 'w', encoding='utf-8') as file:
            file.write(new_content)
        print(f"Updated: {os.path.basename(filepath)}")
    else:
        # Check if it was already replaced or if there are slight space differences
        if "align-items: center;" in content and "padding: 1rem 1.25rem" in content:
            print(f"Already updated: {os.path.basename(filepath)}")
        else:
            print(f"Could not find CSS pattern in: {os.path.basename(filepath)}")
