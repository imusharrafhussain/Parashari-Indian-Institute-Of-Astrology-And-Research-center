import glob

files = glob.glob('courses/reiki-*.html')

count = 0
for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # We add inline style specifically to adjust the Reiki Hero image to offset the left whitespace
    target = 'header.webp" alt="Reiki Healing">'
    replacement = 'header.webp" alt="Reiki Healing" style="object-fit: cover; object-position: right center; transform: scale(1.15) translateX(-10%);">'
    
    if target in content:
        content = content.replace(target, replacement)
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
        count += 1

print(f"Fixed Reiki hero image shift in {count} HTML files.")
