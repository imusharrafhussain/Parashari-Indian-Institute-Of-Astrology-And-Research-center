import os
import glob

html_files = glob.glob('courses/*.html')

original_css = """        /* Before/After section - stack vertically */
        .cvd-ba-container { padding: 0 5px; }
        .cvd-ba-header { justify-content: center; gap: 5px; }
        .cvd-ba-header h3 { font-size: 1.3rem; margin: 0 15px; }
        .cvd-ba-box { flex-direction: column; }
        .cvd-ba-left { width: 100%; border-radius: 4px 4px 0 0; padding: 15px 20px; }
        .cvd-ba-left::after { display: none; }
        .cvd-ba-header .after-title, .cvd-ba-header .after-title + div { display: none; }
        .cvd-ba-header > div:nth-child(3) { display: none; }
        .cvd-ba-right::before { content: 'After'; display: block; text-align: center; font-size: 1.5rem; color: #A82C2C; font-family: "Times New Roman", serif; font-weight: bold; margin-bottom: 15px; padding-top: 10px; border-top: 2px solid rgba(168,44,44,0.2); }
        .cvd-ba-right { width: 100%; border-radius: 0 0 4px 4px; padding: 15px 20px; }
        .cvd-ba-item { font-size: 1rem; min-height: 50px; gap: 10px; }"""

new_css = """        /* Before/After section - stack vertically */
        .cvd-ba-container { padding: 0 5px; }
        .cvd-ba-header { display: none; }
        .cvd-ba-box { flex-direction: column; }
        .cvd-ba-left { width: 100%; border-radius: 4px 4px 0 0; padding: 15px 20px; }
        .cvd-ba-left::after { display: none; }
        .cvd-ba-left::before { content: 'Before'; display: block; text-align: center; font-size: 1.5rem; color: #555; font-family: "Times New Roman", serif; font-weight: bold; margin-bottom: 15px; padding-bottom: 15px; border-bottom: 2px solid rgba(0,0,0,0.1); }
        .cvd-ba-right::before { content: 'After'; display: block; text-align: center; font-size: 1.5rem; color: #A82C2C; font-family: "Times New Roman", serif; font-weight: bold; margin-bottom: 15px; padding-top: 15px; border-top: 2px solid rgba(168,44,44,0.2); }
        .cvd-ba-right { width: 100%; border-radius: 0 0 4px 4px; padding: 15px 20px; }
        .cvd-ba-item { font-size: 1rem; min-height: 50px; gap: 10px; }"""

count = 0
for filepath in html_files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    new_content = content.replace(original_css, new_css)
    if content != new_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        count += 1

print(f'Fixed {count} course files.')
