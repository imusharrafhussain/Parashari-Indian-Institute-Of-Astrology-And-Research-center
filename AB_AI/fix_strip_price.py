import re

with open('d:/Parashari website new/AB_AI/assets/js/level-data.js', 'r', encoding='utf-8') as f:
    text = f.read()

# Replace hardcoded "Limited Offer: Only ₹YYYY"
# To avoid touching already-dynamic ones like `Limited Offer: Only ${prices.new}`
# we only target ones ending in actual numbers.
text = re.sub(
    r'Limited Offer: Only ₹\d+(,\d+)?',
    r"Limited Offer: Only ${LEVEL_DATA[courseSlug]?.levels[levelSlug]?.newPrice || '₹4199'}",
    text
)

# Replace hardcoded "(Regular Price ₹YYYY)"
text = re.sub(
    r'\(Regular Price ₹\d+(,\d+)?\)',
    r"(Regular Price ${LEVEL_DATA[courseSlug]?.levels[levelSlug]?.oldPrice || '₹5499'})",
    text
)

# And fix any potential instances in Numerology where it might not have the ₹ symbol
# wait, the grep showed "Limited Offer: Only ₹2,999", "₹4,199", etc. So the first rule catches them.

with open('d:/Parashari website new/AB_AI/assets/js/level-data.js', 'w', encoding='utf-8') as f:
    f.write(text)

print('Updated middle banner prices!')
