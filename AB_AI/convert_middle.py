from PIL import Image
import os

src_dir = r"D:\Parashari website new\rudraksha\middle elements"
dst_dir = r"d:\Parashari website new\AB_AI\assets\images-optimized\rudraksha\middle-elements"

files = {
    "Deepen Spiritual connection (2).png": "deepen spiritual connection.webp",
    "protect your energy (2).png": "protect your energy.webp",
    "reduce stress and worry (2).png": "reduce stress and worry.webp",
}

for src_name, dst_name in files.items():
    src_path = os.path.join(src_dir, src_name)
    dst_path = os.path.join(dst_dir, dst_name)
    
    if not os.path.exists(src_path):
        print(f"ERROR: Source not found: {src_path}")
        continue
    
    img = Image.open(src_path)
    img.save(dst_path, "WEBP", quality=85)
    size_kb = os.path.getsize(dst_path) / 1024
    print(f"Converted: {src_name} -> {dst_name} ({size_kb:.0f} KB)")

print("\nDone!")
