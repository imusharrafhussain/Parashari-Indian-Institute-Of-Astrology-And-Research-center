import glob
import os
import shutil
import re

# 1. Fix Nakshatra Hero Oval
for file in glob.glob(r'd:\Parashari website new\AB_AI\courses\nakshatra*.html'):
    with open(file, 'r', encoding='utf-8') as f:
         text = f.read()
    orig = text
    text = text.replace('border-radius: 50% !important;', 'border-radius: 12px;')
    if orig != text:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(text)

# 2. Fix Palmistry Redundant Text
for file in glob.glob(r'd:\Parashari website new\AB_AI\courses\palmistry*.html'):
    with open(file, 'r', encoding='utf-8') as f:
         text = f.read()
    orig = text
    if '.cvd-learn-item p { display: none !important; }' not in text:
        text = text.replace('</style>', '      .cvd-learn-item p { display: none !important; }\n    </style>')
    if orig != text:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(text)

# 3. Fix Icon sizes for Vastu, Palmistry, Vedic Astrology
courses_to_resize = ['vedic-astrology', 'palmistry', 'vastu']
for file in glob.glob(r'd:\Parashari website new\AB_AI\courses\*.html'):
    if not any(course in file for course in courses_to_resize):
        continue
    with open(file, 'r', encoding='utf-8') as f:
         text = f.read()
    orig = text
    # The previous script set: width: 120px; height: 120px;
    # We will increase it to 170px to make them appropriately sized
    text = text.replace('width: 120px;\n          height: 120px;', 'width: 170px;\n          height: 170px;')
    if orig != text:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(text)

# 4. Fix Rudraksha Issues
# First, remove wrappers for Rudraksha like we did for others
for file in glob.glob(r'd:\Parashari website new\AB_AI\courses\rudraksha*.html'):
    with open(file, 'r', encoding='utf-8') as f:
         text = f.read()
    orig = text
    
    # Revert 'What you will learn' wrappers for Rudraksha
    text = re.sub(
        r'<div class="cvd-learn-item-img-wrapper">\s*(<img[^>]+>)\s*</div>',
        r'\1',
        text
    )
    
    # Remove wrapper css and add base css for Rudraksha
    css_to_remove_pattern = r'\.cvd-learn-item \{ width: 100%; max-width: 160px; text-align: center; \}\s*\.cvd-learn-item-img-wrapper \{.*?\.cvd-learn-item-img-wrapper img \{.*?\}'
    restored_css = '''
      .cvd-learn-item { width: 100%; max-width: 180px; text-align: center; }
      .cvd-learn-item img {
          width: 160px;
          height: 160px;
          object-fit: contain;
          margin: 0 auto 15px auto;
          display: block;
      }
'''
    text = re.sub(css_to_remove_pattern, restored_css, text, flags=re.DOTALL)
    
    # Fix 3col truncated images and rename .jpeg extension
    # We change height: 220px; object-fit: cover; to height: auto; object-fit: contain;
    text = text.replace('height: 220px; object-fit: cover;', 'height: auto; max-height: 250px; object-fit: contain;')
    
    # Replace .jpeg with .jpg to bypass caching or loading issues
    text = text.replace('rudraksha-deepen.jpeg', 'rudraksha-deepen.jpg')
    text = text.replace('rudraksha-protect.jpeg', 'rudraksha-protect.jpg')
    
    if orig != text:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(text)

print("Batch fixes applied!")
