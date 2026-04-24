import os
import glob

files = glob.glob('d:/Parashari website new/AB_AI/crash-courses/*.html')
files.append('d:/Parashari website new/AB_AI/archive/plrt.html')

search_str_h1 = ' <span class="text-gold">Masterclass</span></h1>'
replace_str_h1 = '</h1>'

search_str_edu = '''<div class="expert-img-wrap"><img src="../circle faculty images.jpg.jpeg" alt="Expert Faculty Panel" class="expert-img"></div>'''
replace_str_edu = '''<div class="expert-img-wrap" style="text-align: center; display: flex; flex-direction: column; align-items: center;">
    <img src="../circle faculty images.jpg.jpeg" alt="Expert Faculty Panel" class="expert-img">
    <div style="margin-top: 15px; font-weight: 900; font-size: 1.35rem; color: #c8960c; text-shadow: 0 0 12px rgba(200, 150, 12, 0.6), 0 0 24px rgba(200, 150, 12, 0.4); text-transform: uppercase; letter-spacing: 2px;">India's Top Educators</div>
</div>'''

pill_css_original = '''        .cc-palmistry-landing .pill {
            display: flex;
            align-items: flex-start;
            gap: 0.75rem;
            border-radius: var(--radius);
            border: 1px solid rgba(250, 245, 235, 0.1);
            background: rgba(250, 245, 235, 0.05);
            padding: 0.75rem;
            backdrop-filter: blur(4px);
        }

        .cc-palmistry-landing .pill-icon {
            font-size: 1.5rem;
        }

        .cc-palmistry-landing .pill-title {
            font-size: 0.875rem;
            font-weight: 600;
            color: var(--gold-light);
        }

        .cc-palmistry-landing .pill-desc {
            font-size: 0.875rem;
            color: rgba(250, 245, 235, 0.6);
        }'''

pill_css_new = '''        .cc-palmistry-landing .pill {
            display: flex;
            align-items: center;
            gap: 1rem;
            border-radius: var(--radius);
            border: 1px solid rgba(250, 245, 235, 0.15);
            background: rgba(250, 245, 235, 0.05);
            padding: 1rem 1.25rem;
            backdrop-filter: blur(4px);
        }

        .cc-palmistry-landing .pill-icon {
            font-size: 1.75rem;
            line-height: 1;
            display: flex;
            align-items: center;
        }

        .cc-palmistry-landing .pill-title {
            font-size: 1rem;
            font-weight: 700;
            color: var(--gold-light);
            margin: 0 0 0.3rem 0;
            line-height: 1.2;
        }

        .cc-palmistry-landing .pill-desc {
            font-size: 0.85rem;
            color: rgba(250, 245, 235, 0.7);
            margin: 0;
            line-height: 1.4;
        }'''

media_query_css = '''
        /* Horizontal Pricing Card for Desktop added automatically */
        @media (min-width: 992px) {
            .cc-palmistry-landing .pricing-card-wrap {
                max-width: 1050px;
            }
            .cc-palmistry-landing .pricing-card {
                display: flex;
                flex-direction: row;
                align-items: stretch;
            }
            .cc-palmistry-landing .pricing-header {
                flex: 0 0 28%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                border-right: 1px solid rgba(255,255,255,0.1);
                border-radius: 1rem 0 0 1rem;
            }
            .cc-palmistry-landing .pricing-body {
                flex: 0 0 35%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                border-right: 1px solid var(--border);
            }
            .cc-palmistry-landing .pricing-includes {
                flex: 1;
                border-top: none;
                display: flex;
                flex-direction: column;
                justify-content: center;
            }
        }
'''

for filepath in files:
    if not os.path.exists(filepath): continue
    with open(filepath, 'r', encoding='utf-8') as file:
        content = file.read()
    
    changed = False
    if search_str_h1 in content:
        content = content.replace(search_str_h1, replace_str_h1)
        changed = True
        
    if search_str_edu in content:
        content = content.replace(search_str_edu, replace_str_edu)
        changed = True
        
    if pill_css_original in content:
        content = content.replace(pill_css_original, pill_css_new)
        changed = True
        
    if media_query_css not in content and '</style>' in content:
        content = content.replace("</style>", media_query_css + "\n    </style>")
        changed = True

    if changed:
        with open(filepath, 'w', encoding='utf-8') as file:
            file.write(content)
        print(f"Updated: {os.path.basename(filepath)}")
    else:
        print(f"No changes needed: {os.path.basename(filepath)}")
