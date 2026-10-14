#!/usr/bin/env python3
"""Reverse-migrate `> [!example] ...` callouts back to `` ```ad-example `` blocks.

Rules (from MEMORY.md 2026-07-02 update):
- 示例板块使用 ```ad-example 代码块语法
- 块内每一行去掉 `> ` 前缀
- 块内的 `---` 保持为 `---`
- 标题 `> [!example] title: ...` 转为 `title: ...` 作为块首行
- 嵌套代码块：`> \`\`\` ` 等需要还原为不带前缀的反引号
"""

import re
import sys
from pathlib import Path


def is_example_header(line):
    """Check if line opens an example callout: `> [!example] ...`."""
    return line.startswith('> [!example]')


def migrate_example_callout(filepath: Path):
    text = filepath.read_text(encoding='utf-8')
    lines = text.splitlines(keepends=True)

    out_lines = []
    i = 0
    n_blocks = 0
    while i < len(lines):
        if not is_example_header(lines[i]):
            out_lines.append(lines[i])
            i += 1
            continue
        # Find end of callout: consecutive `> ` lines (allow blank `> `)
        j = i + 1
        while j < len(lines):
            stripped = lines[j].rstrip('\n')
            if stripped == '>':
                j += 1
                continue
            if stripped.startswith('> '):
                j += 1
                continue
            if stripped == '>':
                j += 1
                continue
            break
        # Lines i..j-1 form the callout
        header_line = lines[i].rstrip('\n')
        # Extract title from "> [!example] title content"
        body_text = header_line[len('> [!example]'):].strip()
        # Build ad-example block
        out_lines.append('````ad-example\n')
        if body_text:
            out_lines.append(f'title: {body_text}\n')
            out_lines.append('\n')
        # Process body lines: strip `> ` prefix
        for k in range(i + 1, j):
            stripped = lines[k].rstrip('\n')
            if stripped == '>':
                # blank line
                out_lines.append('\n')
            elif stripped.startswith('> '):
                out_lines.append(stripped[2:] + '\n')
            elif stripped == '>':
                out_lines.append('\n')
        # Close block
        out_lines.append('````\n')
        i = j
        n_blocks += 1

    new_text = ''.join(out_lines)
    if new_text != text:
        filepath.write_text(new_text, encoding='utf-8')
    return n_blocks


def main():
    files = sys.argv[1:]
    total = 0
    for f in files:
        path = Path(f)
        n = migrate_example_callout(path)
        total += n
        print(f"{path.name}: {n} blocks reverted")
    print(f"total: {total}")


if __name__ == '__main__':
    main()
