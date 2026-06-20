#!/usr/bin/env python3
"""Crawl animejs.com/documentation into structured offline markdown."""

from __future__ import annotations

import argparse
import html
import json
import re
import time
import urllib.error
import urllib.request
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
SITEMAP = ROOT / "memory-bank/reference/animejs/SITEMAP.md"
OUT = ROOT / "memory-bank/reference/animejs/offline"
PAGES = OUT / "pages"
BASE_URL = "https://animejs.com"
DELAY_S = 0.15
MAX_RETRIES = 3


@dataclass
class PageMeta:
    order: int
    section: str
    path: str
    url: str
    file: str
    title: str = ""
    breadcrumb: list[str] = field(default_factory=list)
    prev: dict[str, str] | None = None
    next: dict[str, str] | None = None
    code_blocks: list[dict[str, str]] = field(default_factory=list)
    since: str = ""


def parse_sitemap() -> list[tuple[int, str, str, str]]:
    rows: list[tuple[int, str, str, str]] = []
    for line in SITEMAP.read_text(encoding="utf-8").splitlines():
        if not line.startswith("|") or line.startswith("| #") or line.startswith("| -"):
            continue
        parts = [p.strip() for p in line.strip("|").split("|")]
        if len(parts) != 4 or not parts[0].isdigit():
            continue
        order, section, path, url = int(parts[0]), parts[1], parts[2], parts[3]
        rows.append((order, section, path, url))
    return rows


def path_to_file(section: str, path: str) -> Path:
    if path == "(index)":
        return PAGES / section / "index.md"
    return PAGES / section / f"{path}.md"


def slug_from(section: str, path: str) -> str:
    return f"{section}/{path}" if path != "(index)" else section


def parse_frontmatter(md_path: Path) -> dict[str, Any]:
    text = md_path.read_text(encoding="utf-8")
    if not text.startswith("---"):
        return {}
    end = text.find("\n---", 3)
    if end == -1:
        return {}
    return json.loads(text[3:end])


def url_to_slug(href: str) -> str:
    href = href.split("#", 1)[0]
    if href.startswith("http"):
        href = href.replace(BASE_URL, "")
    prefix = "/documentation/"
    if href.startswith(prefix):
        return href[len(prefix) :].strip("/")
    return href.strip("/")


def fetch(url: str) -> str:
    last_err: Exception | None = None
    for attempt in range(MAX_RETRIES):
        try:
            req = urllib.request.Request(
                url,
                headers={"User-Agent": "TrainingApp-DocsMirror/1.0 (offline backup)"},
            )
            with urllib.request.urlopen(req, timeout=45) as resp:
                return resp.read().decode("utf-8", errors="replace")
        except (urllib.error.URLError, TimeoutError) as err:
            last_err = err
            time.sleep(0.5 * (attempt + 1))
    raise RuntimeError(f"Failed to fetch {url}: {last_err}")


def extract_balanced_div(html_doc: str, class_pattern: str) -> str:
    """Return inner HTML of the first div whose class contains class_pattern."""
    m = re.search(rf'<div class="{re.escape(class_pattern)}"[^>]*>', html_doc)
    if not m:
        return ""
    start = m.end()
    chunk = html_doc[start:]
    depth = 1
    i = 0
    while i < len(chunk) and depth > 0:
        if chunk.startswith("<div", i):
            depth += 1
            i = chunk.find(">", i) + 1
        elif chunk.startswith("</div>", i):
            depth -= 1
            i += 6
        else:
            i += 1
    return chunk[: max(i - 6, 0)]


def extract_content_html(html_doc: str) -> str:
    active_outer = extract_balanced_div(html_doc, "docs-info is-active")
    if active_outer:
        inner = extract_balanced_div(active_outer, "docs-info-content text-layout")
        if inner:
            return inner
        return active_outer
    return extract_balanced_div(html_doc, "docs-info-content text-layout")


def table_to_markdown(table_html: str) -> str:
    rows: list[list[str]] = []
    for row_html in re.findall(r"<tr[^>]*>(.*?)</tr>", table_html, re.S | re.I):
        cells = re.findall(r"<t[hd][^>]*>(.*?)</t[hd]>", row_html, re.S | re.I)
        if not cells:
            continue
        cleaned: list[str] = []
        for cell in cells:
            cell = re.sub(r"<code[^>]*>", "`", cell, flags=re.I)
            cell = re.sub(r"</code>", "`", cell, flags=re.I)
            cell = re.sub(r"<[^>]+>", "", cell)
            cell = html.unescape(re.sub(r"\s+", " ", cell)).strip()
            cleaned.append(cell.replace("|", "\\|"))
        rows.append(cleaned)
    if not rows:
        return ""
    width = max(len(r) for r in rows)
    norm = [r + [""] * (width - len(r)) for r in rows]
    lines = [
        "| " + " | ".join(norm[0]) + " |",
        "| " + " | ".join("---" for _ in norm[0]) + " |",
    ]
    for row in norm[1:]:
        lines.append("| " + " | ".join(row) + " |")
    return "\n".join(lines)


