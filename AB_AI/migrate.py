import re, os

# Read diploma
diploma = open(r'd:\Parashari website new\AB_AI\courses\vedic-astrology-diploma.html', encoding='utf-8').read()

# Extract Perfect CSS block (from <style> cvd-hero ... up to the end of the script/overlay block)
match_css = re.search(r'(<style>\s*\.cvd-hero\s*\{.*?<!-- Onboarding Tour Overlay -->.*?</div>)', diploma, flags=re.DOTALL)
if not match_css:
    print('Failed to find CSS/Overlay in diploma')
    exit()
perfect_css_overlay = match_css.group(1)

def process_file(path):
    if not os.path.exists(path):
        print(f'File {path} does not exist.')
        return
        
    content = open(path, encoding='utf-8').read()
    
    # 1. Replace the CSS block
    content = re.sub(r'<style>\s*\.cvd-hero\s*\{.*?(?:<!-- START MAIN LAYOUT WITH SIDEBAR -->)', perfect_css_overlay + '\n  \n    <!-- START MAIN LAYOUT WITH SIDEBAR -->', content, flags=re.DOTALL)
    
    # Check if Onboarding Tour Overlay was somehow added before
    if content.count('Onboarding Tour Overlay') > 1:
        # It duplicated it because the regex replacement might not capture it if it wasn't before START MAIN LAYOUT
        pass
        
    # Remove old onboarding overlay if it existed OUTSIDE the regex replacement
    # Using simple approach since we know it's injected before START MAIN LAYOUT now
    # We won't worry unless it's duplicated. Let's just do a clean cut.

    # 2. Move progression ladder inside cvd-main-content if it is outside
    # First check if progression ladder exists
    if '<!-- PROGRESSION LADDER -->' in content:
        # Check if it is currently inside main content by looking at its position relative to <!-- end cvd-main-content -->
        idx_ladder = content.find('<!-- PROGRESSION LADDER -->')
        idx_end_main = content.find('<!-- end cvd-main-content -->')
        if idx_ladder > idx_end_main and idx_end_main != -1:
            # Extract progression ladder
            match_ladder = re.search(r'(<!-- PROGRESSION LADDER -->.*<!-- END PROGRESSION LADDER -->)', content, flags=re.DOTALL)
            if match_ladder:
                ladder_html = match_ladder.group(1)
                # Remove it from its current location
                content = content.replace(ladder_html, '')
                # Re-insert it right before </div> <!-- end cvd-main-content -->
                content = content.replace('</div> <!-- end cvd-main-content -->', ladder_html + '\n\n</div> <!-- end cvd-main-content -->')
                
    # 3. Add padding-bottom style to progression ladder if needed
    content = re.sub(r'<section class=\"course-progression-ladder\">', '<section class=\"course-progression-ladder\" style=\"padding-bottom: 20px;\">', content)
            
    open(path, 'w', encoding='utf-8').write(content)
    print(f'Processed {path}')

process_file(r'd:\Parashari website new\AB_AI\courses\vedic-astrology-bachelors.html')
process_file(r'd:\Parashari website new\AB_AI\courses\vedic-astrology-masters.html')
