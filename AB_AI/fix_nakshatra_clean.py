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

    new_hero_html = f'''<section class="cvd-hero" style="padding-bottom: 20px;">
<div class="cvd-hero-container" style="min-height: auto; align-items: flex-start; padding-top: 20px; padding-bottom: 0;">
<div class="cvd-hero-text" style="flex: 1; max-width: 550px; z-index: 2; position: relative;">
<div class="cvd-hero-badge"><i class="fas fa-award"></i> {badge}</div>
<div class="cvd-hero-title" style="margin-top: 10px;">Grah Nakshatra:</div>
<div class="cvd-hero-subtitle" style="margin-bottom: 20px;">Unlock Your Destiny Through Vedic Astrology</div>
</div>
<div class="cvd-hero-img-wrap" style="position: relative; width: 45%; display: flex; justify-content: flex-end; z-index: 1;">
<img alt="Grah Nakshatra" src="../assets/images-optimized/nakshatra/header1.webp" style="width: 100%; max-width: 450px; height: auto; object-fit: contain; display: block; border-radius: 50% !important; box-shadow: 0 10px 30px rgba(0,0,0,0.15);" />
</div>
</div>
<div class="cvd-hero-bottom-text" style="max-width: 900px; margin: 0 auto; text-align: left; padding: 10px 40px; position: relative; z-index: 5;">
<div class="cvd-hero-hook" style="font-weight: 500; font-size: 1.15rem; line-height: 1.6; color: #333; margin-bottom: 20px;"><b>Your life is not random.</b><br/>Every success, delay, relationship, and struggle is influenced by your Grah (Planets) &amp; Nakshatras (Stars).<br/><b>Discover your true life path, hidden blockages, and future opportunities through ancient Vedic wisdom.</b></div>
<a class="cvd-hero-btn" href="../nakshatra.html" style="margin-top: 5px;">Enroll Now – <span style="text-decoration: line-through; opacity: 0.7; font-size: 0.85em; margin-right: 6px;">₹{old_price}</span> ₹{price}</a>
<div class="cvd-hero-save" style="margin-top: 12px;"><i class="fas fa-check" style="color: #6B8E23;"></i> One-time Payment - Lifetime Access</div>
</div>
</section>'''

    # Replace the whole <section class="cvd-hero">...</section>
    text = re.sub(r'<section class="cvd-hero">.*?</section>', new_hero_html, text, flags=re.DOTALL)
    
    # Also fix mobile CSS for cvd-hero-container/cvd-hero-img-wrap in Nakshatra
    # We used inline styles, so it will look good. We just need to make sure the media queries don't break our new layout.
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(text)

print("Restored clean Nakshatra hero")
