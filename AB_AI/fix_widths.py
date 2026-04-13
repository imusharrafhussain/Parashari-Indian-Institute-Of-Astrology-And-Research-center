import glob
import re

files_changed = 0

for file in glob.glob(r'd:\Parashari website new\AB_AI\courses\*.html'):
    with open(file, 'r', encoding='utf-8') as f:
        text = f.read()

    original_text = text

    # Standardize maximum widths so components don't leave uneven whitespace gaps on larger monitors
    # Make them 100% of the parent column (.cvd-main-content)
    text = re.sub(r'(\.cvd-desc\s*\{[^}]*?max-width:\s*)850px', r'\g<1>100%', text)
    text = re.sub(r'(\.cvd-ba-container\s*\{[^}]*?max-width:\s*)1050px', r'\g<1>100%', text)
    text = re.sub(r'(\.cvd-learn-grid\s*(?:,\s*\.cvd-learn-grid\.cvd-learn-fullwidth\s*)?\{[^}]*?max-width:\s*)1200px', r'\g<1>100%', text)
    text = re.sub(r'(\.cvd-strip-inner\s*\{[^}]*?max-width:\s*)1000px', r'\g<1>100%', text)
    text = re.sub(r'(\.cvd-faq\s*\{[^}]*?max-width:\s*)800px', r'\g<1>100%', text)

    # Note: On 15-inch screen they said it looked perfect. We keep the layout container at max 1460px, 
    # but now all inner sections map to 100% of the inner column, creating a perfectly aligned column block.

    # Restrict cropping of every image in 3col card by switching object-fit: cover to contain.
    # I am keeping the fixed height (200px/250px) but changing the fit mode so the card size doesn't warp, yet the image shows entirely.
    text = re.sub(
        r'(\.cvd-3col-card img\s*\{[^}]*?)object-fit:\s*cover;',
        r'\g<1>object-fit: contain;',
        text
    )
    
    # Do the same for 4col cards if they exist
    text = re.sub(
        r'(\.cvd-4col-card img\s*\{[^}]*?)object-fit:\s*cover;',
        r'\g<1>object-fit: contain;',
        text
    )

    if text != original_text:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(text)
        files_changed += 1

print(f"Standardized widths and disabled image cropping in {files_changed} files.")
