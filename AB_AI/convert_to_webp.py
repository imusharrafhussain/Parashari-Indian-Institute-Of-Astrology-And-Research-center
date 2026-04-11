import os
import glob
from PIL import Image

def convert_images():
    base_dir = r"d:\Parashari website new\AB_AI\assets\images-optimized"
    replacements = []
    
    for root, _, files in os.walk(base_dir):
        for file in files:
            ext = file.lower().split('.')[-1]
            if ext in ['png', 'jpg', 'jpeg']:
                original_path = os.path.join(root, file)
                filename_without_ext = '.'.join(file.split('.')[:-1])
                webp_path = os.path.join(root, filename_without_ext + '.webp')
                
                try:
                    with Image.open(original_path) as img:
                        img.save(webp_path, 'webp', quality=85)
                    os.remove(original_path)
                    print(f"Converted {file} -> {filename_without_ext}.webp")
                    
                    # Store for reference replacement (just the extension part to be safe)
                    # We will replace 'filename.png' with 'filename.webp'
                    replacements.append((file, filename_without_ext + '.webp'))
                except Exception as e:
                    print(f"Failed to convert {file}: {e}")
                    
    return replacements

def update_references(replacements):
    # Sort replacements by length descending to prevent partial matches
    replacements.sort(key=lambda x: len(x[0]), reverse=True)
    
    target_dirs = [
        r"d:\Parashari website new\AB_AI",
        r"d:\Parashari website new\AB_AI\assets\js",
        r"d:\Parashari website new\AB_AI\assets\css"
    ]
    
    for d in target_dirs:
        for ext in ['*.html', '*.js', '*.css']:
            for filepath in glob.glob(os.path.join(d, ext)):
                if os.path.isfile(filepath):
                    try:
                        with open(filepath, 'r', encoding='utf-8') as f:
                            content = f.read()
                        
                        original_content = content
                        for old_name, new_name in replacements:
                            # Safely replace assuming urls use exact filenames
                            # Only replacing .png/.jpg/.jpeg names
                            content = content.replace(old_name, new_name)
                            # Also handle url encoded versions like %20 just in case
                            content = content.replace(old_name.replace(' ', '%20'), new_name.replace(' ', '%20'))
                            
                        if original_content != content:
                            with open(filepath, 'w', encoding='utf-8') as f:
                                f.write(content)
                            print(f"Updated references in {os.path.basename(filepath)}")
                    except Exception as e:
                        pass # Ignore binary or encoding errors

if __name__ == '__main__':
    print("Starting conversion...")
    reps = convert_images()
    print("Updating workspace references...")
    update_references(reps)
    print("Done")
