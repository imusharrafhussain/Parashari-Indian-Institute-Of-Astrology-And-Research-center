import os, re

base_dir = r'd:\Parashari website new\AB_AI\courses'
courses = ['numerology', 'vastu', 'reiki', 'tarot', 'nakshatra', 'rudraksha', 'palmistry']

def process():
    for c in courses:
        for level in ['diploma', 'bachelors', 'masters']:
            path = os.path.join(base_dir, f'{c}-{level}.html')
            if not os.path.exists(path): continue
            
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
                
            original_content = content
            
            # --- FIX 1: Wrap images in cvd-learn-item-img-wrapper ---
            # Some files have <div class="cvd-learn-item"><img ...>
            # We want <div class="cvd-learn-item"><div class="cvd-learn-item-img-wrapper"><img ...></div>
            
            # We use a regex replacement function safely.
            def wrap_img(match):
                inner = match.group(0)
                if 'cvd-learn-item-img-wrapper' in inner: 
                    return inner # already wrapped
                
                # We expect the structure:
                # <div class="cvd-learn-item">
                #   <img src="..." alt="...">
                # We capture the img and dynamically replace it.
                img_match = re.search(r'<img[^>]+>', inner)
                if img_match:
                    img_tag = img_match.group(0)
                    wrapper = f'<div class="cvd-learn-item-img-wrapper">\n            {img_tag}\n          </div>'
                    return inner.replace(img_tag, wrapper)
                return inner
            
            content = re.sub(r'<div class="cvd-learn-item">[\s\S]*?(?:</div>(?=\s*<div class="cvd-learn-item"|</div))', wrap_img, content)
            # wait, regex matching for html is dangerous. Let's do it simply by replacing `<div class="cvd-learn-item">\s*<img` 
            content = re.sub(r'(<div class="cvd-learn-item">)\s*(<img[^>]+>)', 
                             r'\1\n          <div class="cvd-learn-item-img-wrapper">\n            \2\n          </div>', content)
            

            # --- FIX 2: Move Full Width Sections into cvd-main-content ---
            # 1. Identify where cvd-main-content ends currently.
            idx_aside = content.find('<aside class="cvd-sidebar"')
            if idx_aside == -1: idx_aside = content.find('<aside id="cvd-dynamic-sidebar"')
            
            if idx_aside != -1:
                # The </div> right before <aside> IS the end of cvd-main-content!
                end_main = content.rfind('</div>', 0, idx_aside)
                
                # Check if there are elements AFTER cvd-layout-container that need moving!
                idx_layout_end = content.find('</div>', content.find('</aside>', idx_aside))
                # For palmistry, layout ends at 688, then sections follow.
                
                # Search for specific sections anywhere in the document
                sections_to_move = []
                
                # What you'll learn
                learn_match = re.search(r'<section[^>]*cvd-learn-section.*?</section>', content, flags=re.DOTALL)
                if learn_match and learn_match.start() > idx_layout_end:
                    sections_to_move.append((learn_match.start(), learn_match.end(), learn_match.group(0)))
                    
                # Strip
                strip_match = re.search(r'<div class="cvd-strip">.*?</div>\s*</div>\s*</div>', content, flags=re.DOTALL)
                # Ensure we capture the full strip. It's usually <div class="cvd-strip"><div inner><div text></div><div><a></a></div></div></div>
                # Let's cleanly just find `<div class="cvd-strip">` and match its closing div by counting braces? No, regex usually matches greedy if we are careful, or we use a unique string.
                strip_start = content.find('<div class="cvd-strip">')
                if strip_start != -1 and strip_start > idx_layout_end:
                    # simplistic extraction: ends before <section class="cvd-section">
                    strip_end = content.find('<section class="cvd-section">', strip_start)
                    if strip_end != -1:
                        sections_to_move.append((strip_start, strip_end, content[strip_start:strip_end]))
                        
                # FAQ
                faq_start = content.find('<section class="cvd-section">', strip_start)
                if faq_start != -1 and faq_start > idx_layout_end and 'cvd-faq' in content[faq_start:faq_start+300]:
                    faq_end = content.find('</section>', faq_start) + 10
                    sections_to_move.append((faq_start, faq_end, content[faq_start:faq_end]))

                # Ladder
                ladder_start = content.find('<section class="course-progression-ladder"')
                if ladder_start != -1 and ladder_start > idx_layout_end:
                    ladder_end = content.find('</section>', ladder_start) + 10
                    sections_to_move.append((ladder_start, ladder_end, content[ladder_start:ladder_end]))

                # If there are sections to move!
                if len(sections_to_move) > 0:
                    # Sort them by their original positions to remove them from bottom up (so string indices don't shift)
                    sections_to_move.sort(key=lambda x: x[0], reverse=True)
                    
                    combined_html = ""
                    # Actually, they should be appended in the correct order: Learn -> Strip -> FAQ -> Ladder
                    ordered_html = ""
                    ordered_html += next((s[2] for s in sorted(sections_to_move, key=lambda x: x[0]) if 'cvd-learn-section' in s[2]), "")
                    ordered_html += next((s[2] for s in sorted(sections_to_move, key=lambda x: x[0]) if 'cvd-strip' in s[2]), "")
                    ordered_html += next((s[2] for s in sorted(sections_to_move, key=lambda x: x[0]) if 'cvd-faq' in s[2]), "")
                    ordered_html += next((s[2] for s in sorted(sections_to_move, key=lambda x: x[0]) if 'course-progression-ladder' in s[2]), "")

                    # Remove them from content
                    for s_start, s_end, s_text in sections_to_move:
                        content = content[:s_start] + content[s_end:]
                        
                    # Re-find the exact insertion point (end of cvd-main-content)
                    # Because we modified content at the bottom, idx_aside and end_main are still valid!
                    # Wait, no, we only deleted from the bottom (higher indices), so end_main is unchanged!
                    content = content[:end_main] + '\n\n<!-- MOVED COMPONENTS -->\n' + ordered_html + '\n\n' + content[end_main:]
            
            # --- FIX Numerology specific missing layout ---
            # If for some reason div class="cvd-learn-grid" is missing, we can't reliably auto-generate it.
            # But earlier we found `what you'll experience` or `What You'll Learn` was placed in `<div class="cvd-3col">` instead maybe?
            # Let's just write back the changes.
            if content != original_content:
                with open(path, 'w', encoding='utf-8') as f:
                    f.write(content)

process()
print("Super Fix Finished!")
