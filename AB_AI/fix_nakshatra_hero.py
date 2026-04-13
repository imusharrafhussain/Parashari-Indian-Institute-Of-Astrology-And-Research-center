import glob
import re

for file in glob.glob(r'd:\Parashari website new\AB_AI\courses\nakshatra*.html'):
    with open(file, 'r', encoding='utf-8') as f:
        text = f.read()

    # We need to extract hook, btn, and save from cvd-hero-text
    # and put them into cvd-hero-bottom-text right after cvd-hero-container closing div
    
    # regex to match:
    # <div class="cvd-hero-text"> (part1: badge, title, subtitle) (part2: hook, btn, save) </div>
    # <div class="cvd-hero-img-wrap">...</div>
    # </div>
    
    # We will look for:
    # 1. Start of hook: <div class="cvd-hero-hook"
    # 2. End of save: <div class="cvd-hero-save">...</div> or similar
    
    match = re.search(r'(<div class="cvd-hero-hook".*?)(<div class="cvd-hero-img-wrap">)', text, re.DOTALL)
    if not match:
        continue
        
    hook_and_button_content = match.group(1)
    # The last part of hook_and_button_content contains a closing </div> for cvd-hero-text
    # Let's clean it up:
    parts = hook_and_button_content.rsplit('</div>\n', 1)
    if len(parts) != 2:
        parts = hook_and_button_content.rsplit('</div>', 1)
        
    if len(parts) == 2:
        inner_content = parts[0].strip()
        # remove it from its original place
        new_text = text.replace(match.group(1), '</div>\n' + match.group(2))
        
        # Now find the end of cvd-hero-container
        # It's right after cvd-hero-img-wrap closing div
        img_wrap_end = new_text.find('</div>', new_text.find('<div class="cvd-hero-img-wrap">')) + 6
        
        # Insert the bottom text
        bottom_html = f'''
<div class="cvd-hero-bottom-text" style="max-width: 800px; margin: 30px auto 0; text-align: center; padding: 0 20px; position: relative; z-index: 5;">
{inner_content}
</div>
'''
        new_text = new_text[:img_wrap_end] + bottom_html + new_text[img_wrap_end:]
        
        with open(file, 'w', encoding='utf-8') as f:
            f.write(new_text)

print("Updated Nakshatra hero layout")
