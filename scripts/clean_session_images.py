"""Strip base64 image blocks from a Claude Code JSONL session file.

Replaces every image content block with a text placeholder so the chat
keeps loading without exceeding image limits, while preserving the
original JSON structure on every line.

Usage:
    python scripts/clean_session_images.py              # cleans the default session
    python scripts/clean_session_images.py <path.jsonl> # cleans a specific file

IMPORTANT: close the chat tab in VSCode before running — the Claude Code
extension keeps the session in memory and overwrites the file on the next
message. Reopen the tab after cleanup for the placeholders to take effect.
"""
import json
import sys
from pathlib import Path

PLACEHOLDER_TEXT = "[image removed]"
DEFAULT_SESSIONS_DIR = Path.home() / ".claude" / "projects" / "C--Users-Vine-fymoob"
# The "Review project documentation and context files" chat — the one that
# keeps accumulating images and hitting API limits.
DEFAULT_SESSION_FILE = (
    DEFAULT_SESSIONS_DIR / "eb9e61b7-ba03-4a3b-bc7a-22a8cfa46c8c.jsonl"
)


def _is_image_block(node: dict) -> bool:
    """Match any image content block, regardless of internal shape.

    Claude Code has shipped at least two structures:
      1. {"type":"image", "source":{"type":"base64", "data":"..."}}
      2. {"type":"image", "file":{"base64":"..."}}
    Treat anything with type=="image" that carries base64 data as a match.
    """
    if node.get("type") != "image":
        return False
    src = node.get("source")
    if isinstance(src, dict) and src.get("type") == "base64":
        return True
    file = node.get("file")
    if isinstance(file, dict) and "base64" in file:
        return True
    return False


def scrub(node):
    """Recursively replace image blocks with text placeholders. Returns (node, count)."""
    if isinstance(node, dict):
        if _is_image_block(node):
            return {"type": "text", "text": PLACEHOLDER_TEXT}, 1
        out, total = {}, 0
        for k, v in node.items():
            cleaned, c = scrub(v)
            out[k] = cleaned
            total += c
        return out, total
    if isinstance(node, list):
        out, total = [], 0
        for v in node:
            cleaned, c = scrub(v)
            out.append(cleaned)
            total += c
        return out, total
    return node, 0


def main(path: str | None) -> None:
    src = Path(path) if path else DEFAULT_SESSION_FILE
    if not src.exists():
        raise SystemExit(f"file not found: {src}")

    # Preserve the pristine backup — don't overwrite it on repeat runs.
    backup = src.with_suffix(src.suffix + ".bak")
    if not backup.exists():
        backup.write_bytes(src.read_bytes())
        print(f"backup created: {backup.name}")
    else:
        print(f"backup already exists, keeping original: {backup.name}")

    tmp = src.with_suffix(src.suffix + ".tmp")
    images_removed = 0
    lines_total = 0

    with src.open("r", encoding="utf-8") as fin, tmp.open("w", encoding="utf-8", newline="\n") as fout:
        for line in fin:
            lines_total += 1
            line = line.rstrip("\n")
            if not line:
                fout.write("\n")
                continue
            try:
                obj = json.loads(line)
            except json.JSONDecodeError:
                fout.write(line + "\n")
                continue

            cleaned, count = scrub(obj)
            images_removed += count
            fout.write(json.dumps(cleaned, ensure_ascii=False) + "\n")

    tmp.replace(src)
    print(f"file: {src.name}")
    print(f"lines: {lines_total}")
    print(f"images replaced: {images_removed}")
    print(f"new size: {src.stat().st_size:,} bytes")


if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else None)