def html_content_to_markdown(content_html: str) -> str:
    work = content_html

    def repl_pre(match: re.Match[str]) -> str:
        lang = "text"
        cls = match.group(1) or ""
        lang_m = re.search(r"language-([\w-]+)", cls)
        if lang_m:
            lang = lang_m.group(1)
        code = html.unescape(re.sub(r"<[^>]+>", "", match.group(2))).strip()
        if not code:
            return ""
        return f"\n\n```{lang}\n{code}\n```\n\n"

    work = re.sub(
        r'<pre[^>]*><code(?:\s+class="([^"]*)")?[^>]*>(.*?)</code></pre>',
        repl_pre,
        work,
        flags=re.S | re.I,
    )

    def repl_table(match: re.Match[str]) -> str:
        md = table_to_markdown(match.group(1))
        return f"\n\n{md}\n\n" if md else ""

    work = re.sub(r"<table[^>]*>(.*?)</table>", repl_table, work, flags=re.S | re.I)

    child_links = re.findall(
        r'<a[^>]+href="(/documentation/[^"]+)"[^>]*title="([^"]*)"[^>]*>',
        work,
    )
    link_md = ""
    if child_links:
        unique: list[tuple[str, str]] = []
        seen: set[str] = set()
        for href, title in child_links:
            if href in seen:
                continue
            seen.add(href)
            unique.append((title.strip(), href))
        if unique:
            link_md = "\n\n## Related\n\n" + "\n".join(
                f"- [{t}]({BASE_URL}{h})" for t, h in unique
            )

    body = strip_tags(work)
    if link_md and link_md not in body:
        body = f"{body}{link_md}".strip()
    return body


def strip_tags(text: str) -> str:
    text = re.sub(r"<br\s*/?>", "\n", text, flags=re.I)
    text = re.sub(r"</p>", "\n\n", text, flags=re.I)
    text = re.sub(r"</li>", "\n", text, flags=re.I)
    text = re.sub(r"<li[^>]*>", "- ", text, flags=re.I)
    text = re.sub(r"</h([1-6])>", r"\n\n", text, flags=re.I)
    text = re.sub(r"<h([1-6])[^>]*>", r"\n\n## ", text, flags=re.I)
    text = re.sub(r"<code[^>]*>", "`", text, flags=re.I)
    text = re.sub(r"</code>", "`", text, flags=re.I)
    text = re.sub(r"<em>", "*", text, flags=re.I)
    text = re.sub(r"</em>", "*", text, flags=re.I)
    text = re.sub(r"<strong>", "**", text, flags=re.I)
    text = re.sub(r"</strong>", "**", text, flags=re.I)
    text = re.sub(r"<[^>]+>", "", text)
    text = html.unescape(text)
    text = re.sub(r"Edit Page\s*-->", "", text)
    text = re.sub(r"\n##\s*\n+(?=##|\n[A-Za-z`])", "\n", text)
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.strip()


