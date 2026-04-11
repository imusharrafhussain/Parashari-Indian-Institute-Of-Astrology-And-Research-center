import glob
import re

files = glob.glob('courses/reiki-*.html')

count = 0
for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Revert previous style completely if it exists
    content = re.sub(r'style="[^"]*translateX\([-0-9]+%\)[^"]*"', '', content)
    
    # Clean up the img tag first to avoid double attributes
    content = content.replace('header.webp" alt="Reiki Healing" >', 'header.webp" alt="Reiki Healing">')
    
    target = 'header.webp" alt="Reiki Healing">'
    # Use a more aggressive CSS crop: height 260px and right alignment, which will crop out the left empty space
    # Also we use object-position: 100% center to perfectly pin the right edge (lotus) while cropping the left (whitespace)
    # Using margin-left: -50px or object-position: 80%? 80% shift will move the lotus slightly left.
    replacement = 'header.webp" alt="Reiki Healing" style="height: 300px; width: 100%; max-width: 400px; object-fit: cover; object-position: 90% center; margin-left: -40px;">'
    
    if target in content:
        content = content.replace(target, replacement)
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
        count += 1

print(f"Aggressively cropped Reiki hero image in {count} HTML files.")
