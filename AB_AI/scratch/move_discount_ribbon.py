from bs4 import BeautifulSoup
import os
import glob

# Files to process
html_files = [
    'd:/Parashari website new/AB_AI/index.html',
    'd:/Parashari website new/AB_AI/courses.html',
    'd:/Parashari website new/AB_AI/gemini-jyotish.html',
    'd:/Parashari website new/AB_AI/healing.html',
    'd:/Parashari website new/AB_AI/feng-shui.html',
    'd:/Parashari website new/AB_AI/student-section.html'
]
# Let's also include any other files that might have cards
all_files = glob.glob('d:/Parashari website new/AB_AI/*.html')
for f in all_files:
    if f.replace('\\', '/') not in [x.replace('\\', '/') for x in html_files]:
        html_files.append(f)

for fpath in html_files:
    if not os.path.exists(fpath):
        continue
    
    with open(fpath, 'r', encoding='utf-8') as f:
        html_content = f.read()
        
    soup = BeautifulSoup(html_content, 'html.parser')
    modified = False
    
    # Process all elements with class 'discount-tag'
    discount_tags = soup.find_all('span', class_='discount-tag')
    
    if discount_tags:
        for tag in discount_tags:
            # Get the parent premium-gold-card or similar
            parent_card = tag.find_parent('div', class_='premium-gold-card')
            if not parent_card:
                # Some might just be in other card types, fallback
                parent_card = tag.find_parent('div')
            
            # Find the h4 with price
            if parent_card:
                h4_price = parent_card.find('h4', class_='color-secondary')
                if h4_price:
                    # Move discount tag info
                    discount_text = tag.get('data-discount', '25% Discount')
                    # Standardize to "25% OFF"
                    discount_percentage = discount_text.split(' ')[0] # e.g. "25%"
                    
                    # Ensure we don't add it twice
                    if f">{discount_percentage} OFF</span>" not in str(h4_price):
                        # Create new span
                        new_span = soup.new_tag('span')
                        new_span.string = f"{discount_percentage} OFF"
                        new_span['style'] = "background: rgba(239, 68, 68, 0.1); color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.2); padding: 2px 8px; border-radius: 99px; font-size: 0.65em; font-weight: 800; margin-left: 6px; vertical-align: middle;"
                        
                        # Set h4 styles to handle flex layout better if needed, but inline block is okay
                        h4_price.append(new_span)
                        
                        # Remove the original ribbon tag
                        tag.decompose()
                        modified = True

    if modified:
        with open(fpath, 'w', encoding='utf-8') as f:
            f.write(str(soup))
        print(f"Updated discount tags in {os.path.basename(fpath)}")
