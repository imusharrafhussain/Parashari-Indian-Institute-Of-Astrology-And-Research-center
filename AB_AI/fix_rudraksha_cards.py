import glob
import re

# Rudraksha 3col fix
for file in glob.glob(r'd:\Parashari website new\AB_AI\courses\rudraksha*.html'):
    with open(file, 'r', encoding='utf-8') as f:
        text = f.read()

    # We want to change the css of .cvd-3col-card and .cvd-3col-card img
    css_override = '''      .cvd-3col { display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; }
      .cvd-3col-card { text-align: center; padding: 0; background: transparent; box-shadow: none; border-radius: 0; }
      .cvd-3col-card img { width: 100%; height: auto; max-height: 400px; object-fit: contain; box-shadow: 0 10px 25px rgba(0,0,0,0.08); border-radius: 12px; margin-bottom: 20px; }
      .cvd-col-title { font-size: 1.25rem; color: #5a3c2e; margin-bottom: 10px; font-weight: 600; }
      .cvd-col-sub { font-size: 1rem; color: #333; line-height: 1.5; font-weight: 500; }'''
    
    text = re.sub(r'\.cvd-3col \{.*?\}\s*\.cvd-3col-card \{.*?\}\s*\.cvd-3col-card img \{.*?\}\s*\.cvd-col-title \{.*?\}\s*\.cvd-col-sub \{.*?\}', css_override, text, flags=re.DOTALL)
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(text)

print("Rudraksha 3col fixed")
