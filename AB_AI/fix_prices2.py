import re

with open('d:/Parashari website new/AB_AI/assets/js/level-data.js', 'r', encoding='utf-8') as f:
    text = f.read()

# I will replace any "Enroll Now - ₹<numbers>" with the dynamic logic!
# Watch out for the backslash escaping!
text = re.sub(
    r'Enroll Now - ₹\d+',
    r"Enroll Now - ${LEVEL_DATA[courseSlug]?.levels[levelSlug]?.newPrice || '₹4199'}",
    text
)

# Wait! There might also be a literal `\"Enroll Now - ₹XYZ\"` left?
text = re.sub(
    r'Enroll Now - ₹XYZ',
    r"Enroll Now - ${LEVEL_DATA[courseSlug]?.levels[levelSlug]?.newPrice || '₹4199'}",
    text
)

with open('d:/Parashari website new/AB_AI/assets/js/level-data.js', 'w', encoding='utf-8') as f:
    f.write(text)

print("Pricing fully dynamic!")
