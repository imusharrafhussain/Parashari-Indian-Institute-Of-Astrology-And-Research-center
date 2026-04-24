import os
import glob
import re

files = glob.glob('d:/Parashari website new/AB_AI/crash-courses/*.html')
files.append('d:/Parashari website new/AB_AI/archive/plrt.html')

new_items_array = '''var items = [
    {icon:"🎥",title:"4-week Guided Sessions",desc:"Structured topic-by-topic training with replay access",value: "<span style='text-decoration:line-through;color:#9ca3af;margin-right:8px'>₹1,200</span><span class='wyg-inc'>Included</span>"},
    {icon:"📚",title:"Technique Manuals",desc:"Practice framework and mentor support resources",value: "<span style='text-decoration:line-through;color:#9ca3af;margin-right:8px'>₹800</span><span class='wyg-inc'>Included</span>"},
    {icon:"🧠",title:"Practical Integration",desc:"Applied module exercises and case understanding",value: "<span style='text-decoration:line-through;color:#9ca3af;margin-right:8px'>₹500</span><span class='wyg-inc'>Included</span>"},
    {icon:"👥",title:"VIP Community Support",desc:"Private group support for doubts and practice",value: "<span style='text-decoration:line-through;color:#9ca3af;margin-right:8px'>₹400</span><span class='wyg-inc'>Included</span>"},
    {icon:"🏆",title:"Completion Certificate",desc:"Institute-recognized completion certificate",value: "<span style='text-decoration:line-through;color:#9ca3af;margin-right:8px'>₹299</span><span class='wyg-inc'>Included</span>"},
    {icon:"🎧",title:"Doubt Resolution",desc:"Guided support with mentor access",value: "<span style='text-decoration:line-through;color:#9ca3af;margin-right:8px'>₹200</span><span class='wyg-inc'>Included</span>"},
    {icon:"📦",title:"Bonus Resources",desc:"Additional templates and guided references",value: "<span style='text-decoration:line-through;color:#9ca3af;margin-right:8px'>₹100</span><span class='wyg-inc'>Included</span>"},
    {icon:"⏰",title:"Flexible Learning",desc:"Learn at your pace with structured progression",value: "<span class='wyg-inc'>Included</span>"}
];'''

for filepath in files:
    if not os.path.exists(filepath): continue
    with open(filepath, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # We replace the JS array definition
    pattern = r'var items = \[.*?\];(?=\s*var target = document\.getElementById\(\'wyg-items\'\);)'
    
    if re.search(pattern, content, flags=re.DOTALL):
        new_content = re.sub(pattern, new_items_array, content, flags=re.DOTALL)
        with open(filepath, 'w', encoding='utf-8') as file:
            file.write(new_content)
        print(f"Updated: {os.path.basename(filepath)}")
    else:
        print(f"Pattern not found in: {os.path.basename(filepath)}")
