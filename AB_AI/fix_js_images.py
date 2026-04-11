import re

with open('assets/js/level-data.js', 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace('image: "KP.webp"', 'image: "kp-astrology.webp"')
text = text.replace('image: "face-reading.webp"', 'image: "face-reading-hero.webp"')
text = text.replace('image: "medical-astrology.webp"', 'image: "Medical Astrology.webp"')
text = text.replace('image: "tarot-card.webp"', 'image: "hero-tarot.webp"')

with open('assets/js/level-data.js', 'w', encoding='utf-8') as f:
    f.write(text)
