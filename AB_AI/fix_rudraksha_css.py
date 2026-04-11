import os

file_path = r"d:\Parashari website new\AB_AI\assets\js\level-data.js"
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Isolate the function body
start_idx = content.find("function renderCustomRudrakshaPage(courseSlug, levelSlug) {")
if start_idx == -1:
    print("Function not found!")
    exit(1)
    
end_idx = content.find("function initLevelDetailPage", start_idx)
if end_idx == -1:
    end_idx = len(content)

rudraksha_part = content[start_idx:end_idx]

# 1. Fix Hero Image
# Original: .cvd-hero-img-wrap { position: absolute; top: 0; bottom: 0; right: 0; width: 55%; z-index: 1; display: flex; justify-content: flex-end; align-items: center; pointer-events: none; }
# Original: .cvd-hero-img-wrap img { height: 105%; width: auto; max-width: none; display: block; object-fit: contain; object-position: right center; margin-right: -100px; transform: translateY(0%); }

new_hero_wrap = ".cvd-hero-img-wrap { position: absolute; top: 0; bottom: 0; right: 0; width: 60%; z-index: 1; pointer-events: none; }\n      .cvd-hero-img-wrap::after { content: ''; position: absolute; top: 0; bottom: 0; left: 0; width: 120px; background: linear-gradient(to right, #FFFFFF, transparent); z-index: 2; }"
new_hero_img = ".cvd-hero-img-wrap img { height: 100%; width: 100%; display: block; object-fit: cover; object-position: left center; }"

old_hero_wrap = ".cvd-hero-img-wrap { position: absolute; top: 0; bottom: 0; right: 0; width: 55%; z-index: 1; display: flex; justify-content: flex-end; align-items: center; pointer-events: none; }"
old_hero_img = ".cvd-hero-img-wrap img { height: 105%; width: auto; max-width: none; display: block; object-fit: contain; object-position: right center; margin-right: -100px; transform: translateY(0%); }"

rudraksha_part = rudraksha_part.replace(old_hero_wrap, new_hero_wrap, 1)
rudraksha_part = rudraksha_part.replace(old_hero_img, new_hero_img, 1)

# Mobile adjustments for hero wrap
old_mobile_hero = ".cvd-hero-img-wrap { position: relative; width: 100%; height: auto; justify-content: center; transform: none; margin-top: 0; pointer-events: auto; }      .cvd-hero-img-wrap img { width: 100%; max-width: 350px; margin: 0 auto; object-fit: contain; }"
new_mobile_hero = ".cvd-hero-img-wrap { position: relative; width: 100%; height: auto; display: block; margin-top: 0; pointer-events: auto; }\n        .cvd-hero-img-wrap::after { display: none; }\n        .cvd-hero-img-wrap img { width: 100%; max-width: 100%; height: 250px; object-fit: cover; object-position: center; border-radius: 12px; }"

rudraksha_part = rudraksha_part.replace(".cvd-hero-img-wrap { position: relative; width: 100%; height: auto; justify-content: center; transform: none; margin-top: 0; pointer-events: auto; }", ".cvd-hero-img-wrap { position: relative; width: 100%; height: auto; display: block; pointer-events: auto; }\n        .cvd-hero-img-wrap::after { display: none; }")
rudraksha_part = rudraksha_part.replace(".cvd-hero-img-wrap img { width: 100%; max-width: 350px; margin: 0 auto; object-fit: contain; }", ".cvd-hero-img-wrap img { width: 100%; max-width: 100%; height: 250px; object-fit: cover; object-position: center; border-radius: 12px; box-shadow: 0 10px 20px rgba(0,0,0,0.1); }")


# 2. Fix Middle Elements (3col card img)
# Original: .cvd-3col-card img { width: 100%; height: 200px; object-fit: cover; box-shadow: 0 5px 15px rgba(0,0,0,0.1); }
# New:      .cvd-3col-card img { width: 100%; aspect-ratio: 16 / 11; object-fit: cover; object-position: top; box-shadow: 0 5px 15px rgba(0,0,0,0.1); border-radius: 8px; }

old_3col_img = ".cvd-3col-card img { width: 100%; height: 200px; object-fit: cover; box-shadow: 0 5px 15px rgba(0,0,0,0.1); }"
new_3col_img = ".cvd-3col-card img { width: 100%; height: auto; aspect-ratio: 16 / 10; object-fit: cover; object-position: top; box-shadow: 0 5px 15px rgba(0,0,0,0.15); border-radius: 12px; }"
rudraksha_part = rudraksha_part.replace(old_3col_img, new_3col_img, 1)

# 3. Fix What you'll learn icons
# Original: .cvd-learn-item img { max-width: 100px; height: auto; margin-bottom: 15px; display: block; margin-left: auto; margin-right: auto; }
# New:      .cvd-learn-item img { width: 100px; height: 100px; object-fit: cover; object-position: top; border-radius: 50%; display: block; margin: 0 auto 15px auto; box-shadow: 0 5px 15px rgba(220,180,50,0.25); }

old_learn_img = ".cvd-learn-item img { max-width: 100px; height: auto; margin-bottom: 15px; display: block; margin-left: auto; margin-right: auto; }"
new_learn_img = ".cvd-learn-item img { width: 100px; height: 100px; object-fit: cover; object-position: top; border-radius: 50%; display: block; margin: 0 auto 15px auto; box-shadow: 0 5px 15px rgba(200, 150, 12, 0.25); border: 2px solid #FFF; }"
rudraksha_part = rudraksha_part.replace(old_learn_img, new_learn_img, 1)

# write it back
new_content = content[:start_idx] + rudraksha_part + content[end_idx:]

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("CSS Fixed Successfully")
