import re
from pathlib import Path


ROOT = Path(r"d:\Parashari website new\AB_AI\crash-courses")


REPLACEMENTS = {
    r"\.cc-palmistry-landing \.pricing-banner\s*\{[^}]*\}":
        ".cc-palmistry-landing .pricing-banner { background: linear-gradient(180deg, hsl(38, 28%, 92%) 0%, hsl(40, 33%, 95%) 100%); padding: 1.2rem 0 1.55rem; position: relative; }",

    r"\.cc-palmistry-landing \.banner-card\s*\{[^}]*\}":
        ".cc-palmistry-landing .banner-card { display: flex; flex-direction: column; align-items: center; justify-content: space-between; gap: 0.95rem; border-radius: 0.92rem; border: 1px solid rgba(204, 163, 56, 0.18); background: var(--card); padding: 1.05rem 1.3rem; box-shadow: 0 10px 26px -10px rgba(60, 20, 20, 0.16); overflow: hidden; position: relative; max-width: 1080px; margin: 0 auto; }",

    r"\.cc-palmistry-landing \.banner-left\s*\{[^}]*\}":
        ".cc-palmistry-landing .banner-left { display: flex; align-items: center; gap: 0.72rem; min-width: 0; flex: 1 1 auto; position: relative; z-index: 1; }",

    r"\.cc-palmistry-landing \.banner-icon\s*\{[^}]*\}":
        ".cc-palmistry-landing .banner-icon { width: 1.95rem; height: 1.95rem; border-radius: 50%; background: rgba(204, 163, 56, 0.22); display: flex; align-items: center; justify-content: center; font-size: 0.88rem; flex-shrink: 0; }",

    r"\.cc-palmistry-landing \.banner-right\s*\{[^}]*\}":
        ".cc-palmistry-landing .banner-right { display: flex; align-items: center; gap: 0.85rem; flex-wrap: nowrap; justify-content: flex-end; min-width: 0; position: relative; z-index: 1; }",

    r"\.cc-palmistry-landing \.countdown\s*\{[^}]*\}":
        ".cc-palmistry-landing .countdown { display: flex; align-items: center; gap: 0.36rem; font-size: 0.84rem; flex-wrap: nowrap; white-space: nowrap; }",

    r"\.cc-palmistry-landing \.countdown-box\s*\{[^}]*\}":
        ".cc-palmistry-landing .countdown-box { background: var(--primary); color: var(--primary-fg); padding: 0.2rem 0.44rem; border-radius: 0.34rem; font-weight: 700; font-size: 0.8rem; min-width: 2.8rem; text-align: center; }",

    r"\.cc-palmistry-landing \.price-box\s*\{[^}]*\}":
        ".cc-palmistry-landing .price-box { text-align: right; min-width: 7.5rem; }",

    r"\.cc-palmistry-landing \.price-old\s*\{[^}]*\}":
        ".cc-palmistry-landing .price-old { font-size: 0.76rem; color: var(--muted); text-decoration: line-through; margin: 0; }",

    r"\.cc-palmistry-landing \.price-new\s*\{[^}]*\}":
        ".cc-palmistry-landing .price-new { font-size: 1.95rem; font-weight: 700; color: var(--gold-dark); font-family: 'Playfair Display', serif; margin: 0.04rem 0 0; line-height: 1; }",
}


def refine_bar_css(text: str) -> str:
    out = text
    for pattern, replacement in REPLACEMENTS.items():
        out = re.sub(pattern, replacement, out, flags=re.S)

    # Ensure heading/subcopy alignment styles exist.
    if ".cc-palmistry-landing .banner-left h3" not in out:
        out = out.replace(
            ".cc-palmistry-landing .banner-left {",
            ".cc-palmistry-landing .banner-left h3 { margin: 0.2rem 0 0.22rem; line-height: 1.2; }\n        .cc-palmistry-landing .banner-left p { margin: 0; line-height: 1.34; }\n        .cc-palmistry-landing .banner-left {",
            1,
        )
    if ".cc-palmistry-landing .banner-right .btn-cta" not in out:
        out = out.replace(
            ".cc-palmistry-landing .price-new {",
            ".cc-palmistry-landing .banner-right .btn-cta { padding: 0.66rem 1.28rem; border-radius: 0.62rem; line-height: 1; font-size: 0.95rem; min-width: 7.9rem; justify-content: center; }\n        .cc-palmistry-landing .price-new {",
            1,
        )
    return out


def remove_refund_mentions(text: str) -> str:
    out = text
    # Trust signal tag.
    out = re.sub(r'<span>🔄\s*7-Day Refund</span>\s*', "", out)
    out = re.sub(r'<span>.*?7[- ]?Day Refund.*?</span>\s*', "", out, flags=re.I)
    # FAQ entries mentioning refund policy.
    out = re.sub(
        r'\{\s*q:\s*"[^"]*refund[^"]*",\s*a:\s*"[^"]*"\s*\}\s*,?',
        "",
        out,
        flags=re.I,
    )
    out = re.sub(
        r'\{\s*"q"\s*:\s*"[^"]*refund[^"]*",\s*"a"\s*:\s*"[^"]*"\s*\}\s*,?',
        "",
        out,
        flags=re.I,
    )
    # Tidy accidental doubled commas in arrays.
    out = re.sub(r",\s*,", ",", out)
    out = re.sub(r"\[\s*,", "[", out)
    return out


def main() -> None:
    for path in sorted(ROOT.glob("cc-*.html")):
        text = path.read_text(encoding="utf-8")
        updated = refine_bar_css(text)
        updated = remove_refund_mentions(updated)
        if updated != text:
            path.write_text(updated, encoding="utf-8")
            print(f"Updated: {path.name}")
        else:
            print(f"No changes: {path.name}")


if __name__ == "__main__":
    main()

