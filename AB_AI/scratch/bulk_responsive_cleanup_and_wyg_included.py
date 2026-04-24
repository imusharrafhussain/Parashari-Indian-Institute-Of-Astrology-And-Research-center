import re
from pathlib import Path


ROOT = Path(r"d:\Parashari website new\AB_AI")
FILES = sorted(ROOT.glob("crash-courses/cc-*.html")) + [ROOT / "archive" / "plrt.html"]


def update_css(text: str) -> str:
    # Improve large-screen usage
    text = re.sub(
        r"(\.cc-palmistry-landing\s+\.ccp-container\s*\{[^}]*max-width:\s*)1200px;",
        r"\g<1>1400px;",
        text,
        flags=re.S,
    )

    # Enhance "what you get" value styling
    text = re.sub(
        r"\.cc-palmistry-landing\s+\.wyg-value\s*\{[^}]*\}",
        ".cc-palmistry-landing .wyg-value { font-weight: 700; color: var(--muted); display: inline-flex; align-items: center; gap: 0.4rem; }\n        .cc-palmistry-landing .wyg-old { text-decoration: line-through; color: var(--muted); }\n        .cc-palmistry-landing .wyg-inc { color: #1f9d47; font-weight: 700; }",
        text,
        count=1,
        flags=re.S,
    )
    return text


def remove_claims(text: str) -> str:
    # Remove rating/enrollment badges
    text = re.sub(
        r"\s*<span class=\"badge\">[^<]*(?:Rating|Enrolled|Enrollment|High Enrollment)[^<]*</span>",
        "",
        text,
        flags=re.I,
    )

    # Remove floating cards showing student count/rating
    text = re.sub(
        r"\s*<div class=\"float-card[^\"]*\"[^>]*>[\s\S]*?(?:Students Enrolled|Course Rating)[\s\S]*?</div>",
        "",
        text,
        flags=re.I,
    )

    # Remove stat cards for learners/students/rating
    text = re.sub(
        r"\s*<div class=\"stat\">\s*<p class=\"stat-value[^\"]*\">[\s\S]*?</p>\s*<p class=\"stat-label\">[^<]*(?:Learners|Students|Rating)[^<]*</p>\s*</div>",
        "",
        text,
        flags=re.I,
    )

    # Remove simple prose claims about enrolled counts in section copy
    text = re.sub(
        r"Join\s+[0-9,]+\+\s+students[^<]*",
        "Start your learning journey with practical guidance",
        text,
        flags=re.I,
    )
    return text


def update_wyg_values(text: str) -> str:
    # Price -> struck + Included
    text = re.sub(
        r'value:\s*"₹([^"]+)"',
        r'value: "<span class=\'wyg-old\'>₹\1</span> <span class=\'wyg-inc\'>Included</span>"',
        text,
    )
    text = re.sub(
        r'value:\s*"Included"',
        r'value: "<span class=\'wyg-inc\'>Included</span>"',
        text,
    )
    return text


def main() -> None:
    updated = []
    for f in FILES:
        if not f.exists():
            continue
        original = f.read_text(encoding="utf-8")
        text = original
        text = update_css(text)
        text = remove_claims(text)
        text = update_wyg_values(text)

        if text != original:
            f.write_text(text, encoding="utf-8")
            updated.append(str(f))

    print(f"Updated {len(updated)} files")
    for p in updated:
        print(f"UPDATED: {p}")


if __name__ == "__main__":
    main()

