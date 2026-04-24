import re
from pathlib import Path


ROOT = Path(r"d:\Parashari website new\AB_AI\crash-courses")


def fix_style_block(html: str) -> str:
    # Replace hero-content padding shorthand that wipes horizontal padding.
    pattern = re.compile(
        r"(\.cc-palmistry-landing\s+\.hero-content\s*\{\s*[\s\S]*?)padding\s*:\s*3rem\s+0\s+5rem\s*;\s*([\s\S]*?\})",
        re.MULTILINE,
    )

    def repl(m: re.Match) -> str:
        before = m.group(1)
        after = m.group(2)
        # Remove any existing padding-top/bottom if present (avoid duplicates)
        before = re.sub(r"padding-top\s*:\s*[^;]+;\s*", "", before)
        before = re.sub(r"padding-bottom\s*:\s*[^;]+;\s*", "", before)
        return (
            before
            + "padding-top: 3rem;\n            padding-bottom: 5rem;\n            "
            + after
        )

    return pattern.sub(repl, html, count=1)


def main() -> None:
    changed = 0
    for path in sorted(ROOT.glob("cc-*.html")):
        original = path.read_text(encoding="utf-8", errors="ignore")
        updated = fix_style_block(original)
        if updated != original:
            path.write_text(updated, encoding="utf-8")
            changed += 1
            print(f"Fixed hero horizontal padding: {path.name}")
    if changed == 0:
        print("No files changed.")


if __name__ == "__main__":
    main()

