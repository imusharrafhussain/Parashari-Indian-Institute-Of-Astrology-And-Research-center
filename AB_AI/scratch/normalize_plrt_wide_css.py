import re
from pathlib import Path


ROOT = Path(r"d:\Parashari website new\AB_AI\crash-courses")

WIDE_BLOCK = r"""

        /* WIDE SCREEN LAYOUT TUNING (PLRT TEMPLATE)
           Goal: reduce unused side whitespace on larger laptops/monitors
           without harming tablet/mobile layout or readability. */
        @media (min-width: 1400px) {
            .cc-palmistry-landing .ccp-container {
                max-width: min(1600px, 92vw);
                padding-left: clamp(1rem, 3vw, 2.5rem);
                padding-right: clamp(1rem, 3vw, 2.5rem);
            }
            .cc-palmistry-landing .banner-card {
                max-width: min(1320px, 92vw);
            }

            /* Actually widen hero reading width on big screens */
            .cc-palmistry-landing .hero p.desc,
            .cc-palmistry-landing .hero p.hindi {
                max-width: 44rem;
            }
            .cc-palmistry-landing .hero-grid {
                gap: clamp(3rem, 5vw, 5rem);
            }

            .cc-palmistry-landing .modules,
            .cc-palmistry-landing .faq-list {
                max-width: 62rem;
            }
            .cc-palmistry-landing .expert-card {
                max-width: 72rem;
            }
            .cc-palmistry-landing .hero-img {
                max-width: 34rem;
            }
        }

        @media (min-width: 1700px) {
            .cc-palmistry-landing .ccp-container {
                max-width: 1680px;
            }
        }
"""


def normalize_style(html: str) -> str:
    m = re.search(r"<style>(.*?)</style>", html, flags=re.S)
    if not m:
        return html
    style_inner = m.group(1)

    # Remove ALL existing wide tuning blocks (duplicates, older versions).
    style_inner = re.sub(
        r"\s*/\*\s*WIDE SCREEN LAYOUT TUNING \(PLRT TEMPLATE\)[\s\S]*?(?=@media|\*/|</style>)",
        "",
        style_inner,
        flags=re.S,
    )
    # Also remove the following @media blocks that were part of the tuning, if left behind.
    style_inner = re.sub(
        r"\s*@media\s*\(min-width:\s*1400px\)\s*\{[\s\S]*?\}\s*@media\s*\(min-width:\s*1700px\)\s*\{[\s\S]*?\}\s*",
        "",
        style_inner,
        flags=re.S,
    )

    # Insert one clean block near the end (before closing).
    style_inner = style_inner.rstrip() + WIDE_BLOCK

    new_style = "<style>" + style_inner + "\n    </style>"
    return html[: m.start()] + new_style + html[m.end() :]


def main() -> None:
    for path in sorted(ROOT.glob("cc-*.html")):
        original = path.read_text(encoding="utf-8", errors="ignore")
        updated = normalize_style(original)
        if updated != original:
            path.write_text(updated, encoding="utf-8")
            print(f"Normalized wide CSS: {path.name}")


if __name__ == "__main__":
    main()

