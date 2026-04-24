lines = open('d:/Parashari website new/AB_AI/index.html', encoding='utf-8').readlines()
for i, l in enumerate(lines):
    if 'premium-gold-card' in l:
        print(i+1, l.strip())
