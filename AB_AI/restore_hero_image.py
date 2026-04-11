import codecs

file_path = r"d:\Parashari website new\AB_AI\assets\js\level-data.js"
with codecs.open(file_path, "r", "utf-8") as f:
    content = f.read()

# We need to change the contain back to cover for the hero image in renderCustomRudrakshaPage.
start_idx = content.find("function renderCustomRudrakshaPage(courseSlug, levelSlug) {")
end_idx = content.find("function initLevelDetailPage", start_idx)
if end_idx == -1: end_idx = len(content)

func_body = content[start_idx:end_idx]

# Replace contain with cover for the hero image
# Inside func_body, it currently has: object-fit: contain; object-position: right center;
func_body = func_body.replace("object-fit: contain; object-position: right center;", "object-fit: cover; object-position: right center;")

content_final = content[:start_idx] + func_body + content[end_idx:]

with codecs.open(file_path, "w", "utf-8") as f:
    f.write(content_final)

print("Restored hero image to object-fit: cover with right center positioning.")
