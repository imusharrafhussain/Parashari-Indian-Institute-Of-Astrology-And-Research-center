import os

diploma = open(r'd:\Parashari website new\AB_AI\courses\vedic-astrology-diploma.html', encoding='utf-8').read()
s_start = diploma.find('<script>', diploma.find('tourSlideRight'))
s_end = diploma.find('<!-- START MAIN LAYOUT WITH SIDEBAR -->')
perfect_script = diploma[s_start:s_end]

for filename in ['vedic-astrology-bachelors.html', 'vedic-astrology-masters.html']:
    path = r'd:\Parashari website new\AB_AI\courses\\' + filename
    content = open(path, encoding='utf-8').read()
    if 'onboarding-overlay' not in content:
        layout_idx = content.find('<!-- START MAIN LAYOUT WITH SIDEBAR -->')
        content = content[:layout_idx] + perfect_script + content[layout_idx:]
        open(path, 'w', encoding='utf-8').write(content)
        print('Injected script to', filename)
