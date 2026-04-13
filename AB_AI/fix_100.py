import glob
import re

for file in glob.glob(r'd:\Parashari website new\AB_AI\courses\*.html'):
    with open(file, 'r', encoding='utf-8') as f:
        text = f.read()

    original = text

    # Remove the 1460px container limit globally so there is no white space on the deep left and right
    text = re.sub(r'(class="cvd-layout-container"[^>]*?max-width:\s*)1460px', r'\g<1>100%', text)
    text = re.sub(r'(class="cvd-layout-container"[^>]*?max-width:\s*)1500px', r'\g<1>100%', text)

    # Revert specific component widths if it is a crash course or grand master
    if 'grand-master' in file.lower() or 'crash' in file.lower():
        text = re.sub(r'(\.cvd-desc\s*\{[^}]*?max-width:\s*)100%', r'\g<1>850px', text)
        text = re.sub(r'(\.cvd-ba-container\s*\{[^}]*?max-width:\s*)100%', r'\g<1>1050px', text)
        text = re.sub(r'(\.cvd-learn-grid\s*(?:,\s*\.cvd-learn-grid\.cvd-learn-fullwidth\s*)?\{[^}]*?max-width:\s*)100%', r'\g<1>1200px', text)
        text = re.sub(r'(\.cvd-strip-inner\s*\{[^}]*?max-width:\s*)100%', r'\g<1>1000px', text)
        text = re.sub(r'(\.cvd-faq\s*\{[^}]*?max-width:\s*)100%', r'\g<1>800px', text)

        # Revert image object fit
        text = re.sub(
            r'(\.cvd-[34]col-card img\s*\{[^}]*?height:\s*)auto([^}]*object-fit:\s*)contain;\s*max-height:\s*250px;',
            r'\g<1>200px\g<2>cover;',
            text
        )

    if text != original:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(text)

print("Restored 100% full screen container width globally, and reverted internal component widths on exempted courses.")
