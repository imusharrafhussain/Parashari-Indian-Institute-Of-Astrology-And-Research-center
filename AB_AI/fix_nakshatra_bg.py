import glob
import re

for file in glob.glob(r'd:\Parashari website new\AB_AI\courses\nakshatra*.html'):
    with open(file, 'r', encoding='utf-8') as f:
        text = f.read()

    # Determine level for price/badge
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

    new_hero_html = f'''<section class="cvd-hero" style="background: url('../assets/images-optimized/nakshatra/header1.webp') no-repeat center center; background-size: cover; text-align: center; color: #fff; padding: 80px 20px 40px; position: relative;">
<div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 1;"></div>
<div class="cvd-hero-container" style="position: relative; z-index: 2; max-width: 800px; margin: 0 auto; display: block; min-height: auto;">
<h1 class="cvd-hero-title" style="font-size: 3.5rem; font-family: 'Playfair Display', serif; font-weight: 700; margin-bottom: 15px; text-shadow: 2px 2px 8px rgba(0,0,0,0.6);">Grah Nakshatra</h1>
<div class="cvd-hero-subtitle" style="font-size: 1.5rem; text-shadow: 1px 1px 5px rgba(0,0,0,0.5);">Unlock Your Destiny Through Vedic Astrology</div>
</div>
</section>

<section style="background: linear-gradient(180deg, #fdfaf6 0%, #fff 100%); padding: 40px 20px 40px; text-align: center; border-bottom: 1px solid #eee;">
<div style="max-width: 800px; margin: 0 auto;">
<h2 style="font-size: 2rem; color: #5a3c2e; margin-bottom: 15px; font-weight: 600;">How Do the Stars Influence Your Life?</h2>
<div class="cvd-hero-hook" style="font-weight: 500; font-size: 1.15rem; line-height: 1.6; color: #333; margin-bottom: 25px;">
Discover how Grah Nakshatras influence your relationships, career, health, and spiritual growth.<br/>
Unlock the secrets of your birth chart and find clarity in your life's path.
</div>
<a class="cvd-hero-btn" href="../nakshatra.html" style="font-size: 1.25rem; padding: 15px 40px; box-shadow: 0 5px 15px rgba(184,40,40,0.4); display: inline-block;">Enroll Now – <span style="text-decoration: line-through; opacity: 0.7; font-size: 0.85em; margin-right: 6px;">₹{old_price}</span> ₹{price}</a>
<div class="cvd-hero-save" style="margin-top: 15px; color: #a48232; font-weight: 500; font-size: 0.9rem;">One-time Payment - Lifetime Access</div>
</div>
</section>'''

    text = re.sub(r'<section class="cvd-hero".*?</section>\s*(?:<div class="cvd-hero-bottom-text".*?</div>)?', new_hero_html, text, flags=re.DOTALL)
    text = re.sub(r'<div class="cvd-hero-bottom-text".*?</div>', '', text, flags=re.DOTALL)

    with open(file, 'w', encoding='utf-8') as f:
        f.write(text)

print("Updated Nakshatra hero background.")
