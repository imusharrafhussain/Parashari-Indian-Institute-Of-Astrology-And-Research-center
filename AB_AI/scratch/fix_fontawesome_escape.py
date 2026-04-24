from pathlib import Path


ROOT = Path(r"d:\Parashari website new\AB_AI\crash-courses")


def main() -> None:
    ff = "\x0c"  # form-feed control character
    old = f"content: '{ff}00c';"
    new = "content: '\\\\f00c';"

    for path in sorted(ROOT.glob("cc-*.html")):
        text = path.read_text(encoding="utf-8", errors="ignore")
        if old not in text:
            continue
        updated = text.replace(old, new)
        path.write_text(updated, encoding="utf-8")
        print(f"Fixed FontAwesome escape: {path.name}")


if __name__ == "__main__":
    main()

