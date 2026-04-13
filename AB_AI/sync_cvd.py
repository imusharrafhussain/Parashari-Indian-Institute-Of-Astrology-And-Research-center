import os

base_dir = r'd:\Parashari website new\AB_AI\courses'
diploma_path = os.path.join(base_dir, 'vedic-astrology-diploma.html')

def extract_perfect_assets():
    html = open(diploma_path, encoding='utf-8').read()

    css_learn_perfect = ""
    learn_s = html.find('.cvd-learn-item-img-wrapper {')
    if learn_s != -1:
        learn_e = html.find('.cvd-learn-item p', learn_s)
        css_learn_perfect = html[learn_s:learn_e]
        
    m1300_s = html.find('@media (max-width: 1300px) {')
    m1300_e = html.find('@media (max-width: 991px) {')
    m1300_perfect = html[m1300_s:m1300_e]

    m992_s = html.find('@media (min-width: 992px) {')
    m992_e = html.find('</style>', m992_s)
    m992_perfect = html[m992_s:m992_e]

    ob_s = html.find('<script>\n  document.addEventListener(')
    if ob_s == -1: ob_s = html.find('<script>\n  document.addEventListener("DOMContentLoaded"')
    ob_e = html.find('<div class="cvd-layout-container"', ob_s)
    while html[ob_e-1].isspace(): ob_e -= 1
    ob_perfect = html[ob_s:ob_e].strip()
    
    return css_learn_perfect, m1300_perfect, m992_perfect, ob_perfect

def process():
    css_learn, m1300, m992, ob_html = extract_perfect_assets()
    
    courses = ['numerology', 'kp-astrology', 'gemstone', 'gemstone-science', 'vastu', 'lal-kitab', 
               'face-reading', 'reiki', 'tarot', 'nakshatra', 'crystal-healing', 'rudraksha', 'palmistry']

    for c in courses:
        for level in ['diploma', 'bachelors', 'masters']:
            filename = f'{c}-{level}.html'
            path = os.path.join(base_dir, filename)
            if not os.path.exists(path):
                continue
                
            content = open(path, encoding='utf-8').read()
            
            t_learn_s = content.find('.cvd-learn-item-img-wrapper {')
            if t_learn_s != -1:
                t_learn_e = content.find('.cvd-learn-item p', t_learn_s)
                content = content[:t_learn_s] + css_learn + content[t_learn_e:]
                
            t_991_s = content.find('@media (max-width: 991px) {')
            if t_991_s != -1 and '@media (max-width: 1300px)' not in content:
                content = content[:t_991_s] + m1300 + content[t_991_s:]
                
            t_style_ext = content.find('.cvd-faq-question') 
            t_style_end = content.find('</style>', t_style_ext)
            if t_style_end != -1 and '@media (min-width: 992px)' not in content[t_style_ext:t_style_end+50]:
                content = content[:t_style_end] + '\n      ' + m992 + '\n    ' + content[t_style_end:]

            if '<div id="onboarding-overlay"' not in content:
                idx_layout = content.find('<div class="cvd-layout-container"')
                if idx_layout != -1:
                    idx_comment = content.rfind('<!--', 0, idx_layout)
                    # only use comment if it's the START MAIN LAYOUT comment
                    if idx_comment != -1 and 'MAIN LAYOUT' in content[idx_comment:idx_layout]:
                        insert_pos = idx_comment
                    else:
                        insert_pos = idx_layout
                    content = content[:insert_pos] + ob_html + '\n\n    ' + content[insert_pos:]
            
            idx_ladder = content.find('<section class="course-progression-ladder"')
            t_main_end = content.find('<!-- end cvd-main-content -->')
            if t_main_end == -1 and 'cvd-sidebar' in content:
                t_main_end = content.rfind('</div>', 0, content.find('cvd-sidebar'))
                
            if idx_ladder != -1 and t_main_end != -1 and idx_ladder > t_main_end:
                ladder_end_idx = content.find('</section>', idx_ladder) + 10
                ladder_str = content[idx_ladder:ladder_end_idx]
                content = content[:idx_ladder] + content[ladder_end_idx:]
                
                ladder_str = ladder_str.replace('<section class="course-progression-ladder"', '<section class="course-progression-ladder" style="padding-bottom: 20px;"')
                
                t_main_content_end = content.find('<!-- end cvd-main-content -->')
                if t_main_content_end != -1:
                    insert_idx = content.rfind('</div>', 0, t_main_content_end)
                    content = content[:insert_idx] + ladder_str + '\n\n' + content[insert_idx:]
            
            content = content.replace('max-width: 100vw', 'max-width: 100%')
            open(path, 'w', encoding='utf-8').write(content)
            
    print("Process Complete. 39 files updated with correct layout.")

process()
