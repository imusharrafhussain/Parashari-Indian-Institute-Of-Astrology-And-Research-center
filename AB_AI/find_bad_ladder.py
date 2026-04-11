import glob

files = glob.glob('courses/*.html')
bad_files = []
for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    faq_idx = content.find('class="cvd-faq"')
    ladder_idx = content.find('class="course-progression-ladder"')
    if faq_idx != -1 and ladder_idx != -1:
        if ladder_idx < faq_idx:
            bad_files.append(file)
print('Files where Ladder is ABOVE FAQ:', bad_files)
