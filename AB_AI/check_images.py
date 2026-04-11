import glob
import re
import os
import urllib.parse

html_files = glob.glob('courses/*.html')

missing = set()
checked = 0
for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find all img src attributes
    imgs = re.findall(r'<img[^>]+src="([^"]+)"', content)
    for src in imgs:
        checked += 1
        # Resolve paths
        if src.startswith('../'):
            filepath = os.path.normpath(os.path.join(os.path.dirname(file), src))
        elif src.startswith('assets/'):
            filepath = os.path.normpath(os.path.join('d:\\Parashari website new\\AB_AI', src))
        else:
            continue
            
        # Decode %20 if present
        filepath = urllib.parse.unquote(filepath)
        if not os.path.exists(filepath):
            missing.add(src)

print(f'Checked {checked} image paths.')
print('Missing images:')
for m in sorted(missing):
    print(m)
