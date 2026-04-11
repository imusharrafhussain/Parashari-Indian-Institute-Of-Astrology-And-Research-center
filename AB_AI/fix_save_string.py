import re

with open('d:/Parashari website new/AB_AI/assets/js/level-data.js', 'r', encoding='utf-8') as f:
    text = f.read()

# Replace "(Save <number> &ndash; Regular Price <number>)" with dynamic percent and oldPrice
text = re.sub(
    r'\(Save[^\&]+&ndash;\s*Regular Price[^\)]+\)',
    r"(Save ${levelSlug === 'grand-master' ? 29 : (levelSlug === 'bachelors' || levelSlug === 'masters' ? 25 : 24)}% &ndash; Regular Price ${LEVEL_DATA[courseSlug]?.levels[levelSlug]?.oldPrice || '₹5,499'})",
    text
)

# And check if there are matches that use an actual hyphen instead of &ndash;
text = re.sub(
    r'\(Save[^\\-]+-\s*Regular Price[^\)]+\)',
    r"(Save ${levelSlug === 'grand-master' ? 29 : (levelSlug === 'bachelors' || levelSlug === 'masters' ? 25 : 24)}% &ndash; Regular Price ${LEVEL_DATA[courseSlug]?.levels[levelSlug]?.oldPrice || '₹5,499'})",
    text
)

with open('d:/Parashari website new/AB_AI/assets/js/level-data.js', 'w', encoding='utf-8') as f:
    f.write(text)

print('Updated middle banner savings logic globally!')
