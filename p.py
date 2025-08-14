#!/usr/bin/env python3
"""
Экспортирует *только* исходный код проекта в один TXT.

  • игнорирует node_modules, .next, public, .git и пр.;
  • записывает содержимое файлов с «кодовыми» расширениями;
  • бинарные и большие файлы пропускает.

По необходимости расширяйте / сужайте ALLOWED_EXTS и IGNORED_DIRS.
"""

from __future__ import annotations
import os
import argparse
from pathlib import Path
from typing import Set

# --- что считать «файлом с кодом» -------------------------------------------
ALLOWED_EXTS: Set[str] = {
    ".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs",
    ".py", ".css", ".scss",
    ".json", ".yml", ".yaml",
}

# --- какие каталоги и файлы полностью исключаем -----------------------------
IGNORED_DIRS: Set[str] = {
    ".git", "node_modules", ".next", ".turbo", "dist", "build",
    "coverage", "public", "__tests__", ".storybook", ".vscode",
}

IGNORED_FILE_EXTS: Set[str] = {
    ".png", ".jpg", ".jpeg", ".gif", ".svg", ".ico",
    ".ttf", ".woff", ".woff2", ".mp4", ".webm", ".map",
}

MAX_FILE_SIZE_BYTES = 1_000_000  # >1 МБ считаем неподходящим


# ---------------------------------------------------------------------------
def looks_like_text(path: Path, blocksize: int = 512) -> bool:
    """
    Очень грубый «текст/бинарный» тест: наличие нулевого байта
    в первой порции данных.
    """
    try:
        with path.open("rb") as f:
            return b"\0" not in f.read(blocksize)
    except Exception:
        return False


def is_code_file(path: Path) -> bool:
    """Решаем, нужно ли сохранять этот файл."""
    if path.suffix in IGNORED_FILE_EXTS:
        return False
    if path.suffix.lower() not in ALLOWED_EXTS:
        return False
    if path.stat().st_size > MAX_FILE_SIZE_BYTES:
        return False
    return True


def dump_code_tree(output_file: str, encoding: str = "utf-8") -> None:
    with open(output_file, "w", encoding=encoding) as out:
        for root, dirs, files in os.walk("."):
            # 1) выкидываем лишние каталоги из обхода
            dirs[:] = [d for d in dirs if d not in IGNORED_DIRS]

            for filename in files:
                path = Path(root) / filename
                if not is_code_file(path):
                    continue
                if not looks_like_text(path):
                    # пропускаем binary / minified junk
                    continue

                rel_path = path.relative_to(".")
                out.write(f"### ./{rel_path.as_posix()}\n")
                try:
                    out.write(path.read_text(encoding=encoding, errors="replace"))
                except Exception as exc:
                    out.write(f"[could not read file: {exc}]")
                out.write("\n\n")  # визуальный разделитель


# ---------------------------------------------------------------------------
def main() -> None:
    parser = argparse.ArgumentParser(
        description="Собирает исходники проекта (Next.js / любой JS-стек) в один TXT."
    )
    parser.add_argument(
        "-o",
        "--output",
        default="code.txt",
        help="Имя выходного файла (по умолчанию code.txt)",
    )
    parser.add_argument(
        "--encoding",
        default="utf-8",
        help="Кодировка для чтения файлов (по умолчанию UTF-8)",
    )
    args = parser.parse_args()
    dump_code_tree(args.output, args.encoding)


if __name__ == "__main__":
    main()
