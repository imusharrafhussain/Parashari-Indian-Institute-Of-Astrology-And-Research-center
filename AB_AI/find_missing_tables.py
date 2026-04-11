import os
import glob

html_files = glob.glob('d:/Parashari website new/AB_AI/*.html')
course_pages = [f for f in html_files if os.path.basename(f) not in ['index.html', 'courses.html', 'fee-structure.html', 'blog.html', 'contact.html', 'gallery.html', 'register.html', 'login.html', 'profile.html', 'mentorship.html', '6-stairs.html', 'gemini-jyotish.html', 'level-detail.html', 'view_images.html', 'course-data.html']]

missing_comparison = []
for file in course_pages:
    with open(file, 'r', encoding='utf-8') as f:
        text = f.read()
        if 'comparison-table' not in text and 'comparison-section' not in text:
            missing_comparison.append(os.path.basename(file))

print('Missing comparison tables in:', missing_comparison)
