import glob
files = glob.glob('courses/*.html')
for file in files[:3]:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    faq_idx = content.find('<div class="cvd-faq">')
    ladder_idx = content.find('<section class="course-progression-ladder">')
    print(file, 'FAQ:', faq_idx, 'Ladder:', ladder_idx)
