import glob
import re

html_files = glob.glob('courses/*.html')
js_files = glob.glob('assets/js/*.js')

good_desktop_ba = '''      .cvd-ba-container { max-width: 1050px; margin: 10px auto 40px auto; }
      .cvd-ba-header { display: flex; align-items: center; padding: 0 10px; }
      .cvd-ba-header h3 { font-size: 1.8rem; color: #444; font-family: "Times New Roman", serif; margin: 0 40px; font-weight: bold; }
      .cvd-ba-header h3.after-title { color: #A82C2C; }
      .cvd-ba-box { display: flex; margin-top: 15px; border-radius: 4px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); background: #fff; }
      
      .cvd-ba-left { width: 50%; padding: 20px 40px 20px 40px; background: #EEE9DC; border-radius: 4px 0 0 4px; position: relative; z-index: 2; }
      .cvd-ba-left::after { content: ''; position: absolute; right: -30px; top: 0; bottom: 0; width: 30px; background: #EEE9DC; clip-path: polygon(0 0, 0 100%, 100% 50%); z-index: 3; }
      .cvd-ba-right { width: 50%; padding: 20px 40px 20px 60px; background: #C69429; border-radius: 0 4px 4px 0; position: relative; }
      
      .cvd-ba-item { display: flex; align-items: center; gap: 15px; font-size: 1.2rem; min-height: 65px; border-bottom: 1px solid rgba(0,0,0,0.06); }
      .cvd-ba-left .cvd-ba-item:last-child { border-bottom: none; min-height: 55px; }
      .cvd-ba-right .cvd-ba-item:last-child { border-bottom: none; min-height: 55px; }
      .cvd-ba-left .cvd-ba-item { color: #555; }
      .cvd-ba-left .cvd-ba-icon { color: #BBA072; font-size: 0.6rem; }
      .cvd-ba-right .cvd-ba-item { color: #fff; font-weight: 500; border-bottom: 1px solid rgba(255,255,255,0.25); text-shadow: 0 1px 2px rgba(0,0,0,0.1); }
      .cvd-ba-right .cvd-ba-icon { color: #fff; font-size: 1.2rem; }'''

good_mobile_ba = '''        .cvd-ba-container { padding: 0 5px; }
        .cvd-ba-header { display: none; }
        .cvd-ba-box { flex-direction: column; }
        .cvd-ba-left { width: 100%; border-radius: 4px 4px 0 0; padding: 15px 20px; }
        .cvd-ba-left::after { display: none; }
        .cvd-ba-left::before { content: 'Before'; display: block; text-align: center; font-size: 1.5rem; color: #555; font-family: "Times New Roman", serif; font-weight: bold; margin-bottom: 15px; padding-bottom: 15px; border-bottom: 2px solid rgba(0,0,0,0.1); }
        .cvd-ba-right::before { content: 'After'; display: block; text-align: center; font-size: 1.5rem; color: #A82C2C; font-family: "Times New Roman", serif; font-weight: bold; margin-bottom: 15px; padding-top: 15px; border-top: 2px solid rgba(168,44,44,0.2); }
        .cvd-ba-right { width: 100%; border-radius: 0 0 4px 4px; padding: 15px 20px; }
        .cvd-ba-item { font-size: 1rem; min-height: 50px; gap: 10px; }'''

for filepath in html_files + js_files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    modified = False

    # FIX 1: Restore Desktop Before/After Layout
    # Find the corrupted block exactly as my buggy regex inserted it
    if '        .cvd-ba-container { padding: 0 5px; }' in content:
        # Just safely grab the block before cvd-learn-grid
        content, n = re.subn(
            r'\n\s*\.cvd-ba-container \{ padding: 0 5px; \}.+?\.cvd-ba-item \{ font-size: 1rem; min-height: 50px; gap: 10px; \}',
            '\n' + good_desktop_ba,
            content,
            flags=re.DOTALL
        )
        if n > 0:
            modified = True

    # FIX 2: Restore Mobile Before/After into the Mobile Media Query
    # The previous regex completely deleted it from the media block, so it only has `.cvd-ba-left, ...`, `.cvd-ba-box` left.
    if '@media (max-width: 768px)' in content:
        # Locate the media block
        # Look for the broken mobile BA block fragments that are currently there:
        # e.g.:
        # .cvd-ba-left, .cvd-ba-right { width: 100%; border-radius: 4px; padding: 15px 20px; }
        # .cvd-ba-box { flex-direction: column; }
        fragment_regex = r'\s*\.cvd-ba-left,\s*\.cvd-ba-right\s*\{\s*width:\s*100%;\s*border-radius:\s*4px;\s*padding:\s*15px\s*20px;\s*\}\s*\.cvd-ba-box\s*\{\s*flex-direction:\s*column;\s*\}'
        content, n = re.subn(
            fragment_regex,
            '\n' + good_mobile_ba,
            content,
            flags=re.DOTALL
        )
        if n > 0:
            modified = True

    if modified:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Fixed {filepath}")
