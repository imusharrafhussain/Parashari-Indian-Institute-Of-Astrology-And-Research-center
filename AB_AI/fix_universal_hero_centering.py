import glob
import re

files = glob.glob('courses/*.html') + glob.glob('assets/js/*.js')
count = 0

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    orig = content
    
    # We want to replace the mobile `.cvd-hero-img-wrap img` mapping.
    # Because there are variations like object-fit: contain, height: auto, etc.
    # We will use Regex to find `.cvd-hero-img-wrap img { ... }` that comes AFTER `@media (max-width: 768px)`
    # This ensures we only target the mobile override!

    if '@media (max-width: 768px)' in content:
        # Split at the media query so we don't accidentally replace desktop css
        parts = content.split('@media (max-width: 768px)')
        if len(parts) > 1:
            part2 = parts[1]
            
            # Find the img tag inside part2
            # It might look like: `.cvd-hero-img-wrap img { width: 100%; height: auto; max-width: 350px; margin: 0 auto; transform: none; object-position: center; object-fit: contain; max-height: 350px; }`
            # or `.cvd-hero-img-wrap img { width: 100%; max-width: 350px; margin: 0 auto; object-fit: contain; }`
            
            # The replacement will aggressively crop the image focal point and align it firmly in the mobile column.
            fixed_css = '.cvd-hero-img-wrap img { width: 100%; height: 300px; max-width: 400px; margin: 0 auto; object-position: 85% center; object-fit: cover; }'
            
            part2 = re.sub(r'\.cvd-hero-img-wrap img\s*\{\s*[^}]+\s*\}', fixed_css, part2)
            
            content = parts[0] + '@media (max-width: 768px)' + part2

    if orig != content:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
        count += 1

print(f"Centering/cropping fix applied to {count} files.")
