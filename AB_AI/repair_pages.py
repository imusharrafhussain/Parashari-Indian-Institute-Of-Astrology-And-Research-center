import glob
import re

# 1. Fix Rudraksha pages: replace broken style block with correct one from Vedic Astrology
with open(r'd:\Parashari website new\AB_AI\courses\vedic-astrology-diploma.html', 'r', encoding='utf-8') as f:
    vedic_html = f.read()

# Extract the correct style block
style_match = re.search(r'(<style>\s*\.cvd-hero \{.*?</style>)', vedic_html, re.DOTALL)
if style_match:
    correct_style_block = style_match.group(1)
    
    # Apply to all rudraksha pages
    for file in glob.glob(r'd:\Parashari website new\AB_AI\courses\rudraksha*.html'):
        with open(file, 'r', encoding='utf-8') as f:
            text = f.read()
            
        # find its inline style block
        text = re.sub(r'<style>\s*\.cvd-hero \{.*?</style>', correct_style_block, text, flags=re.DOTALL)
        
        with open(file, 'w', encoding='utf-8') as f:
            f.write(text)
    print("Rudraksha pages style block fixed.")
else:
    print("Could not find style block in vedic-astrology-diploma.html")

# 2. Fix Nakshatra pages: replace bad hero with standard hero layout

for file in glob.glob(r'd:\Parashari website new\AB_AI\courses\nakshatra*.html'):
    with open(file, 'r', encoding='utf-8') as f:
        text = f.read()

    badge = ""
    price = ""
    old_price = ""
    if 'bachelors' in file:
        badge = "Bachelors Certification"
        price = "8,999"
        old_price = "11,999"
    elif 'diploma' in file:
        badge = "Diploma Certification"
        price = "4,199"
        old_price = "5,499"
    elif 'masters' in file:
        badge = "Masters Certification"
        price = "14,999"
        old_price = "19,999"
    elif 'grand-master' in file:
        badge = "Grand Master Certification"
        price = "24,999"
        old_price = "33,999"

    new_hero_html = f'''<section class="cvd-hero">
          <div class="cvd-hero-container">
            <div class="cvd-hero-text">
              <div class="cvd-hero-badge"><i class="fas fa-award"></i> {badge}</div>
              <div class="cvd-hero-title" style="font-family: 'Times New Roman', serif;">Grah Nakshatra:</div>
              <div class="cvd-hero-subtitle">Unlock Your Destiny Through Vedic Astrology</div>
              <div class="cvd-hero-hook" style="font-weight: 500;">Discover how Grah Nakshatras influence your relationships, career, health, and spiritual growth. Unlock the secrets of your birth chart and find clarity in your life's path.</div>
              
              <a href="../nakshatra.html" class="cvd-hero-btn">Enroll Now – <span style="text-decoration: line-through; opacity: 0.7; font-size: 0.85em; margin-right: 6px;">₹{old_price}</span> ₹{price}</a>
              <div class="cvd-hero-save"><i class="fas fa-check" style="color: #6B8E23;"></i> One-time Payment - Lifetime Access</div>
              
              <div style="margin-top: 25px;">
                <a href="../nakshatra.html" style="color: #B27C31; font-weight: 600; text-decoration: underline; font-size: 1rem;">
                  For price comparison follow this <i class="fas fa-arrow-right" style="font-size: 0.8rem;"></i>
                </a>
              </div>
            </div>
            <div class="cvd-hero-img-wrap">
              <img src="../assets/images-optimized/nakshatra/header1.webp" alt="Grah Nakshatra">
            </div>
          </div>
        </section>'''

    # It spans two sections right now (the background hero and the 'How Do the Stars Influence Your Life?' block underneath)
    text = re.sub(r'<section class="cvd-hero" style="background: url\(\'../assets/images-optimized/nakshatra/header1\.webp\'\).*?</div>\s*</section>\s*<section style="background: linear-gradient.*?</div>\s*</section>', new_hero_html, text, flags=re.DOTALL)

    # Some files might have already been modified once, just to be safe, search for the old ones too
    text = re.sub(r'<section class="cvd-hero" style="background: url.*?</div>\s*</section>', new_hero_html, text, flags=re.DOTALL)
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(text)

print("Nakshatra pages hero fixed.")
