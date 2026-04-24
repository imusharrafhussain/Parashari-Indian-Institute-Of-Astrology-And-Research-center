import re

path = 'd:/Parashari website new/AB_AI/crash-courses/cc-feng-shui.html'

with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

new_css = """
        /* Extra styling to make the expert-card look good in the narrow left column */
        .cc-palmistry-landing .wyg-img {
            max-width: 28rem !important; /* Shrunk image slightly */
        }
        .cc-palmistry-landing .wyg-img-wrap .expert-card {
            border: none;
            box-shadow: none;
            width: 100%;
        }
        .cc-palmistry-landing .wyg-img-wrap .expert-inner {
            display: grid;
            grid-template-columns: auto 1fr;
            gap: 1rem;
            padding: 1rem;
            align-items: center;
        }
        .cc-palmistry-landing .wyg-img-wrap .expert-img-wrap {
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }
        .cc-palmistry-landing .wyg-img-wrap .expert-img {
            width: 5rem;
            height: 5rem;
        }
        .cc-palmistry-landing .wyg-img-wrap h2 {
            font-size: 1.1rem;
            line-height: 1.3;
            margin-bottom: 0.25rem;
        }
        .cc-palmistry-landing .wyg-img-wrap p {
            font-size: 0.8rem;
            line-height: 1.4;
            margin: 0;
        }
        .cc-palmistry-landing .wyg-img-wrap .expert-tags {
            gap: 0.5rem;
            margin-top: 0.75rem;
            display: flex;
            flex-wrap: wrap;
        }
        .cc-palmistry-landing .wyg-img-wrap .expert-tag {
            font-size: 0.7rem;
            padding: 2px 6px;
        }
        .cc-palmistry-landing .wyg-img-wrap .expert-img-wrap div {
            font-size: 0.8rem !important;
            margin-top: 8px !important;
            letter-spacing: 0.5px !important;
        }
"""

# Replace old css block
pattern = r'/\* Extra styling to make the expert-card look good in the narrow left column \*/.*?(?=</style>)'
new_content = re.sub(pattern, new_css.strip() + '\n', content, flags=re.DOTALL)

with open(path, 'w', encoding='utf-8') as f:
    f.write(new_content)
