import os
import glob
import re

print("Starting definitive logo grid fix...")

files = glob.glob(r'd:\Parashari website new\AB_AI\courses\*.html')
count = 0

# Desktop CSS pattern to hit block-level wrapper and img styling
desktop_pattern = re.compile(
    r'\.cvd-learn-item-img-wrapper\s*\{[^}]+\}\s*\.cvd-learn-item-img-wrapper\s*img\s*\{[^}]+\}',
    re.DOTALL
)

new_desktop_css = '''.cvd-learn-item-img-wrapper {
          width: 130px;
          height: 130px;
          margin: 0 auto 15px auto;
          position: relative;
          background: transparent;
          display: flex;
          align-items: center;
          justify-content: center;
      }
      .cvd-learn-item-img-wrapper img {
          max-width: 100%;
          width: auto;
          height: 100%;
          object-fit: contain;
          margin: 0;
          display: block;
          border-radius: 0;
          box-shadow: none;
          transform: none;
      }'''

# Mobile CSS pattern to hit block-level wrapper and img styling
mobile_pattern = re.compile(
    r'\.cvd-learn-item-img-wrapper\s*\{\s*width:\s*\d+px;\s*height:\s*\d+px;\s*\}\s*\.cvd-learn-item-img-wrapper\s*img\s*\{[^}]+\}',
    re.DOTALL
)

new_mobile_css = '''.cvd-learn-item-img-wrapper { width: 100px; height: 100px; }
        .cvd-learn-item-img-wrapper img { max-width: 100%; width: auto; height: 100%; transform: none; object-fit: contain; }'''

for fpath in files:
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()
    orig = content
    
    if re.search(desktop_pattern, content):
        content = re.sub(desktop_pattern, new_desktop_css, content)
        
    if re.search(mobile_pattern, content):
        # We know mobile pattern exists
        content = re.sub(mobile_pattern, new_mobile_css, content)
        
    if content != orig:
        with open(fpath, 'w', encoding='utf-8') as f:
            f.write(content)
        count += 1

print(f"Fixed logo grids in {count} files.")
