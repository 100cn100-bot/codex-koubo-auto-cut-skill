#!/usr/bin/env python3
import argparse
import shutil
from pathlib import Path


def main() -> None:
    parser = argparse.ArgumentParser(description="Scaffold the Remotion video packaging template.")
    parser.add_argument("--out", required=True, help="Target directory for the generated Remotion project.")
    parser.add_argument("--force", action="store_true", help="Overwrite the target directory if it exists.")
    args = parser.parse_args()

    skill_dir = Path(__file__).resolve().parents[1]
    template = skill_dir / "assets" / "remotion-template"
    out = Path(args.out).resolve()

    if out.exists():
        if not args.force:
            raise SystemExit(f"Target exists: {out}. Use --force to overwrite.")
        shutil.rmtree(out)

    shutil.copytree(template, out)
    print(out)


if __name__ == "__main__":
    main()
