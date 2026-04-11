from PIL import Image
import os

src = r"D:\Parashari website new\palmistry\wat you'll learn"
for f in os.listdir(src):
    if f.endswith('.png'):
        img = Image.open(os.path.join(src, f))
        print(f, img.size)
