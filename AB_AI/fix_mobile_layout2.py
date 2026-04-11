import os
import glob
import re

html_files = glob.glob('*.html') + glob.glob('courses/*.html')

count = 0

for filepath in html_files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content

    # Use regex to find and replace any instance of max-width: 100vw;
    # especially in html, body and .cvd-main-content
    content = re.sub(r'max-width:\s*100vw\s*;', 'max-width: 100%;', content)

    # Make sure padding and margin are 0 for the main containers in the responsive blocks
    # We can inject rules directly into the media queries if we find them
    media_pattern = r'@media\s*\(max-width:\s*768px\)\s*\{'
    replacement = r'@media (max-width: 768px) {\n        html, body { overflow-x: hidden; max-width: 100%; padding: 0; margin: 0; }\n        .cvd-layout-container { padding: 0 !important; margin: 0 !important; width: 100%; max-width: 100%; }'
    
    # Only do this if we haven't already added it
    if 'html, body { overflow-x: hidden; max-width: 100%; padding: 0; margin: 0; }' not in content:
        content = re.sub(media_pattern, replacement, content, count=1)

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        count += 1

print(f'Fixed {count} remaining files')
