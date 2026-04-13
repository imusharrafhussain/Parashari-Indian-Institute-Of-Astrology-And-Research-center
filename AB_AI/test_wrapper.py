import re

file_path = r'd:\Parashari website new\AB_AI\courses\numerology-bachelors.html'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

css = """
      .cvd-learn-item { width: 100%; max-width: 160px; text-align: center; }
      .cvd-learn-item-img-wrapper {
          width: 110px;
          height: 110px;
          border-radius: 50%;
          overflow: hidden;
          margin: 0 auto 15px auto;
          position: relative;
          background: #fff;
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
          border: 3px solid #c8960c;
          display: flex;
          align-items: center;
          justify-content: center;
      }
      .cvd-learn-item-img-wrapper img {
          max-width: none;
          width: auto;
          height: 140%;
          object-fit: cover;
          margin: 0;
          display: block;
      }
"""

content = re.sub(r'\.cvd-learn-item img \{ max-width: 150px; height: auto; margin-bottom: 15px; display: block; margin-left: auto; margin-right: auto; \}', css, content, count=1)
content = re.sub(r'\.cvd-learn-item img \{\s*width: 140px;\s*height: 140px;\s*object-fit: contain;\s*display: block;\s*margin: 0 auto 15px auto;\s*\}', css, content, count=1)


content = re.sub(r'<div class="cvd-learn-item">\s*<img([^>]+)>\s*<p>(.*?)</p>\s*</div>', 
                 r'<div class="cvd-learn-item">\n          <div class="cvd-learn-item-img-wrapper">\n            <img\1>\n          </div>\n          <p>\2</p>\n        </div>', content)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
