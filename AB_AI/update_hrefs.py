from bs4 import BeautifulSoup
import re

with open('courses.html', 'r', encoding='utf-8') as f:
    html = f.read()

soup = BeautifulSoup(html, 'html.parser')

cards = soup.find_all('div', class_='premium-gold-card')
updated_count = 0

for card in cards:
    course_id = card.get('data-course-id')
    if not course_id:
        continue
    
    a_tag = card.find('a', class_='learn-more')
    if a_tag and a_tag.get('href'):
        href = a_tag['href']
        # Check if href has ?level=
        if '?level=' in href:
            level = href.split('?level=')[1]
            new_href = f"level-detail.html?course={course_id}&level={level}"
            if href != new_href:
                a_tag['href'] = new_href
                updated_count += 1

# Also check for grand master mega card
gm_card = soup.find('div', id='grand-master-section')
if gm_card:
    course_id = gm_card.get('data-course-id')
    a_tag = gm_card.find('a', class_='learn-more')
    if a_tag and a_tag.get('href') and '?level=' in a_tag['href']:
        level = a_tag['href'].split('?level=')[1]
        new_href = f"level-detail.html?course={course_id}&level={level}"
        if a_tag['href'] != new_href:
            a_tag['href'] = new_href
            updated_count += 1

if updated_count > 0:
    with open('courses.html', 'w', encoding='utf-8') as f:
        f.write(str(soup))
    print(f"Updated {updated_count} links.")
else:
    print("No links needed updating.")
