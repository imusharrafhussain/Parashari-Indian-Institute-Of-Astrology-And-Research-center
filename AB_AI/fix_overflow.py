import os
import glob

courses_dir = 'courses'
html_files = glob.glob(os.path.join(courses_dir, '*.html'))

print(f'Found {len(html_files)} course HTML files')
count = 0

# The global overflow fix - add to every file's @media (max-width: 768px) block
# We need to add: html, body { overflow-x: hidden; max-width: 100vw; }
# And fix the hero container that causes overflow

for filepath in html_files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content

    # Skip if already fixed
    if 'html, body { overflow-x: hidden' in content:
        continue

    # Add global overflow fix at the start of the mobile media query
    # Find @media (max-width: 768px) in the inline <style> block
    target = '@media (max-width: 768px) {\n'
    idx = content.find(target)
    if idx < 0:
        target = '@media (max-width: 768px) {\r\n'
        idx = content.find(target)

    if idx >= 0:
        insert_after = idx + len(target)
        overflow_fix = """        html, body { overflow-x: hidden; max-width: 100vw; }
"""
        content = content[:insert_after] + overflow_fix + content[insert_after:]
        count += 1

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'  Fixed: {os.path.basename(filepath)}')

print(f'\nFixed {count} files')
