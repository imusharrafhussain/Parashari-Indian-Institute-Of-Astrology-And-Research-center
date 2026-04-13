
import sys
content = open(r'd:\Parashari website new\AB_AI\courses\vedic-astrology-bachelors.html', encoding='utf-8').read()
start = content.find('<style>')
end = content.find('</style>')
print(content[start:start+100])
print('...')
print(content[end-100:end+8])
