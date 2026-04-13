import os
import glob
import re

print("Restoring two-pane scroll layout...")

files = glob.glob(r'd:\Parashari website new\AB_AI\courses\*.html')
count = 0

# Pattern that the unlock_scroll.py left behind
old_pattern = re.compile(
    r'/\* Scroll locks removed \*/\s*\n\s*\.cvd-layout-container\s*\{\s*align-items:\s*flex-start;\s*\}',
    re.DOTALL
)

new_css = """.cvd-main-content, .cvd-sidebar {
          height: calc(100vh - 120px);
          overflow-y: scroll;
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* IE and Edge */
        }
        .cvd-main-content::-webkit-scrollbar, .cvd-sidebar::-webkit-scrollbar {
          display: none; /* Chrome, Safari, Opera */
        }"""

for fpath in files:
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()
    orig = content

    content = re.sub(old_pattern, new_css, content)

    if content != orig:
        with open(fpath, 'w', encoding='utf-8') as f:
            f.write(content)
        count += 1

print(f"Restored two-pane scroll in {count} files.")

# Now fix the white gap: remove excess margin on the cvd-layout-container
# The inline style has "margin: 20px auto 60px auto" — change 60px bottom margin to 0
count2 = 0
for fpath in glob.glob(r'd:\Parashari website new\AB_AI\courses\*.html'):
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()
    orig = content
    # Fix bottom margin on layout container
    content = content.replace('margin: 20px auto 60px auto;', 'margin: 20px auto 0 auto;')
    if content != orig:
        with open(fpath, 'w', encoding='utf-8') as f:
            f.write(content)
        count2 += 1

print(f"Removed bottom margin gap in {count2} files.")
