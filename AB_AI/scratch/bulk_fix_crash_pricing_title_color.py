from pathlib import Path


ROOT = Path(r"d:\Parashari website new\AB_AI")
TARGET_FILES = sorted(ROOT.glob("crash-courses/cc-*.html")) + [ROOT / "archive" / "plrt.html"]

OLD = """.cc-palmistry-landing .pricing-header h3 {
            margin-top: 0.25rem;
            font-size: 1.5rem;
        }"""

NEW = """.cc-palmistry-landing .pricing-header h3 {
            margin-top: 0.25rem;
            font-size: 1.5rem;
            color: var(--primary-fg);
        }"""


def main() -> None:
    updated = []
    skipped = []

    for file in TARGET_FILES:
        if not file.exists():
            skipped.append((str(file), "missing"))
            continue

        text = file.read_text(encoding="utf-8")
        if NEW in text:
            skipped.append((str(file), "already-updated"))
            continue

        if OLD not in text:
            skipped.append((str(file), "pattern-not-found"))
            continue

        text = text.replace(OLD, NEW, 1)
        file.write_text(text, encoding="utf-8")
        updated.append(str(file))

    print(f"Updated {len(updated)} file(s).")
    for f in updated:
        print(f"UPDATED: {f}")
    for f, reason in skipped:
        print(f"SKIPPED ({reason}): {f}")


if __name__ == "__main__":
    main()

