import os
import glob

files = glob.glob('d:/Parashari website new/AB_AI/crash-courses/*.html')
files.append('d:/Parashari website new/AB_AI/archive/plrt.html')

search_str = '''            border-radius: 1rem;
            padding: 1.25rem;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1), 0 0 15px rgba(204, 163, 56, 0.2);'''

replace_str = '''            border-radius: 1rem;
            padding: 1.25rem;
            box-sizing: border-box;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1), 0 0 15px rgba(204, 163, 56, 0.2);'''

for filepath in files:
    if not os.path.exists(filepath): continue
    with open(filepath, 'r', encoding='utf-8') as file:
        content = file.read()
        
    if search_str in content:
        new_content = content.replace(search_str, replace_str)
        with open(filepath, 'w', encoding='utf-8') as file:
            file.write(new_content)
        print(f"Updated: {os.path.basename(filepath)}")
    else:
        print(f"Skipped/already updated: {os.path.basename(filepath)}")
