from pathlib import Path


ROOT = Path(r"d:\Parashari website new\AB_AI")
FILES = sorted(ROOT.glob("crash-courses/cc-*.html")) + [ROOT / "archive" / "plrt.html"]


OLD_DESKTOP = """        @media (min-width: 1200px) {
            .cc-palmistry-landing .banner-card { flex-direction: row; align-items: center; }
            .cc-palmistry-landing .banner-left { width: auto; align-items: center; }
            .cc-palmistry-landing .banner-right { width: auto; flex-wrap: nowrap; justify-content: flex-end; }
            .cc-palmistry-landing .countdown { width: auto; flex-wrap: nowrap; white-space: nowrap; }
            .cc-palmistry-landing .countdown-label { width: auto; }
            .cc-palmistry-landing .price-box { text-align: right; min-width: 7.5rem; flex: 0 0 auto; }
            .cc-palmistry-landing .banner-right .btn-cta { min-width: 8.2rem; padding: 0.68rem 1.35rem; font-size: 0.98rem; }
        }"""

NEW_DESKTOP = """        @media (min-width: 1200px) {
            .cc-palmistry-landing .banner-card { flex-direction: row; align-items: center; }
            .cc-palmistry-landing .banner-left { width: auto; align-items: center; }
            .cc-palmistry-landing .banner-right { width: auto; display: grid; grid-template-columns: 1fr auto; grid-template-areas: "countdown countdown" "price cta"; column-gap: 0.85rem; row-gap: 0.6rem; align-items: center; justify-content: end; }
            .cc-palmistry-landing .countdown { grid-area: countdown; width: 100%; flex-wrap: nowrap; white-space: nowrap; }
            .cc-palmistry-landing .countdown-label { width: auto; margin-right: 0.25rem; }
            .cc-palmistry-landing .price-box { grid-area: price; text-align: right; min-width: 7.5rem; }
            .cc-palmistry-landing .banner-right .btn-cta { grid-area: cta; min-width: 8.2rem; padding: 0.68rem 1.35rem; font-size: 0.98rem; justify-self: end; }
        }"""


LEGACY_DUP_BLOCK_1 = """@media (max-width: 767.98px) {
            .cc-palmistry-landing .banner-card { padding: 0.95rem 1rem; }
            .cc-palmistry-landing .banner-title { font-size: 1.05rem; }
            .cc-palmistry-landing .banner-sub { font-size: 0.9rem; }
            .cc-palmistry-landing .banner-right { gap: 0.65rem; align-items: flex-end; }
        }"""

LEGACY_DUP_BLOCK_2 = """        @media (min-width: 768px) {
            .cc-palmistry-landing .banner-card { flex-direction: row; align-items: center; }
            .cc-palmistry-landing .banner-left { width: auto; align-items: center; }
            .cc-palmistry-landing .banner-right { width: auto; flex-wrap: nowrap; justify-content: flex-end; }
            .cc-palmistry-landing .countdown { width: auto; flex-wrap: nowrap; white-space: nowrap; }
            .cc-palmistry-landing .countdown-label { width: auto; }
            .cc-palmistry-landing .price-box { text-align: right; min-width: 7.5rem; flex: 0 0 auto; }
            .cc-palmistry-landing .banner-right .btn-cta { min-width: 8.2rem; padding: 0.68rem 1.35rem; font-size: 0.98rem; }
        }"""


def main() -> None:
    updated = []
    unchanged = []

    for f in FILES:
        if not f.exists():
            continue
        text = f.read_text(encoding="utf-8")
        original = text

        # Remove leftover duplicate legacy blocks that were conflicting.
        text = text.replace(LEGACY_DUP_BLOCK_1, "")
        text = text.replace(LEGACY_DUP_BLOCK_2, "")

        # Update desktop breakpoint to keep timer above price+button.
        text = text.replace(OLD_DESKTOP, NEW_DESKTOP)

        if text != original:
            f.write_text(text, encoding="utf-8")
            updated.append(str(f))
        else:
            unchanged.append(str(f))

    print(f"Updated: {len(updated)}")
    for p in updated:
        print(f"UPDATED: {p}")
    print(f"Unchanged: {len(unchanged)}")


if __name__ == "__main__":
    main()

