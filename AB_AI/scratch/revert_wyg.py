import os
import re

files_dir = 'd:/Parashari website new/AB_AI/crash-courses/'
archive_dir = 'd:/Parashari website new/AB_AI/archive/'

filenames = [
    "plrt.html", "cc-bhoomi-vastu.html", "cc-modern-western-palmistry.html", 
    "cc-mobile-numerology.html", "cc-face-reading.html", "cc-financial-astrology.html", 
    "cc-lal-kitab.html", "cc-medical-astrology.html", "cc-bnn-intensive.html", 
    "cc-modern-career-astrology.html", "cc-business-numerology.html", "cc-vedic-numerology.html", 
    "cc-nadi-astrology.html", "cc-healing.html", "cc-feng-shui.html", "cc-jaimini-astrology.html"
]

original_wyg_js = """var items = [
    {icon:"🎥",title:"4-week Guided Sessions",desc:"Structured topic-by-topic training with replay access",value: "<span style='text-decoration:line-through;color:#9ca3af;margin-right:8px'>₹1,200</span><span class='wyg-inc'>Included</span>"},
    {icon:"📓",title:"Complete Curriculum",desc:"PDF notes, checklists, and reference charts",value: "<span style='text-decoration:line-through;color:#9ca3af;margin-right:8px'>₹900</span><span class='wyg-inc'>Included</span>"},
    {icon:"💬",title:"VIP Support Group",desc:"Private chat group to resolve all practical doubts",value: "<span style='text-decoration:line-through;color:#9ca3af;margin-right:8px'>₹500</span><span class='wyg-inc'>Included</span>"},
    {icon:"🏆",title:"Official Certificate",desc:"Reputed Parashari Institute certification",value: "<span style='text-decoration:line-through;color:#9ca3af;margin-right:8px'>₹499</span><span class='wyg-inc'>Included</span>"},
    {icon:"🧩",title:"Live Case Studies",desc:"Real-world chart analysis during masterclasses",value: "<span style='text-decoration:line-through;color:#9ca3af;margin-right:8px'>₹400</span><span class='wyg-inc'>Included</span>"},
    {icon:"🎁",title:"Bonus Material",desc:"Exclusive techniques not available publicly",value: "<span style='text-decoration:line-through;color:#9ca3af;margin-right:8px'>₹FREE</span><span class='wyg-inc'>Included</span>"},
    {icon:"⏱️",title:"Watch Anytime",desc:"Access class recordings conveniently",value:"<span class='wyg-inc'>Included</span>"},
    {icon:"🌟",title:"Next-Step Discounts",desc:"Special price on advanced diploma programs",value:"<span class='wyg-inc'>Included</span>"}
];"""

def revert_wyg():
    for filename in filenames:
        filepath = os.path.join(archive_dir if filename == 'plrt.html' else files_dir, filename)
        if os.path.exists(filepath):
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            pattern = r'var\s+items\s*=\s*\[(.*?)\]\s*;(?=\s*var target = document\.getElementById\(\'wyg-items\'\);)'
            
            def replacer(match):
                return original_wyg_js
                
            if re.search(pattern, content, flags=re.DOTALL):
                new_content = re.sub(pattern, replacer, content, flags=re.DOTALL)
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Reverted WYG explicitly: {filename}")

revert_wyg()
