with open(r'd:\Parashari website new\AB_AI\assets\js\level-data.js', 'r', encoding='utf-8') as f:
    text = f.read()

print("991px:", text.count("991px"))
print("768px:", text.count("768px"))
print("column-reverse:", text.count("column-reverse"))
print("cvd-ba-box:", text.count("cvd-ba-box"))
print("overflow-x:", text.count("overflow-x: hidden"))
print("ba-left::after:", text.count("ba-left::after"))
