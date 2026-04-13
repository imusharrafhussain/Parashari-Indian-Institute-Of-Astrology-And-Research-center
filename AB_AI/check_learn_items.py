import os
import re

directory = r"d:\Parashari website new\AB_AI\courses"
html_files = [f for f in os.listdir(directory) if f.endswith('.html')]

files_with_learn_items = 0

for file in html_files:
    file_path = os.path.join(directory, file)
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if 'cvd-learn-item' in content:
        files_with_learn_items += 1

print(f"Total HTML files: {len(html_files)}")
print(f"Files with cvd-learn-item: {files_with_learn_items}")
