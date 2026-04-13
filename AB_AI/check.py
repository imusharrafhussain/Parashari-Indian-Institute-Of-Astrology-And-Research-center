content = open(r'd:\Parashari website new\AB_AI\courses\numerology-diploma.html', encoding='utf-8').read()
idx = content.find('class="cvd-learn-grid"')
print(content[idx-10:idx+800])
