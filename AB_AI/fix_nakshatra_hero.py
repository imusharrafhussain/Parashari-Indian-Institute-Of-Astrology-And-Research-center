import glob
import re

files = glob.glob('courses/nakshatra-*.html')

std_desktop_css = """      .cvd-hero {
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
      }"""

std_mobile_css = """        /* Hero Section - image on top, text below */
        .cvd-hero { padding: 20px 0 30px 0; }
        .cvd-hero-container { flex-direction: column-reverse; text-align: center; padding: 0 15px; min-height: auto; }
        .cvd-hero-text { max-width: 100%; padding: 10px 5px 20px 5px; text-align: center; }
        .cvd-hero-title { font-size: 2rem; }
        .cvd-hero-subtitle { font-size: 1.3rem; }
        .cvd-hero-hook { font-size: 1rem; }
        .cvd-hero-btn { font-size: 1.15rem; padding: 10px 25px; width: 100%; text-align: center; box-sizing: border-box; }
        .cvd-hero-img-wrap { display: flex; align-items: center; justify-content: center; position: relative; width: 100%; height: auto; transform: none; margin-top: 0; pointer-events: auto; }
        .cvd-hero-img-wrap img { width: 100%; height: auto; max-width: 350px; margin: 0 auto; transform: none; object-position: center; object-fit: contain; max-height: 350px; }"""

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Determine certification
    level_name = file.split('-')[1].replace('.html', '')
    if 'bachelors' in level_name: badge_text = "Bachelors Certification"
    elif 'diploma' in level_name: badge_text = "Diploma Certification"
    elif 'masters' in level_name: badge_text = "Masters Certification"
    else: badge_text = "Grand Master Certification"
    
    # Extract price block
    price_match = re.search(r'Enroll Now – <span style="text-decoration: line-through; opacity: 0.7; font-size: 0.85em; margin-right: 6px;">₹([0-9,]+)<\\/span> ₹([0-9,]+)', content)
    if not price_match:
        price_match = re.search(r'Enroll Now – <span[^>]+>₹([0-9,]+)</span> ₹([0-9,]+)', content)
    
    orig_price = price_match.group(1) if price_match else "34,999"
    cur_price = price_match.group(2) if price_match else "24,999"

    # Create new Hero Section
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
              <img src="../assets/images-optimized/nakshatra/header1.webp" alt="Grah Nakshatra" style="border-radius: 50%; box-shadow: 0 0 20px rgba(0,0,0,0.1); width: 380px; height: 380px; object-fit: cover;">
            </div>
          </div>
        </section>"""

    # We apply border-radius:50% on the image explicitly to make it neatly blend if it's a square banner so it mimics the circle of other courses.

    # 1. Remove old css blocks (cvd-hero-banner and cvd-below-hero)
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

    # Clean up mobile @media block for below-hero
    content = re.sub(r'\.cvd-hero-overlay \{.+?\}', '', content)
    content = re.sub(r'\.cvd-below-hero \{.+?\}', '', content)
    content = re.sub(r'\.cvd-below-hero-heading \{.+?\}', '', content)
    content = re.sub(r'\.cvd-below-hero-desc \{.+?\}', '', content)

    # 2. Inject standard CSS
    # Let's just find </style> and prepend our standard CSS right before it just to be safe it applies correctly
    content = content.replace("    <div class=\"cvd-layout-container\"", std_desktop_css + "\n    <div class=\"cvd-layout-container\"")
    
    # Inject mobile css
    mobile_mq = content.find('@media (max-width: 768px) {')
    if mobile_mq != -1:
        insert_idx = content.find('{', mobile_mq) + 1
        content = content[:insert_idx] + "\n" + std_mobile_css + content[insert_idx:]

    # 3. Replace HTML
    # We regex replace the entire section from <section class="cvd-hero-banner"> to </section> of cvd-below-hero
    content = re.sub(r'<!-- HERO: Image banner with text overlay -->.+?<!-- BELOW HERO: Description, Enroll, etc\. -->.+?One-time Payment - Lifetime Access</span>\s*</div>\s*</section>', new_hero_html, content, flags=re.DOTALL)

    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

print("Updated Nakshatra hero sections successfully.")
