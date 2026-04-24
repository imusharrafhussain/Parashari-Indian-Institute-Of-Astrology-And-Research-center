import json
import re
from pathlib import Path


CRASH_DIR = Path("D:/Parashari website new/AB_AI/crash-courses")

COURSE_THEMES = {
    "cc-bhoomi-vastu.html": {
        "topic": "Bhoomi Vastu",
        "benefit": "home and workspace energy alignment",
        "faq_focus_q": "Will this teach practical room placement and direction analysis?",
        "faq_focus_a": "Yes. You will learn practical checks for entry, kitchen, bedroom, and workspace placement with easy correction logic.",
    },
    "cc-modern-career-astrology.html": {
        "topic": "Modern Career Astrology",
        "benefit": "career direction and role-fit guidance",
        "faq_focus_q": "Can I use this to guide career switch and job-fit decisions?",
        "faq_focus_a": "Yes. The course covers chart-based indicators for career preferences, timing, and decision support in practical language.",
    },
    "cc-face-reading.html": {
        "topic": "Face Reading",
        "benefit": "personality observation and communication clarity",
        "faq_focus_q": "Does this include practical interpretation of forehead, eyes, and jaw traits?",
        "faq_focus_a": "Yes. You will practice structured observation and interpretation of key facial zones with guided examples.",
    },
    "cc-feng-shui.html": {
        "topic": "Feng Shui",
        "benefit": "space balance and positivity flow",
        "faq_focus_q": "Will I learn room-wise Feng Shui corrections for home use?",
        "faq_focus_a": "Yes. The course includes practical room-wise balancing principles that can be applied in home and office spaces.",
    },
    "cc-business-numerology.html": {
        "topic": "Business Numerology",
        "benefit": "business naming and number alignment",
        "faq_focus_q": "Is this useful for business name and launch-date decisions?",
        "faq_focus_a": "Yes. You will learn practical frameworks for name vibration checks and number alignment for business decisions.",
    },
    "cc-lal-kitab.html": {
        "topic": "Lal Kitab",
        "benefit": "practical remedy planning",
        "faq_focus_q": "Are remedies explained with context or just listed?",
        "faq_focus_a": "Remedies are explained with purpose, suitability, and basic precautions so learners understand when and why to apply them.",
    },
    "cc-vedic-numerology.html": {
        "topic": "Vedic Numerology",
        "benefit": "number interpretation for personal decisions",
        "faq_focus_q": "Will this course help me read core and missing numbers correctly?",
        "faq_focus_a": "Yes. You will learn foundational number calculations and interpretation steps for practical personal guidance.",
    },
    "cc-healing.html": {
        "topic": "Healing",
        "benefit": "energy balance and calming routines",
        "faq_focus_q": "Do we practice techniques that can be used in day-to-day routine?",
        "faq_focus_a": "Yes. The training includes practical, simple healing routines that can be integrated into regular daily practice.",
    },
    "cc-bnn-intensive.html": {
        "topic": "BNN Intensive",
        "benefit": "predictive analysis confidence",
        "faq_focus_q": "Will this cover practical BNN prediction workflow?",
        "faq_focus_a": "Yes. The course focuses on applied interpretation flow so learners can practice prediction structure with clarity.",
    },
    "cc-nadi-astrology.html": {
        "topic": "Nadi Astrology",
        "benefit": "event timing interpretation",
        "faq_focus_q": "Is event timing explained with practical chart examples?",
        "faq_focus_a": "Yes. You will practice timing logic through guided examples to build confidence in interpretation.",
    },
    "cc-jaimini-astrology.html": {
        "topic": "Jaimini Astrology",
        "benefit": "karaka-based chart understanding",
        "faq_focus_q": "Does this include karaka-based interpretation for real charts?",
        "faq_focus_a": "Yes. Core Jaimini concepts and karaka application are taught with practical chart-oriented explanations.",
    },
    "cc-mobile-numerology.html": {
        "topic": "Mobile Numerology",
        "benefit": "mobile number suitability checks",
        "faq_focus_q": "Can I evaluate whether a mobile number is supportive for me?",
        "faq_focus_a": "Yes. You will learn a clear method to assess mobile number compatibility with personal number patterns.",
    },
    "cc-financial-astrology.html": {
        "topic": "Financial Astrology",
        "benefit": "money-cycle and planning awareness",
        "faq_focus_q": "Will this help identify favorable financial periods?",
        "faq_focus_a": "Yes. The course teaches practical interpretation of financial tendencies and timing signals for planning decisions.",
    },
    "cc-modern-western-palmistry.html": {
        "topic": "Modern Western Palmistry",
        "benefit": "line reading and consultation structure",
        "faq_focus_q": "Do we cover hand-shape, major lines, and consultation flow?",
        "faq_focus_a": "Yes. You will learn a structured reading process from hand profile to line interpretation and communication style.",
    },
    "cc-medical-astrology.html": {
        "topic": "Medical Astrology",
        "benefit": "wellness tendency interpretation",
        "faq_focus_q": "Is this course diagnostic in nature?",
        "faq_focus_a": "No. It is educational and focused on wellness tendency interpretation, not medical diagnosis or treatment advice.",
    },
    "plrt.html": {
        "topic": "Past Life Regression Theory (PLRT)",
        "benefit": "subconscious pattern understanding and guided regression practice",
        "faq_focus_q": "Will this include ethical handling and safe session boundaries?",
        "faq_focus_a": "Yes. Safety, consent, and ethical boundaries are taught as a core part of practical PLRT training.",
    },
}


