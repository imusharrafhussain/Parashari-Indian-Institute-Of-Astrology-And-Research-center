import json
import re
from pathlib import Path


ROOT = Path(r"d:\Parashari website new\AB_AI\crash-courses")

TESTIMONIALS = {
    "cc-modern-western-palmistry.html": [
        {"name": "Neha T.", "text": "The hand-analysis breakdown was super practical. I started reading basic lines for friends in week one."},
        {"name": "Arjun P.", "text": "Module flow is very clean and beginner friendly. The examples made concepts easy to remember."},
        {"name": "Kavya R.", "text": "I liked the confidence this course gave me. The practice framework is what helped most."},
    ],
    "cc-vedic-numerology.html": [
        {"name": "Ritika S.", "text": "Number interpretation became very easy after this. I now use it daily for decision making."},
        {"name": "Manish G.", "text": "Clear structure and no fluff. The practical assignments made numerology feel actionable."},
        {"name": "Isha N.", "text": "Great crash format for busy people. I could learn quickly without feeling overwhelmed."},
    ],
    "cc-nadi-astrology.html": [
        {"name": "Pooja V.", "text": "The Nadi concepts were explained in a very digestible way. Complex ideas finally made sense."},
        {"name": "Saket K.", "text": "I came in with zero clarity and left with a usable method for interpretation."},
        {"name": "Nitin D.", "text": "The examples and support group made the learning curve much easier than expected."},
    ],
    "cc-bhoomi-vastu.html": [
        {"name": "Aparna J.", "text": "I used the Bhoomi checklist before finalizing my plot, and it gave me much more confidence."},
        {"name": "Vivek M.", "text": "Very practical for homeowners. The course explains what to prioritize and what to avoid."},
        {"name": "Shreya B.", "text": "Clear and useful guidance. I could immediately evaluate my site with better clarity."},
    ],
    "cc-bnn-intensive.html": [
        {"name": "Harsh K.", "text": "Intensive but very structured. The fast pace helped me build momentum quickly."},
        {"name": "Sneha A.", "text": "This one is packed with value. I liked how each module directly builds on the previous one."},
        {"name": "Rohan S.", "text": "Good for serious learners. The practical orientation made it worth every rupee."},
    ],
    "cc-business-numerology.html": [
        {"name": "Dev P.", "text": "I applied the business naming framework and got far better clarity for brand decisions."},
        {"name": "Mitali R.", "text": "The course is direct and practical for entrepreneurs. No unnecessary theory overload."},
        {"name": "Anuj L.", "text": "Excellent for founders and consultants. The decision models are very actionable."},
    ],
    "cc-face-reading.html": [
        {"name": "Tanvi S.", "text": "Facial markers and personality mapping were explained in a very memorable way."},
        {"name": "Yash D.", "text": "I loved the practical examples. It helped me understand observation without overcomplicating it."},
        {"name": "Prachi K.", "text": "Great beginner course. The confidence I gained in interpretation is the biggest benefit."},
    ],
    "cc-feng-shui.html": [
        {"name": "Rhea M.", "text": "Small Feng Shui changes at home made a noticeable difference in how balanced the space feels."},
        {"name": "Lokesh P.", "text": "Very practical and easy to apply. The room-wise guidance is especially useful."},
        {"name": "Ira T.", "text": "Clear explanations and strong structure. I could apply recommendations immediately."},
    ],
    "cc-financial-astrology.html": [
        {"name": "Kunal R.", "text": "The financial timing concepts were explained clearly and in a practical sequence."},
        {"name": "Priyanshi V.", "text": "I found the wealth analysis framework very helpful for structured decision planning."},
        {"name": "Deep S.", "text": "Great crash course for anyone who wants to connect astrology with money decisions."},
    ],
    "cc-healing.html": [
        {"name": "Mansi G.", "text": "A calm, practical healing approach. The guided methods were simple but effective."},
        {"name": "Akash B.", "text": "Good mix of concept and practice. I could integrate the techniques into my routine quickly."},
        {"name": "Nupur C.", "text": "The step-by-step style made healing techniques easy to follow for beginners."},
    ],
    "cc-jaimini-astrology.html": [
        {"name": "Rahul V.", "text": "Jaimini rules finally became understandable. The progression is very well designed."},
        {"name": "Madhvi K.", "text": "Excellent clarity on core principles. I appreciated the structured way topics were introduced."},
        {"name": "Pranav T.", "text": "Powerful crash format. I now have a practical base to continue advanced learning."},
    ],
    "cc-lal-kitab.html": [
        {"name": "Sonal D.", "text": "The remedies section is extremely practical. I liked how clearly each rule was explained."},
        {"name": "Aditya N.", "text": "Simple language, strong structure, and very actionable takeaways for day-to-day use."},
        {"name": "Komal P.", "text": "This helped me understand Lal Kitab beyond random tips from social media."},
    ],
    "cc-medical-astrology.html": [
        {"name": "Ishita R.", "text": "Medical astrology felt complex earlier, but this course made it much more organized."},
        {"name": "Naveen S.", "text": "The interpretation flow is practical and grounded. Very good for serious learners."},
        {"name": "Bhavya T.", "text": "I appreciated the balanced explanation style and practical caution points."},
    ],
    "cc-mobile-numerology.html": [
        {"name": "Reyansh M.", "text": "Very useful for number selection and correction decisions. Quick and practical learning."},
        {"name": "Aditi K.", "text": "The modules are concise but insightful. I used the framework immediately for my number."},
        {"name": "Rashmi J.", "text": "Perfect crash course format. The concepts are clear and easy to apply."},
    ],
    "cc-modern-career-astrology.html": [
        {"name": "Niharika S.", "text": "The career mapping process was extremely useful and surprisingly practical."},
        {"name": "Varun P.", "text": "I liked how this connects astrology with modern career paths and decisions."},
        {"name": "Srishti A.", "text": "Structured and relevant. It gave me clear direction for consultation-style career guidance."},
    ],
}


PATTERN = re.compile(
    r"\(function \(\) \{ var t = \[.*?\]; var target = document\.getElementById\('testimonials'\); if \(!target\) return; target\.innerHTML = t\.map\(function \(r\) \{ return '<div class=\"test-card\"><div class=\"test-stars\">★★★★★</div><p class=\"test-text\">\"' \+ r\.text \+ '\"</p><p class=\"test-name\">— ' \+ r\.name \+ '</p></div>'; \}\)\.join\(''\); \}\)\(\);",
    re.S,
)


def build_block(entries: list[dict[str, str]]) -> str:
    js_array = json.dumps(entries, ensure_ascii=False, separators=(",", ":"))
    return (
        f"(function () {{ var t = {js_array}; var target = document.getElementById('testimonials'); if (!target) return; "
        "target.innerHTML = t.map(function (r) { return '<div class=\"test-card\"><div class=\"test-stars\">★★★★★</div><p class=\"test-text\">\"' + r.text + '\"</p><p class=\"test-name\">— ' + r.name + '</p></div>'; }).join(''); })();"
    )


def main() -> None:
    files = sorted(ROOT.glob("cc-*.html"))
    for file_path in files:
        html = file_path.read_text(encoding="utf-8")
        entries = TESTIMONIALS.get(file_path.name)
        if not entries:
            continue
        new_block = build_block(entries)
        updated, count = PATTERN.subn(new_block, html, count=1)
        if count == 0:
            print(f"Skipped (pattern not found): {file_path.name}")
            continue
        file_path.write_text(updated, encoding="utf-8")
        print(f"Updated testimonials: {file_path.name}")


if __name__ == "__main__":
    main()

