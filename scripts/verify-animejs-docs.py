#!/usr/bin/env python3
"""Verify offline animejs documentation mirror completeness."""

from __future__ import annotations

import json
import re
import sys
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SITEMAP = ROOT / "memory-bank/reference/animejs/SITEMAP.md"
OFFLINE = ROOT / "memory-bank/reference/animejs/offline"
PAGES = OFFLINE / "pages"
AUDIT = OFFLINE / "AUDIT.json"
BASE_URL = "https://animejs.com"
MIN_BODY_CHARS = 80
SAMPLE_COMPARE = 12


def parse_sitemap() -> list[tuple[int, str, str, str]]:
    rows: list[tuple[int, str, str, str]] = []
    for line in SITEMAP.read_text(encoding="utf-8").splitlines():
        if not line.startswith("|") or line.startswith("| #") or line.startswith("| -"):
            continue
        parts = [p.strip() for p in line.strip("|").split("|")]
        if len(parts) == 4 and parts[0].isdigit():
            rows.append((int(parts[0]), parts[1], parts[2], parts[3]))
    return rows


def path_to_file(section: str, path: str) -> Path:
    if path == "(index)":
        return PAGES / section / "index.md"
    return PAGES / section / f"{path}.md"


def body_text(md: str) -> str:
    if not md.startswith("---"):
        return md
    end = md.find("\n---", 3)
    body = md[end + 4 :].strip() if end != -1 else md
    main = body.split("\n---\n")[0]
    main = re.sub(r"^# .+\n", "", main, count=1)
    main = re.sub(r"> Source:.*\n", "", main)
    main = re.sub(r"> Breadcrumb:.*\n", "", main)
    main = re.sub(r"## Code example.*", "", main, flags=re.S)
    main = re.sub(r"← Prev:.*", "", main, flags=re.S)
    return main.strip()


def live_content_len(url: str) -> int:
    req = urllib.request.Request(url, headers={"User-Agent": "TrainingApp-DocsMirror/1.0"})
    with urllib.request.urlopen(req, timeout=45) as resp:
        html_doc = resp.read().decode("utf-8", errors="replace")

    # Import parser from crawler
    import importlib.util

    spec = importlib.util.spec_from_file_location("crawl", ROOT / "scripts/crawl-animejs-docs.py")
    if spec is None or spec.loader is None:
        return 0
    crawl = importlib.util.module_from_spec(spec)
    sys.modules["crawl"] = crawl
    spec.loader.exec_module(crawl)
    content = crawl.extract_content_html(html_doc)
    return len(crawl.html_content_to_markdown(content))


def main() -> int:
    rows = parse_sitemap()
    manifest_path = OFFLINE / "manifest.json"
    if not manifest_path.exists():
        print("FAIL: manifest.json missing")
        return 1

    manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
    issues: list[dict[str, object]] = []
    short: list[dict[str, object]] = []

    for order, section, path, url in rows:
        f = path_to_file(section, path)
        if not f.exists():
            issues.append({"type": "missing_file", "order": order, "url": url})
            continue
        text = f.read_text(encoding="utf-8")
        if not text.startswith("---"):
            issues.append({"type": "no_frontmatter", "order": order, "url": url})
            continue
        end = text.find("\n---", 3)
        fm = json.loads(text[3:end])
        blen = len(body_text(text))
        if blen < MIN_BODY_CHARS:
            short.append({"order": order, "url": url, "body_chars": blen, "title": fm.get("title", "")})

    # Sample live comparison (every 34th page ≈ 12 samples)
    compare: list[dict[str, object]] = []
    step = max(len(rows) // SAMPLE_COMPARE, 1)
    sample_rows = rows[::step][:SAMPLE_COMPARE]
    for order, section, path, url in sample_rows:
        f = path_to_file(section, path)
        local_len = len(body_text(f.read_text(encoding="utf-8")))
        try:
            remote_len = live_content_len(url)
            ratio = local_len / remote_len if remote_len else 0
            compare.append(
                {
                    "order": order,
                    "url": url,
                    "local_chars": local_len,
                    "remote_chars": remote_len,
                    "ratio": round(ratio, 3),
                }
            )
            if remote_len >= MIN_BODY_CHARS and ratio < 0.55:
                issues.append({"type": "content_ratio_low", "order": order, "url": url, "ratio": ratio})
        except Exception as err:  # noqa: BLE001
            compare.append({"order": order, "url": url, "error": str(err)})

    report = {
        "sitemap_total": len(rows),
        "files_on_disk": len(list(PAGES.rglob("*.md"))),
        "manifest_total": manifest.get("total"),
        "manifest_expected": manifest.get("expected"),
        "sections": len(json.loads((OFFLINE / "sections-index.json").read_text(encoding="utf-8"))),
        "short_body_pages": short,
        "live_sample_compare": compare,
        "issues": issues,
        "ok": len(rows) == 410
        and len(list(PAGES.rglob("*.md"))) == 410
        and manifest.get("total") == 410
        and not issues,
    }
    AUDIT.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")

    print(f"Sitemap: {report['sitemap_total']}")
    print(f"Files:   {report['files_on_disk']}")
    print(f"Manifest:{report['manifest_total']} / expected {report['manifest_expected']}")
    print(f"Short body (<{MIN_BODY_CHARS} chars): {len(short)}")
    print(f"Issues:  {len(issues)}")
    print(f"Audit:   {AUDIT.relative_to(ROOT)}")
    print(f"Status:  {'OK' if report['ok'] else 'FAIL'}")

    if short:
        print("\nShort pages:")
        for s in short[:10]:
            print(f"  [{s['order']}] {s['title']} ({s['body_chars']} chars)")

    return 0 if report["ok"] else 1


if __name__ == "__main__":
    raise SystemExit(main())
