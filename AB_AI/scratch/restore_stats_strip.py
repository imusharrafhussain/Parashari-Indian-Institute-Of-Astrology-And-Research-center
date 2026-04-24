import re
from pathlib import Path


ROOT = Path(r"d:\Parashari website new\AB_AI\crash-courses")


NEW_STATS_HTML = (
    '<section class="stats"><div class="ccp-container"><div class="stats-grid">'
    '<div class="stat"><p class="stat-value text-gold">5,000+</p><p class="stat-label">Students Enrolled</p></div>'
    '<div class="stat"><p class="stat-value text-gold">4.8/5</p><p class="stat-label">Average Rating</p></div>'
    '<div class="stat"><p class="stat-value text-gold">92%</p><p class="stat-label">Completion Rate</p></div>'
    '<div class="stat"><p class="stat-value text-gold">4 Weeks</p><p class="stat-label">Course Duration</p></div>'
    "</div></div></section>"
)


def main() -> None:
    changed = 0
    pat = re.compile(r"<section class=\"stats\">[\s\S]*?</section>", re.S)

    for path in sorted(ROOT.glob("cc-*.html")):
        html = path.read_text(encoding="utf-8", errors="ignore")
        if "<section class=\"stats\">" not in html:
            continue
        updated = pat.sub(NEW_STATS_HTML, html, count=1)
        if updated != html:
            path.write_text(updated, encoding="utf-8")
            changed += 1
            print(f"Restored stats strip: {path.name}")

    if changed == 0:
        print("No files updated.")


if __name__ == "__main__":
    main()

