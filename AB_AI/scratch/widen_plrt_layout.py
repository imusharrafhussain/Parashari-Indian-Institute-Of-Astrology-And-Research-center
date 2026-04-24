import re
from pathlib import Path


ROOT = Path(r"d:\Parashari website new\AB_AI\crash-courses")

INSERT_MARKER = "/* WIDE SCREEN LAYOUT TUNING (PLRT TEMPLATE) */"

WIDE_CSS = r"""

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


def inject_css(style_block: str) -> str:
    if INSERT_MARKER in style_block:
        # Replace existing wide CSS block with the latest version.
        pattern = re.compile(
            r"\s*/\*\s*WIDE SCREEN LAYOUT TUNING \(PLRT TEMPLATE\)[\s\S]*?@media\s*\(min-width:\s*1700px\)\s*\{[\s\S]*?\}\s*",
            re.MULTILINE,
        )
        replaced = pattern.sub(WIDE_CSS.strip() + "\n", style_block, count=1)
        return replaced
    # Insert just before closing </style> to avoid breaking existing rules.
    return re.sub(r"\s*</style>\s*$", WIDE_CSS + "\n    </style>", style_block, flags=re.S)


def main() -> None:
    for path in sorted(ROOT.glob("cc-*.html")):
        html = path.read_text(encoding="utf-8", errors="ignore")
        m = re.search(r"<style>.*?</style>", html, flags=re.S)
        if not m:
            print(f"Skipped (no <style>): {path.name}")
            continue
        style_block = m.group(0)
        updated_style_block = inject_css(style_block)
        if updated_style_block == style_block:
            print(f"No change: {path.name}")
            continue
        updated_html = html.replace(style_block, updated_style_block, 1)
        path.write_text(updated_html, encoding="utf-8")
        print(f"Updated wide layout CSS: {path.name}")


if __name__ == "__main__":
    main()

