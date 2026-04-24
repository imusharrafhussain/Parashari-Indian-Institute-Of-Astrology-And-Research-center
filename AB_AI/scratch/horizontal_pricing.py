import os
import glob

directory = 'd:/Parashari website new/AB_AI/crash-courses/'
pattern = os.path.join(directory, '*.html')
files = glob.glob(pattern)

media_query_css = '''
        /* Horizontal Pricing Card for Desktop added automatically */
        @media (min-width: 992px) {
            .cc-palmistry-landing .pricing-card-wrap {
                max-width: 1050px;
            }
            .cc-palmistry-landing .pricing-card {
                display: flex;
                flex-direction: row;
                align-items: stretch;
            }
            .cc-palmistry-landing .pricing-header {
                flex: 0 0 28%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                border-right: 1px solid rgba(255,255,255,0.1);
                border-radius: 1rem 0 0 1rem;
            }
            .cc-palmistry-landing .pricing-body {
                flex: 0 0 35%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                border-right: 1px solid var(--border);
            }
            .cc-palmistry-landing .pricing-includes {
                flex: 1;
                border-top: none;
                display: flex;
                flex-direction: column;
                justify-content: center;
            }
        }
'''

for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as file:
        content = file.read()
    
    if media_query_css not in content and '</style>' in content:
        new_content = content.replace("</style>", media_query_css + "\n    </style>")
        with open(filepath, 'w', encoding='utf-8') as file:
            file.write(new_content)
        print(f"Updated: {os.path.basename(filepath)}")
    else:
        print(f"Skipped/already updated: {os.path.basename(filepath)}")
