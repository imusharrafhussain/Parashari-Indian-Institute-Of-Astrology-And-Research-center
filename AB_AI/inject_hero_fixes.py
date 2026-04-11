import re

with open(r'd:\Parashari website new\AB_AI\assets\js\level-data.js', 'r', encoding='utf-8') as f:
    text = f.read()

def process_block(match):
    block = match.group(0)
    
    # We want to replace .cvd-hero-container or .ld-hero-grid with column-reverse
    # First, let's see which prefix it uses for hero container
    if '.ld-hero-grid' in block or '.ld-hero-grid {' in text[max(0, match.start()-2000):match.start()]:
        prefix = 'ld'
        container_class = '.ld-hero-grid'
        text_class = '.ld-hero-text'
        img_wrap_class = '.ld-hero-image'
        img_class = '.ld-hero-image img'
    elif '.cvd-hero-container' in block or '.cvd-hero-container {' in text[max(0, match.start()-2000):match.start()]:
        prefix = 'cvd'
        container_class = '.cvd-hero-container'
        text_class = '.cvd-hero-text'
        img_wrap_class = '.cvd-hero-img-wrap'
        img_class = '.cvd-hero-img-wrap img'
    else:
        return block
        
    hero_css = f'''{container_class} {{ flex-direction: column-reverse; text-align: center; }}
        {text_class} {{ padding-top: 10px; padding-bottom: 20px; }}
        {img_wrap_class} {{ position: relative; width: 100%; height: auto; justify-content: center; transform: none; margin-top: 20px; }}
        {img_class} {{ width: 100%; height: auto; max-width: 450px; margin: 0 auto; transform: none; object-position: center; object-fit: contain; }}'''
        
    # Remove any existing rules for these classes inside the @media body
    body = match.group(1)
    
    # We want to keep everything except the rules for container_class, text_class, img_wrap_class, and img_class
    import re
    # Remove any rule that starts with the container_class etc.
    classes_to_remove = [container_class, text_class, img_wrap_class, img_class]
    for cls in classes_to_remove:
        # Regex to match class { ... } inside the block
        cls_escaped = cls.replace('.', '\\.')
        pattern = cls_escaped + r'\s*\{[^}]*\}'
        body = re.sub(pattern, '', body)
        
    # Then append our new hero_css at the beginning of the body
    new_body = f"\n        {hero_css}\n" + body
    
    return f"@media (max-width: 768px) {{{new_body}}}"

new_text = re.sub(r'@media\s*\(max-width:\s*768px\)\s*\{([\s\S]*?)\}', process_block, text)

with open(r'd:\Parashari website new\AB_AI\assets\js\level-data.js', 'w', encoding='utf-8') as f:
    f.write(new_text)

print("Injected targeted hero fixes.")
