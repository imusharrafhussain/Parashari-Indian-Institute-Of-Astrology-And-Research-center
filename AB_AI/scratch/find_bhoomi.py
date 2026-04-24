lines = open('d:/Parashari website new/AB_AI/courses.html', encoding='utf-8').readlines()
results = []
for i, l in enumerate(lines):
    if 'alt="Bhoomi Vastu' in l:
        results.append(str(i+1) + ': ' + l.strip())
print('\n'.join(results[:15]))
