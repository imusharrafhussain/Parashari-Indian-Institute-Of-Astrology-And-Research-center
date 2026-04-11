import os
from PIL import Image

# Re-convert images
base_source = r"d:\Parashari website new\rudraksha"
target_dir = r"d:\Parashari website new\AB_AI\assets\images-optimized\rudraksha"

def process_and_convert(src_path, dst_path):
    if not os.path.exists(src_path): return
    try:
        with Image.open(src_path) as img:
            img.save(dst_path, 'webp', quality=85)
    except Exception as e:
        print("Failed", src_path, e)

process_and_convert(os.path.join(base_source, "header image.png"), os.path.join(target_dir, "header_image.webp"))
process_and_convert(os.path.join(base_source, "mainpage ref.png"), os.path.join(target_dir, "mainpage_ref.webp"))

middle_files = ["deepen spiritual connection.png", "protect your energy.png", "reduce stress and worry.png"]
for f in middle_files:
    process_and_convert(os.path.join(base_source, "middle elements", f), os.path.join(target_dir, "middle-elements", f.replace('.png', '.webp')))

learn_files = ["ATTRACT PROSPERITY.png", "AWAKEN YOUR CHAKRAS.png", "ENHANCE INNER PEACE.png", "HISTORY OF RUDRAKSHA.png", "IDENTIFY REAL RUDRAKSHA.png", "WEAR RUDRAKSHA PROPERLY.png"]
for f in learn_files:
    process_and_convert(os.path.join(base_source, "what you'll learn", f), os.path.join(target_dir, "what-youll-learn", f.replace('.png', '.webp')))

# Fix CSS
file_path = r"d:\Parashari website new\AB_AI\assets\js\level-data.js"
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

start_idx = content.find("function renderCustomRudrakshaPage(courseSlug, levelSlug) {")
if start_idx != -1:
    end_idx = content.find("function initLevelDetailPage", start_idx)
    if end_idx == -1: end_idx = len(content)
    part = content[start_idx:end_idx]
    
    # 1. Hero img position -> right center
    part = part.replace("object-position: left center;", "object-position: right center;")
    part = part.replace("width: 60%;", "width: 55%;")
    
    # 2. Middle elements: revert cropped CSS
    old_3col = ".cvd-3col-card img { width: 100%; height: auto; aspect-ratio: 16 / 10; object-fit: cover; object-position: top; box-shadow: 0 5px 15px rgba(0,0,0,0.15); border-radius: 12px; }"
    new_3col = ".cvd-3col-card img { width: 100%; height: auto; object-fit: contain; box-shadow: 0 5px 15px rgba(0,0,0,0.1); border-radius: 8px; }"
    part = part.replace(old_3col, new_3col)
    
    # 3. What you'll learn: revert cropped CSS to show image as is
    old_learn = ".cvd-learn-item img { width: 100px; height: 100px; object-fit: cover; object-position: top; border-radius: 50%; display: block; margin: 0 auto 15px auto; box-shadow: 0 5px 15px rgba(200, 150, 12, 0.25); border: 2px solid #FFF; }"
    new_learn = ".cvd-learn-item img { width: 100%; max-width: 140px; height: auto; object-fit: contain; display: block; margin: 0 auto 15px auto; }"
    part = part.replace(old_learn, new_learn)

    content = content[:start_idx] + part + content[end_idx:]
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("CSS reverted and images reconverted.")
