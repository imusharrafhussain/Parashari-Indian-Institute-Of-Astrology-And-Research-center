import re

with open(r'd:\Parashari website new\AB_AI\assets\js\level-data.js', 'r', encoding='utf-8') as f:
    text = f.read()

# Find all @media line positions
lines = text.split('\n')

# Comprehensive replacement blocks
new_991 = """      @media (max-width: 991px) {
        .cvd-layout-container { flex-direction: column; overflow-x: hidden; }
        .cvd-sidebar { width: 100% !important; position: static !important; margin-top: 40px; }
        .cvd-4col { grid-template-columns: repeat(2, 1fr); }
        .cvd-learn-grid { grid-template-columns: repeat(3, 1fr); gap: 30px; }
        .cvd-learn-grid.cvd-learn-fullwidth { grid-template-columns: repeat(3, 1fr); }
        .cvd-3col { gap: 15px; }
        .cvd-ba-item { font-size: 1.05rem; }
        .cvd-hero-container { padding: 0 20px; }
      }"""

new_768 = """      @media (max-width: 768px) {
        /* Global overflow fix */
        .cvd-main-content, .cvd-layout-container { overflow-x: hidden; max-width: 100vw; box-sizing: border-box; }
        
        /* Hero Section - image on top, text below */
        .cvd-hero { padding: 20px 0 30px 0; }
        .cvd-hero-container { flex-direction: column-reverse; text-align: center; padding: 0 15px; min-height: auto; }
        .cvd-hero-text { max-width: 100%; padding: 10px 5px 20px 5px; }
        .cvd-hero-title { font-size: 2rem; }
        .cvd-hero-subtitle { font-size: 1.3rem; }
        .cvd-hero-hook { font-size: 1rem; }
        .cvd-hero-btn { font-size: 1.15rem; padding: 10px 25px; width: 100%; text-align: center; box-sizing: border-box; }
        .cvd-hero-img-wrap { position: relative; width: 100%; height: auto; justify-content: center; transform: none; margin-top: 0; pointer-events: auto; }
        .cvd-hero-img-wrap img { width: 100%; height: auto; max-width: 350px; margin: 0 auto; transform: none; object-position: center; object-fit: contain; max-height: 350px; }
        
        /* Section titles - prevent text overflow */
        .cvd-section { padding: 20px 15px; overflow: hidden; }
        .cvd-title { font-size: 1.8rem; word-wrap: break-word; overflow-wrap: break-word; }
        .cvd-desc { font-size: 1.05rem; line-height: 1.6; padding: 0 5px; }
        
        /* 3-column image cards -> 1 column on mobile */
        .cvd-3col { grid-template-columns: 1fr; gap: 20px; max-width: 350px; margin: 0 auto; }
        .cvd-3col-card img { height: 180px; }
        .cvd-3col-card p { font-size: 1.05rem; }
        
        /* Before/After section - stack vertically */
        .cvd-ba-container { padding: 0 5px; }
        .cvd-ba-header { justify-content: center; gap: 5px; }
        .cvd-ba-header h3 { font-size: 1.3rem; margin: 0 15px; }
        .cvd-ba-box { flex-direction: column; }
        .cvd-ba-left { width: 100%; border-radius: 4px 4px 0 0; padding: 15px 20px; }
        .cvd-ba-left::after { display: none; }
        .cvd-ba-right { width: 100%; border-radius: 0 0 4px 4px; padding: 15px 20px; }
        .cvd-ba-item { font-size: 1rem; min-height: 50px; gap: 10px; }
        
        /* What You'll Learn grid -> 2 columns on mobile */
        .cvd-learn-grid, .cvd-learn-grid.cvd-learn-fullwidth { grid-template-columns: repeat(2, 1fr); gap: 20px; }
        .cvd-learn-item { max-width: 140px; }
        .cvd-learn-item img { max-width: 70px; }
        .cvd-learn-item p { font-size: 0.85rem; }
        
        /* Strip / CTA section */
        .cvd-strip { padding: 20px 15px; }
        .cvd-strip-inner { flex-direction: column; text-align: center; gap: 15px; }
        .cvd-strip-text { text-align: center; font-size: 1.2rem; }
        .cvd-strip-btn { width: 100%; justify-content: center; box-sizing: border-box; font-size: 1.1rem; }
        
        /* 4-column grid -> 1 column */
        .cvd-4col { grid-template-columns: 1fr; }
        
        /* Sidebar */
        .cvd-sidebar { width: 100% !important; padding: 0 10px !important; box-sizing: border-box; }
        
        /* Module cards */
        .cvd-module-card { padding: 15px 12px; }
        .cvd-module-title { font-size: 1.15rem; }
        
        /* FAQ */
        .cvd-faq { padding: 0 5px; }
        .cvd-faq-question { font-size: 0.95rem; padding: 12px 15px; }
      }"""

replacement = new_991 + "\n" + new_768

# Find all 991px line indices (0-based)
media_991_lines = []
for i, line in enumerate(lines):
    if '991px' in line and '@media' in line:
        media_991_lines.append(i)

print(f"Found {len(media_991_lines)} @media 991px blocks at lines: {[x+1 for x in media_991_lines]}")

# For each 991px block, find the end of the corresponding 768px block
# The 768px block always ends with a line containing just "      }" before "    </style>"
# We need to find the </style> that follows each pair

# Work backwards to preserve line numbers
ranges_to_replace = []
for start_991 in media_991_lines:
    # Find the </style> after this block
    end_line = None
    for j in range(start_991, min(start_991 + 100, len(lines))):
        if '</style>' in lines[j]:
            end_line = j
            break
    if end_line is not None:
        ranges_to_replace.append((start_991, end_line))

print(f"Ranges to replace: {[(s+1, e+1) for s, e in ranges_to_replace]}")

# Replace from bottom to top to preserve indices
for start, end in reversed(ranges_to_replace):
    lines[start:end] = [replacement]

new_text = '\n'.join(lines)

with open(r'd:\Parashari website new\AB_AI\assets\js\level-data.js', 'w', encoding='utf-8') as f:
    f.write(new_text)

# Verify
with open(r'd:\Parashari website new\AB_AI\assets\js\level-data.js', 'r', encoding='utf-8') as f:
    verify = f.read()
print(f"overflow-x hidden: {verify.count('overflow-x: hidden')}")
print(f"column-reverse: {verify.count('column-reverse')}")
print(f"cvd-ba-box: {verify.count('cvd-ba-box')}")
print(f"ba-left::after: {verify.count('ba-left::after')}")
print(f"991px: {verify.count('991px')}")
print(f"768px: {verify.count('768px')}")
print(f"</style>: {verify.count('</style>')}")
print("DONE!")
