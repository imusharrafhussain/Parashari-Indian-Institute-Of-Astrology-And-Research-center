import os
import re

dir_path = "d:/Parashari website new/AB_AI"

def fix_fee_structure():
    path = os.path.join(dir_path, 'fee-structure.html')
    with open(path, 'r', encoding='utf-8') as f:
        html = f.read()

    # The rows are identified by categories:
    # 🎓 Bachelor -> 12 Weeks (should be 8)
    html = re.sub(r'(🎓 Bachelor.*?<i[^>]*>\s*</i>\s*)12 Weeks', r'\g<1>8 Weeks', html, flags=re.DOTALL)
    
    # 🎓 Master -> 16 Weeks (should be 12)
    html = re.sub(r'(🎓 Master.*?<i[^>]*>\s*</i>\s*)16 Weeks', r'\g<1>12 Weeks', html, flags=re.DOTALL)
    
    # 🎓 Diploma -> 8 Weeks (should be 6)
    html = re.sub(r'(🎓 Diploma.*?<i[^>]*>\s*</i>\s*)8 Weeks', r'\g<1>6 Weeks', html, flags=re.DOTALL)
    
    with open(path, 'w', encoding='utf-8') as f:
        f.write(html)
    print("Fixed fee-structure.html")

def fix_index():
    path = os.path.join(dir_path, 'index.html')
    with open(path, 'r', encoding='utf-8') as f:
        html = f.read()
    
    # Pro Bachelors is 25% discount, not 24%
    html = re.sub(r'(<h4[^>]*>Pro Bachelors</h4>.*?data-discount=")(?:24%|25%|29%) Discount(">)', r'\g<1>25% Discount\g<2>', html, flags=re.DOTALL)
    html = re.sub(r'(<h4[^>]*>Pro Bachelors</h4>.*?)12 Weeks', r'\g<1>8 Weeks', html, flags=re.DOTALL)

    # Elite Grand Master is 29% discount
    html = re.sub(r'(<h4[^>]*>Elite Grand Master</h4>.*?data-discount=")(?:24%|25%|29%) Discount(">)', r'\g<1>29% Discount\g<2>', html, flags=re.DOTALL)

    # Diploma is 24% (already correct)

    with open(path, 'w', encoding='utf-8') as f:
        f.write(html)
    print("Fixed index.html")

def fix_static_course_files():
    html_files = [f for f in os.listdir(dir_path) if f.endswith('.html')]
    for fname in html_files:
        if fname in ['index.html', 'fee-structure.html', 'courses.html']:
            continue
        
        path = os.path.join(dir_path, fname)
        with open(path, 'r', encoding='utf-8') as f:
            html = f.read()
            
        modified = False
        
        # Check if they have the specific comparison grid with tier-bachelors / tier-masters
        # Fix the 24% discount text if it appears statically
        if 'Save 24% Today' in html:
            # We don't generally have random "Save 24% Today" in static htmls except maybe injected.
            pass
            
        # Update any hardcoded "24% OFF" for specific tiers in card grids
        if '<div class="tier-card tier-bachelors"' in html:
            # Check for any "24% OFF" inside the bachelors card block
            # Actually they don't have "24% OFF" inside the bachelors card in astrology.html
            pass

        if modified:
            with open(path, 'w', encoding='utf-8') as f:
                f.write(html)
            print(f"Fixed {fname}")

def verify_js():
    path = os.path.join(dir_path, 'assets', 'js', 'level-data.js')
    with open(path, 'r', encoding='utf-8') as f:
        js = f.read()

    # Re-enforce replacements
    updated = False
    
    # We already converted `duration: "8 Weeks"` to `duration: "6 Weeks"` for diploma in previous script.
    
    # Just in case, ensure no "Duration: 8 Weeks" literal strings are left
    if 'Duration: 8 Weeks' in js:
        js = js.replace('Duration: 8 Weeks', 'Duration: ${levelConfig.duration}')
        updated = True
        
    if updated:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(js)
        print("Fixed level-data.js")

if __name__ == '__main__':
    fix_fee_structure()
    fix_index()
    fix_static_course_files()
    verify_js()
