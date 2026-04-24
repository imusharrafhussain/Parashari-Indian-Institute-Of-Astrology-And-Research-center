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

dest_dir = r"D:\Parashari website new\AB_AI\assets\images\crash-courses"
os.makedirs(dest_dir, exist_ok=True)

image_mapping = {
    'cc-financial-astrology': 'financial astrology.jpeg',
    'cc-lal-kitab': 'lal kitab.jpeg',
    'cc-bnn-intensive': 'bnn.jpeg',
    'cc-modern-career-astrology': 'modern career astro.jpeg',
    'cc-healing': 'healing.jpeg',
    'cc-face-reading': 'face reading.jpeg',
    'cc-feng-shui': 'feng shui.jpeg',
    'cc-medical-astrology': 'medical astrology.jpeg',
    'cc-mobile-numerology': 'mobile numerology.jpeg',
    'cc-modern-western-palmistry': 'PALMSTRY.jpg.jpeg',
    'plrt': 'PAST LIFE-1.jpg.jpeg'
}

# 1. Copy images
for file_path in files_to_copy:
    if os.path.exists(file_path):
        filename = os.path.basename(file_path)
        shutil.copy(file_path, os.path.join(dest_dir, filename))
        print(f"Copied {filename}")
    else:
        print(f"File not found: {file_path}")

# 2. Update Crash Course HTML pages
base_dir = r"D:\Parashari website new\AB_AI"
for page_key, image_name in image_mapping.items():
    if page_key == 'plrt':
        filepath = os.path.join(base_dir, 'archive', 'plrt.html')
    else:
        filepath = os.path.join(base_dir, 'crash-courses', f'{page_key}.html')
    
    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        new_img_path = f"../assets/images/crash-courses/{image_name}"
        
        # Replace hero img
        content = re.sub(r'<img[^>]+class="hero-img"[^>]*>', f'<img src="{new_img_path}" alt="{page_key} Masterclass" class="hero-img" style="object-fit: contain;">', content)
        # Replace wyg img
        content = re.sub(r'<img[^>]+class="wyg-img"[^>]*>', f'<img src="{new_img_path}" alt="{page_key} Visual" class="wyg-img" style="object-fit: contain; width: 100%; height: auto;">', content)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated images in {filepath}")

# 3. Update courses-data.js and courses.html list
js_path = os.path.join(base_dir, 'assets', 'js', 'courses-data.js')
if os.path.exists(js_path):
    with open(js_path, 'r', encoding='utf-8') as f:
        js_content = f.read()
    
    # Map title hints to image paths for JS override
    title_to_img = {
        'Financial Astrology': 'financial astrology.jpeg',
        'Lal Kitab': 'lal kitab.jpeg',
        'BNN': 'bnn.jpeg',
        'Career Astrology': 'modern career astro.jpeg',
        'Healing': 'healing.jpeg',
        'Face Reading': 'face reading.jpeg',
        'Feng Shui': 'feng shui.jpeg',
        'Medical Astrology': 'medical astrology.jpeg',
        'Mobile Numerology': 'mobile numerology.jpeg',
        'Palmistry': 'PALMSTRY.jpg.jpeg',
        'Past Life': 'PAST LIFE-1.jpg.jpeg',
    }
    
    # This requires careful regex or we just rely on standard path update depending on structure
    # Actually finding exact matches in courses.html is safer since JS generates mostly dynamically or has a static array
    print("JS file needs visual replacing or manual script check.")

html_path = os.path.join(base_dir, 'courses.html')
if os.path.exists(html_path):
    with open(html_path, 'r', encoding='utf-8') as f:
        html_content = f.read()
    
    for title, img_name in title_to_img.items():
        new_path = f"assets/images/crash-courses/{img_name}"
        # We look for img src near the title
        # e.g., <img ... src="..."><h3...>title</h3>
        # We can just replace src attributes that lie in the crash course section
        pass

