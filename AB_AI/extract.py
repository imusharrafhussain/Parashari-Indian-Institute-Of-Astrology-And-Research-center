import glob, re

with open('extracted_titles.txt', 'w', encoding='utf-8') as out:
    for f in glob.glob('cc-*.html') + ['crash-course-template.html']:
        with open(f, 'r', encoding='utf-8') as file:
            content = file.read()
            title_match = re.search(r'<h1 class="course-title">(.*?)</h1>', content)
            subtitle_match = re.search(r'<p class="course-subtitle">(.*?)</p>', content)
            if title_match and subtitle_match:
                out.write(f"{f}::::{title_match.group(1)}::::{subtitle_match.group(1)}\n")
