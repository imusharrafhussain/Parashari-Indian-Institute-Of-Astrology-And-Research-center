from bs4 import BeautifulSoup
import os

path = 'd:/Parashari website new/AB_AI/crash-courses/cc-feng-shui.html'

with open(path, 'r', encoding='utf-8') as f:
    html_content = f.read()

soup = BeautifulSoup(html_content, 'html.parser')

# Find the wyg-img-wrap
wyg_left_col = soup.find('div', class_='wyg-img-wrap')

if wyg_left_col:
    # We already removed wyg-img and glow via previous script.
    # Find the broken glass-value-card (it might be broken because of regex injection)
    expert_card = wyg_left_col.find('div', class_='expert-card')
    glass_card = wyg_left_col.find('div', class_='glass-value-card')
    
    # We will completely rebuild the wyg_left_col to guarantee it is clean
    wyg_left_col.clear()
    
    # Let's recreate a clean glass-value-card
    clean_glass = soup.new_tag('div')
    clean_glass['class'] = 'glass-value-card'
    clean_glass.append(BeautifulSoup('''
        <div class="gvc-row gvc-strike"><span>Total Value:</span><span class="gvc-price">₹3,499</span></div>
        <div class="gvc-row gvc-offer"><span>Today's Offer:</span><span class="gvc-price">₹2,499</span></div>
        <div class="gvc-divider"></div>
        <div class="gvc-row gvc-save"><span>🎉 You Save:</span><span class="gvc-price">₹1,000</span></div>
    ''', 'html.parser'))
    
    # Let's recreate a clean expert-card
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
    
    # Append both properly
    wyg_left_col.append(clean_glass)
    wyg_left_col.append(clean_expert)

# Fix the CSS as well to make it slightly wider and better
style_tag = soup.find('style')
if style_tag:
    css_content = style_tag.string
    if css_content:
        import re
        pattern = r'/\* Vertically styled Premium Faculty Card for WYG Left Column \*/.*?(?=</style>)'
        replacement = """
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
        new_css = re.sub(pattern, replacement.strip() + '\n', css_content, flags=re.DOTALL)
        style_tag.string.replace_with(new_css)

with open(path, 'w', encoding='utf-8') as f:
    f.write(str(soup))