def replace_iife_var_block(text: str, var_name: str, list_data: list) -> str:
    payload = json.dumps(list_data, ensure_ascii=True)
    pattern = rf"\(function \(\) \{{ var {var_name} = \[.*?\]; var target = document\.getElementById\('[^']+'\);.*?\}}\)\(\);"
    if var_name == "t":
        replacement = (
            f"(function () {{ var t = {payload}; "
            "var target = document.getElementById('testimonials'); if (!target) return; "
            "target.innerHTML = t.map(function (r) { return '<div class=\"test-card\"><div class=\"test-stars\">★★★★★</div><p class=\"test-text\">\"' + r.text + '\"</p><p class=\"test-name\">— ' + r.name + '</p></div>'; }).join(''); })();"
        )
    elif var_name == "faqs":
        replacement = (
            f"(function () {{ var faqs = {payload}; "
            "var target = document.getElementById('faq-list'); if (!target) return; "
            "target.innerHTML = faqs.map(function (f, i) { return '<div class=\"faq-item' + (i === 0 ? ' open' : '') + '\" id=\"faq-' + i + '\"><button class=\"faq-q\" onclick=\"toggleFaq(' + i + ')\"><span>' + f.q + '</span><svg class=\"faq-chevron chevron-svg\" viewBox=\"0 0 24 24\" width=\"20\" height=\"20\"><polyline points=\"6 9 12 15 18 9\"/></svg></button><div class=\"faq-a\"><p>' + f.a + '</p></div></div>'; }).join(''); })();"
        )
    else:
        return text

    return re.sub(pattern, replacement, text, flags=re.S)


def clean_disallowed_claims(text: str) -> str:
    text = text.replace(
        "Complete recorded access with revision support",
        "Live classes with limited-time recording access for revision",
    )
    text = text.replace(
        "Handouts, notes, and practice references",
        "Guided practice tasks and in-class examples",
    )
    text = text.replace(
        "Session recordings and notes",
        "Session recordings (limited duration) and guided practice",
    )
    text = text.replace(
        '{icon:"📚",title:"Study Materials",desc:"Notes, references, and handouts",value:"<span class=\'wyg-inc\'>Included</span>"}',
        '{icon:"📚",title:"Guided Practice",desc:"Classwork-based exercises and examples",value:"<span class=\'wyg-inc\'>Included</span>"}',
    )
    text = text.replace(
        "all videos, PDFs, and the WhatsApp group link",
        "session videos, class exercises, and the support group link",
    )
    text = text.replace("PDFs", "class resources")
    text = text.replace("pdfs", "class resources")
    text = text.replace(" downloadable PDF", " downloadable material")
    text = text.replace("Downloadable PDF", "Downloadable Material")
    text = text.replace("Downloadable regression inductions & notes", "Guided regression practice and in-session references")
    text = text.replace("Regression scripts, notes, and support resources", "Regression practice framework and mentor support resources")
    text = text.replace("Guided Technique Manuals", "Guided Technique Practice")
    text = text.replace("regression manuals & support materials", "guided practice framework and support")
    text = re.sub(r"<span class=['\"]wyg-old['\"]>.*?</span>\s*", "", text, flags=re.S)
    return text


