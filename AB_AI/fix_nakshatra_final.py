import glob
import re

files = glob.glob('courses/nakshatra-*.html')

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Squeeze Fix
    content = content.replace('.cvd-learn-item img { max-width: 70px; }', 
                              '.cvd-learn-item img { max-width: 90px; height: 90px; object-fit: cover; }')
    
    # 2. Before/After Fix
    content = re.sub(
        r'\.cvd-ba-container \{ padding: 0 5px; \}.+?\.cvd-learn-grid',
        r'''.cvd-ba-container { padding: 0 5px; }
        .cvd-ba-header { display: none; }
        .cvd-ba-box { flex-direction: column; }
        .cvd-ba-left { width: 100%; border-radius: 4px 4px 0 0; padding: 15px 20px; }
        .cvd-ba-left::after { display: none; }
        .cvd-ba-left::before { content: 'Before'; display: block; text-align: center; font-size: 1.5rem; color: #555; font-family: "Times New Roman", serif; font-weight: bold; margin-bottom: 15px; padding-bottom: 15px; border-bottom: 2px solid rgba(0,0,0,0.1); }
        .cvd-ba-right::before { content: 'After'; display: block; text-align: center; font-size: 1.5rem; color: #A82C2C; font-family: "Times New Roman", serif; font-weight: bold; margin-bottom: 15px; padding-top: 15px; border-top: 2px solid rgba(168,44,44,0.2); }
        .cvd-ba-right { width: 100%; border-radius: 0 0 4px 4px; padding: 15px 20px; }
        .cvd-ba-item { font-size: 1rem; min-height: 50px; gap: 10px; }
        .cvd-learn-grid''', 
        content, flags=re.DOTALL)

    # 3. Experience list
    content = content.replace('.cvd-experience-list { max-width: 750px; margin: 0 auto; text-align: left; }',
                              '.cvd-experience-list { max-width: 750px; margin: 0 auto; text-align: left; padding: 0 10px 0 35px; }')


    # 4. Universal Hero Fix (Mobile)
    content = re.sub(
        r'\.cvd-hero-img-wrap img\s*\{\s*width: 100%;\s*(height: auto;)?\s*max-width: 350px;\s*margin: 0 auto;.*?\}',
        '.cvd-hero-img-wrap img { width: 100%; max-width: 400px; height: 300px; margin: 0 auto; object-fit: cover; object-position: 85% center; display: block; }',
        content, flags=re.DOTALL
    )

    content = content.replace(
        '.cvd-hero-img-wrap { position: relative; width: 100%; height: auto; justify-content: center; transform: none; margin-top: 0; pointer-events: auto; }',
        '.cvd-hero-img-wrap { display: flex; align-items: center; justify-content: center; position: relative; width: 100%; height: auto; transform: none; margin-top: 0; pointer-events: auto; }'
    )


    # 5. Nakshatra Hero Overhaul (WITH CORRECT STYLE TAGS)
    std_desktop_css = """<style>
      .cvd-hero {
        background: #FFFFFF;
        position: relative;
        overflow: hidden;
        padding: 50px 0 50px 0;
        border-bottom: none;
      }
      .cvd-hero-container {
        max-width: 100%;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 40px;
        position: relative;
        min-height: 450px;
      }
      .cvd-hero-text {
        flex: 1;
        max-width: 550px;
        padding-bottom: 0px;
        z-index: 2;
        text-align: left;
      }
      .cvd-hero-badge {
        display: inline-block;
        background: linear-gradient(135deg, #FFD700, #DAA520);
        color: #591C21;
        padding: 5px 15px;
        border-radius: 20px;
        font-size: 0.9rem;
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: 1.5px;
        margin-bottom: 15px;
        box-shadow: 0 4px 15px rgba(218, 165, 32, 0.4);
        border: 1px solid rgba(255, 255, 255, 0.6);
      }
      .cvd-hero-title {
        font-size: 2.8rem;
        color: #333;
        font-weight: 700;
        line-height: 1.1;
        margin-bottom: 10px;
        font-family: Arial, sans-serif;
      }
      .cvd-hero-subtitle {
        color: #B27C31;
        font-size: 1.8rem;
        font-weight: 600;
        margin-bottom: 25px;
        line-height: 1.4;
      }
      .cvd-hero-hook {
        font-style: italic;
        color: #444;
        font-size: 1.1rem;
        line-height: 1.5;
        margin-bottom: 20px;
      }
      .cvd-hero-btn {
        background: linear-gradient(to right, #B22222, #8b0000);
        color: #fff !important;
        padding: 12px 35px;
        font-size: 1.35rem;
        font-weight: bold;
        border-radius: 6px;
        display: inline-block;
        text-decoration: none;
        box-shadow: 0 6px 15px rgba(139,0,0,0.25);
        margin-top: 15px;
      }
      .cvd-hero-save {
        color: #B27C31;
        font-style: italic;
        font-weight: bold;
        margin-top: 10px;
        font-size: 1.05rem;
      }
      .cvd-hero-img-wrap {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        width: 45%;
        z-index: 1;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        pointer-events: none;
      }
      .cvd-hero-img-wrap img {
        height: 105%;
        width: auto;
        max-width: none;
        display: block;
        object-fit: contain;
        object-position: right center;
        margin-right: -30px;
      }
</style>"""

    std_mobile_css = """        /* Hero Section - image on top, text below */
        .cvd-hero { padding: 20px 0 30px 0; }
        .cvd-hero-container { flex-direction: column-reverse; text-align: center; padding: 0 15px; min-height: auto; }
        .cvd-hero-text { max-width: 100%; padding: 10px 5px 20px 5px; text-align: center; }
        .cvd-hero-title { font-size: 2rem; margin-top: 15px; }
        .cvd-hero-subtitle { font-size: 1.3rem; }
        .cvd-hero-hook { font-size: 1rem; }
        .cvd-hero-btn { font-size: 1.15rem; padding: 10px 25px; width: 100%; text-align: center; box-sizing: border-box; }
        .cvd-hero-img-wrap { display: flex; align-items: center; justify-content: center; position: relative; width: 100%; height: auto; transform: none; margin-top: 0; pointer-events: auto; }
        .cvd-hero-img-wrap img { width: 100%; max-width: 400px; height: 300px; margin: 0 auto; object-fit: cover; object-position: 85% center; display: block; }"""
    
    level_name = file.split('-')[1].replace('.html', '')
    if 'bachelors' in level_name: badge_text = "Bachelors Certification"
    elif 'diploma' in level_name: badge_text = "Diploma Certification"
    elif 'masters' in level_name: badge_text = "Masters Certification"
    else: badge_text = "Grand Master Certification"
    
    # Extract price
    price_match = re.search(r'Enroll Now – <span[^>]+>₹([0-9,]+)</span> ₹([0-9,]+)', content)
    orig_price = price_match.group(1) if price_match else "34,999"
    cur_price = price_match.group(2) if price_match else "24,999"

    new_hero_html = f"""        <section class="cvd-hero">
          <div class="cvd-hero-container">
            <div class="cvd-hero-text">
              <div class="cvd-hero-badge"><i class="fas fa-award"></i> {badge_text}</div>
              <div class="cvd-hero-title">Grah Nakshatra:</div>
              <div class="cvd-hero-subtitle">Unlock Your Destiny Through Vedic Astrology</div>
              <div class="cvd-hero-hook" style="font-weight: 500; font-size: 1.15rem; line-height: 1.6; color: #333;"><b>Your life is not random.</b><br>Every success, delay, relationship, and struggle is influenced by your Grah (Planets) &amp; Nakshatras (Stars).<br><b>Discover your true life path, hidden blockages, and future opportunities through ancient Vedic wisdom.</b></div>
              <a href="../nakshatra.html" class="cvd-hero-btn">Enroll Now – <span style="text-decoration: line-through; opacity: 0.7; font-size: 0.85em; margin-right: 6px;">₹{orig_price}</span> ₹{cur_price}</a>
              <div class="cvd-hero-save"><i class="fas fa-check" style="color: #6B8E23;"></i> One-time Payment - Lifetime Access</div>
            </div>
            <div class="cvd-hero-img-wrap">
              <img src="../assets/images-optimized/nakshatra/header1.webp" alt="Grah Nakshatra" style="border-radius: 50%; box-shadow: 0 0 20px rgba(0,0,0,0.1); width: 100%; height: 380px; max-width:380px; object-fit: cover;">
            </div>
          </div>
        </section>"""

    if 'cvd-hero-banner' in content:
        content = re.sub(r'\.cvd-hero-banner \{.+?\}', '', content, flags=re.DOTALL)
        content = re.sub(r'\.cvd-hero-banner img \{.+?\}', '', content, flags=re.DOTALL)
        content = re.sub(r'\.cvd-hero-overlay \{.+?\}', '', content, flags=re.DOTALL)
        content = re.sub(r'\.cvd-hero-title \{.+?\}', '', content, flags=re.DOTALL)
        content = re.sub(r'\.cvd-hero-subtitle \{.+?\}', '', content, flags=re.DOTALL)
        content = re.sub(r'\.cvd-below-hero \{.+?\}', '', content, flags=re.DOTALL)
        content = re.sub(r'\.cvd-below-hero-heading \{.+?\}', '', content, flags=re.DOTALL)
        content = re.sub(r'\.cvd-below-hero-desc \{.+?\}', '', content, flags=re.DOTALL)
        content = re.sub(r'\.cvd-hero-badge \{.+?\}', '', content, flags=re.DOTALL)
        content = re.sub(r'\.cvd-hero-btn \{.+?\}', '', content, flags=re.DOTALL)
        content = re.sub(r'\.cvd-hero-btn:hover \{.+?\}', '', content, flags=re.DOTALL)

        # INJECT WITH BEAUTIFULLY ISOLATED STYLE TAGS
        content = content.replace('    <!-- START MAIN LAYOUT WITH SIDEBAR -->', std_desktop_css + '\n    <!-- START MAIN LAYOUT WITH SIDEBAR -->')
        
        idx = content.rfind('@media (max-width: 768px) {')
        if idx != -1:
            insert_pos = content.find('{', idx) + 1
            content = content[:insert_pos] + '\n' + std_mobile_css + content[insert_pos:]
        
        content = re.sub(r'<!-- HERO: Image banner.+?One-time Payment - Lifetime Access</span>\s*</div>\s*</section>', new_hero_html, content, flags=re.DOTALL)

    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

print("Safely fixed Nakshatra CSS overflow.")
