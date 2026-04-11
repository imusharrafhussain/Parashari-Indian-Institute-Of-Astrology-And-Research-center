import os
from PIL import Image

src = r"D:\Parashari website new\AB_AI\assets\images-optimized\palmistry\what-youll-learn"
dst = os.path.join(src, "clean_icons")
os.makedirs(dst, exist_ok=True)

files = [f for f in os.listdir(src) if f.endswith('.png')]

for f in files:
    img = Image.open(os.path.join(src, f))
    w, h = img.size
    
    if w == h:
        # It's a perfect square, just copy it
        img.save(os.path.join(dst, f))
        print(f"Copied square: {f}")
    else:
        # It's a collage. Width > height? Or width < height?
        # Let's crop the left square and right square from the top
        # Assuming the two icons are side by side at the top
        sq_size = w // 2
        
        left_box = (0, 0, sq_size, sq_size)
        right_box = (sq_size, 0, w, sq_size)
        
        try:
            left_img = img.crop(left_box)
            left_name = f.replace('.png', '_left.png')
            left_img.save(os.path.join(dst, left_name))
            
            right_img = img.crop(right_box)
            right_name = f.replace('.png', '_right.png')
            right_img.save(os.path.join(dst, right_name))
            print(f"Cropped {f} into left and right!")
        except Exception as e:
            print(f"Error cropping {f}: {e}")
