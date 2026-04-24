import os
import json
import re

files_dir = 'd:/Parashari website new/AB_AI/crash-courses/'

module_data = {
    "cc-vedic-numerology.html": [
        {"id": 1, "title": "Foundations of Numerology", "topics": ["Introduction to Numerology: Differences between Vedic and Western systems", "Numbers and Planets: Connection of numbers 1–9 with the nine planets", "Psychic Number: Derived from birth date; reflects personality", "Destiny Number: Derived from full date of birth; indicates life purpose", "Number Compatibility Chart: Friendly, neutral, and enemy numbers"]},
        {"id": 2, "title": "Practical Analysis & Remedies", "topics": ["Vedic Grid (Lo Shu Grid): Filling and analyzing the birth date grid", "Name Number: Choosing the correct spelling of a name", "Career Selection: Identifying suitable professions based on numbers", "Personal Year Number: Understanding yearly influences and predictions", "Vedic Remedies: Use of donations, mantras, and colors for balance and correction"]}
    ],
    "cc-feng-shui.html": [
        {"id": 1, "title": "Fundamentals of Feng Shui (Qi & Five Elements)", "topics": ["Understanding Qi (Energy Flow): Life-force basics, positive circulation, and clearing clutter", "Yin and Yang Balance: Harmonizing passive (Yin) and active (Yang) energies in your space", "The Five Elements: Practical balancing of Wood, Fire, Earth, Metal, and Water"]},
        {"id": 2, "title": "Bagua Map & Practical Placement", "topics": ["Understanding the Bagua Map: The 9 life areas including Wealth, Health, and Relationships", "Commanding Position: Optimal placement for beds, desks, and stoves", "Simple Feng Shui Cures: Using mirrors, plants, and lighting to enhance positive energy"]}
    ]
}

def inject_modules():
    for filename, mods in module_data.items():
        filepath = os.path.join(files_dir, filename)
        if os.path.exists(filepath):
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            js_mods = json.dumps(mods)
            # Replaces the old module JSON with our new module JSON correctly without triggering regex escaping issues
            pattern = r'var\s+modules\s*=\s*\[.*?\]\;(?=\s*var el = document\.getElementById\(\'modules\'\);)'
            
            def replacer(match):
                return f'var modules = {js_mods};'
                
            if re.search(pattern, content, flags=re.DOTALL):
                new_content = re.sub(pattern, replacer, content, flags=re.DOTALL)
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Updated MODULES explicitly: {filename}")

inject_modules()
