import glob
import re
import os

courses_to_revert = [
    'vedic-astrology',
    'palmistry',
    'vastu'
]

count_modified = 0

directory = r'd:\Parashari website new\AB_AI\courses'
html_files = [f for f in os.listdir(directory) if f.endswith('.html')]

for file_name in html_files:
    # Check if the file matches one of the courses to revert
    if not any(course in file_name for course in courses_to_revert):
        continue
        
    file_path = os.path.join(directory, file_name)
    with open(file_path, 'r', encoding='utf-8') as f:
        text = f.read()

    original_text = text
    
    # We want to remove the wrapper HTML
    # <div class="cvd-learn-item-img-wrapper"><img src="..."></div>
    # into just <img src="...">
    
    text = re.sub(
        r'<div class="cvd-learn-item-img-wrapper">\s*(<img[^>]+>)\s*</div>',
        r'\1',
        text
    )
    
    # We want to remove the custom CSS block for the wrapper
    # and restore a simplistic one if needed, but since we're stripping the wrapper class
    # we should just restore `.cvd-learn-item img` to what it was.
    
    # Removing the CSS block injected
    css_to_remove_pattern = r'\.cvd-learn-item \{ width: 100%; max-width: 160px; text-align: center; \}\s*\.cvd-learn-item-img-wrapper \{.*?\.cvd-learn-item-img-wrapper img \{.*?\}'
    
    # Replace with simple styling for the img
    restored_css = '''
      .cvd-learn-item { width: 100%; max-width: 160px; text-align: center; }
      .cvd-learn-item img {
          width: 120px;
          height: 120px;
          object-fit: contain;
          margin: 0 auto 15px auto;
          display: block;
      }
'''
    
    # We'll use regex to find the injected block and replace it
    text = re.sub(css_to_remove_pattern, restored_css, text, flags=re.DOTALL)
    
    if text != original_text:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(text)
        count_modified += 1

print(f"Reverted wrappers in {count_modified} files.")
