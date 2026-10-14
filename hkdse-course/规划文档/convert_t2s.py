#!/usr/bin/env python3
"""
将工作空间下所有文件的繁体中文转为简体中文。
包括文件内容和文件名（含目录名）。

依赖: zhconv (pip install zhconv)
"""

import os
from pathlib import Path
import zhconv

# ── 配置 ────────────────────────────────────────────
WORKSPACE = Path(r"C:\Users\xuless\OneDrive\Xuless Obsidian Note\HKDSE course")

# 按扩展名跳过的二进制文件
BINARY_EXTENSIONS = {'.pdf', '.png', '.jpg', '.jpeg', '.gif',
                     '.ico', '.zip', '.gz', '.tar', '.exe', '.dll'}

# 不进入的隐藏目录
SKIP_DIRS = {'.git', '__pycache__', '.obsidian', '.trash'}

# ── 工具函数 ────────────────────────────────────────

def is_binary(filepath: Path) -> bool:
    """通过扩展名和内容检测是否为二进制文件。"""
    if filepath.suffix.lower() in BINARY_EXTENSIONS:
        return True
    try:
        with open(filepath, 'rb') as f:
            chunk = f.read(4096)
        if b'\x00' in chunk:
            return True
        # 尝试解码；若遇到截断的尾部多字节字符（unexpected end），视为文本
        try:
            chunk.decode('utf-8')
        except UnicodeDecodeError as e:
            if e.reason == 'unexpected end of data':
                return False
            raise
        return False
    except UnicodeDecodeError:
        return True


def convert_content(filepath: Path) -> bool:
    """转换文件内容：繁体 → 简体。返回是否发生了修改。"""
    if is_binary(filepath):
        print(f"  [SKIP 二进制] {filepath.relative_to(WORKSPACE)}")
        return False
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            original = f.read()
    except Exception as e:
        print(f"  [ERROR 读取] {filepath.relative_to(WORKSPACE)}: {e}")
        return False

    converted = zhconv.convert(original, 'zh-cn')
    if converted == original:
        return False

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(converted)
    return True


def needs_rename(name: str) -> bool:
    """检查名称中是否含需要简化的繁体字。"""
    return zhconv.convert(name, 'zh-cn') != name


# ── 主流程 ──────────────────────────────────────────

def main():
    print(f"工作空间: {WORKSPACE}")
    print(f"转换方向: 繁体 → 简体\n")

    # 1. 收集所有文件与目录
    all_dirs = []
    all_files = []

    for root, dirs, filenames in os.walk(WORKSPACE, topdown=True):
        root_path = Path(root)
        # 跳过不需要进入的目录
        dirs[:] = [d for d in dirs if d not in SKIP_DIRS]
        for d in dirs:
            all_dirs.append(root_path / d)
        for f in filenames:
            all_files.append(root_path / f)

    # 按深度降序，确保先处理深层再处理浅层（安全重命名）
    all_dirs.sort(key=lambda p: len(p.parts), reverse=True)

    # 2. 转换文件内容
    print(f"[阶段 1] 转换文件内容 ({len(all_files)} 个文件)")
    print("-" * 50)
    content_changed = 0
    for fp in all_files:
        if convert_content(fp):
            content_changed += 1
            print(f"  [OK 内容] {fp.relative_to(WORKSPACE)}")
    print(f"  → 内容修改: {content_changed} 个\n")

    # 3. 重命名文件
    print(f"[阶段 2] 重命名文件")
    print("-" * 50)
    file_renamed = 0
    for fp in all_files:
        # 文件可能在阶段 1 后已不存在（被改名）
        if not fp.exists():
            continue
        if needs_rename(fp.name):
            new_name = zhconv.convert(fp.name, 'zh-cn')
            new_path = fp.parent / new_name
            if new_path.exists():
                print(f"  [WARN] 目标已存在，跳过: {fp.name} -> {new_name}")
                continue
            fp.rename(new_path)
            file_renamed += 1
            print(f"  [OK 文件名] {fp.name} -> {new_name}")
    print(f"  → 文件重命名: {file_renamed} 个\n")

    # 4. 重命名目录（深层优先，避免路径断裂）
    print(f"[阶段 3] 重命名目录")
    print("-" * 50)
    dir_renamed = 0
    for dp in all_dirs:
        if not dp.exists():
            continue
        if needs_rename(dp.name):
            new_name = zhconv.convert(dp.name, 'zh-cn')
            new_path = dp.parent / new_name
            if new_path.exists():
                print(f"  [WARN] 目标已存在，跳过: {dp.name} -> {new_name}")
                continue
            dp.rename(new_path)
            dir_renamed += 1
            print(f"  [OK 目录名] {dp.name} -> {new_name}")
    print(f"  → 目录重命名: {dir_renamed} 个\n")

    # 5. 汇总
    print("=" * 50)
    print(f"完成!  内容: {content_changed}  文件: {file_renamed}  目录: {dir_renamed}")


if __name__ == "__main__":
    main()
