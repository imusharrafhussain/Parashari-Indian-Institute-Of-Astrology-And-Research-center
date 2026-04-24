import os
import glob
import re

directory = 'd:/Parashari website new/AB_AI/crash-courses/'
pattern = os.path.join(directory, '*.html')
files = glob.glob(pattern)

search_str = '<div class="expert-img-wrap"><img src="../circle faculty images.jpg.jpeg" alt="Expert Faculty Panel" class="expert-img"></div>'
replace_str = '''<div class="expert-img-wrap" style="text-align: center; display: flex; flex-direction: column; align-items: center;">
    <img src="../circle faculty images.jpg.jpeg" alt="Expert Faculty Panel" class="expert-img">
    <div style="margin-top: 20px; display: inline-block; color: #fff; background: linear-gradient(135deg, hsl(38, 70%, 40%), hsl(42, 90%, 55%), hsl(38, 70%, 40%)); padding: 8px 24px; border-radius: 30px; font-weight: 800; font-size: 1.1rem; box-shadow: 0 0 20px rgba(204, 163, 56, 0.8), 0 0 40px rgba(204, 163, 56, 0.4); text-transform: uppercase; letter-spacing: 1.5px; animation: ccp-pulseGlow 2s infinite;">India's Top Educators</div>
</div>'''

for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as file:
        content = file.read()
    
    if search_str in content:
        new_content = content.replace(search_str, replace_str)
        with open(filepath, 'w', encoding='utf-8') as file:
            file.write(new_content)
        print(f'Updated: {os.path.basename(filepath)}')
    else:
        print(f'Not found in: {os.path.basename(filepath)}')
