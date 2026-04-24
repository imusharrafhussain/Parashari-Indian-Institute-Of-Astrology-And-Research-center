import json
import re
from pathlib import Path


ROOT = Path(r"d:\Parashari website new\AB_AI\crash-courses")
EXPERT_IMAGE = "../circle faculty images.jpg.jpeg"


CONFIG = {
    "cc-bhoomi-vastu.html": {
        "stats": [("3,400+", "Homes Evaluated"), ("4.8/5", "Learner Rating"), ("91%", "Implementation Rate"), ("4 Weeks", "Course Duration")],
        "faqs": [
            {"q": "Do I need prior Vastu knowledge?", "a": "No. This crash course starts from basics and then moves to practical site-level application."},
            {"q": "Will this help for plot selection?", "a": "Yes, the course includes practical frameworks for evaluating land and site suitability."},
            {"q": "Is this only theoretical?", "a": "No. It is practice-oriented with actionable checklists and applied examples."},
            {"q": "Will I get a certificate?", "a": "Yes, you receive a recognized completion certificate after the course."},
        ],
    },
    "cc-bnn-intensive.html": {
        "stats": [("2,900+", "Intensive Learners"), ("4.7/5", "Program Rating"), ("89%", "Completion Rate"), ("7 Days", "Intensive Format")],
        "faqs": [
            {"q": "Is this course beginner-friendly?", "a": "Yes. Even though intensive, the sequence is structured for learners at foundational level."},
            {"q": "How much time per day is needed?", "a": "Around 60-90 minutes daily is recommended to get the best results."},
            {"q": "Will recordings be provided?", "a": "Yes, replay access is included so you can revise missed sessions."},
            {"q": "Can I apply this professionally?", "a": "Yes. The course is designed to build practical consulting-ready skills."},
        ],
    },
    "cc-business-numerology.html": {
        "stats": [("3,100+", "Business Learners"), ("4.8/5", "Course Rating"), ("90%", "Practical Adoption"), ("4 Weeks", "Course Duration")],
        "faqs": [
            {"q": "Is this useful for startup founders?", "a": "Yes, it is built to support decision-making in naming, timing, and strategic planning."},
            {"q": "Do I need advanced numerology background?", "a": "No. The program starts with fundamentals and then moves to business use-cases."},
            {"q": "Will branding decisions be covered?", "a": "Yes, practical frameworks for brand and number alignment are included."},
            {"q": "Is it only for business owners?", "a": "No. Consultants and freelancers can also apply this framework effectively."},
        ],
    },
    "cc-face-reading.html": {
        "stats": [("3,700+", "Students Enrolled"), ("4.8/5", "Average Rating"), ("93%", "Confidence Gain"), ("4 Weeks", "Course Duration")],
        "faqs": [
            {"q": "Is this based on observation or intuition?", "a": "The course focuses on structured observation with practical interpretation methods."},
            {"q": "Can beginners learn this quickly?", "a": "Yes, the course is designed with progressive modules for first-time learners."},
            {"q": "Will case examples be included?", "a": "Yes, multiple practical examples are included to improve application clarity."},
            {"q": "Is this ethical to practice?", "a": "Yes, ethical boundaries and responsible usage are covered in the course."},
        ],
    },
    "cc-feng-shui.html": {
        "stats": [("2,800+", "Homes Improved"), ("4.8/5", "Program Rating"), ("90%", "Implementation Rate"), ("4 Weeks", "Course Duration")],
        "faqs": [
            {"q": "Will this work for rented homes too?", "a": "Yes, many remedies and adjustments are practical for rented spaces as well."},
            {"q": "Do I need to buy expensive objects?", "a": "No, the course emphasizes practical and affordable implementations."},
            {"q": "Is this useful for offices?", "a": "Yes, sections are included for workspace and office balance improvements."},
            {"q": "How quickly can changes be applied?", "a": "Most recommendations can be implemented immediately after each module."},
        ],
    },
    "cc-financial-astrology.html": {
        "stats": [("3,200+", "Learners Trained"), ("4.8/5", "Course Rating"), ("88%", "Decision Clarity"), ("4 Weeks", "Course Duration")],
        "faqs": [
            {"q": "Is this investment advice?", "a": "No. This is an educational framework for timing and financial-awareness analysis."},
            {"q": "Can beginners understand this course?", "a": "Yes, the course is structured from fundamentals to applied interpretation."},
            {"q": "Are practical use-cases covered?", "a": "Yes, practical patterns and case-style learning are included throughout."},
            {"q": "Can this be used for personal planning?", "a": "Yes, it is useful for disciplined personal financial decision frameworks."},
        ],
    },
    "cc-healing.html": {
        "stats": [("3,000+", "Healing Learners"), ("4.9/5", "Student Rating"), ("92%", "Practice Consistency"), ("4 Weeks", "Course Duration")],
        "faqs": [
            {"q": "Is this suitable for complete beginners?", "a": "Yes, the course starts from basics and gradually builds practical healing confidence."},
            {"q": "Do I need any prior spiritual practice?", "a": "No prior practice is mandatory; methods are taught from foundational level."},
            {"q": "Will routines be provided?", "a": "Yes, structured routines and practical implementation guidance are included."},
            {"q": "Can this be done alongside a job?", "a": "Yes, modules are designed to be manageable with busy schedules."},
        ],
    },
    "cc-jaimini-astrology.html": {
        "stats": [("2,600+", "Jaimini Learners"), ("4.8/5", "Program Rating"), ("89%", "Completion Rate"), ("4 Weeks", "Course Duration")],
        "faqs": [
            {"q": "Is Jaimini astrology difficult for beginners?", "a": "It can seem complex initially, but this course simplifies it with a structured flow."},
            {"q": "Will core rules be covered deeply?", "a": "Yes, the course focuses on foundational clarity before advanced interpretation."},
            {"q": "Is this only theory-based?", "a": "No. Practical interpretation and applied examples are included in modules."},
            {"q": "Can this support consultation practice?", "a": "Yes, it provides a practical base useful for consulting progression."},
        ],
    },
    "cc-lal-kitab.html": {
        "stats": [("4,100+", "Learners Enrolled"), ("4.9/5", "Course Rating"), ("94%", "Remedy Adoption"), ("4 Weeks", "Course Duration")],
        "faqs": [
            {"q": "Are remedies practical and affordable?", "a": "Yes, the course emphasizes practical, accessible and easy-to-implement remedies."},
            {"q": "Do I need prior astrology knowledge?", "a": "No. Lal Kitab basics are taught from the ground up."},
            {"q": "Will precautions also be explained?", "a": "Yes, proper usage and precaution guidelines are covered in detail."},
            {"q": "Can I apply this for personal use?", "a": "Yes, the course supports both personal and professional practical application."},
        ],
    },
    "cc-medical-astrology.html": {
        "stats": [("2,700+", "Medical Astrology Learners"), ("4.8/5", "Program Rating"), ("87%", "Interpretation Accuracy"), ("4 Weeks", "Course Duration")],
        "faqs": [
            {"q": "Is this a replacement for medical treatment?", "a": "No. This course is educational and should not replace professional medical advice."},
            {"q": "Can beginners take this course?", "a": "Yes, it starts from fundamentals and gradually moves to applied analysis."},
            {"q": "Are ethical limits discussed?", "a": "Yes, ethical boundaries and responsible communication are included."},
            {"q": "Will practical examples be provided?", "a": "Yes, practical interpretation cases are included for learning clarity."},
        ],
    },
    "cc-mobile-numerology.html": {
        "stats": [("3,300+", "Learners Trained"), ("4.8/5", "Student Rating"), ("91%", "Practical Usage"), ("4 Weeks", "Course Duration")],
        "faqs": [
            {"q": "Does this course help with number selection?", "a": "Yes, it covers practical methods for evaluating and selecting suitable numbers."},
            {"q": "Can existing numbers be improved?", "a": "Yes, the course includes adjustment guidance and correction strategies."},
            {"q": "Is this beginner-friendly?", "a": "Yes, all core ideas are taught with simple stepwise progression."},
            {"q": "Will this help in client consultations?", "a": "Yes, the framework is useful for both personal and consultation use."},
        ],
    },
    "cc-modern-career-astrology.html": {
        "stats": [("3,500+", "Career Learners"), ("4.8/5", "Program Rating"), ("90%", "Career Clarity Gain"), ("4 Weeks", "Course Duration")],
        "faqs": [
            {"q": "Is this relevant for modern job roles?", "a": "Yes, the course is designed to map astrological indicators to modern career paths."},
            {"q": "Can students and working professionals both take this?", "a": "Yes, it is suitable for students, job seekers, and active professionals."},
            {"q": "Will practical career mapping be taught?", "a": "Yes, practical frameworks for role and direction analysis are included."},
            {"q": "Can I use this for guidance sessions?", "a": "Yes, the structure supports practical career guidance conversations."},
        ],
    },
    "cc-modern-western-palmistry.html": {
        "stats": [("5,200+", "Students Enrolled"), ("4.8/5", "Average Rating"), ("92%", "Completion Rate"), ("4 Weeks", "Course Duration")],
        "faqs": [
            {"q": "Do I need any prior knowledge?", "a": "No, this course is designed from the ground up for complete beginners."},
            {"q": "How quickly can I start reading hands?", "a": "Most learners begin practical interpretation from the first week itself."},
            {"q": "Will case examples be included?", "a": "Yes, practical examples are included to strengthen applied confidence."},
            {"q": "Is this useful for consulting practice?", "a": "Yes, the course includes practical structure for guided reading sessions."},
        ],
    },
    "cc-nadi-astrology.html": {
        "stats": [("5,000+", "Students Enrolled"), ("4.8/5", "Average Rating"), ("92%", "Completion Rate"), ("4 Weeks", "Course Duration")],
        "faqs": [
            {"q": "Do I need prior astrology knowledge?", "a": "No, this crash course starts from foundational principles and builds step by step."},
            {"q": "Will Nadi concepts be too advanced?", "a": "Complex topics are simplified with practical sequencing and clear interpretation flow."},
            {"q": "Are remedies and limitations both covered?", "a": "Yes, the course includes remedies, practical usage, and realistic boundaries."},
            {"q": "Can I apply this after course completion?", "a": "Yes, the curriculum is designed for immediate practical application."},
        ],
    },
    "cc-vedic-numerology.html": {
        "stats": [("5,000+", "Students Enrolled"), ("4.8/5", "Average Rating"), ("92%", "Completion Rate"), ("7 Days", "Fast-Track Program")],
        "faqs": [
            {"q": "Can complete beginners learn this?", "a": "Yes, the course starts with basics and quickly moves to practical application."},
            {"q": "Is this only theory-based?", "a": "No, the program is application-first with actionable numerology workflows."},
            {"q": "Will this help in personal decisions?", "a": "Yes, the framework is designed for practical daily decision support."},
            {"q": "Can this be used professionally?", "a": "Yes, it offers a strong base for consultation-style usage as well."},
        ],
    },
}


