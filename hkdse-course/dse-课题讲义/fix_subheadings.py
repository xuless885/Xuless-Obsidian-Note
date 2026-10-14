#!/usr/bin/env python3
"""Unify ## and ### heading format: halfwidth space -> fullwidth space."""

import re
import sys
from pathlib import Path


def fix_subheadings(path: Path):
    text = path.read_text(encoding='utf-8')
    lines = text.splitlines(keepends=True)
    changed = False
    for i, line in enumerate(lines):
        # Match ## and ### headings (not deeper)
        m = re.match(r'^(##+)\s+(.+)$', line.rstrip('\n'))
        if m:
            hashes = m.group(1)
            rest = m.group(2)
            # Replace first space after number "9.1 锐角..." with fullwidth space
            new_rest = re.sub(r'^(\d+(?:\.\d+)*)\s+', r'\1　', rest)
            if new_rest != rest:
                lines[i] = f"{hashes} {new_rest}\n"
                changed = True
    if changed:
        path.write_text(''.join(lines), encoding='utf-8')
    return changed


base = Path(r"C:\Users\xuless\OneDrive\Xuless Obsidian Note\HKDSE course\DSE 课题讲义")
files = list(base.glob("Chapter *.md"))
for p in files:
    if fix_subheadings(p):
        print(f"fixed: {p.name}")
