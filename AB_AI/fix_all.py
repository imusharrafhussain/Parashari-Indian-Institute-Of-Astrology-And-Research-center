import os

def sync_all():
    base_dir = r'd:\Parashari website new\AB_AI\courses'
    diploma = open(os.path.join(base_dir, 'vedic-astrology-diploma.html'), encoding='utf-8').read()
    
    # Extract PERFECT learn image wrapper css
    learn_s = diploma.find('.cvd-learn-item-img-wrapper {')
    learn_e = diploma.find('.cvd-learn-item p', learn_s)
    css_learn_perfect = diploma[learn_s:learn_e]
    
    # Extract PERFECT Media Queries
    m1300_s = diploma.find('@media (max-width: 1300px) {')
    m1300_e = diploma.find('@media (max-width: 991px) {')
    m1300_perfect = diploma[m1300_s:m1300_e]
    
    m992_s = diploma.find('@media (min-width: 992px) {')
    m992_e = diploma.find('</style>', m992_s)
    m992_perfect = diploma[m992_s:m992_e]
    
    # Extract Perfect Onboarding Tour Block
    ob_s = diploma.find('<script>\n  document.addEventListener(')
    if ob_s == -1: ob_s = diploma.find('<script>\n  document.addEventListener')
    ob_e = diploma.find('<!-- START MAIN LAYOUT WITH SIDEBAR -->')
    ob_perfect = diploma[ob_s:ob_e]
    
    file_list = []
    for f in os.listdir(base_dir):
        if f.endswith('.html') and ('-diploma' in f or '-bachelors' in f or '-masters' in f):
            if 'vedic-astrology-' not in f:
                file_list.append(f)
                
    count = 0
    missing_layout = []
    
    for filename in file_list:
        path = os.path.join(base_dir, filename)
        content = open(path, encoding='utf-8').read()
        
        # 1. Update css_learn
        t_learn_s = content.find('.cvd-learn-item-img-wrapper {')
        t_learn_e = content.find('.cvd-learn-item p', t_learn_s)
        if t_learn_s != -1:
            content = content[:t_learn_s] + css_learn_perfect + content[t_learn_e:]
            
        # 2. Add 1300 media query right before 991px
        t_991_s = content.find('@media (max-width: 991px) {')
        if t_991_s != -1 and '@media (max-width: 1300px)' not in content:
            content = content[:t_991_s] + m1300_perfect + content[t_991_s:]
            
        # 3. Add min-width 992px media query
        t_style_ext = content.find('.cvd-faq-question') 
        t_style_end = content.find('</style>', t_style_ext)
        if t_style_end != -1 and '@media (min-width: 992px)' not in content[t_style_ext:t_style_end+50]:
            content = content[:t_style_end] + '\n      ' + m992_perfect + '\n    ' + content[t_style_end:]
            
        # 4. Inject Onboarding script and overlay HTML
        t_layout = content.find('<!-- START MAIN LAYOUT WITH SIDEBAR -->')
        if t_layout != -1 and 'onboarding-overlay' not in content:
            content = content[:t_layout] + ob_perfect + content[t_layout:]
        elif t_layout == -1:
            missing_layout.append(filename)
            
        # 5. Move Progression Ladder inside cvd-main-content
        t_ladder_s = content.find('<!-- PROGRESSION LADDER -->')
        t_main_end = content.find('<!-- end cvd-main-content -->')
        if t_ladder_s != -1 and t_ladder_s > t_main_end and t_main_end != -1:
            t_ladder_e = content.find('<!-- END PROGRESSION LADDER -->', t_ladder_s) + 31
            ladder_code = content[t_ladder_s:t_ladder_e]
            ladder_code = ladder_code.replace('<section class="course-progression-ladder">', '<section class="course-progression-ladder" style="padding-bottom: 20px;">')
            content = content[:t_ladder_s] + content[t_ladder_e:]
            # find new loc
            t_main_end2 = content.find('</div> <!-- end cvd-main-content -->')
            content = content[:t_main_end2] + ladder_code + '\n\n' + content[t_main_end2:]
            
        # 6. Global width
        content = content.replace('max-width: 100vw', 'max-width: 100%')
        
        open(path, 'w', encoding='utf-8').write(content)
        count += 1
        
    print(f'Processed {count} files successfully.')
    if missing_layout: print('Missing layout comment:', missing_layout)

sync_all()
