import os
import glob
import re

print("Unlocking global layout...")

files = glob.glob(r'd:\Parashari website new\AB_AI\courses\*.html')
count = 0

old_css_pattern = re.compile(
    r'\.cvd-main-content,\s*\.cvd-sidebar\s*\{\s*height:\s*calc\(100vh\s*-\s*120px\);\s*overflow-y:\s*scroll;\s*scrollbar-width:\s*none;\s*/\*\s*Firefox\s*\*/\s*-ms-overflow-style:\s*none;\s*/\*\s*IE and Edge\s*\*/\s*\}\s*\.cvd-main-content::-webkit-scrollbar,\s*\.cvd-sidebar::-webkit-scrollbar\s*\{\s*display:\s*none;\s*/\*\s*Chrome,\s*Safari,\s*Opera\s*\*/\s*\}',
    re.DOTALL
)

# And also try to inject align-items: flex-start to .cvd-layout-container implicitly or globally.
for fpath in files:
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()
    orig = content
    
    # Remove the strict height locks
    content = re.sub(old_css_pattern, r'/* Scroll locks removed */\n        .cvd-layout-container { align-items: flex-start; }', content)
    
    if content != orig:
        with open(fpath, 'w', encoding='utf-8') as f:
            f.write(content)
        count += 1

print(f"Unlocked layout in {count} files.")
