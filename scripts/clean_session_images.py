"""Strip base64 image blocks from a Claude Code JSONL session file.

Replaces every image content block with a text placeholder so the chat
keeps loading without exceeding image limits, while preserving the
original JSON structure on every line.
"""
import json
import sys
from pathlib import Path

PLACEHOLDER_TEXT = "[image removed]"


def scrub(node):
    """Recursively replace image blocks with text placeholders."""
    if isinstance(node, dict):
        if (
            node.get("type") == "image"
            and isinstance(node.get("source"), dict)
            and node["source"].get("type") == "base64"
        ):
            return {"type": "text", "text": PLACEHOLDER_TEXT}
        return {k: scrub(v) for k, v in node.items()}
    if isinstance(node, list):
        return [scrub(v) for v in node]
    return node


def main(path: str) -> None:
    src = Path(path)
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

            before = json.dumps(obj, ensure_ascii=False)
            cleaned = scrub(obj)
            after = json.dumps(cleaned, ensure_ascii=False)
            if before != after:
                images_removed += before.count('"type":"image","source":{"type":"base64"')
            fout.write(after + "\n")

    tmp.replace(src)
    print(f"lines: {lines_total}")
    print(f"images replaced: {images_removed}")
    print(f"new size: {src.stat().st_size:,} bytes")


if __name__ == "__main__":
    main(sys.argv[1])
