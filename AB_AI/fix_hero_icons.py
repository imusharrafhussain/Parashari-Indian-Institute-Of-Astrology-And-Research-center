import glob
import re

files = glob.glob('courses/*.html')

count = 0
for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    modified = False

    # Swap video.svg
    if '<img src="../assets/img/icons/video.svg"' in content:
        content = re.sub(r'<img src="\.\./assets/img/icons/video\.svg"[^>]*>', '<i class="fas fa-video" style="font-size:24px;color:#CC0000;"></i>', content)
        modified = True

    # Swap certificate.svg
    if '<img src="../assets/img/icons/certificate.svg"' in content:
        content = re.sub(r'<img src="\.\./assets/img/icons/certificate\.svg"[^>]*>', '<i class="fas fa-certificate" style="font-size:24px;color:#CC0000;"></i>', content)
        modified = True

    # Swap zoom.svg
    if '<img src="../assets/img/icons/zoom.svg"' in content:
        content = re.sub(r'<img src="\.\./assets/img/icons/zoom\.svg"[^>]*>', '<i class="fas fa-chalkboard-teacher" style="font-size:24px;color:#CC0000;"></i>', content)
        modified = True

    # Swap lifetime.svg
    if '<img src="../assets/img/icons/lifetime.svg"' in content:
        content = re.sub(r'<img src="\.\./assets/img/icons/lifetime\.svg"[^>]*>', '<i class="fas fa-infinity" style="font-size:24px;color:#CC0000;"></i>', content)
        modified = True

    # Swap support.svg
    if '<img src="../assets/img/icons/support.svg"' in content:
        content = re.sub(r'<img src="\.\./assets/img/icons/support\.svg"[^>]*>', '<i class="fas fa-headset" style="font-size:24px;color:#CC0000;"></i>', content)
        modified = True

    if modified:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
        count += 1

print(f'Swapped broken SVGs with FontAwesome in {count} HTML files.')
