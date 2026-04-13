import os
import glob
import re

css_desktop_old_pattern1 = r'\.cvd-learn-item-img-wrapper\s*\{[^\}]+\}\s*\.cvd-learn-item-img-wrapper img\s*\{[^\}]+\}'
css_desktop_old_pattern2 = r'\.cvd-learn-item img\s*\{[^\}]+\}'

css_desktop_new = """      .cvd-learn-item { width: 100%; max-width: 160px; text-align: center; }
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
      }"""

# For mobile handling
def replace_mobile_css(content):
    # It usually looks like:
    # .cvd-learn-item { max-width: 140px; }
    # .cvd-learn-item img { max-width: 90px; height: 90px; object-fit: cover; }
    pattern = r'\.cvd-learn-item img\s*\{\s*max-width:\s*\d+px;\s*height:\s*\d+px;\s*object-fit:\s*cover;\s*\}'
    replacement = '''.cvd-learn-item-img-wrapper { width: 90px; height: 90px; }
        .cvd-learn-item-img-wrapper img { max-width: none; width: auto; height: 140%; }'''
    if re.search(pattern, content):
        content = re.sub(pattern, replacement, content)
    else:
        # try another pattern
        pattern2 = r'\.cvd-learn-item img\s*\{\s*max-width:\s*\d+px;\s*height:\s*\d+px;\s*object-fit:\s*contain;\s*\}'
        content = re.sub(pattern2, replacement, content)
        # Or something like .cvd-learn-item-img-wrapper img { ... } inside media query
    return content

files_to_check = glob.glob(r'd:\Parashari website new\AB_AI\courses\*.html') + glob.glob(r'd:\Parashari website new\AB_AI\*.html')

count = 0
for filepath in files_to_check:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    orig = content
    
    # Replace desktop CSS (the block with cvd-learn-item-img-wrapper)
    pattern = r'\.cvd-learn-item-img-wrapper\s*\{[^}]+\}\s*\.cvd-learn-item-img-wrapper img\s*\{[^}]+\}'
    if re.search(pattern, content):
        content = re.sub(pattern, css_desktop_new, content)
    else:
        # Try finding the flat img one
        pattern3 = r'\.cvd-learn-item img\s*\{[^}]+\}'
        # careful to only replace the first occurrence or the one near cvd-learn-item {
        # Actually better to rely on regex targeting the specific structure
        pass
        
    # Replace HTML missing wrappers:
    html_pattern = r'(<div class="cvd-learn-item">\s*)(<img[^>]+>)(\s*<p>.*?</p>\s*</div>)'
    if re.search(html_pattern, content, flags=re.DOTALL):
        content = re.sub(
            html_pattern, 
            r'\1<div class="cvd-learn-item-img-wrapper">\n            \2\n          </div>\3', 
            content,
            flags=re.DOTALL
        )
        
    content = replace_mobile_css(content)

    if content != orig:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        count += 1

print(f"Updated {count} files.")
