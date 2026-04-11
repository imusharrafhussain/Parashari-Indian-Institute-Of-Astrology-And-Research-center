file_path = r"d:\Parashari website new\AB_AI\assets\js\level-data.js"
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Remove the HTML text from 3col cards
content = content.replace("<p>Deepen Spiritual Connection</p>", "")
content = content.replace("<p>Protect Your Energy</p>", "")
content = content.replace("<p>Reduce Stress and Worry</p>", "")

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Redundant text removed.")
