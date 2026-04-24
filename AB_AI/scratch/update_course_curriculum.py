import os
import re
import json

vedic_num_path = 'd:/Parashari website new/AB_AI/crash-courses/cc-vedic-numerology.html'
feng_shui_path = 'd:/Parashari website new/AB_AI/crash-courses/cc-feng-shui.html'

vedic_modules = [
    {
        "id": 1,
        "title": "Foundations of Numerology",
        "topics": [
            "Introduction to Numerology: Differences between Vedic and Western systems",
            "Numbers and Planets: Connection of numbers 1–9 with the nine planets",
            "Psychic Number: Derived from birth date; reflects personality",
            "Destiny Number: Derived from full date of birth; indicates life purpose",
            "Number Compatibility Chart: Friendly, neutral, and enemy numbers"
        ]
    },
    {
        "id": 2,
        "title": "Practical Analysis & Remedies",
        "topics": [
            "Vedic Grid (Lo Shu Grid): Filling and analyzing the birth date grid",
            "Name Number: Choosing the correct spelling of a name",
            "Career Selection: Identifying suitable professions based on numbers",
            "Personal Year Number: Understanding yearly influences and predictions",
            "Vedic Remedies: Use of donations, mantras, and colors for balance and correction"
        ]
    }
]

feng_modules = [
    {
        "id": 1,
        "title": "Fundamentals of Feng Shui (Qi & Five Elements)",
        "topics": [
            "Understanding Qi (Energy Flow): Life-force basics, positive circulation, and clearing clutter",
            "Yin and Yang Balance: Harmonizing passive (Yin) and active (Yang) energies in your space",
            "The Five Elements: Practical balancing of Wood, Fire, Earth, Metal, and Water"
        ]
    },
    {
        "id": 2,
        "title": "Bagua Map & Practical Placement",
        "topics": [
            "Understanding the Bagua Map: The 9 life areas including Wealth, Health, and Relationships",
            "Commanding Position: Optimal placement for beds, desks, and stoves",
            "Simple Feng Shui Cures: Using mirrors, plants, and lighting to enhance positive energy"
        ]
    }
]

def update_modules(path, modules_data):
    if not os.path.exists(path):
        print(f"File not found: {path}")
        return
        
    with open(path, 'r', encoding='utf-8') as file:
        content = file.read()
        
    modules_json = json.dumps(modules_data, ensure_ascii=False)
    replacement = f"var modules = {modules_json}; var el = document.getElementById('modules');"
    
    # regex match the exact initialization line.
    pattern = r'var modules = \[.*?\];(?=\s*var el = document\.getElementById\(\'modules\'\);)'
    
    if re.search(pattern, content, flags=re.DOTALL):
        new_content = re.sub(pattern, f"var modules = {modules_json};", content, flags=re.DOTALL)
        with open(path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Successfully updated curriculum modules in: {os.path.basename(path)}")
    else:
        print(f"Pattern not found in: {path}")

update_modules(vedic_num_path, vedic_modules)
update_modules(feng_shui_path, feng_modules)
