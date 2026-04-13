import os
import glob
import re

print("Starting fixes...")

# 1. Fix the logo scaling across ALL course files
files_to_scale = glob.glob(r'd:\Parashari website new\AB_AI\courses\*.html')
count_scale = 0

old_img_css = r'''\.cvd-learn-item-img-wrapper img\s*\{\s*max-width: none;\s*width: auto;\s*height: 140%;\s*object-fit: cover;\s*margin: 0;\s*display: block;\s*\}'''

new_img_css = '''.cvd-learn-item-img-wrapper img {
          max-width: none;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform: scale(1.5);
          margin: 0;
          display: block;
      }'''

for fpath in files_to_scale:
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()
    orig = content
    content = re.sub(old_img_css, new_img_css, content)
    
    # Also catch mobile css that was overriding things
    mobile_pattern = r'\.cvd-learn-item-img-wrapper img\s*\{\s*max-width: none;\s*width: auto;\s*height: 140%;\s*\}'
    mobile_new = '.cvd-learn-item-img-wrapper img { max-width: none; width: 100%; height: 100%; transform: scale(1.5); }'
    content = re.sub(mobile_pattern, mobile_new, content)
    
    if content != orig:
        with open(fpath, 'w', encoding='utf-8') as f:
            f.write(content)
        count_scale += 1
print(f"Fixed scale logic in {count_scale} files.")


# 2. Insert Progression Ladder in Vastu, Rudraksha, Palmistry
categories = ['vastu', 'rudraksha', 'palmistry']
levels = [
    ('diploma', 'Diploma', 'THE FOUNDATION', 'fa-book-open'),
    ('bachelors', 'Bachelors', 'THE PRACTITIONER', 'fa-chart-pie'),
    ('masters', 'Masters', 'THE ADVANCED GUIDE', 'fa-compass'),
    ('grand-master', 'Grand Master', 'THE AUTHORITY', 'fa-crown')
]

count_ladder = 0
for cat in categories:
    for lvl_idx, (lvl_id, lvl_name, lvl_sub, lvl_icon) in enumerate(levels):
        filename = f"{cat}-{lvl_id}.html"
        fpath = os.path.join(r'd:\Parashari website new\AB_AI\courses', filename)
        if not os.path.exists(fpath):
            continue
            
        with open(fpath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        if 'course-progression-ladder' in content:
            continue # Already has ladder
            
        ladder_html = '''<!-- PROGRESSION LADDER -->
<section class="course-progression-ladder" style="padding-bottom: 20px;">
  <div class="container text-center">
    <h2 class="card-section-title" style="margin-bottom: 8px;">Your Learning Journey</h2>
    <p style="color:#666;max-width:600px;margin:0 auto 35px;font-size:1rem;">A clear path from foundation to authority. Upgrade at any time.</p>
    <div class="ld-journey-track">
'''
        for idx_l, (l_id, l_name, l_sub, l_icon) in enumerate(levels):
            is_current = (l_id == lvl_id)
            is_past = (idx_l < lvl_idx)
            node_class = "current" if is_current else ("completed" if is_past else "future")
            
            ladder_html += f'''
          <a href="{cat}-{l_id}.html" class="ld-journey-node {node_class}">
            <div class="ld-journey-icon"><i class="fas {l_icon}"></i></div>
            <span class="ld-journey-label">{l_name}</span>
            <span class="ld-journey-subtitle">{l_sub}</span>
            {'<span class="ld-journey-you">YOU ARE HERE</span>' if is_current else ''}
          </a>'''
            if idx_l < 3:
                conn_class = "filled" if is_past else ""
                ladder_html += f'\n          <div class="ld-journey-connector {conn_class}"></div>\n'
                
        ladder_html += '''
    </div>
  </div>
</section>
<!-- END PROGRESSION LADDER -->
</div> <!-- end cvd-main-content -->
'''
        # Replace the end div
        content = content.replace('</div> <!-- end cvd-main-content -->', ladder_html, 1)
        
        with open(fpath, 'w', encoding='utf-8') as f:
            f.write(content)
        count_ladder += 1
print(f"Inserted ladder in {count_ladder} files.")


# 3. Completely replace hero for Nakshatra
nak_files = glob.glob(r'd:\Parashari website new\AB_AI\courses\nakshatra-*.html')
new_nak_hero = '''<section style="width: 100%; border-bottom: 1px solid #e0d5c8;">
            <img src="../assets/images-optimized/nakshatra/header1.webp" alt="Grah Nakshatra" style="width: 100%; height: auto; display: block;">
        </section>

        <section class="cvd-section" style="padding: 40px 20px; background: #fdfbf7; text-align: center;">
            <h2 style="font-family: 'Times New Roman', serif; font-size: 2.2rem; color: #591C21; font-weight: bold; margin-bottom: 15px;">How Do the Stars Influence Your Life?</h2>
            <p style="font-size: 1.15rem; color: #444; max-width: 800px; margin: 0 auto 25px auto; line-height: 1.6;">
                Discover how <strong>Grah Nakshatras</strong> influence your relationships, career, health, and spiritual growth.<br>
                Unlock the secrets of your birth chart and find clarity in your life's path.
            </p>
            <a href="../nakshatra.html" style="background: linear-gradient(to right, #B22222, #8b0000); color: #fff; padding: 12px 35px; font-size: 1.35rem; font-weight: bold; border-radius: 6px; display: inline-block; text-decoration: none; box-shadow: 0 6px 15px rgba(139,0,0,0.25); margin-bottom: 10px;">Enroll Now - ₹<span class="nakshatra-price-val">2999</span></a>
            <div style="color: #B27C31; font-style: italic; font-weight: 600; font-size: 1.05rem;">One-time Payment - Lifetime Access</div>
        </section>'''

count_nak = 0
for fpath in nak_files:
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # We want to replace <section class="cvd-hero"> ... </section>
    # Note: cvd-hero might be slightly different in each
    hero_pattern = re.compile(r'<section class="cvd-hero">.*?</section>', re.DOTALL)
    
    if re.search(hero_pattern, content):
        content = re.sub(hero_pattern, new_nak_hero, content)
        with open(fpath, 'w', encoding='utf-8') as f:
            f.write(content)
        count_nak += 1
print(f"Replaced Nakshatra hero in {count_nak} files.")
