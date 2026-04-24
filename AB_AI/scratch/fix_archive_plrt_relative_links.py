import re
from pathlib import Path

FILE = Path(r"d:\Parashari website new\AB_AI\archive\plrt.html")


def repl(match: re.Match[str]) -> str:
    quote = match.group(1)
    url = match.group(2)
    if (
        url.startswith("../")
        or url.startswith("./")
        or url.startswith("#")
        or "://" in url
        or url.startswith("mailto:")
        or url.startswith("tel:")
        or url.startswith("javascript:")
    ):
        return f'href={quote}{url}{quote}'
    return f'href={quote}../{url}{quote}'


def main() -> None:
    text = FILE.read_text(encoding="utf-8")
    text = re.sub(r'href=(["\'])([^"\']+)\1', repl, text)
    FILE.write_text(text, encoding="utf-8")
    print("Updated relative href links in archive/plrt.html")


if __name__ == "__main__":
    main()

