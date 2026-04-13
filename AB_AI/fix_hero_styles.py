import glob
import re

count_modified = 0

for file in glob.glob(r'd:\Parashari website new\AB_AI\courses\*.html'):
    with open(file, 'r', encoding='utf-8') as f:
        text = f.read()

    original_text = text
    
    # Let's remove the inline style from the hero image specifically for Nakshatra or anyone using it
    # <img alt="..." src="..." style="border-radius: 50%; box-shadow: 0 0 20px rgba(0,0,0,0.1); width: 100%; height: 380px; max-width:380px; object-fit: cover;"/>
    
    # Find cvd-hero-img-wrap
    # inside it, if img has style=..., remove the style tag completely
    
    def replacer(match):
        wrap_start = match.group(1)
        img_tag = match.group(2)
        # remove style="..." from img_tag
        img_tag_cleaned = re.sub(r'\s*style="[^"]*"', '', img_tag)
        return wrap_start + img_tag_cleaned

    text = re.sub(r'(<div class="cvd-hero-img-wrap">\s*)(<img[^>]+>)', replacer, text)
    
    if text != original_text:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(text)
        count_modified += 1

print(f"Removed inline style from hero images in {count_modified} files.")
