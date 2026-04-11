import glob
import re

html_files = glob.glob('courses/*.html')
count = 0

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    orig = content
    
    # 1. Squeeze Fix: Find max-width: 70px in .cvd-learn-item img { ... }
    content = re.sub(
        r'\.cvd-learn-item img\s*\{\s*max-width:\s*70px;\s*\}',
        '.cvd-learn-item img { max-width: 90px; height: 90px; object-fit: cover; }',
        content
    )

    # 2. Before/After Fix
    # In case there's slight variations
    mobile_mq_start = content.find('@media (max-width: 768px)')
    if mobile_mq_start != -1:
        part1 = content[:mobile_mq_start]
        part2 = content[mobile_mq_start:]
        
        ba_start = part2.find('.cvd-ba-container {')
        learn_start = part2.find('.cvd-learn-grid', ba_start)
        
        if ba_start != -1 and learn_start != -1:
            # check if NOT already fixed
            if 'display: none;' in part2[ba_start:ba_start+100]:
                pass # Already fixed
            else:
                std_ba_mobile = '''        .cvd-ba-container { padding: 0 5px; }
        .cvd-ba-header { display: none; }
        .cvd-ba-box { flex-direction: column; }
        .cvd-ba-left { width: 100%; border-radius: 4px 4px 0 0; padding: 15px 20px; }
        .cvd-ba-left::after { display: none; }
        .cvd-ba-left::before { content: 'Before'; display: block; text-align: center; font-size: 1.5rem; color: #555; font-family: "Times New Roman", serif; font-weight: bold; margin-bottom: 15px; padding-bottom: 15px; border-bottom: 2px solid rgba(0,0,0,0.1); }
        .cvd-ba-right::before { content: 'After'; display: block; text-align: center; font-size: 1.5rem; color: #A82C2C; font-family: "Times New Roman", serif; font-weight: bold; margin-bottom: 15px; padding-top: 15px; border-top: 2px solid rgba(168,44,44,0.2); }
        .cvd-ba-right { width: 100%; border-radius: 0 0 4px 4px; padding: 15px 20px; }
        .cvd-ba-item { font-size: 1rem; min-height: 50px; gap: 10px; }
'''
                part2 = part2[:ba_start] + std_ba_mobile + part2[learn_start:]
                content = part1 + part2

    # 3. Experience list rewrite with regex
    content = re.sub(
        r'\.cvd-experience-list\s*\{\s*max-width:\s*750px;\s*margin:\s*0\s*auto;\s*text-align:\s*left;\s*\}',
        '.cvd-experience-list { max-width: 750px; margin: 0 auto; text-align: left; padding: 0 10px 0 35px; }',
        content
    )

    if orig != content:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
        count += 1

print(f"Fixed {count} files.")