def build_testimonials(topic: str, benefit: str, idx: int) -> list:
    first_names = [
        "Ananya",
        "Vivek",
        "Meera",
        "Rohit",
        "Pooja",
        "Harsh",
        "Ritika",
        "Nitin",
        "Kavya",
        "Saurabh",
        "Isha",
        "Manish",
        "Sanya",
        "Aditya",
        "Nisha",
    ]
    last_initials = ["G.", "K.", "S.", "P.", "R.", "D.", "M.", "T.", "V.", "A.", "J.", "N.", "L.", "B.", "C."]
    a = f"{first_names[idx % len(first_names)]} {last_initials[idx % len(last_initials)]}"
    b = f"{first_names[(idx + 3) % len(first_names)]} {last_initials[(idx + 5) % len(last_initials)]}"
    c = f"{first_names[(idx + 7) % len(first_names)]} {last_initials[(idx + 9) % len(last_initials)]}"

    outcomes = [
        "I can now explain concepts clearly to others.",
        "My confidence improved after practicing weekly tasks.",
        "I finally have a clear process instead of guesswork.",
        "It felt practical from day one, not just theory.",
        "I can now structure my own practice sessions.",
    ]

    return [
        {
            "name": a,
            "text": f"I joined {topic} to strengthen my basics, and the class format made application easier for {benefit}. {outcomes[idx % len(outcomes)]}",
        },
        {
            "name": b,
            "text": f"The sessions were clear and practical. In {topic}, every module had examples that helped me understand where and how to apply each method.",
        },
        {
            "name": c,
            "text": f"I started as a beginner, but by course end I could independently practice key methods from {topic}. Mentor doubt support stayed consistent throughout.",
        },
    ]


def build_faqs(topic: str, focus_q: str, focus_a: str) -> list:
    return [
        {
            "q": f"Is this {topic} course suitable for beginners?",
            "a": "Yes. The teaching starts from basics and moves step-by-step, so first-time learners can follow comfortably.",
        },
        {
            "q": f"What practical outcome can I expect after completing {topic}?",
            "a": f"You will gain a clear foundational workflow and confidence to apply core concepts of {topic} in guided practice scenarios.",
        },
        {
            "q": focus_q,
            "a": focus_a,
        },
        {
            "q": "How are classes conducted and how are doubts handled?",
            "a": "Training is delivered in structured sessions with practical examples, and doubts are addressed through guided support.",
        },
    ]


def main() -> None:
    files = sorted(CRASH_DIR.glob("cc-*.html"))
    extra_files = [Path("D:/Parashari website new/AB_AI/archive/plrt.html")]
    files.extend([p for p in extra_files if p.exists()])
    updated = 0
    for idx, file_path in enumerate(files):
        text = file_path.read_text(encoding="utf-8")
        info = COURSE_THEMES.get(file_path.name)
        if not info:
            continue

        text = clean_disallowed_claims(text)
        text = replace_iife_var_block(text, "t", build_testimonials(info["topic"], info["benefit"], idx))
        text = replace_iife_var_block(text, "faqs", build_faqs(info["topic"], info["faq_focus_q"], info["faq_focus_a"]))

        file_path.write_text(text, encoding="utf-8")
        updated += 1

    print(f"Updated {updated} crash course files.")


if __name__ == "__main__":
    main()
