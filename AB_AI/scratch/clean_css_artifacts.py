import re
from pathlib import Path


ROOT = Path(r"d:\Parashari website new\AB_AI\crash-courses")


def clean(text: str) -> str:
    # Remove any stray "*/" comment-closure artifacts inserted into CSS.
    text = re.sub(r"\}\*/\}(\*/\})*", "}", text)
    # Also remove standalone sequences like "*/}*/}*/}" if present.
    text = re.sub(r"(?:\*/\}){2,}", "}", text)
    return text


def main() -> None:
    for path in sorted(ROOT.glob("cc-*.html")):
        original = path.read_text(encoding="utf-8", errors="ignore")
        updated = clean(original)
        if updated != original:
            path.write_text(updated, encoding="utf-8")
            print(f"Cleaned CSS artifacts: {path.name}")


if __name__ == "__main__":
    main()

