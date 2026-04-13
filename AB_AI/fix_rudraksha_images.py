import glob
import re

for file in glob.glob(r'd:\Parashari website new\AB_AI\courses\rudraksha*.html'):
    with open(file, 'r', encoding='utf-8') as f:
        text = f.read()

    text = re.sub(
        r'<img src="\.\./assets/images-optimized/rudraksha/middle-elements/protect your energy\.webp" alt="Protect Your Energy">',
        r'<img src="../assets/images-optimized/rudraksha/middle-elements/rudraksha-protect.jpeg" alt="Protect Your Energy">',
        text
    )
    
    text = re.sub(
        r'<img src="\.\./assets/images-optimized/rudraksha/middle-elements/deepen spiritual connection\.webp" alt="Deepen Spiritual Connection">',
        r'<img src="../assets/images-optimized/rudraksha/middle-elements/rudraksha-deepen.jpeg" alt="Deepen Spiritual Connection">',
        text
    )
    
    text = re.sub(
        r'<img src="\.\./assets/images-optimized/rudraksha/middle-elements/reduce stress and worry\.webp" alt="Reduce Stress and Worry">',
        r'<img src="../assets/images-optimized/rudraksha/middle-elements/reduce-stress.png" alt="Reduce Stress and Worry">',
        text
    )

    with open(file, 'w', encoding='utf-8') as f:
        f.write(text)

print("Updated Rudraksha HTML files.")
