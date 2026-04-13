import os
import glob
import re

print("Adding two-pane scroll to all course files that are missing it...")

files = glob.glob(r'd:\Parashari website new\AB_AI\courses\*.html')
count = 0

# The CSS block we need to inject
scroll_css = """
      @media (min-width: 992px) {
        .cvd-main-content, .cvd-sidebar {
          height: calc(100vh - 120px);
          overflow-y: scroll;
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* IE and Edge */
        }
        .cvd-main-content::-webkit-scrollbar, .cvd-sidebar::-webkit-scrollbar {
          display: none; /* Chrome, Safari, Opera */
        }
        .cvd-sidebar {
          position: sticky;
          top: 100px;
          border-radius: 8px;
          padding: 15px;
        }
      }
"""

for fpath in files:
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Skip files that already have this feature
    if 'calc(100vh - 120px)' in content:
        continue
    
    # Find the right injection point: right before </style> that comes just before 
    # <!-- START MAIN LAYOUT WITH SIDEBAR -->
    # We look for the closing </style> tag that is closest before the layout container
    
    # Strategy: find the last </style> before cvd-layout-container
    layout_pos = content.find('cvd-layout-container')
    if layout_pos == -1:
        continue
    
    # Find the last </style> before layout_pos
    style_close_pos = content.rfind('</style>', 0, layout_pos)
    if style_close_pos == -1:
        continue
    
    # Insert our CSS block just before that </style>
    new_content = content[:style_close_pos] + scroll_css + content[style_close_pos:]
    
    with open(fpath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    count += 1
    print(f"  Added to: {os.path.basename(fpath)}")

print(f"\nDone. Added two-pane scroll to {count} files.")
