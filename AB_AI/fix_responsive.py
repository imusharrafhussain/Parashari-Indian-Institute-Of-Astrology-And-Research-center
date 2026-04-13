import glob
import re

for file in glob.glob(r'd:\Parashari website new\AB_AI\courses\*.html'):
    with open(file, 'r', encoding='utf-8') as f:
        text = f.read()

    # We need to fix the .cvd-ba-box stacking logic inside the 768px media query.
    # The source of truth was somehow corrupted with desktop styles inside the 768px block.
    # We will search for the specific mobile block and overwrite it.
    
    bad_mobile_ba = r'''      \.cvd-ba-container \{ max-width: 1050px; margin: 10px auto 40px auto; \}
      \.cvd-ba-header \{ display: flex; align-items: center; padding: 0 10px; \}
      \.cvd-ba-header h3 \{ font-size: 1\.8rem; color: #444; font-family: "Times New Roman", serif; margin: 0 40px; font-weight: bold; \}
      \.cvd-ba-header h3\.after-title \{ color: #A82C2C; \}
      \.cvd-ba-box \{ display: flex; margin-top: 15px; border-radius: 4px; box-shadow: 0 4px 20px rgba\(0,0,0,0\.08\); background: #fff; \}
      
      \.cvd-ba-left \{ width: 50%; padding: 20px 40px 20px 40px; background: #EEE9DC; border-radius: 4px 0 0 4px; position: relative; z-index: 2; \}
      \.cvd-ba-left::after \{ content: ''; position: absolute; right: -30px; top: 0; bottom: 0; width: 30px; background: #EEE9DC; clip-path: polygon\(0 0, 0 100%, 100% 50%\); z-index: 3; \}
      \.cvd-ba-right \{ width: 50%; padding: 20px 40px 20px 60px; background: #C69429; border-radius: 0 4px 4px 0; position: relative; \}
      
      \.cvd-ba-item \{ display: flex; align-items: center; gap: 15px; font-size: 1\.2rem; min-height: 65px; border-bottom: 1px solid rgba\(0,0,0,0\.06\); \}
      \.cvd-ba-left \.cvd-ba-item:last-child \{ border-bottom: none; min-height: 55px; \}
      \.cvd-ba-right \.cvd-ba-item:last-child \{ border-bottom: none; min-height: 55px; \}
      \.cvd-ba-left \.cvd-ba-item \{ color: #555; \}
      \.cvd-ba-left \.cvd-ba-icon \{ color: #BBA072; font-size: 0\.6rem; \}
      \.cvd-ba-right \.cvd-ba-item \{ color: #fff; font-weight: 500; border-bottom: 1px solid rgba\(255,255,255,0\.25\); text-shadow: 0 1px 2px rgba\(0,0,0,0\.1\); \}
      \.cvd-ba-right \.cvd-ba-icon \{ color: #fff; font-size: 1\.2rem; \}'''

    good_mobile_ba = '''      /* Vertical stacking for Before/After */
      .cvd-ba-container { max-width: 100%; margin: 10px auto 30px auto; }
      .cvd-ba-header { flex-direction: column; align-items: center; gap: 10px; padding: 0; text-align: center; }
      .cvd-ba-header h3 { font-size: 1.5rem; margin: 0; }
      .cvd-ba-header div { display: none; } /* Hide the horizontal dividers on mobile */
      .cvd-ba-box { flex-direction: column; margin-top: 20px; box-shadow: 0 4px 15px rgba(0,0,0,0.06); }
      
      .cvd-ba-left { width: 100%; padding: 20px; border-radius: 6px 6px 0 0; text-align: left; }
      .cvd-ba-left::after { display: none; } /* Remove the arrow */
      .cvd-ba-right { width: 100%; padding: 20px; border-radius: 0 0 6px 6px; text-align: left; }
      
      .cvd-ba-item { min-height: auto; padding: 12px 0; font-size: 1.05rem; }
      .cvd-ba-left .cvd-ba-item:last-child, .cvd-ba-right .cvd-ba-item:last-child { padding-bottom: 0; }'''
    
    # Also fix 3col on tablet to 2col, but let's carefully target inside @media (max-width: 991px)
    # The existing was: .cvd-3col { gap: 15px; }
    # We change it to: .cvd-3col { grid-template-columns: repeat(2, 1fr); gap: 20px; }
    text = re.sub(r'\.cvd-3col \{ gap: 15px; \}', r'.cvd-3col { grid-template-columns: repeat(2, 1fr); gap: 20px; }', text)

    # If the file has the bad mobile ba, replace it
    new_text = re.sub(bad_mobile_ba, good_mobile_ba, text)
    
    if new_text != text:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(new_text)
        print("Fixed:", file)

print("Responsive components fixed.")
