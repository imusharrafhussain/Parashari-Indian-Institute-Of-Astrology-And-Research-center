import os
import re

file_path = r"d:\Parashari website new\AB_AI\crash-courses\cc-modern-western-palmistry.html"

with open(file_path, "r", encoding="utf-8") as f:
    html = f.read()

# 1. Text Replacements
replacements = [
    (r"Past Life Regression Theory & Healing - Parashari Indian Institute", "Palmistry - Parashari Indian Institute"),
    (r"Past Life Regression Theory \(PLRT\)", "Modern Western Palmistry"),
    (r"Past Life Regression Theory Course", "Modern Western Palmistry Course"),
    (r"Past_lif\.webp", "palmistry-new.webp"),
    (r"Explore subconscious memories and heal through the profound wisdom of past lives\. A highly intensive 4-week crash course designed to build practical therapeutic skills\.",
     "Understanding personality and character analysis through modern western palmistry techniques. A highly intensive 4-week crash course designed to build practical predictive skills."),
    (r"अवचेतन मन की यादों को समझें और पिछले जन्मों के गहन ज्ञान से मानसिक उपचार करना सीखें। यह 4-हफ्तों का एक बेहद सघन क्रैश कोर्स है, जो आपको व्यावहारिक थेरेपी सिखाने के लिए डिज़ाइन किया गया है।",
     "हस्तरेखा विज्ञान की तकनीकों के माध्यम से व्यक्तित्व और चरित्र विश्लेषण को गहराई से समझें। यह 4-हफ्तों का एक बेहद सघन क्रैश कोर्स है, जो आपको व्यावहारिक विश्लेषण सिखाने के लिए डिज़ाइन किया गया है।"),
    (r"Full access to premium 4-week training lessons", "4 weeks access to premium video lectures"),
    (r"Downloadable regression inductions & notes", "Exclusive PDFs, charts & notes"),
    (r"Start Your Subconscious Journey Today", "Start Your Palmistry Journey Today"),
    (r"Total Value ₹3,499", "Total Value ₹9,499"),
    (r"PLRT Journey", "Palmistry Journey")
]

for old, new in replacements:
    html = re.sub(old, new, html)

# 2. Add Horizontal Pricing Banner CSS
css_banner = """
        @media(min-width: 1200px) {
            .cc-palmistry-landing .banner-card {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
            }
            .cc-palmistry-landing .banner-left {
                flex: 1;
                margin-right: 2rem;
            }
            .cc-palmistry-landing .banner-right {
                flex-shrink: 0;
                display: flex;
                flex-direction: row;
                align-items: center;
                gap: 2rem;
                justify-content: flex-end;
            }
        }
        /* EXPERT */
"""
html = html.replace("        /* EXPERT */\n", css_banner)

# 3. Add Landscape Pricing Card CSS
css_pricing_card = """
        @media(min-width: 1024px) {
            .cc-palmistry-landing .pricing-card {
                display: grid;
                grid-template-columns: 1fr 1fr 1.5fr;
                align-items: center;
            }
            .cc-palmistry-landing .pricing-header, 
            .cc-palmistry-landing .pricing-body, 
            .cc-palmistry-landing .pricing-includes {
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
            }
            .cc-palmistry-landing .pricing-card-wrap {
                max-width: 64rem;
            }
            .cc-palmistry-landing .pricing-body p { margin: 0; }
        }
        /* FAQ */
"""
html = html.replace("        /* FAQ */\n", css_pricing_card)

# 4. Add Glowing Golden Text CSS
css_expert = """
        .cc-palmistry-landing .expert-img-wrap {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }

        .cc-palmistry-landing .expert-img-caption {
            margin-top: 1.25rem;
            font-size: 1.35rem;
            font-family: 'Playfair Display', serif;
            font-weight: 800;
            background: linear-gradient(135deg, #FFE770 0%, #D4AF37 50%, #FFDF00 100%);
            -webkit-background-clip: text;
            -moz-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            text-align: center;
            text-transform: uppercase;
            letter-spacing: 2px;
            filter: drop-shadow(0 0 8px rgba(212, 175, 55, 0.4));
            animation: textGlowPulse 2.5s infinite alternate;
        }

        @keyframes textGlowPulse {
            0% { filter: drop-shadow(0 0 4px rgba(212, 175, 55, 0.3)); }
            100% { filter: drop-shadow(0 0 15px rgba(255, 215, 0, 0.8)); }
        }

        .cc-palmistry-landing .expert-img {
"""

html = html.replace("""        .cc-palmistry-landing .expert-img-wrap {
            display: flex;
            justify-content: center;
        }

        .cc-palmistry-landing .expert-img {""", css_expert)

# 5. Insert HTML snippet for "India's Top Educators" under the image
expert_html_old = """<div class="expert-img-wrap"><img src="../circle faculty images.jpg.jpeg" alt="Expert Faculty Panel" class="expert-img"></div>"""
expert_html_new = """<div class="expert-img-wrap"><img src="../circle faculty images.jpg.jpeg" alt="Expert Faculty Panel" class="expert-img"><p class="expert-img-caption">India's Top Educators</p></div>"""
html = html.replace(expert_html_old, expert_html_new)

# 6. Change custom banner icons to the ones we used (SVG and FontAwesome)
banner_html_old = """<div class="banner-icon">⚡</div>"""
banner_html_new = """<div class="banner-icon"><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg></div>"""
html = html.replace(banner_html_old, banner_html_new)

timer_label_old = """<span class="countdown-label">🕐 Offer ends in:</span>"""
timer_label_new = """<span class="countdown-label"><i class="fa-regular fa-clock" style="margin-right: 4px;"></i> Offer ends in:</span>"""
html = html.replace(timer_label_old, timer_label_new)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(html)

print("Restoration script executed successfully.")
