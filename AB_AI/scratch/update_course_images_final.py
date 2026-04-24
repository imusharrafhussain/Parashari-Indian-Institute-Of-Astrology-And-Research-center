import os
import shutil
import re
import glob

files_to_copy = [
    r"D:\Parashari website new\AB_AI\financial astrology.jpeg",
    r"D:\Parashari website new\AB_AI\lal kitab.jpeg",
    r"D:\Parashari website new\AB_AI\bnn.jpeg",
    r"D:\Parashari website new\AB_AI\modern career astro.jpeg",
    r"D:\Parashari website new\AB_AI\healing.jpeg",
    r"D:\Parashari website new\AB_AI\face reading.jpeg",
    r"D:\Parashari website new\AB_AI\feng shui.jpeg",
    r"D:\Parashari website new\AB_AI\medical astrology.jpeg",
    r"D:\Parashari website new\AB_AI\mobile numerology.jpeg",
    r"D:\Parashari website new\AB_AI\PALMSTRY.jpg.jpeg",
    r"D:\Parashari website new\AB_AI\PAST LIFE-1.jpg.jpeg",
]

dest_dir = r"D:\Parashari website new\AB_AI\assets\images-optimized\crash-courses"
os.makedirs(dest_dir, exist_ok=True)

# 1. Copy images
for file_path in files_to_copy:
    if os.path.exists(file_path):
        filename = os.path.basename(file_path)
        shutil.copy(file_path, os.path.join(dest_dir, filename))
        print(f"Copied {filename}")

image_mapping = {
    'cc-financial-astrology': ('financial astrology.jpeg', 'Financial Astrology'),
    'cc-lal-kitab': ('lal kitab.jpeg', 'Lal Kitab'),
    'cc-bnn-intensive': ('bnn.jpeg', 'BNN'),
    'cc-modern-career-astrology': ('modern career astro.jpeg', 'Modern Career Astrology'),
    'cc-healing': ('healing.jpeg', 'Healing'),
    'cc-face-reading': ('face reading.jpeg', 'Face Reading'),
    'cc-feng-shui': ('feng shui.jpeg', 'Feng Shui'),
    'cc-medical-astrology': ('medical astrology.jpeg', 'Medical Astrology'),
    'cc-mobile-numerology': ('mobile numerology.jpeg', 'Mobile Numerology'),
    'cc-modern-western-palmistry': ('PALMSTRY.jpg.jpeg', 'Palmistry'),
    'plrt': ('PAST LIFE-1.jpg.jpeg', 'Past Life')
}

base_dir = r"D:\Parashari website new\AB_AI"

# 2. Update Inner Crash Course Pages
for page_key, (image_name, title_hint) in image_mapping.items():
    if page_key == 'plrt':
        filepath = os.path.join(base_dir, 'archive', 'plrt.html')
    else:
        filepath = os.path.join(base_dir, 'crash-courses', f'{page_key}.html')
    
    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        new_img_path = f"../assets/images-optimized/crash-courses/{image_name}"
        
        # Replace hero img. Make sure no truncation via inline style
        content = re.sub(r'<img[^>]+class="hero-img"[^>]*>', f'<img src="{new_img_path}" alt="{title_hint} Masterclass" class="hero-img" style="object-fit: contain; width: 100%; height: 100%; background: var(--bg);">', content)
        
        # Replace wyg img
        content = re.sub(r'<img[^>]+class="wyg-img"[^>]*>', f'<img src="{new_img_path}" alt="{title_hint} Visual" class="wyg-img" style="object-fit: contain; width: 100%; height: auto; border-radius: 1.5rem;">', content)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated images in {page_key}.html")

# 3. Update courses.html
html_path = os.path.join(base_dir, 'courses.html')
if os.path.exists(html_path):
    with open(html_path, 'r', encoding='utf-8') as f:
        html_content = f.read()
    
    for page_key, (image_name, title_hint) in image_mapping.items():
        # Title in courses.html might be perfect matched
        new_path = f"assets/images-optimized/crash-courses/{image_name}"
        # We find <img alt="[title]" class="card-image" src="...">
        # A robust regex replacing based on 'alt' attribute containing the title_hint
        html_content = re.sub(
            fr'<img\s+alt="[^"]*{title_hint}[^"]*"\s+class="card-image"\s+src="[^"]*"\s*/?>',
            f'<img alt="{title_hint}" class="card-image" src="{new_path}" style="object-fit: contain !important;"/>',
            html_content, flags=re.IGNORECASE
        )
        
    with open(html_path, 'w', encoding='utf-8') as f:
        f.write(html_content)
    print("Updated courses.html")

# 4. Update index.html
index_path = os.path.join(base_dir, 'index.html')
if os.path.exists(index_path):
    with open(index_path, 'r', encoding='utf-8') as f:
        index_content = f.read()
    
    for page_key, (image_name, title_hint) in image_mapping.items():
        new_path = f"assets/images-optimized/crash-courses/{image_name}"
        index_content = re.sub(
            fr'<img\s+alt="[^"]*{title_hint}[^"]*"\s+class="card-image"\s+src="[^"]*"\s*/?>',
            f'<img alt="{title_hint}" class="card-image" src="{new_path}" style="object-fit: contain !important;"/>',
            index_content, flags=re.IGNORECASE
        )
        
    with open(index_path, 'w', encoding='utf-8') as f:
        f.write(index_content)
    print("Updated index.html")

# 5. Update courses-data.js (if applicable)
js_path = os.path.join(base_dir, 'assets', 'js', 'courses-data.js')
if os.path.exists(js_path):
    with open(js_path, 'r', encoding='utf-8') as f:
        js_content = f.read()
    
    for page_key, (image_name, title_hint) in image_mapping.items():
        new_path = f"assets/images-optimized/crash-courses/{image_name}"
        # Match title: "...", then link: "...", then image: "..."
        # It's better to just replace image: "..." where title contains title_hint.
        # This is a bit tricky with regex, we can read chunks and replace.
        blocks = js_content.split('title:')
        new_blocks = [blocks[0]]
        for block in blocks[1:]:
            if title_hint.lower() in block.split(',')[0].lower():
                # replace image: "..." in this block
                block = re.sub(r'image:\s*"[^"]*"', f'image: "{new_path}"', block)
            new_blocks.append(block)
        js_content = 'title:'.join(new_blocks)

    with open(js_path, 'w', encoding='utf-8') as f:
        f.write(js_content)
    print("Updated courses-data.js")
