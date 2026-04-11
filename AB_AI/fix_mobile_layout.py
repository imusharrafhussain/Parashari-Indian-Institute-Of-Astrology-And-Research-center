import os
import glob

html_files = glob.glob('*.html') + glob.glob('courses/*.html')

print(f'Found {len(html_files)} HTML files')
count = 0

for filepath in html_files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content

    # Fix the global overflow fix
    content = content.replace("html, body { overflow-x: hidden; max-width: 100vw; }", "html, body { overflow-x: hidden; max-width: 100%; padding: 0; margin: 0; }")

    # Fix layout container inner paddings squeezing the content on mobile
    if ".cvd-main-content, .cvd-layout-container { overflow-x: hidden; max-width: 100vw; box-sizing: border-box; }" in content:
        content = content.replace(".cvd-main-content, .cvd-layout-container { overflow-x: hidden; max-width: 100vw; box-sizing: border-box; }", ".cvd-main-content, .cvd-layout-container { overflow-x: hidden; max-width: 100%; width: 100%; padding: 0 !important; margin: 0 !important; box-sizing: border-box; }")

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        count += 1

print(f'Fixed {count} files')