def extract_page(html_doc: str, meta: PageMeta) -> PageMeta:
    # Title from <title>
    m = re.search(r"<title>([^<]+)</title>", html_doc, re.I)
    if m:
        meta.title = m.group(1).split("|")[0].strip()

    content_html = extract_content_html(html_doc)

    # Breadcrumb
    bc = re.findall(
        r'<a title="([^"]*)" href="/documentation/[^"]*">([^<]*)</a>',
        content_html,
    )
    meta.breadcrumb = [html.unescape(t or l).strip() for t, l in bc[:6] if (t or l).strip()]

    # H1
    h1 = re.search(r"<h1[^>]*>\s*<a[^>]*title=\"([^\"]*)\"", content_html)
    if h1:
        meta.title = html.unescape(h1.group(1)).strip()

    since = re.search(r'docs-breadcrumb-version[^>]*>([^<]+)<', content_html)
    if since:
        meta.since = html.unescape(since.group(1)).strip()

    body_md = html_content_to_markdown(content_html)

    # Interactive demo code from preview panel
    code_section = re.search(r'<section class="code-preview"(.*?)</section>', html_doc, re.S)
    codes: list[dict[str, str]] = []
    seen_code: set[str] = set()
    if code_section:
        for pre in re.finditer(
            r'<pre[^>]*data-language="([^"]*)"[^>]*><code[^>]*>(.*?)</code></pre>',
            code_section.group(1),
            re.S,
        ):
            lang = pre.group(1)
            code = html.unescape(re.sub(r"<[^>]+>", "", pre.group(2))).strip()
            if code and code not in seen_code:
                codes.append({"lang": lang, "code": code})
                seen_code.add(code)
    meta.code_blocks = codes

    # Prev / next
    prev = re.search(
        r'class="prev-link"[^>]*>.*?title="([^"]*)" href="([^"]*)"',
        html_doc,
        re.S,
    )
    nxt = re.search(
        r'class="next-link"[^>]*>.*?title="([^"]*)" href="([^"]*)"',
        html_doc,
        re.S,
    )
    if prev:
        meta.prev = {"title": prev.group(1), "slug": url_to_slug(prev.group(2))}
    if nxt:
        meta.next = {"title": nxt.group(1), "slug": url_to_slug(nxt.group(2))}

    meta._body_md = body_md  # type: ignore[attr-defined]
    return meta


def render_markdown(meta: PageMeta) -> str:
    body: str = getattr(meta, "_body_md", "")
    fm: dict[str, Any] = {
        "order": meta.order,
        "section": meta.section,
        "path": meta.path,
        "slug": f"{meta.section}/{meta.path}" if meta.path != "(index)" else meta.section,
        "url": meta.url,
        "title": meta.title,
        "breadcrumb": meta.breadcrumb,
        "since": meta.since or None,
        "prev": meta.prev,
        "next": meta.next,
        "code_languages": [b["lang"] for b in meta.code_blocks],
    }
    # Remove null keys for cleaner yaml
    fm = {k: v for k, v in fm.items() if v not in (None, "", [])}

    lines = ["---", json.dumps(fm, ensure_ascii=False, indent=2), "---", ""]
    lines.append(f"# {meta.title or meta.path}")
    lines.append("")
    lines.append(f"> Source: [{meta.url}]({meta.url})")
    if meta.breadcrumb:
        lines.append(f"> Breadcrumb: {' → '.join(meta.breadcrumb)}")
    lines.append("")
    if body:
        lines.append(body)
        lines.append("")

    for block in meta.code_blocks:
        lines.append(f"## Code example ({block['lang']})")
        lines.append("")
        lines.append(f"```{block['lang']}")
        lines.append(block["code"])
        lines.append("```")
        lines.append("")

    nav: list[str] = []
    if meta.prev:
        nav.append(f"← Prev: **{meta.prev['title']}** (`{meta.prev['slug']}`)")
    if meta.next:
        nav.append(f"Next: **{meta.next['title']}** (`{meta.next['slug']}`) →")
    if nav:
        lines.append("---")
        lines.append("")
        lines.append(" | ".join(nav))
        lines.append("")

    return "\n".join(lines)


def manifest_entry(meta: PageMeta, rel_file: str) -> dict[str, Any]:
    return {
        "order": meta.order,
        "section": meta.section,
        "path": meta.path,
        "slug": slug_from(meta.section, meta.path),
        "file": rel_file,
        "url": meta.url,
        "title": meta.title,
        "breadcrumb": meta.breadcrumb,
        "prev": meta.prev,
        "next": meta.next,
    }


def crawl_one(order: int, section: str, path: str, url: str) -> tuple[dict[str, Any] | None, str | None]:
    out_file = path_to_file(section, path)
    out_file.parent.mkdir(parents=True, exist_ok=True)
    rel_file = str(out_file.relative_to(OUT))
    meta = PageMeta(order=order, section=section, path=path, url=url, file=rel_file)
    html_doc = fetch(url)
    meta = extract_page(html_doc, meta)
    out_file.write_text(render_markdown(meta), encoding="utf-8")
    return manifest_entry(meta, rel_file), None


