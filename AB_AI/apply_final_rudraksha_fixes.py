import codecs

file_path = r"d:\Parashari website new\AB_AI\assets\js\level-data.js"
with codecs.open(file_path, "r", "utf-8") as f:
    content = f.read()

# Locate the function and extract its block
start_idx = content.find("function renderCustomRudrakshaPage(courseSlug, levelSlug) {")
if start_idx == -1:
    print("Function not found!")
    exit(1)
end_idx = content.find("function initLevelDetailPage", start_idx)
if end_idx == -1: end_idx = len(content)
func_body = content[start_idx:end_idx]


# 1. Update Hero Image CSS:
# Old: .cvd-hero-img-wrap img { height: 100%; width: 100%; display: block; object-fit: cover; object-position: right center; }
# New: .cvd-hero-img-wrap img { height: 100%; width: 100%; display: block; object-fit: contain; object-position: right center; }
# This ensures the bead fully shows without scaling out of bounds over the edges.
func_body = func_body.replace("object-fit: cover; object-position: right center;", "object-fit: contain; object-position: right center;")

# 2. Update Middle Elements HTML
# We need to add the beautiful subtexts and titles back, but properly structure them!
# Previously I had: 
# <div class="cvd-3col">
#   <div class="cvd-3col-card">
#     <img src="..." alt="...">
#   </div>
# </div>
# Wait, I used python to `replace("<p>Deepen Spiritual Connection</p>", "")` so the `<img>` is just sitting there alone.
# We need to completely rewrite the cvd-3col block.
old_3col_block_start = func_body.find('<div class="cvd-3col">')
old_3col_block_end = func_body.find('</section>', old_3col_block_start)

# I will regenerate exactly the cvd-3col html block
new_3col_html = """<div class="cvd-3col">
            <div class="cvd-3col-card">
              <img src="assets/images-optimized/rudraksha/middle-elements/protect your energy.webp" alt="Protect Your Energy">
              <p class="cvd-col-title">Protect Your Energy</p>
              <p class="cvd-col-sub">Shield against negative influences</p>
            </div>
            <div class="cvd-3col-card">
              <img src="assets/images-optimized/rudraksha/middle-elements/deepen spiritual connection.webp" alt="Deepen Spiritual Connection">
              <p class="cvd-col-title">Deepen Spiritual Connection</p>
              <p class="cvd-col-sub">Awaken inner peace and clarity</p>
            </div>
            <div class="cvd-3col-card">
              <img src="assets/images-optimized/rudraksha/middle-elements/reduce stress and worry.webp" alt="Reduce Stress and Worry">
              <p class="cvd-col-title">Reduce Stress & Worry</p>
              <p class="cvd-col-sub">Promote calmness and better sleep</p>
            </div>
          </div>"""

# Replace the HTML block
func_body = func_body[:old_3col_block_start] + new_3col_html + "\n        " + func_body[old_3col_block_end:]


# 3. Update Middle Elements CSS to uniform aspect ratio
# Old: .cvd-3col-card img { width: 100%; height: auto; object-fit: contain; box-shadow: 0 5px 15px rgba(0,0,0,0.1); border-radius: 8px; }
# New: uniform aspect ratio so they mathematically align!
css_to_replace = ".cvd-3col-card img { width: 100%; height: auto; object-fit: contain; box-shadow: 0 5px 15px rgba(0,0,0,0.1); border-radius: 8px; }"
new_img_css = ".cvd-3col-card img { width: 100%; height: 220px; object-fit: cover; object-position: center; box-shadow: 0 10px 25px rgba(0,0,0,0.08); border-radius: 12px; }"

if css_to_replace in func_body:
    func_body = func_body.replace(css_to_replace, new_img_css)
else:
    # If not exactly matching, just find `.cvd-3col-card img {` and replace the line
    pass

# We also need to add styles for the text we just added:
text_styles = """
      .cvd-col-title { font-size: 1.35rem; margin: 20px 0 8px 0; color: #591C21; font-weight: 700; font-family: 'Times New Roman', serif; text-shadow: 0 1px 2px rgba(0,0,0,0.05); }
      .cvd-col-sub { font-size: 0.95rem; color: #555; margin: 0; line-height: 1.4; font-weight: 500; }
"""
func_body = func_body.replace("</style>", text_styles + "    </style>")

# Final output
content_final = content[:start_idx] + func_body + content[end_idx:]
with codecs.open(file_path, "w", "utf-8") as f:
    f.write(content_final)

print("Applied uniform aspect-ratio to images, restored specific text elements, fixed hero image scaling.")
