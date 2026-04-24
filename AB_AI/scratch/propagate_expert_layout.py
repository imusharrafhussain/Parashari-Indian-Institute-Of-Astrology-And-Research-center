import os
import re
from bs4 import BeautifulSoup

files_dir = 'd:/Parashari website new/AB_AI/crash-courses/'
archive_dir = 'd:/Parashari website new/AB_AI/archive/'

filenames = [
    "plrt.html", "cc-bhoomi-vastu.html", "cc-modern-western-palmistry.html", 
    "cc-mobile-numerology.html", "cc-face-reading.html", "cc-financial-astrology.html", 
    "cc-lal-kitab.html", "cc-medical-astrology.html", "cc-bnn-intensive.html", 
    "cc-modern-career-astrology.html", "cc-business-numerology.html", "cc-vedic-numerology.html", 
    "cc-nadi-astrology.html", "cc-healing.html", "cc-jaimini-astrology.html"
]

expert_css = """
        /* Vertically styled Premium Faculty Card for WYG Left Column */
        .cc-palmistry-landing .wyg-img-wrap .expert-card {
            border: 1px solid rgba(204, 163, 56, 0.4);
            background: linear-gradient(145deg, var(--card), var(--cream-dark));
            box-shadow: 0 10px 30px rgba(0,0,0,0.08), 0 0 20px rgba(204,163,56,0.15);
            width: 100%;
            border-radius: 1.5rem;
            overflow: hidden;
            position: relative;
        }

        .cc-palmistry-landing .wyg-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 3rem;
            align-items: start;
        }

        @media (min-width: 1200px) {
            .cc-palmistry-landing .wyg-grid {
                grid-template-columns: 0.9fr 1.1fr !important; /* give pills more room, card slightly less */
            }
        }
        
        /* Subtle top gold accent bar */
        .cc-palmistry-landing .wyg-img-wrap .expert-card::before {
            content: '';
            position: absolute;
            top: 0; left: 0; right: 0;
            height: 6px;
            background: var(--gradient-gold);
        }

        .cc-palmistry-landing .wyg-img-wrap .expert-inner {
            display: flex;
            flex-direction: column;
            gap: 2rem;
            padding: 3rem 2.5rem;
            align-items: center;
            text-align: center;
        }

        .cc-palmistry-landing .wyg-img-wrap .expert-img-wrap {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }

        .cc-palmistry-landing .wyg-img-wrap .expert-img {
            width: 10rem;
            height: 10rem;
            border-radius: 50%;
            border: 4px solid var(--cream-dark);
            box-shadow: 0 0 0 2px var(--gold), 0 8px 16px rgba(0,0,0,0.15);
            object-fit: cover;
        }

        /* "India's Top Educators" text */
        .cc-palmistry-landing .wyg-img-wrap .expert-img-wrap div {
            font-size: 1.05rem !important;
            margin-top: 1.2rem !important;
            letter-spacing: 1.5px !important;
            color: var(--gold-dark) !important;
            font-weight: 800;
        }

        .cc-palmistry-landing .wyg-img-wrap h2 {
            font-size: 1.7rem;
            line-height: 1.35;
            color: var(--primary);
            margin-bottom: 0.5rem;
            font-family: 'Playfair Display', serif;
        }

        .cc-palmistry-landing .wyg-img-wrap p {
            font-size: 1rem;
            line-height: 1.6;
            color: var(--muted);
            margin-bottom: 0;
        }

        /* "Unmatched Mentorship & Support" subtitle */
        .cc-palmistry-landing .wyg-img-wrap p:nth-of-type(1) {
            font-weight: 700;
            font-size: 0.9rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            color: var(--gold-dark);
            margin-bottom: 1.25rem;
        }

        .cc-palmistry-landing .wyg-img-wrap .expert-tags {
            margin-top: 1.75rem;
            display: flex;
            flex-wrap: wrap;
            gap: 0.75rem;
            justify-content: center;
        }

        .cc-palmistry-landing .wyg-img-wrap .expert-tag {
            font-size: 0.8rem;
            padding: 8px 16px;
            background: rgba(255,255,255,0.7);
            border: 1px solid var(--border);
            border-radius: 50px;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 6px;
        }
        
        .cc-palmistry-landing .glass-value-card {
            max-width: 100% !important;
        }
"""

