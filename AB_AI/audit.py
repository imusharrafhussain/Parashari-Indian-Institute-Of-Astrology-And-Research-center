import os

courses = ['numerology', 'kp-astrology', 'gemstone', 'gemstone-science', 'vastu', 'lal-kitab', 
           'face-reading', 'reiki', 'tarot', 'nakshatra', 'crystal-healing', 'rudraksha', 'palmistry', 
           'bnn-astrology', 'complete-astrology', 'medical-astrology', 'nadi-jyotish', 'remedy-course']

base_dir = r'd:\Parashari website new\AB_AI\courses'

stats = {'cvd': [], 'premium': []}

for c in courses:
    for level in ['diploma', 'bachelors', 'masters']:
        path = os.path.join(base_dir, f'{c}-{level}.html')
        if os.path.exists(path):
            text = open(path, encoding='utf-8').read()
            if 'cvd-layout-container' in text:
                stats['cvd'].append(c+'-'+level)
            else:
                stats['premium'].append(c+'-'+level)

print('Using CVD Layout:', len(stats['cvd']), 'files.')
print('Using Premium Layout entirely:', len(stats['premium']), 'files.')
print('Premium files:', stats['premium'])
