import os

base_dir = r'd:\Parashari website new\AB_AI\courses'
courses = ['numerology', 'vastu', 'reiki', 'tarot', 'nakshatra', 'rudraksha', 'palmistry']

css_to_inject = """
      .cvd-learn-grid { display: grid; grid-template-columns: repeat(3, 1fr); justify-items: center; align-items: start; gap: 20px; margin-top: 40px; max-width: 1200px; margin-left: auto; margin-right: auto; }
      .cvd-learn-grid.cvd-learn-fullwidth { grid-template-columns: repeat(6, 1fr); }
"""

for c in courses:
    for level in ['diploma', 'bachelors', 'masters']:
        path = os.path.join(base_dir, f'{c}-{level}.html')
        if not os.path.exists(path): continue
        
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        if '.cvd-learn-grid {' not in content:
            # find a good place to insert it in the CSS block, e.g., right before .cvd-learn-item
            idx = content.find('.cvd-learn-item {')
            if idx != -1:
                content = content[:idx] + css_to_inject + content[idx:]
                with open(path, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"Fixed CSS for {filename}")

