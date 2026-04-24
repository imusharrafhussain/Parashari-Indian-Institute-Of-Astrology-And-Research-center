import os
from PIL import Image

# Directory to process
base_dir = r"D:\Parashari website new\AB_AI"

# File extensions to convert
extensions = ('.jpg', '.jpeg', '.png')

# Keep track of old to new paths to update files
replacements = []

def convert_and_delete():
    for root, dirs, files in os.walk(base_dir):
        # Skip node_modules or .git if any
        if 'node_modules' in root or '.git' in root or 'assets\\images-optimized' in root and False:
            continue
            
        for file in files:
            if file.lower().endswith(extensions):
                filepath = os.path.join(root, file)
                
                # Exclude some things if needed, but the user said "all the images used in this project"
                
                # WebP path
                base_name, ext = os.path.splitext(file)
                webp_file = base_name + '.webp'
                webp_path = os.path.join(root, webp_file)
                
                # In case file is already named .jpg.jpeg, let's fix it properly
                if file.lower().endswith('.jpg.jpeg'):
                    base_name = file[:-9]
                    webp_file = base_name + '.webp'
                    webp_path = os.path.join(root, webp_file)
                
                try:
                    img = Image.open(filepath)
                    # Convert to RGB if PNG with alpha to save as WebP without issues, though WebP supports alpha
                    # Actually, Pillow handles it well.
                    img.save(webp_path, 'WEBP', quality=85)
                    print(f"Converted {file} to {webp_file}")
                    
                    # Store for string replacement
                    # We need relative paths like 'Education/Bach/Nakshtra.jpg' -> 'Education/Bach/Nakshtra.webp'
                    # But since files could be referenced just by name or partial path, let's just do exact string replacements
                    # Wait, 'PALMSTRY.jpg.jpeg' was a file name!
                    
                    replacements.append((file, webp_file))
                    
                    img.close()
                    # Remove original
                    os.remove(filepath)
                except Exception as e:
                    print(f"Failed {filepath}: {e}")

convert_and_delete()

print("Replacing in HTML/JS/CSS files...")
def replace_in_files():
    # To avoid replacing 'file.jpg' inside another 'some_other_file.jpg', we should be careful.
    # Actually, replacing exactly the original filename with the new filename is mostly safe if the filenames are distinct.
    # Let's group by length descending to prevent partial matches if any.
    sorted_reps = sorted(replacements, key=lambda x: len(x[0]), reverse=True)
    
    for root, dirs, files in os.walk(base_dir):
        if 'node_modules' in root or '.git' in root:
            continue
        for file in files:
            if file.lower().endswith(('.html', '.js', '.css')):
                filepath = os.path.join(root, file)
                try:
                    with open(filepath, 'r', encoding='utf-8') as f:
                        content = f.read()
                        
                    new_content = content
                    for old_name, new_name in sorted_reps:
                        # Sometimes paths are URL encoded, but usually they match exact in src=""
                        new_content = new_content.replace(old_name, new_name)
                        
                    if new_content != content:
                        with open(filepath, 'w', encoding='utf-8') as f:
                            f.write(new_content)
                        print(f"Updated references in {file}")
                except Exception as e:
                    print(f"Could not read/write {filepath}: {e}")

replace_in_files()
print("Done.")
