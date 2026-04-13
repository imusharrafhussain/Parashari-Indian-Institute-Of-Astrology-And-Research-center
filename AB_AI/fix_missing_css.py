import os

base_dir = r'd:\Parashari website new\AB_AI\courses'

# 1. Read Vedic
with open(os.path.join(base_dir, 'vedic-astrology-diploma.html'), 'r', encoding='utf-8') as f:
    vedic = f.read()
    
# Extract the missing block from vedic:
# From `.cvd-section {` up to (but not including) `.cvd-learn-grid {`
# Wait, let's just grab the block between `.cvd-hero-img-wrap img { ... }` and `.cvd-learn-grid {`
start_marker = '.cvd-section {'
end_marker = '.cvd-learn-grid {'

start_idx = vedic.find(start_marker)
end_idx = vedic.find(end_marker)

missing_css = vedic[start_idx:end_idx]

# 2. Inject into Numerology pages
for level in ['diploma', 'bachelors', 'masters']:
    path = os.path.join(base_dir, f'numerology-{level}.html')
    if not os.path.exists(path): continue
    
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    if '.cvd-3col {' not in content[:content.find('@media (max-width: 1300px)')] and missing_css:
        # insert right before cvd-learn-grid
        insert_idx = content.find('.cvd-learn-grid { display: grid;')
        if insert_idx != -1:
            content = content[:insert_idx] + missing_css + '\n      ' + content[insert_idx:]
            with open(path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f'Fixed missing CSS for numerology-{level}')

