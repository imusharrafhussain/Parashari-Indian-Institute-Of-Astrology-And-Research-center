import re
from pathlib import Path


ROOT = Path(r"d:\Parashari website new\AB_AI")
FILES = sorted(ROOT.glob("crash-courses/cc-*.html")) + [ROOT / "archive" / "plrt.html"]


NEW_BLOCK = """        /* PRICING BANNER */
        .cc-palmistry-landing .pricing-banner { background: linear-gradient(180deg, hsl(38, 28%, 92%) 0%, hsl(40, 33%, 95%) 100%); padding: 1.2rem 0 1.55rem; position: relative; }
        .cc-palmistry-landing .banner-card { display: flex; flex-direction: column; align-items: stretch; justify-content: space-between; gap: 0.95rem; border-radius: 0.92rem; border: 1px solid rgba(204, 163, 56, 0.18); background: var(--card); padding: 1.05rem 1.3rem; box-shadow: 0 10px 26px -10px rgba(60, 20, 20, 0.16); overflow: hidden; position: relative; max-width: 1080px; margin: 0 auto; }
        .cc-palmistry-landing .banner-card::before { content: ''; position: absolute; inset: 0; background: radial-gradient(800px 200px at 15% 0%, rgba(204, 163, 56, 0.14), transparent 55%), radial-gradient(700px 220px at 90% 30%, rgba(128, 32, 32, 0.10), transparent 60%); pointer-events: none; }
        .cc-palmistry-landing .banner-left { display: flex; align-items: flex-start; gap: 0.72rem; min-width: 0; width: 100%; flex: 1 1 auto; position: relative; z-index: 1; }
        .cc-palmistry-landing .banner-left h3 { margin: 0.2rem 0 0.25rem; line-height: 1.2; }
        .cc-palmistry-landing .banner-left p { margin: 0; line-height: 1.35; }
        .cc-palmistry-landing .banner-icon { width: 1.95rem; height: 1.95rem; border-radius: 50%; background: rgba(204, 163, 56, 0.22); display: flex; align-items: center; justify-content: center; font-size: 0.88rem; flex-shrink: 0; }
        .cc-palmistry-landing .banner-title { font-size: 1.25rem; font-weight: 700; }
        .cc-palmistry-landing .banner-sub { font-size: 1rem; color: var(--muted); }
        .cc-palmistry-landing .banner-right { display: flex; align-items: center; gap: 0.85rem; flex-wrap: wrap; justify-content: space-between; width: 100%; min-width: 0; position: relative; z-index: 1; }
        .cc-palmistry-landing .countdown { display: flex; align-items: center; gap: 0.36rem; font-size: 0.84rem; flex-wrap: wrap; white-space: normal; width: 100%; }
        .cc-palmistry-landing .countdown-label { color: var(--destructive); font-weight: 500; width: 100%; }
        .cc-palmistry-landing .countdown-box { background: var(--primary); color: var(--primary-fg); padding: 0.2rem 0.44rem; border-radius: 0.34rem; font-weight: 700; font-size: 0.8rem; min-width: 2.8rem; text-align: center; }
        .cc-palmistry-landing .price-box { text-align: left; min-width: 0; flex: 1 1 auto; }
        .cc-palmistry-landing .price-old { font-size: 0.76rem; color: var(--muted); text-decoration: line-through; margin: 0; }
        .cc-palmistry-landing .price-new { font-size: 1.95rem; font-weight: 700; color: var(--gold-dark); font-family: 'Playfair Display', serif; margin: 0.04rem 0 0; line-height: 1; }
        .cc-palmistry-landing .banner-right .btn-cta { padding: 0.68rem 1.15rem; border-radius: 0.65rem; line-height: 1; font-size: 0.95rem; min-width: 7.1rem; justify-content: center; flex: 0 0 auto; }

        @media (max-width: 767.98px) {
            .cc-palmistry-landing .banner-card { padding: 0.95rem 1rem; }
            .cc-palmistry-landing .banner-title { font-size: 1.05rem; }
            .cc-palmistry-landing .banner-sub { font-size: 0.9rem; }
            .cc-palmistry-landing .banner-right { gap: 0.65rem; align-items: flex-end; }
        }

        @media (min-width: 768px) and (max-width: 1199.98px) {
            .cc-palmistry-landing .banner-card { flex-direction: column; align-items: stretch; }
            .cc-palmistry-landing .banner-left { width: 100%; align-items: center; }
            .cc-palmistry-landing .banner-right { width: 100%; flex-wrap: wrap; justify-content: space-between; }
            .cc-palmistry-landing .countdown { width: 100%; flex-wrap: wrap; white-space: normal; }
            .cc-palmistry-landing .countdown-label { width: 100%; }
            .cc-palmistry-landing .price-box { text-align: left; min-width: 0; flex: 1 1 auto; }
            .cc-palmistry-landing .banner-right .btn-cta { min-width: 8rem; }
        }

        @media (min-width: 1200px) {
            .cc-palmistry-landing .banner-card { flex-direction: row; align-items: center; }
            .cc-palmistry-landing .banner-left { width: auto; align-items: center; }
            .cc-palmistry-landing .banner-right { width: auto; flex-wrap: nowrap; justify-content: flex-end; }
            .cc-palmistry-landing .countdown { width: auto; flex-wrap: nowrap; white-space: nowrap; }
            .cc-palmistry-landing .countdown-label { width: auto; }
            .cc-palmistry-landing .price-box { text-align: right; min-width: 7.5rem; flex: 0 0 auto; }
            .cc-palmistry-landing .banner-right .btn-cta { min-width: 8.2rem; padding: 0.68rem 1.35rem; font-size: 0.98rem; }
        }"""


PATTERN = re.compile(
    r"\s*/\* PRICING BANNER \*/.*?\.cc-palmistry-landing \.banner-right \.btn-cta\s*\{.*?\}\s*",
    re.S,
)


def main() -> None:
    updated = []
    failed = []
    for file in FILES:
        if not file.exists():
            failed.append((str(file), "missing"))
            continue

        text = file.read_text(encoding="utf-8")
        new_text, count = PATTERN.subn("\n" + NEW_BLOCK + "\n\n", text, count=1)
        if count != 1:
            failed.append((str(file), "pattern-not-found"))
            continue

        file.write_text(new_text, encoding="utf-8")
        updated.append(str(file))

    print(f"Updated: {len(updated)}")
    for p in updated:
        print(f"UPDATED: {p}")
    print(f"Failed: {len(failed)}")
    for p, reason in failed:
        print(f"FAILED ({reason}): {p}")


if __name__ == "__main__":
    main()

