#!/usr/bin/env python3
"""Unify chapter title format to '# N　标题（English）' (fullwidth space + number + fullwidth parens)."""

import re
import sys
from pathlib import Path


def fix_title(path: Path):
    text = path.read_text(encoding='utf-8')
    lines = text.splitlines(keepends=True)
    changed = False
    for i, line in enumerate(lines):
        # Match the first # heading (h1)
        if line.startswith('# ') and not line.startswith('## '):
            old = line
            # Insert chapter number prefix if missing
            content = line[2:].rstrip('\n')
            # Try to extract English subtitle in ()
            m = re.match(r'^(.+?)\s*\(([^)]+)\)\s*$', content)
            if m:
                cn = m.group(1).strip()
                en = m.group(2).strip()
                # Remove "(I)" / "(II)" / "(I)" / "(II)" etc from CN side
                cn_clean = re.sub(r'\s*[\(（]\s*[IVX]+(?:\s*[\)）])?\s*$', '', cn).strip()
                cn_clean = re.sub(r'\s*[\(（]\s*I\s*[\)）]\s*$', '', cn_clean).strip()
                cn_clean = re.sub(r'\s*[\(（]\s*II\s*[\)）]\s*$', '', cn_clean).strip()
                # Get chapter number from filename
                fname = path.name
                num_match = re.search(r'Chapter\s+(\d+)', fname)
                if num_match:
                    num = num_match.group(1)
                    new_line = f"# {num}　{cn_clean}（{en}）\n"
                    lines[i] = new_line
                    changed = (new_line != old)
            break
    if changed:
        path.write_text(''.join(lines), encoding='utf-8')
    return changed


files = [
    "Chapter 8 平面几何 (I).md",
    "Chapter 9 三角学(I).md",
    "Chapter 10 立体几何 (I).md",
    "Chapter 12 数据的组织与表达.md",
    "Chapter 13 集中趋势的度量.md",
    "Chapter 14 概率(I).md",
    "Chapter 15 解析几何 (I).md",
    "Chapter 20 直线方程.md",
]

base = Path(r"C:\Users\xuless\OneDrive\Xuless Obsidian Note\HKDSE course\DSE 课题讲义")
for f in files:
    p = base / f
    if fix_title(p):
        print(f"fixed: {f}")
    else:
        print(f"unchanged: {f}")