def rebuild_manifest(rows: list[tuple[int, str, str, str]]) -> tuple[list[dict[str, Any]], list[str]]:
    manifest: list[dict[str, Any]] = []
    missing: list[str] = []
    for order, section, path, url in rows:
        out_file = path_to_file(section, path)
        rel_file = str(out_file.relative_to(OUT))
        if not out_file.exists():
            missing.append(url)
            continue
        fm = parse_frontmatter(out_file)
        manifest.append(
            {
                "order": fm.get("order", order),
                "section": fm.get("section", section),
                "path": fm.get("path", path),
                "slug": fm.get("slug", slug_from(section, path)),
                "file": rel_file,
                "url": fm.get("url", url),
                "title": fm.get("title", ""),
                "breadcrumb": fm.get("breadcrumb", []),
                "prev": fm.get("prev"),
                "next": fm.get("next"),
            }
        )
    return manifest, missing


def write_indexes(manifest: list[dict[str, Any]], total: int, errors: list[str]) -> None:
    (OUT / "manifest.json").write_text(
        json.dumps(
            {
                "version": 1,
                "source": "https://animejs.com/documentation",
                "crawled_at": time.strftime("%Y-%m-%d"),
                "total": len(manifest),
                "expected": total,
                "pages": manifest,
            },
            ensure_ascii=False,
            indent=2,
        ),
        encoding="utf-8",
    )

    sections: dict[str, list[str]] = {}
    for item in manifest:
        sections.setdefault(item["section"], []).append(item["file"])
    (OUT / "sections-index.json").write_text(
        json.dumps(sections, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )

    readme = f"""# Anime.js — offline documentation mirror

> **{len(manifest)}** / {total} pages · crawled {time.strftime("%Y-%m-%d")}  
> Source: https://animejs.com/documentation

## Structure (for scroll / reader)

| File | Purpose |
| ---- | ------- |
| [`manifest.json`](./manifest.json) | Flat ordered list — **use for global scroll** |
| [`sections-index.json`](./sections-index.json) | Files grouped by module |
| [`AUDIT.json`](./AUDIT.json) | Last verification report (`npm run docs:animejs:verify`) |
| [`pages/<section>/`](./pages/) | One `.md` per doc URL |

Each page has JSON frontmatter: `order`, `section`, `slug`, `url`, `prev`, `next`, `breadcrumb`.

## Scroll integration (future)

```typescript
import manifest from './manifest.json';

// Global vertical scroll through docs
const pages = manifest.pages.sort((a, b) => a.order - b.order);

// Or follow prev/next chain from current slug
function walkNext(slug: string) {{
  const page = manifest.pages.find(p => p.slug === slug);
  return page?.next ?? null;
}}
```

## Regenerate

```bash
npm run docs:animejs:mirror          # full crawl
npm run docs:animejs:mirror:force    # re-fetch all (after parser fix)
npm run docs:animejs:mirror:retry    # only missing files
npm run docs:animejs:verify          # audit → offline/AUDIT.json
```

Errors: {len(errors)}
"""
    if errors:
        readme += "\n### Crawl errors\n\n" + "\n".join(f"- {e}" for e in errors)
    (OUT / "README.md").write_text(readme, encoding="utf-8")


def run_crawl(retry_missing: bool = False, force: bool = False) -> None:
    rows = parse_sitemap()
    PAGES.mkdir(parents=True, exist_ok=True)
    errors: list[str] = []
    total = len(rows)
    fetched = 0

    for i, (order, section, path, url) in enumerate(rows, 1):
        out_file = path_to_file(section, path)
        if retry_missing and not force and out_file.exists():
            continue
        try:
            print(f"[{i}/{total}] {url}")
            crawl_one(order, section, path, url)
            fetched += 1
        except Exception as err:  # noqa: BLE001
            errors.append(f"{url}: {err}")
            print(f"  ERROR: {err}")
        time.sleep(DELAY_S)

    manifest, missing = rebuild_manifest(rows)
    errors.extend(missing)
    write_indexes(manifest, total, errors)

    if force:
        mode = "force"
    elif retry_missing:
        mode = "retry"
    else:
        mode = "full"
    print(f"\nDone ({mode}): {len(manifest)}/{total} pages on disk, fetched {fetched}, errors {len(errors)}")


def main() -> None:
    parser = argparse.ArgumentParser(description="Mirror animejs.com documentation offline")
    parser.add_argument(
        "--retry-missing",
        action="store_true",
        help="Fetch only pages missing from offline/pages/, then rebuild manifest",
    )
    parser.add_argument(
        "--force",
        action="store_true",
        help="Re-fetch all sitemap pages (fixes content after parser updates)",
    )
    args = parser.parse_args()
    run_crawl(retry_missing=args.retry_missing, force=args.force)


if __name__ == "__main__":
    main()
