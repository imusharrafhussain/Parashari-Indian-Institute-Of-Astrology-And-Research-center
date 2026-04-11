import os
import glob
import time
from datetime import datetime

history_dirs = [
    r'C:\Users\Lenovo\AppData\Roaming\Code\User\History',
    r'C:\Users\Lenovo\AppData\Roaming\Cursor\User\History',
    r'C:\Users\Lenovo\AppData\Roaming\Windsurf\User\History',
    r'C:\Users\Lenovo\AppData\Roaming\Trae\User\History'
]

cutoff = time.time() - (48 * 3600)  # Last 48 hours

recent_files = []
for hdir in history_dirs:
    if os.path.exists(hdir):
        for root, _, files in os.walk(hdir):
            for file in files:
                if file == 'entries.json':
                    continue
                filepath = os.path.join(root, file)
                try:
                    mtime = os.path.getmtime(filepath)
                    if mtime > cutoff:
                        recent_files.append((mtime, filepath))
                except Exception:
                    pass

recent_files.sort(reverse=True)
print(f'Found {len(recent_files)} history files in the last 48 hours.')

recovered_count = 0
for mtime, f in recent_files[:500]:
    try:
        with open(f, 'r', encoding='utf-8') as fh:
            content = fh.read()
            if 'class="static-course-page"' in content and '<title>' in content:
                import re
                m = re.search(r'<title>(.+?)</title>', content)
                title = m.group(1) if m else 'Unknown'
                dt = datetime.fromtimestamp(mtime).strftime('%Y-%m-%d %H:%M:%S')
                print(f'Match found: {dt} | Title: {title} | File: {f}')
                recovered_count += 1
    except Exception:
        pass

print(f'Total recovered candidates: {recovered_count}')
