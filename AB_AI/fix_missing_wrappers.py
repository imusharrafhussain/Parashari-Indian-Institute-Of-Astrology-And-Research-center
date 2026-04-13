import os
from bs4 import BeautifulSoup

directory = r'd:\Parashari website new\AB_AI\courses'
html_files = [f for f in os.listdir(directory) if f.endswith('.html')]

count_modified = 0

for file_name in html_files:
    file_path = os.path.join(directory, file_name)
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # We only care about files that have cvd-learn-item but we might have missed wrapping them
    if 'cvd-learn-item' not in content:
        continue
        
    soup = BeautifulSoup(content, 'html.parser')
    modified = False
    
    items = soup.find_all(class_='cvd-learn-item')
    for item in items:
        # Check if the image is already wrapped
        img = item.find('img')
        if not img:
            continue
            
        parent = img.parent
        if 'cvd-learn-item-img-wrapper' not in parent.get('class', []):
            # Create wrapper
            wrapper = soup.new_tag('div', **{'class': 'cvd-learn-item-img-wrapper'})
            img.wrap(wrapper)
            modified = True

    # One more thing to fix: the `test_wrapper.py` removed `.cvd-learn-item img` and added the `.cvd-learn-item-img-wrapper img`.
    # Let's ensure the fallback CSS for `.cvd-learn-item img` is restored JUST in case, 
    # but the wrappers will make it unnecessary.
    
    if modified:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(str(soup))
        count_modified += 1

print(f"Wrapped elements in {count_modified} files.")
