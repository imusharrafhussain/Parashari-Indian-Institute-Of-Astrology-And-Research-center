import glob
import re

for file in glob.glob(r'd:\Parashari website new\AB_AI\courses\rudraksha*.html'):
    with open(file, 'r', encoding='utf-8') as f:
        text = f.read()
        
    # Remove the legacy .premium-hero style block completely.
    # It starts with <style>\s*/* Modern Premium Template Styles */ or just <style>\s*\.premium-hero
    text = re.sub(r'<style>\s*/\* Modern Premium Template Styles \*/.*?</style>', '', text, flags=re.DOTALL)
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(text)

for file in glob.glob(r'd:\Parashari website new\AB_AI\courses\nakshatra*.html'):
    with open(file, 'r', encoding='utf-8') as f:
        text = f.read()
        
    # Same for nakshatra if it has it
    text = re.sub(r'<style>\s*/\* Modern Premium Template Styles \*/.*?</style>', '', text, flags=re.DOTALL)
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(text)

print("Cleaned up legacy unused CSS.")
