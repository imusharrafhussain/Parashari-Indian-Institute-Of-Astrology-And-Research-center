import os
from PIL import Image

src = r"D:\Parashari website new\palmistry\wat you'll learn"

def image_to_ascii(image, width=40):
    image = image.convert("L")
    aspect_ratio = image.height / image.width
    height = int(aspect_ratio * width * 0.5)  # 0.5 for font aspect ratio
    image = image.resize((width, height))
    
    pixels = image.getdata()
    chars = ["@", "%", "#", "*", "+", "=", "-", ":", ".", " "]
    new_pixels = [chars[pixel // 26] for pixel in pixels]
    
    ascii_str = ''.join(new_pixels)
    for i in range(0, len(ascii_str), width):
        print(ascii_str[i:i+width])

for f in ["1d4f74b1-9b9f-4575-b98d-cb69ddad0f92 1.png", "1d4f74b1-9b9f-4575-b98d-cb69ddad0f92.png", "385f23a0-08f3-4945-9856-c0d492a809d3.png", "385f23a0-08f3-4945-9856-c0d492a809d3 2.png"]:
    path = os.path.join(src, f)
    if os.path.exists(path):
        print(f"\n--- {f} ---")
        image_to_ascii(Image.open(path))
