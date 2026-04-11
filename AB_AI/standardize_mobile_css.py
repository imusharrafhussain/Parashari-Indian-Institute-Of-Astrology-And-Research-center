import re

with open(r'd:\Parashari website new\AB_AI\assets\js\level-data.js', 'r', encoding='utf-8') as f:
    text = f.read()

replacement = '''@media (max-width: 768px) {
        .cvd-hero-container { flex-direction: column-reverse; text-align: center; }
        .cvd-hero-text { padding-top: 10px; padding-bottom: 20px; }
        .cvd-hero-img-wrap { position: relative; width: 100%; height: auto; justify-content: center; transform: none; margin-top: 20px; }
        .cvd-hero-img-wrap img { width: 100%; height: auto; max-width: 450px; margin: 0 auto; transform: none; object-position: center; object-fit: contain; }
        .cvd-strip-inner { flex-direction: column; text-align: center; gap: 15px; }
        .cvd-strip-text { text-align: center; }
        .cvd-4col { grid-template-columns: 1fr; }
        .cvd-learn-grid { grid-template-columns: 1fr; gap: 20px; }
      }
    </style>'''

new_text = re.sub(r'@media\s*\(max-width:\s*768px\)\s*\{[\s\S]*?\}\s*</style>', replacement, text)

with open(r'd:\Parashari website new\AB_AI\assets\js\level-data.js', 'w', encoding='utf-8') as f:
    f.write(new_text)

print("Standardized mobile CSS successfully.")
