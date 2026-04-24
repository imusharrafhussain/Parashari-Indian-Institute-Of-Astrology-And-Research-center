import os
import glob
import re

files = glob.glob('d:/Parashari website new/AB_AI/crash-courses/*.html')
files.append('d:/Parashari website new/AB_AI/archive/plrt.html')

for filepath in files:
    if not os.path.exists(filepath): continue
    with open(filepath, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # We want to replace inside <h1>...</h1> only.
    def replace_gold(match):
        h1_inner = match.group(1)
        if "Masterclass" in h1_inner and '<span class="text-gold">' not in h1_inner:
            h1_inner = h1_inner.replace("Masterclass", '<span class="text-gold">Masterclass</span>')
        elif "(PLRT)" in h1_inner and '<span class="text-gold">' not in h1_inner:
            h1_inner = h1_inner.replace("(PLRT)", '<span class="text-gold">(PLRT)</span>')
        return f"<h1>{h1_inner}</h1>"
        
    new_content = re.sub(r'<h1>(.*?)</h1>', replace_gold, content)
    
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as file:
            file.write(new_content)
        print(f"Updated: {os.path.basename(filepath)}")
    else:
        print(f"Skipped/already updated: {os.path.basename(filepath)}")
