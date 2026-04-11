import os
import re

dir_path = "d:/Parashari website new/AB_AI"

# 1. Update level-data.js
js_path = os.path.join(dir_path, 'assets', 'js', 'level-data.js')
with open(js_path, 'r', encoding='utf-8') as f:
    text = f.read()

def update_diploma(match):
    block = match.group(0)
    block = block.replace('duration: "8 Weeks"', 'duration: "6 Weeks"')
    return block

def update_bachelors(match):
    block = match.group(0)
    block = block.replace('duration: "12 Weeks"', 'duration: "8 Weeks"')
    return block

def update_masters(match):
    block = match.group(0)
    block = block.replace('duration: "16 Weeks"', 'duration: "12 Weeks"')
    return block

# Replace within the specific nested structures
text = re.sub(r'diploma:\s*\{.*?applications:\s*\[.*?\]\s*\}', update_diploma, text, flags=re.DOTALL)
text = re.sub(r'bachelors:\s*\{.*?applications:\s*\[.*?\]\s*\}', update_bachelors, text, flags=re.DOTALL)
text = re.sub(r'masters:\s*\{.*?applications:\s*\[.*?\]\s*\}', update_masters, text, flags=re.DOTALL)

# Let's fix the hardcoded "Save 24% Today" and "Duration: 8 Weeks" in string literals
# It's better to use variable injection
text = re.sub(
    r'Save (\d+)% Today(.*?)Duration: (\d+) Weeks', 
    r'Save ${Math.round((parseInt(prices.old.replace(/[^0-9]/g, \'\')) - parseInt((prices.save || prices.newPrice).replace(/[^0-9]/g, \'\')))/parseInt(prices.old.replace(/[^0-9]/g, \'\')) * 100)}% Today\2Duration: ${levelConfig.duration}', 
    text
)
# And cases with "Off Today"
text = re.sub(
    r'(\d+)% Off Today(.*?)8 Weeks Program', 
    r'${Math.round((parseInt(prices.old.replace(/[^0-9]/g, \'\')) - parseInt((prices.save || prices.newPrice).replace(/[^0-9]/g, \'\')))/parseInt(prices.old.replace(/[^0-9]/g, \'\')) * 100)}% Off Today\2 ${levelConfig.duration} Program', 
    text
)
# And cases with just "Duration: 8 Weeks"
text = re.sub(
    r'Duration: (\d+) Weeks', 
    r'Duration: ${levelConfig.duration}', 
    text
)

# Fix FAQ generic duration
text = text.replace('paced over 6 to 8 weeks', 'paced over the designated duration')

with open(js_path, 'w', encoding='utf-8') as f:
    f.write(text)

print("Updated level-data.js")

# 2. Update specific hardcoded strings in HTML files based on tier
html_files = sorted([f for f in os.listdir(dir_path) if f.endswith('.html')])

for fname in html_files:
    fpath = os.path.join(dir_path, fname)
    with open(fpath, 'r', encoding='utf-8') as f:
        html = f.read()
    
    modified = False

    # A lot of pricing blocks have specific structures we can target
    # Bachelors: 12 Weeks -> 8 Weeks. Masters: 16 Weeks -> 12 Weeks.
    
    if '<h4 class="color-primary header-sm">Pro Bachelors</h4>' in html or '<h3 class="tier-name">Bachelors</h3>' in html:
        # For fee-structure mostly or index
        if '<p class="card-small-text">12 Weeks</p>' in html:
            html = html.replace('<p class="card-small-text">12 Weeks</p>', '<p class="card-small-text">8 Weeks</p>')
            modified = True
            
        # If it's a Bachelors card with a 24% discount tag, we should change it to 25%
        # It's tricky to replace just the bachelors one without parsing HTML if they are generic.
        # But wait! fee-structure.html has generic structure. Let's do it simply:
        
    if 'fee-structure.html' == fname:
        # fee-structure shows all cards. 
        # Bachelors card:
        html = re.sub(r'(<h4[^>]*>Pro Bachelors</h4>.*?)(<span class="discount-tag">)24% OFF(</span>)', r'\g<1>\g<2>25% OFF\g<3>', html, flags=re.DOTALL)
        # Elite Grand Master card:
        html = re.sub(r'(<h4[^>]*>Elite Grand Master</h4>.*?)(<span class="discount-tag">)24% OFF(</span>)', r'\g<1>\g<2>29% OFF\g<3>', html, flags=re.DOTALL)
        modified = True

    if 'index.html' == fname:
        # Pro Bachelors
        html = re.sub(r'(<h4[^>]*>Pro Bachelors</h4>.*?)12 Weeks(</p>)', r'\g<1>8 Weeks\g<2>', html, flags=re.DOTALL)
        modified = True

    if 'courses.html' == fname:
        # In courses.html:
        html = re.sub(r'(<h3[^>]*>Pro Bachelors.*?)(<span class="discount-tag">)24% OFF(</span>)', r'\g<1>\g<2>25% OFF\g<3>', html, flags=re.DOTALL)
        html = re.sub(r'(<h3[^>]*>Pro Bachelors.*?)12 Weeks(</li>)', r'\g<1>8 Weeks\g<2>', html, flags=re.DOTALL)
        
        html = re.sub(r'(<h3[^>]*>Elite Grand Master.*?)(<span class="discount-tag">)24% OFF(</span>)', r'\g<1>\g<2>29% OFF\g<3>', html, flags=re.DOTALL)
        modified = True

    if modified:
        with open(fpath, 'w', encoding='utf-8') as f:
            f.write(html)
        print(f"Updated {fname}")

print("Complete")
