import os
import re

path = 'd:/Parashari website new/AB_AI/crash-courses/cc-feng-shui.html'

with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Find expert card
expert_match = re.search(r'<section class="expert"><div class="ccp-container">(<div class="expert-card">.*?</div>)</div></section>', content, flags=re.DOTALL)
if expert_match:
    expert_html = expert_match.group(1)
    # Remove the entire expert section
    content = content[:expert_match.start()] + content[expert_match.end():]
    
    # Insert expert card below glass-value-card inside wyg-img-wrap
    insert_pattern = r'(<div class="glass-value-card">.*?</div>\n?)'
    
    # We want to replace the FIRST match inside the wyg section, which is the glass_value_card
    gvc_match = re.search(insert_pattern, content, flags=re.DOTALL)
    if gvc_match:
        # Wrap expert_html in a div with some top margin
        injected = f'\n    <div style="margin-top: 2rem; width: 100%; border-radius: 1rem; overflow: hidden; box-shadow: var(--shadow-card); border: 1px solid var(--border);">\n        {expert_html}\n    </div>\n'
        content = content[:gvc_match.end()] + injected + content[gvc_match.end():]
        print('Injected successfully!')

    # Adjust CSS for expert card inside wyg-img-wrap
    css_override = """
        /* Extra styling to make the expert-card look good in the narrow left column */
        .cc-palmistry-landing .wyg-img-wrap .expert-card {
            border: none;
            box-shadow: none;
        }
        .cc-palmistry-landing .wyg-img-wrap .expert-inner {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
            padding: 1.5rem;
            text-align: center;
            align-items: center;
        }
        .cc-palmistry-landing .wyg-img-wrap .expert-img-wrap {
            text-align: center;
        }
        .cc-palmistry-landing .wyg-img-wrap .expert-img {
            width: 7rem;
            height: 7rem;
        }
        .cc-palmistry-landing .wyg-img-wrap .expert-tags {
            justify-content: center;
            flex-wrap: wrap;
        }
        .cc-palmistry-landing .wyg-img-wrap h2 {
            font-size: 1.25rem;
            text-align: center;
        }
"""
    # Insert CSS before closing head or style
    if '</style>' in content:
        content = content.replace('</style>', css_override + '\n    </style>')

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
else:
    print('Pattern not found')
