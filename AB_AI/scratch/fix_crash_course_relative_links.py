import re
from pathlib import Path


ROOT = Path(r"d:\Parashari website new\AB_AI\crash-courses")


def fix_links(html: str) -> str:
    # Prefix internal HTML links with ../ when they are currently local relative.
    pattern = re.compile(
        r'href="(?!\.\./|https?://|mailto:|tel:|#|javascript:)([^"/][^"]*?\.html)"',
        re.IGNORECASE,
    )
    return pattern.sub(lambda m: f'href="../{m.group(1)}"', html)


def main() -> None:
    for path in sorted(ROOT.glob("cc-*.html")):
        text = path.read_text(encoding="utf-8")
        updated = fix_links(text)
        if updated != text:
            path.write_text(updated, encoding="utf-8")
            print(f"Updated links: {path.name}")
        else:
            print(f"No link change: {path.name}")


if __name__ == "__main__":
    main()

