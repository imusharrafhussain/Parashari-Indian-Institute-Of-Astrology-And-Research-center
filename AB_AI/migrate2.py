import os

def migrate():
    # Load diploma CSS features
    diploma = open(r'd:\Parashari website new\AB_AI\courses\vedic-astrology-diploma.html', encoding='utf-8').read()
    
    css_start = diploma.find('.cvd-learn-item-img-wrapper {')
    css_end = diploma.find('.cvd-sidebar-heading {')
    perfect_css_learn = diploma[css_start:css_end]
    
    media_1300_start = diploma.find('@media (max-width: 1300px) {')
    media_1300_end = diploma.find('@media (max-width: 991px) {')
    perfect_media_1300 = diploma[media_1300_start:media_1300_end]
    
    desk_start = diploma.find('@media (min-width: 992px) {')
    desk_end = diploma.find('</style>', desk_start)
    perfect_desktop_media = diploma[desk_start:desk_end]
    
    ext_start = diploma.find('</style>')
    ext_end = diploma.find('<!-- START MAIN LAYOUT WITH SIDEBAR -->')
    perfect_overlay_block = diploma[ext_start:ext_end]
    
    for filename in ['vedic-astrology-bachelors.html', 'vedic-astrology-masters.html']:
        path = os.path.join(r'd:\Parashari website new\AB_AI\courses', filename)
        content = open(path, encoding='utf-8').read()
        
        # 0. Clean previous corrupted overlay logic
        # If there's an unclosed `<div id="onboarding-overlay"` block floating around or inside the CSS...
        # I actually restored them from Git right before this, so they are clean April 11 versions!
        
        # 1. Replace cvd-learn-item-img-wrapper
        old_learn_s = content.find('.cvd-learn-item-img-wrapper {')
        old_learn_e = content.find('.cvd-sidebar-heading {')
        if old_learn_s != -1:
            content = content[:old_learn_s] + perfect_css_learn + content[old_learn_e:]
            
        # 2. Insert 1300px block
        if '@media (max-width: 1300px)' not in content:
            content = content.replace('@media (max-width: 991px) {', perfect_media_1300 + '@media (max-width: 991px) {')
            
        # 3. Add 992px desktop block (if it doesn't exist, or replace it)
        old_desk = content.find('@media (min-width: 992px) {')
        if old_desk == -1:
            # Inject before </style> that belongs to cvd-hero block
            # In Bachelors, there are multiple </style> tags. The cvd-hero block ends where the `cvd-faq` ends.
            # We can just look for the first `    </style>` after `.cvd-faq-question`
            idx_style_end = content.find('</style>', content.find('.cvd-faq-question'))
            content = content[:idx_style_end] + '\n      ' + perfect_desktop_media + '\n    </style>' + content[idx_style_end+8:]
            
        # 4. Inject Overlay correctly BETWEEN the last </style> and START MAIN LAYOUT
        if 'onboarding-overlay' not in content:
            idx_layout = content.find('<!-- START MAIN LAYOUT WITH SIDEBAR -->')
            if idx_layout != -1:
                # the perfect_overlay_block starts with </style>. So we just inject it and remove the existing </style> to avoid duplicating?
                # Actually, `perfect_overlay_block` starts with `</style>\n<script>...`. If we replace the `</style>` that is right before `<!-- START MAIN LAYOUT`, we get a perfect DOM.
                idx_style_end = content.find('</style>', content.find('.cvd-faq-question'))
                content = content[:idx_style_end] + perfect_overlay_block + content[idx_layout:]
            
        # 5. Move progression ladder inside cvd-main-content
        idx_ladder = content.find('<!-- PROGRESSION LADDER -->')
        idx_end_main = content.find('<!-- end cvd-main-content -->')
        if idx_ladder > idx_end_main and idx_ladder != -1:
            ladder_start = content.find('<!-- PROGRESSION LADDER -->')
            ladder_end = content.find('<!-- END PROGRESSION LADDER -->') + len('<!-- END PROGRESSION LADDER -->')
            ladder_html = content[ladder_start:ladder_end]
            ladder_html = ladder_html.replace('<section class="course-progression-ladder">', '<section class="course-progression-ladder" style="padding-bottom: 20px;">')
            content = content[:ladder_start] + content[ladder_end:]
            # Reinsert
            idx_end_main = content.find('</div> <!-- end cvd-main-content -->')
            content = content[:idx_end_main] + ladder_html + '\n\n</div> <!-- end cvd-main-content -->' + content[idx_end_main+36:]
            
        # Remove 100vw
        content = content.replace('max-width: 100vw', 'max-width: 100%')
            
        open(path, 'w', encoding='utf-8').write(content)
        print(f'Done {filename}')

migrate()
