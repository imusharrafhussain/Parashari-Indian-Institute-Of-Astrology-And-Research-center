import os
import re

directory = r'd:\Parashari website new\AB_AI\courses'
html_files = [f for f in os.listdir(directory) if f.endswith('.html')]

css_to_insert = """
      .cvd-learn-item { width: 100%; max-width: 160px; text-align: center; }
      .cvd-learn-item-img-wrapper {
          width: 110px;
          height: 110px;
          border-radius: 50%;
          overflow: hidden;
          margin: 0 auto 15px auto;
          position: relative;
          background: #fff;
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
          border: 3px solid #c8960c;
          display: flex;
          align-items: center;
          justify-content: center;
      }
      .cvd-learn-item-img-wrapper img {
          max-width: none;
          width: auto;
          height: 140%;
          object-fit: cover;
          margin: 0;
          display: block;
      }
"""

count_modified = 0

for file_name in html_files:
    # Skip the one we already manually processed successfully if any, but running it again shouldn't hurt if we use careful regex
    file_path = os.path.join(directory, file_name)
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    
    # 1. Update the CSS for cvd-learn-item img
    # Pattern 1 (from Palmistry/Numerology)
    content = re.sub(r'\.cvd-learn-item img \{\s*max-width: [0-px]+;\s*height: auto;\s*margin-bottom: [0-px]+;\s*display: block;\s*margin-left: auto;\s*margin-right: auto;\s*\}', css_to_insert, content, count=1)
    
    # Pattern 2
    content = re.sub(r'\.cvd-learn-item img \{\s*width: [0-px]+;\s*height: [0-px]+;\s*object-fit: contain;\s*display: block;\s*margin: 0 auto 15px auto;\s*\}', css_to_insert, content, count=1)

    # Some pages might have slightly different spacing, so try a broader search if the above fails
    if css_to_insert not in content:
        # Broader match: looks for `.cvd-learn-item img { ... }` and replaces it
        content = re.sub(r'\.cvd-learn-item img \{[^}]+\}', css_to_insert, content, count=1)

    # 2. Update the HTML structure: Wrap <img> in <div class="cvd-learn-item-img-wrapper">
    # We only want to wrap it if it's NOT already wrapped.
    if 'cvd-learn-item-img-wrapper' not in original_content:
        # Match <div class="cvd-learn-item"> <img ...> <p>...</p> </div>
        # Use a robust regex to handle newlines
        content = re.sub(
            r'(<div class="cvd-learn-item">\s*)(<img[^>]+>)(\s*<p>.*?</p>\s*</div>)', 
            r'\1<div class="cvd-learn-item-img-wrapper">\n            \2\n          </div>\3', 
            content,
            flags=re.DOTALL
        )

    if content != original_content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        count_modified += 1

print(f"Modified {count_modified} files.")
