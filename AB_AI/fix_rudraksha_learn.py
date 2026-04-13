import glob
import re

for file in glob.glob(r'd:\Parashari website new\AB_AI\courses\rudraksha*.html'):
    with open(file, 'r', encoding='utf-8') as f:
        text = f.read()

    # Replace old webp images with new png images properly lowercase
    text = text.replace('ATTRACT PROSPERITY.webp', 'attract-prosperity.png')
    text = text.replace('AWAKEN YOUR CHAKRAS.webp', 'awaken-your-chakras.png')
    text = text.replace('ENHANCE INNER PEACE.webp', 'enhance-inner-peace.png')
    text = text.replace('HISTORY OF RUDRAKSHA.webp', 'history-of-rudraksha.png')
    text = text.replace('IDENTIFY REAL RUDRAKSHA.webp', 'identify-real-rudraksha.png')
    text = text.replace('WEAR RUDRAKSHA PROPERLY.webp', 'wear-rudraksha-properly.png')

    # Ensure no redundant HTML text if the images contain text (like Palmistry)
    # The user didn't explicitly say "Palmistry bug applies here", but "circle edges should not be shown" might mean they don't want the golden CSS. I already removed the wrapper.
    # To be safe, let's verify if the text is redundant. I will just leave the <p> text unless instructed otherwise, but wait! The user uploaded new images, let me just replace the src.
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(text)

print("Updated Rudraksha 'What you will learn' image links")
