import re
import os
import urllib.parse

with open('assets/js/level-data.js', 'r', encoding='utf-8') as f:
    content = f.read()

missing = set()
imgs = re.findall(r'image:\s*"([^"]+)"', content)
for src in imgs:
    # Most start with assets/images-optimized/
    if src.startswith('assets/'):
        filepath = os.path.normpath(os.path.join('d:\\Parashari website new\\AB_AI', src))
    else:
        # Just filename
        filepath = os.path.normpath(os.path.join('d:\\Parashari website new\\AB_AI\\assets\\images-optimized', src))

    # decode %20
    filepath = urllib.parse.unquote(filepath)

    if not os.path.exists(filepath):
        missing.add(src)

print('Missing in level-data JS:')
for m in sorted(missing):
    print(m)
