import glob
import re

files = glob.glob('courses/*.html')
count = 0

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    orig_content = content

    # 1. Fix the "What You Will Get" / cvd-experience-list missing margin/padding on list
    # The current css: .cvd-experience-list { max-width: 750px; margin: 0 auto; text-align: left; }
    # We will safely replace it to include proper padding and margins for red arrows to not bleed out.
    if '.cvd-experience-list {' in content and 'padding-left: 20px;' not in content:
        content = content.replace(
            '.cvd-experience-list { max-width: 750px; margin: 0 auto; text-align: left; }',
            '.cvd-experience-list { max-width: 750px; margin: 0 auto; text-align: left; padding: 0 10px 0 35px; }'
        )

    # 2. Fix Before/After section on mobile for the anomalous pages (crystal, nakshatra, palmistry, rudraksha)
    # They have messy varying .cvd-ba-header styles in the mobile query:
    if '@media (max-width: 768px)' in content:
        # We need to wipe the messy .cvd-ba- container code and replace it with the standard layout.
        # Let's find the cvd-ba-container block in the mobile MQ
        # This regex will match between .cvd-ba-container and the next block like .cvd-learn-grid
        mobile_mq_start = content.find('@media (max-width: 768px)')
        if mobile_mq_start != -1:
            part1 = content[:mobile_mq_start]
            part2 = content[mobile_mq_start:]
            
            # The standard replacement string we know works perfectly:
            std_ba_mobile = '''        .cvd-ba-container { padding: 0 5px; }
        .cvd-ba-header { display: none; }
        .cvd-ba-box { flex-direction: column; }
        .cvd-ba-left { width: 100%; border-radius: 4px 4px 0 0; padding: 15px 20px; }
        .cvd-ba-left::after { display: none; }
        .cvd-ba-left::before { content: 'Before'; display: block; text-align: center; font-size: 1.5rem; color: #555; font-family: "Times New Roman", serif; font-weight: bold; margin-bottom: 15px; padding-bottom: 15px; border-bottom: 2px solid rgba(0,0,0,0.1); }
        .cvd-ba-right::before { content: 'After'; display: block; text-align: center; font-size: 1.5rem; color: #A82C2C; font-family: "Times New Roman", serif; font-weight: bold; margin-bottom: 15px; padding-top: 15px; border-top: 2px solid rgba(168,44,44,0.2); }
        .cvd-ba-right { width: 100%; border-radius: 0 0 4px 4px; padding: 15px 20px; }
        .cvd-ba-item { font-size: 1rem; min-height: 50px; gap: 10px; }'''

            # Replace the messy blocks one by one
            # Find the start of .cvd-ba-container in part2
            ba_start = part2.find('.cvd-ba-container {')
            learn_start = part2.find('.cvd-learn-grid', ba_start)
            
            if ba_start != -1 and learn_start != -1:
                # Replace everything between the two with standard block
                res_part2 = part2[:ba_start] + std_ba_mobile + "\n" + part2[learn_start:]
                content = part1 + res_part2

    if content != orig_content:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
        count += 1

print(f"Fixed bugs in {count} HTML files.")
