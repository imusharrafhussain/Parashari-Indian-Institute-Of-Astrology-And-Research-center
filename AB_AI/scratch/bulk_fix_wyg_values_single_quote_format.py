import re
from pathlib import Path


ROOT = Path(r"d:\Parashari website new\AB_AI")
FILES = sorted(ROOT.glob("crash-courses/cc-*.html")) + [ROOT / "archive" / "plrt.html"]


def main() -> None:
    updated = []
    for f in FILES:
        text = f.read_text(encoding="utf-8")
        original = text

        text = re.sub(
            r"value:\s*'₹([^']+)'",
            r"value:'<span class=\\'wyg-old\\'>₹\1</span> <span class=\\'wyg-inc\\'>Included</span>'",
            text,
        )
        text = re.sub(
            r"value:\s*'Included'",
            r"value:'<span class=\\'wyg-inc\\'>Included</span>'",
            text,
        )

        if text != original:
            f.write_text(text, encoding="utf-8")
            updated.append(str(f))

    print(f"Updated {len(updated)} files")
    for p in updated:
        print(f"UPDATED: {p}")


if __name__ == "__main__":
    main()