for filename in filenames:
    filepath = os.path.join(archive_dir if filename == 'plrt.html' else files_dir, filename)
    if not os.path.exists(filepath):
        print(f"Skipping {filename}")
        continue
        
    with open(filepath, 'r', encoding='utf-8') as f:
        html_content = f.read()

    soup = BeautifulSoup(html_content, 'html.parser')
    wyg_left_col = soup.find('div', class_='wyg-img-wrap')
    expert_section_original = soup.find('section', class_='expert')
    
    if wyg_left_col:
        # First grab the old pricing data from existing glass-value-card to preserve values
        gvc_price = "₹2,499"
        gvc_old = "₹3,499"
        gvc_save = "₹1,000"
        
        old_gvc = wyg_left_col.find('div', class_='glass-value-card')
        if old_gvc:
            prices = old_gvc.find_all('span', class_='gvc-price')
            if len(prices) >= 3:
                gvc_old = prices[0].text
                gvc_price = prices[1].text
                gvc_save = prices[2].text
        
        wyg_left_col.clear()
        
        # Build clean glass card
        clean_glass = soup.new_tag('div')
        clean_glass['class'] = 'glass-value-card'
        clean_glass.append(BeautifulSoup(f'''
            <div class="gvc-row gvc-strike"><span>Total Value:</span><span class="gvc-price">{gvc_old}</span></div>
            <div class="gvc-row gvc-offer"><span>Today's Offer:</span><span class="gvc-price">{gvc_price}</span></div>
            <div class="gvc-divider"></div>
            <div class="gvc-row gvc-save"><span>🎉 You Save:</span><span class="gvc-price">{gvc_save}</span></div>
        ''', 'html.parser'))
        
        # Build clean expert card
        clean_expert = soup.new_tag('div')
        clean_expert['class'] = 'expert-card'
        clean_expert['style'] = 'margin-top: 2rem;'
        clean_expert.append(BeautifulSoup('''
            <div class="expert-inner">
                <div class="expert-img-wrap">
                    <img src="../circle faculty images.jpg.jpeg" alt="Expert Faculty Panel" class="expert-img">
                    <div>INDIA'S TOP EDUCATORS</div>
                </div>
                <div>
                    <h2>Guided by an Elite Panel of Experts</h2>
                    <p>UNMATCHED MENTORSHIP & SUPPORT</p>
                    <p>This crash course is designed and delivered by a curated group of seasoned professionals. Every module is taught with practical examples and real guidance.</p>
                    <div class="expert-tags">
                        <span class="expert-tag"><span class="expert-dot" style="background:hsl(40,80%,55%); width:8px; height:8px; border-radius:50%; display:inline-block;"></span> Active Practitioners</span>
                        <span class="expert-tag"><span class="expert-dot" style="background:var(--gold); width:8px; height:8px; border-radius:50%; display:inline-block;"></span> Proven Methods</span>
                        <span class="expert-tag"><span class="expert-dot" style="background:var(--primary); width:8px; height:8px; border-radius:50%; display:inline-block;"></span> Guided Practice</span>
                    </div>
                </div>
            </div>
        ''', 'html.parser'))
        
        wyg_left_col.append(clean_glass)
        wyg_left_col.append(clean_expert)
        
    if expert_section_original:
        expert_section_original.decompose()

    # Append the CSS rules safely within the style block
    style_tag = soup.find('style')
    if style_tag and style_tag.string:
        css_content = style_tag.string
        # Check if we already applied this block
        if "Vertically styled Premium Faculty Card for WYG Left Column" not in css_content:
            # Check if there is an old /* Extra styling to make the expert-card look good */
            pattern = r'/\* Extra styling to make the expert-card look good in the narrow left column \*/.*?(?=</style>)'
            if re.search(pattern, css_content, flags=re.DOTALL):
                new_css = re.sub(pattern, expert_css.strip() + '\n', css_content, flags=re.DOTALL)
                style_tag.string.replace_with(new_css)
            else:
                # Just append
                style_tag.append("\n" + expert_css)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(str(soup))
    print(f"Propagated correctly: {filename}")
