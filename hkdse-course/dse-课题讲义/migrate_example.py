#!/usr/bin/env python3
"""Migrate ```ad-example ... ``` to > [!example] ... form.

Rules (from MEMORY.md):
- ad-example 块（4 反引号）替换为 Obsidian 原生 example Callout（> [!example]）
- 块内每一行前缀 `> `
- 块内的 `---` 单独行替换为 `> ---`
- 保持 title 行作为 callout 第一行（> [!example] title: ...）
- 处理嵌套代码块：外层 4 反引号 → 内层 3 反引号 → 内层 2 反引号等，全部转成 `> ` 前缀
"""

import re
import sys
from pathlib import Path


def is_ad_example_block(lines, start):
    """Check if line[start:] opens an ad-example block with N backticks (N>=4)."""
    line = lines[start]
    m = re.match(r'^(````+)ad-example\s*$', line.rstrip('\n'))
    if not m:
        return None
    return len(m.group(1))


def find_closing(lines, start, n_backticks):
    """Find the line that closes a code block with exactly n_backticks."""
    for i in range(start + 1, len(lines)):
        line = lines[i].rstrip('\n')
        if line == '`' * n_backticks:
            return i
    return None


def count_backticks(line):
    """Count leading backticks (must be at start of line)."""
    m = re.match(r'^(`+)', line.rstrip('\n'))
    return len(m.group(1)) if m else 0


def migrate_ad_example(filepath: Path):
    text = filepath.read_text(encoding='utf-8')
    lines = text.splitlines(keepends=True)

    out_lines = []
    i = 0
    n_blocks = 0
    while i < len(lines):
        n = is_ad_example_block(lines, i)
        if n is None:
            out_lines.append(lines[i])
            i += 1
            continue
        # Found opening of ad-example block
        closing = find_closing(lines, i, n)
        if closing is None:
            # Unclosed — leave as is
            out_lines.append(lines[i])
            i += 1
            continue
        # Process block from i+1 to closing-1
        block_lines = lines[i + 1:closing]
        # First non-empty line is title
        title_line = None
        body_start = 0
        for j, b in enumerate(block_lines):
            stripped = b.rstrip('\n').strip()
            if stripped == '':
                continue
            if stripped.startswith('title:'):
                title_line = stripped[len('title:'):].strip()
                body_start = j + 1
            else:
                # No title, first non-empty is body
                body_start = j
            break

        # Build callout header
        if title_line:
            out_lines.append(f"> [!example] {title_line}\n")
        else:
            out_lines.append("> [!example]\n")
            # body_start was set to first non-empty index; if title existed, body_start is past it
            if title_line is None:
                body_start = 0

        # Process body lines
        for b in block_lines[body_start:]:
            stripped = b.rstrip('\n')
            if stripped == '':
                # Empty line → blank callout line
                out_lines.append(">\n")
            elif stripped == '---':
                out_lines.append("> ---\n")
            else:
                # Handle nested code blocks: any line that is a fenced code block
                # (i.e. starts with ` of count n) needs `> ` prefix
                bt = count_backticks(stripped)
                if bt >= n:
                    # Inner code fence: prefix with `> `
                    out_lines.append("> " + b)
                else:
                    out_lines.append("> " + b)
        i = closing + 1
        n_blocks += 1

    new_text = ''.join(out_lines)
    if new_text != text:
        filepath.write_text(new_text, encoding='utf-8')
    return n_blocks


def main():
    files = sys.argv[1:]
    for f in files:
        path = Path(f)
        n = migrate_ad_example(path)
        print(f"{path.name}: {n} blocks migrated")


if __name__ == '__main__':
    main()
