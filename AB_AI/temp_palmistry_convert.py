import os
from PIL import Image

src_dir = r"D:\Parashari website new\palmistry"
dest_dir = r"D:\Parashari website new\AB_AI\assets\images-optimized\palmistry"

# Ensure directories exist
os.makedirs(dest_dir, exist_ok=True)
os.makedirs(os.path.join(dest_dir, "middle-elements"), exist_ok=True)
os.makedirs(os.path.join(dest_dir, "what-youll-learn"), exist_ok=True)

def process_image(src_path, dest_path, max_width=800):
    if not os.path.exists(src_path):
        print(f"File not found: {src_path}")
        return
        
    try:
        with Image.open(src_path) as img:
            # Convert to RGB if necessary
            if img.mode in ('RGBA', 'P'):
                if img.mode == 'P':
                    img = img.convert('RGBA')
            
            # Resize if too large
            if img.width > max_width:
                ratio = max_width / float(img.width)
                new_height = int(float(img.height) * float(ratio))
                img = img.resize((max_width, new_height), Image.Resampling.LANCZOS)
                
            img.save(dest_path, "WEBP", quality=85)
            print(f"Successfully converted {src_path} -> {dest_path}")
    except Exception as e:
        print(f"Error processing {src_path}: {e}")

# Process Header Image
header_src = os.path.join(src_dir, "header image.png")
header_dest = os.path.join(dest_dir, "header.webp")
process_image(header_src, header_dest, max_width=1000)

# Process Middle Elements
middle_src_dir = os.path.join(src_dir, "what your palm reveals")
middle_dest_dir = os.path.join(dest_dir, "middle-elements")
if os.path.exists(middle_src_dir):
    for filename in os.listdir(middle_src_dir):
        if filename.lower().endswith(".png") or filename.lower().endswith(".jpg") or filename.lower().endswith(".jpeg"):
            src_path = os.path.join(middle_src_dir, filename)
            # Create a clean safe name
            clean_name = filename.rsplit('.', 1)[0].lower().replace(" ", "-").replace("'", "").replace("&", "and")
            dest_path = os.path.join(middle_dest_dir, f"{clean_name}.webp")
            process_image(src_path, dest_path, max_width=600)

# Process What You'll Learn
learn_src_dir = os.path.join(src_dir, "wat you'll learn")
learn_dest_dir = os.path.join(dest_dir, "what-youll-learn")
if os.path.exists(learn_src_dir):
    for filename in os.listdir(learn_src_dir):
        if filename.lower().endswith(".png") or filename.lower().endswith(".jpg") or filename.lower().endswith(".jpeg"):
            src_path = os.path.join(learn_src_dir, filename)
            clean_name = filename.rsplit('.', 1)[0].lower().replace(" ", "-").replace("'", "").replace("&", "and")
            dest_path = os.path.join(learn_dest_dir, f"{clean_name}.webp")
            process_image(src_path, dest_path, max_width=400)

print("Conversion complete.")
