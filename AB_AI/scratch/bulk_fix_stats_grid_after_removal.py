import re
from pathlib import Path


ROOT = Path(r"d:\Parashari website new\AB_AI")
FILES = sorted(ROOT.glob("crash-courses/cc-*.html")) + [ROOT / "archive" / "plrt.html"]


def main() -> None:
    updated = []
    for f in FILES:
        text = f.read_text(encoding="utf-8")
        original = text

        # Expanded/multiline CSS form
        text = re.sub(
            r"\.cc-palmistry-landing\s+\.stats-grid\s*\{\s*display:\s*grid;\s*grid-template-columns:\s*repeat\(2,\s*1fr\);\s*gap:\s*1\.5rem;\s*\}\s*@media\(min-width:768px\)\s*\{\s*\.cc-palmistry-landing\s+\.stats-grid\s*\{\s*grid-template-columns:\s*repeat\(4,\s*1fr\);\s*\}\s*\}",
            ".cc-palmistry-landing .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1.5rem; }",
            text,
            flags=re.S,
        )

        # Minified/alternate spacing form
        text = re.sub(
            r"\.cc-palmistry-landing\s+\.stats-grid\s*\{\s*display:\s*grid;\s*grid-template-columns:\s*repeat\(2,\s*1fr\);\s*gap:\s*1\.5rem;\s*\}\s*@media\s*\(min-width:\s*768px\)\s*\{\s*\.cc-palmistry-landing\s+\.stats-grid\s*\{\s*grid-template-columns:\s*repeat\(4,\s*1fr\);\s*\}\s*\}",
            ".cc-palmistry-landing .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1.5rem; }",
            text,
            flags=re.S,
        )

        if text != original:
            f.write_text(text, encoding="utf-8")
            updated.append(str(f))

    print(f"Updated {len(updated)} files")
    for p in updated:
        print(f"UPDATED: {p}")


if __name__ == "__main__":
    main()

