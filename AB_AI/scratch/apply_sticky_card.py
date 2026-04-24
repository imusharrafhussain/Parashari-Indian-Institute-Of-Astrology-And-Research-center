import os
import glob
import re

files = glob.glob('d:/Parashari website new/AB_AI/crash-courses/*.html')
files.append('d:/Parashari website new/AB_AI/archive/plrt.html')

html_to_find = 'class="wyg-img"></div>'
html_to_replace = '''class="wyg-img">
    <div class="glass-value-card">
        <div class="gvc-row gvc-strike"><span>Total Value:</span><span class="gvc-price">₹3,499</span></div>
        <div class="gvc-row gvc-offer"><span>Today's Offer:</span><span class="gvc-price">₹2,499</span></div>
        <div class="gvc-divider"></div>
        <div class="gvc-row gvc-save"><span>🎉 You Save:</span><span class="gvc-price">₹1,000</span></div>
    </div>
</div>'''

css_to_inject = '''
        /* Sticky image and Glass Value Card CSS */
        @media (min-width: 1024px) {
            .cc-palmistry-landing .wyg-grid {
                align-items: flex-start;
            }
        }
        .cc-palmistry-landing .wyg-img-wrap {
            position: sticky;
            top: 120px;
        }
        .cc-palmistry-landing .glass-value-card {
            position: absolute;
            bottom: -20px;
            right: -20px;
            background: rgba(255, 255, 255, 0.85);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.5);
            border-radius: 1rem;
            padding: 1.25rem;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1), 0 0 15px rgba(204, 163, 56, 0.2);
            width: 240px;
            z-index: 10;
            animation: ccp-float 5s ease-in-out infinite;
        }
        @media (max-width: 991px) {
            .cc-palmistry-landing .wyg-img-wrap {
                position: relative;
                top: 0;
                margin-bottom: 2.5rem;
            }
            .cc-palmistry-landing .glass-value-card {
                right: 50%;
                transform: translateX(50%);
                bottom: -25px;
            }
        }
        .cc-palmistry-landing .gvc-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 0.5rem;
            font-size: 0.9rem;
            font-weight: 600;
        }
        .cc-palmistry-landing .gvc-strike {
            color: var(--muted);
            text-decoration: line-through;
        }
        .cc-palmistry-landing .gvc-offer {
            color: var(--primary);
            font-size: 1.05rem;
            font-weight: 800;
        }
        .cc-palmistry-landing .gvc-divider {
            height: 1px;
            background: rgba(0,0,0,0.1);
            margin: 0.75rem 0;
        }
        .cc-palmistry-landing .gvc-save {
            color: hsl(125, 60%, 25%);
            font-size: 0.95rem;
            font-weight: 800;
            margin-bottom: 0;
        }
'''

for filepath in files:
    if not os.path.exists(filepath): continue
    with open(filepath, 'r', encoding='utf-8') as file:
        content = file.read()
    
    changed = False
    
    if html_to_find in content and "glass-value-card" not in content:
        content = content.replace(html_to_find, html_to_replace)
        changed = True

    if css_to_inject not in content and "</style>" in content:
        content = content.replace("</style>", css_to_inject + "\n    </style>")
        changed = True

    if changed:
        with open(filepath, 'w', encoding='utf-8') as file:
            file.write(content)
        print(f"Updated: {os.path.basename(filepath)}")
    else:
        print(f"Skipped/already updated: {os.path.basename(filepath)}")
