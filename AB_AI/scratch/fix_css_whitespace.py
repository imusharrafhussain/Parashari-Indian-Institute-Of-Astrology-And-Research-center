import re

path_courses = 'd:/Parashari website new/AB_AI/courses.html'
with open(path_courses, 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Strip the inline object-fit styles from HTML tags completely
text = re.sub(r'style=[\"\']\s*object-fit:\s*contain\s*!important;?\s*[\"\']', '', text)

# 2. Update the embedded stylesheet for courses.html
def replace_container(match):
    return '.course-grid-3col .premium-gold-card .card-image-container {\n      height: auto !important;\n      aspect-ratio: auto !important;\n      line-height: 0;\n      display: block;\n      background: transparent !important;\n    }'
text = re.sub(r'\.course-grid-3col \.premium-gold-card \.card-image-container\s*\{[^}]+\}', replace_container, text)

with open(path_courses, 'w', encoding='utf-8') as f:
    f.write(text)

path_main = 'd:/Parashari website new/AB_AI/assets/css/main.css'
with open(path_main, 'r', encoding='utf-8') as f:
    main_text = f.read()

def replacer_container_main(m):
    return '.grid-responsive .premium-gold-card .card-image-container {\n  width: 100%;\n  height: auto !important;\n  aspect-ratio: auto !important;\n  overflow: hidden;\n  position: relative;\n  flex-shrink: 0;\n  background-color: transparent;\n  display: block;\n  line-height: 0;\n}'
main_text = re.sub(r'\.grid-responsive \.premium-gold-card \.card-image-container\s*\{[^}]+\}', replacer_container_main, main_text)

with open(path_main, 'w', encoding='utf-8') as f:
    f.write(main_text)

print('Successfully cleaned up aspect-ratio and inline style locks.')
