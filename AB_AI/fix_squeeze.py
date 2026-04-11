import glob
import re

html_files = glob.glob('courses/*.html')
js_files = glob.glob('assets/js/*.js')

count = 0

for file in html_files + js_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    new_content = content.replace(
        '.cvd-learn-item img { max-width: 70px; }', 
        '.cvd-learn-item img { max-width: 90px; height: 90px; object-fit: cover; }'
    )
    
    # Also find Reiki specific issue where hero image is not centered due to flex layout
    # In mobile view: .cvd-hero-img-wrap { position: relative; width: 100%; height: auto; justify-content: center; transform: none; margin-top: 0; pointer-events: auto; }
    # Let's ensure it has display: flex and align-items: center
    # And maybe for reiki specifically, the image needs scale or different object-position
    
    # Let's force proper flex centering on ALL mobile hero wraps just in case:
    new_content = new_content.replace(
        '.cvd-hero-img-wrap { position: relative; width: 100%; height: auto; justify-content: center; transform: none; margin-top: 0; pointer-events: auto; }',
        '.cvd-hero-img-wrap { display: flex; align-items: center; justify-content: center; position: relative; width: 100%; height: auto; transform: none; margin-top: 0; pointer-events: auto; }'
    )

    if content != new_content:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(new_content)
        count += 1

print(f"Fixed image squeeze and flex align in {count} files.")
