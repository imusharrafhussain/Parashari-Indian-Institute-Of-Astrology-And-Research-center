import os
import glob
import re

print("Starting fixes...")

# 2. Insert Progression Ladder in Vastu, Rudraksha, Palmistry
categories = ['vastu', 'rudraksha', 'palmistry']
levels = [
    ('diploma', 'Diploma', 'THE FOUNDATION', 'fa-book-open'),
    ('bachelors', 'Bachelors', 'THE PRACTITIONER', 'fa-chart-pie'),
    ('masters', 'Masters', 'THE ADVANCED GUIDE', 'fa-compass'),
    ('grand-master', 'Grand Master', 'THE AUTHORITY', 'fa-crown')
]

count_ladder = 0
for cat in categories:
    for lvl_idx, (lvl_id, lvl_name, lvl_sub, lvl_icon) in enumerate(levels):
        filename = f"{cat}-{lvl_id}.html"
        fpath = os.path.join(r'd:\Parashari website new\AB_AI\courses', filename)
        if not os.path.exists(fpath):
            continue
            
        with open(fpath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        ladder_html = '''<!-- PROGRESSION LADDER -->
<section class="course-progression-ladder" style="padding-bottom: 20px;">
  <div class="container text-center">
    <h2 class="card-section-title" style="margin-bottom: 8px;">Your Learning Journey</h2>
    <p style="color:#666;max-width:600px;margin:0 auto 35px;font-size:1rem;">A clear path from foundation to authority. Upgrade at any time.</p>
    <div class="ld-journey-track">
'''
        for idx_l, (l_id, l_name, l_sub, l_icon) in enumerate(levels):
            is_current = (l_id == lvl_id)
            is_past = (idx_l < lvl_idx)
            node_class = "current" if is_current else ("completed" if is_past else "future")
            
            ladder_html += f'''
          <a href="{cat}-{l_id}.html" class="ld-journey-node {node_class}">
            <div class="ld-journey-icon"><i class="fas {l_icon}"></i></div>
            <span class="ld-journey-label">{l_name}</span>
            <span class="ld-journey-subtitle">{l_sub}</span>
            {'<span class="ld-journey-you">YOU ARE HERE</span>' if is_current else ''}
          </a>'''
            if idx_l < 3:
                conn_class = "filled" if is_past else ""
                ladder_html += f'\n          <div class="ld-journey-connector {conn_class}"></div>\n'
                
        ladder_html += '''
    </div>
  </div>
</section>
<!-- END PROGRESSION LADDER -->'''

        orig = content
        
        # Determine if ladder is visually empty
        # Let's just find the existing block between <!-- PROGRESSION LADDER --> and <!-- END PROGRESSION LADDER -->
        block_pattern = re.compile(r'<!-- PROGRESSION LADDER -->.*?<!-- END PROGRESSION LADDER -->', re.DOTALL)
        if re.search(block_pattern, content):
            existing_block = re.search(block_pattern, content).group(0)
            if 'ld-journey-track' not in existing_block:
                # Replace it
                content = re.sub(block_pattern, ladder_html, content)
        else:
            # Insert before <div id="marquee-placeholder"></div>
            content = content.replace('<div id="marquee-placeholder">', ladder_html + '\n<div id="marquee-placeholder">')

        if content != orig:
            with open(fpath, 'w', encoding='utf-8') as f:
                f.write(content)
            count_ladder += 1

print(f"Inserted ladder in {count_ladder} files.")