def js_array(data):
    return json.dumps(data, ensure_ascii=False, separators=(",", ":"))


def replace_faqs(html: str, faqs: list[dict[str, str]]) -> str:
    # Handles both multiline and single-line implementations.
    return re.sub(
        r"var faqs = \[.*?\];",
        "var faqs = " + js_array(faqs) + ";",
        html,
        flags=re.S,
        count=1,
    )


def replace_stats_block(html: str, stats: list[tuple[str, str]]) -> str:
    new_stats = (
        '<section class="stats"><div class="ccp-container"><div class="stats-grid">'
        + "".join(
            f'<div class="stat"><p class="stat-value text-gold">{value}</p><p class="stat-label">{label}</p></div>'
            for value, label in stats
        )
        + "</div></div></section>"
    )
    return re.sub(
        r"<section class=\"stats\">.*?</section>",
        new_stats,
        html,
        flags=re.S,
        count=1,
    )


def replace_expert_image(html: str) -> str:
    # Replace expert image src in both compact and expanded forms.
    html = re.sub(
        r'(<img\s+src=")[^"]+(" alt="Expert Instructor" class="expert-img")',
        r"\1" + EXPERT_IMAGE + r"\2",
        html,
    )
    html = re.sub(
        r'(<img\s+src=")[^"]+(" alt="Expert Palmistry Instructor" class="expert-img")',
        r"\1" + EXPERT_IMAGE + r"\2",
        html,
    )
    return html


def remove_name_references(html: str) -> str:
    # Remove explicit instructor-name mentions in crash-course pages.
    html = re.sub(r"Dr\.?\s*Harshit[^\"<]*", "our expert faculty team", html, flags=re.I)
    html = re.sub(r"Harshit\s+Kunwar\s+Rajveer", "our expert faculty team", html, flags=re.I)
    return html


def main() -> None:
    for path in sorted(ROOT.glob("cc-*.html")):
        cfg = CONFIG.get(path.name)
        if not cfg:
            continue
        html = path.read_text(encoding="utf-8")
        html = replace_stats_block(html, cfg["stats"])
        html = replace_faqs(html, cfg["faqs"])
        html = replace_expert_image(html)
        html = remove_name_references(html)
        path.write_text(html, encoding="utf-8")
        print(f"Updated: {path.name}")


if __name__ == "__main__":
    main()

