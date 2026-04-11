import glob
import re
import os

html_files = glob.glob('courses/*.html') + glob.glob('*.html') + glob.glob('assets/js/*.js')

count = 0
for file in html_files:
    if not os.path.exists(file): continue
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    def replace_src(m):
        raw_path = m.group(1)
        encoded_path = raw_path.replace(' ', '%20')
        return f'src="{encoded_path}"'

    new_content = re.sub(r'src="([^"]*assets/images-optimized/[^"]*)"', replace_src, content)
    
    # In level-data.js, the img prop might be like image: "..."
    def replace_image_prop(m):
        raw_path = m.group(1)
        encoded_path = raw_path.replace(' ', '%20')
        return f'image: "{encoded_path}"'
        
    new_content = re.sub(r'image:\s*"([^"]*\.webp)"', replace_image_prop, new_content)

    if new_content != content:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(new_content)
        count += 1

print(f'Encoded spaces in image paths in {count} files.')
