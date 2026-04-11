import os
import re

with open('level-detail.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract header
header_match = re.search(r'(<div class="header-top">.*?</header>)', content, re.DOTALL)
if header_match:
    os.makedirs('components', exist_ok=True)
    with open('components/navbar.html', 'w', encoding='utf-8') as fh:
        fh.write(header_match.group(1))

# Extract marquee
marquee_match = re.search(r'(<div class="urgency-marquee-container">.*?</div>\s*</div>)', content, re.DOTALL)
if marquee_match:
    with open('components/marquee.html', 'w', encoding='utf-8') as fm:
        fm.write(marquee_match.group(1))

# Extract footer
footer_match = re.search(r'(<footer>.*?</footer>)', content, re.DOTALL)
if footer_match:
    with open('components/footer.html', 'w', encoding='utf-8') as ff:
        ff.write(footer_match.group(1))

print('Components extracted!')
