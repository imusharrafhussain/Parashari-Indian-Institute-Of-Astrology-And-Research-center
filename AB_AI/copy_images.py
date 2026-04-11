import os
import shutil

src = r"D:\Parashari website new\palmistry\wat you'll learn"
dst = r"D:\Parashari website new\AB_AI\assets\images-optimized\palmistry\what-youll-learn"

files = [
    "read your own palm.png",
    "1babc379-cbeb-4c1a-a5ec-75d0e28db96c.png",
    "1d4f74b1-9b9f-4575-b98d-cb69ddad0f92 1.png",
    "1d4f74b1-9b9f-4575-b98d-cb69ddad0f92.png",
    "385f23a0-08f3-4945-9856-c0d492a809d3 2.png",
    "385f23a0-08f3-4945-9856-c0d492a809d3.png"
]

for f in files:
    src_path = os.path.join(src, f)
    dst_path = os.path.join(dst, f)
    if os.path.exists(src_path):
        print(f"Copying {f}...")
        shutil.copy2(src_path, dst_path)
    else:
        print(f"NOT FOUND: {src_path}")
