import os, re
courses = ['numerology', 'reiki', 'tarot', 'nakshatra', 'vastu', 'rudraksha', 'palmistry']
base = r'd:\Parashari website new\AB_AI'

for c in courses:
    path = os.path.join(base, 'courses', f'{c}-diploma.html')
    if os.path.exists(path):
        text = open(path, encoding='utf-8').read()
        images = set(re.findall(r'<img[^>]+src=["\']([^"\']+)["\']', text))
        for img in images:
            if 'images-optimized' in img:
                local_path = img.replace('../', base + '\\').replace('/', '\\')
                if not os.path.exists(local_path):
                    print(f'{c}: MISSING -> {img}')
