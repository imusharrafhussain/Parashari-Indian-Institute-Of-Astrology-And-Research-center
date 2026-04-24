import re

path = 'd:/Parashari website new/AB_AI/crash-courses/cc-feng-shui.html'

with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Remove the wyg-img and its glow
content = re.sub(r'<div class="wyg-img-glow"></div>\s*<img src=".*?class="wyg-img".*?>', '', content)

# Redesign the CSS for the expert-card
new_css = """
        /* Vertically styled Premium Faculty Card for WYG Left Column */
        .cc-palmistry-landing .wyg-img-wrap .expert-card {
            border: 1px solid rgba(204, 163, 56, 0.4);
            background: linear-gradient(145deg, var(--card), var(--cream-dark));
            box-shadow: 0 10px 30px rgba(0,0,0,0.08), 0 0 20px rgba(204,163,56,0.15);
            width: 100%;
            max-width: 25rem;
            border-radius: 1.5rem;
            overflow: hidden;
            position: relative;
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
            gap: 1.5rem;
            padding: 2.5rem 2rem;
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
            width: 9rem;
            height: 9rem;
            border-radius: 50%;
            border: 4px solid var(--cream-dark);
            box-shadow: 0 0 0 2px var(--gold), 0 8px 16px rgba(0,0,0,0.15);
            object-fit: cover;
        }

        /* "India's Top Educators" text */
        .cc-palmistry-landing .wyg-img-wrap .expert-img-wrap div {
            font-size: 0.95rem !important;
            margin-top: 1rem !important;
            letter-spacing: 1px !important;
            color: var(--gold-dark) !important;
        }

        .cc-palmistry-landing .wyg-img-wrap h2 {
            font-size: 1.5rem;
            line-height: 1.3;
            color: var(--primary);
            margin-bottom: 0.5rem;
            font-family: 'Playfair Display', serif;
        }

        .cc-palmistry-landing .wyg-img-wrap p {
            font-size: 0.95rem;
            line-height: 1.6;
            color: var(--muted);
            margin-bottom: 0;
        }

        /* "Unmatched Mentorship & Support" subtitle */
        .cc-palmistry-landing .wyg-img-wrap p:nth-of-type(1) {
            font-weight: 700;
            font-size: 0.85rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            color: var(--gold-dark);
            margin-bottom: 1rem;
        }

        .cc-palmistry-landing .wyg-img-wrap .expert-tags {
            margin-top: 1.5rem;
            display: flex;
            flex-wrap: wrap;
            gap: 0.75rem;
            justify-content: center;
        }

        .cc-palmistry-landing .wyg-img-wrap .expert-tag {
            font-size: 0.75rem;
            padding: 6px 12px;
            background: rgba(255,255,255,0.7);
            border: 1px solid var(--border);
            border-radius: 50px;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 6px;
        }
"""

# Replace old css block
pattern = r'/\* Extra styling to make the expert-card look good in the narrow left column \*/.*?(?=</style>)'
new_content = re.sub(pattern, new_css.strip() + '\n', content, flags=re.DOTALL)

with open(path, 'w', encoding='utf-8') as f:
    f.write(new_content)
