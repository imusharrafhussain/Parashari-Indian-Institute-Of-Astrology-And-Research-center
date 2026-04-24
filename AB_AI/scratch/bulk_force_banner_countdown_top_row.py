from pathlib import Path
import re


ROOT = Path(r"d:\Parashari website new\AB_AI")
FILES = sorted(ROOT.glob("crash-courses/cc-*.html")) + [ROOT / "archive" / "plrt.html"]


OLD_TABLET_BLOCK = """        @media (min-width: 768px) and (max-width: 1199.98px) {
            .cc-palmistry-landing .banner-card { flex-direction: column; align-items: stretch; }
            .cc-palmistry-landing .banner-left { width: 100%; align-items: center; }
            .cc-palmistry-landing .banner-right { width: 100%; flex-wrap: wrap; justify-content: space-between; }
            .cc-palmistry-landing .countdown { width: 100%; flex-wrap: wrap; white-space: normal; }
            .cc-palmistry-landing .countdown-label { width: 100%; }
            .cc-palmistry-landing .price-box { text-align: left; min-width: 0; flex: 1 1 auto; }
            .cc-palmistry-landing .banner-right .btn-cta { min-width: 8rem; }
        }"""

NEW_TABLET_BLOCK = """        @media (min-width: 768px) and (max-width: 1199.98px) {
            .cc-palmistry-landing .banner-card { flex-direction: column; align-items: stretch; }
            .cc-palmistry-landing .banner-left { width: 100%; align-items: center; }
            .cc-palmistry-landing .banner-right { width: 100%; display: grid; grid-template-columns: 1fr auto; grid-template-areas: "countdown countdown" "price cta"; column-gap: 0.85rem; row-gap: 0.6rem; align-items: center; }
            .cc-palmistry-landing .countdown { grid-area: countdown; width: 100%; flex-wrap: nowrap; white-space: nowrap; }
            .cc-palmistry-landing .countdown-label { width: auto; margin-right: 0.25rem; }
            .cc-palmistry-landing .price-box { grid-area: price; text-align: left; min-width: 0; }
            .cc-palmistry-landing .banner-right .btn-cta { grid-area: cta; min-width: 8rem; justify-self: end; }
        }"""


OLD_MOBILE_BLOCK = """        @media (max-width: 767.98px) {
            .cc-palmistry-landing .banner-card { padding: 0.95rem 1rem; }
            .cc-palmistry-landing .banner-title { font-size: 1.05rem; }
            .cc-palmistry-landing .banner-sub { font-size: 0.9rem; }
            .cc-palmistry-landing .banner-right { gap: 0.65rem; align-items: flex-end; }
        }"""

NEW_MOBILE_BLOCK = """        @media (max-width: 767.98px) {
            .cc-palmistry-landing .banner-card { padding: 0.95rem 1rem; }
            .cc-palmistry-landing .banner-title { font-size: 1.05rem; }
            .cc-palmistry-landing .banner-sub { font-size: 0.9rem; }
            .cc-palmistry-landing .banner-right { width: 100%; display: grid; grid-template-columns: 1fr auto; grid-template-areas: "countdown countdown" "price cta"; column-gap: 0.65rem; row-gap: 0.55rem; align-items: center; }
            .cc-palmistry-landing .countdown { grid-area: countdown; width: 100%; flex-wrap: wrap; white-space: normal; }
            .cc-palmistry-landing .countdown-label { width: 100%; margin-right: 0; }
            .cc-palmistry-landing .price-box { grid-area: price; text-align: left; min-width: 0; }
            .cc-palmistry-landing .banner-right .btn-cta { grid-area: cta; justify-self: end; min-width: 7.1rem; }
        }"""


def patch_file(path: Path) -> bool:
    text = path.read_text(encoding="utf-8")
    new = text
    changed = False

    if OLD_MOBILE_BLOCK in new:
        new = new.replace(OLD_MOBILE_BLOCK, NEW_MOBILE_BLOCK, 1)
        changed = True
    else:
        # Fallback: replace existing max-width block around banner-right adjustments
        new2, c2 = re.subn(
            r"@media \(max-width: 767\.98px\) \{[^{}]*\.cc-palmistry-landing \.banner-right \{[^{}]*\}[^{}]*\}",
            NEW_MOBILE_BLOCK,
            new,
            count=1,
            flags=re.S,
        )
        if c2:
            new = new2
            changed = True

    if OLD_TABLET_BLOCK in new:
        new = new.replace(OLD_TABLET_BLOCK, NEW_TABLET_BLOCK, 1)
        changed = True
    else:
        new2, c2 = re.subn(
            r"@media \(min-width: 768px\) and \(max-width: 1199\.98px\) \{.*?\}",
            NEW_TABLET_BLOCK,
            new,
            count=1,
            flags=re.S,
        )
        if c2:
            new = new2
            changed = True

    if changed and new != text:
        path.write_text(new, encoding="utf-8")
        return True
    return False


def main() -> None:
    updated = []
    unchanged = []
    for f in FILES:
        if not f.exists():
            continue
        if patch_file(f):
            updated.append(str(f))
        else:
            unchanged.append(str(f))

    print(f"Updated: {len(updated)}")
    for p in updated:
        print(f"UPDATED: {p}")
    print(f"Unchanged: {len(unchanged)}")
    for p in unchanged:
        print(f"UNCHANGED: {p}")


if __name__ == "__main__":
    main()

