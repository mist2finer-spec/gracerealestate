#!/usr/bin/env python3
"""Refresh the licensed NJStreet town tables from live pages or owner HTML exports.

Install: python -m pip install -r scripts/requirements-njstreet.txt
Live:    python scripts/import-njstreet.py --fetch
Export:  python scripts/import-njstreet.py --pages-dir exported-html

For the export route, provide index.html plus <source-slug>.html for every town.
The script checks all 70 records before replacing the existing site data.
"""

import argparse
import json
import re
import sys
import time
from pathlib import Path
from urllib.parse import urljoin, urlparse
from urllib.request import Request, urlopen

from lxml import html

BASE = "https://www.njstreet.com"
INDEX = BASE + "/towns-and-schools/"
ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "src/data/bergen-towns.json"
MAP_URL = BASE + "/wp-content/uploads/2023/01/njbergen.png"


def clean(value):
    return re.sub(r"\s+", " ", value or "").strip().strip('"').strip()


def text(element):
    return clean(" ".join(element.itertext()))


def safe_url(href):
    if not href:
        return None
    url = urljoin(BASE, href.strip())
    parsed = urlparse(url)
    return url if parsed.scheme in ("http", "https") else None


def get(url):
    req = Request(url, headers={"User-Agent": "GraceRealEstate licensed data importer (contact site owner)"})
    with urlopen(req, timeout=30) as response:
        return response.read()


def index_links(document):
    links = []
    for a in document.xpath('//h5/a[contains(@href,"#townlink")]'):
        url = safe_url(a.get("href"))
        if not url or urlparse(url).netloc != "www.njstreet.com":
            continue
        slug = urlparse(url).path.strip("/")
        if slug and slug not in [item[0] for item in links]:
            links.append((slug, text(a), BASE + "/" + slug + "/"))
    if len(links) != 70:
        raise ValueError(f"Expected 70 town links; found {len(links)}. Check index export/access.")
    return links


def parse_town(page, slug, name, url):
    document = html.fromstring(page)
    table = document.xpath('//table[contains(concat(" ",normalize-space(@class)," ")," table-town ")]')
    school_table = document.xpath('//table[contains(concat(" ",normalize-space(@class)," ")," table-school ")]')
    if not table or not school_table:
        raise ValueError(f"{slug}: missing source town/school tables (possibly a protection page)")

    overview = []
    for row in table[0].xpath(".//tr"):
        cells = row.xpath("./td")
        for index in range(0, len(cells) - 1, 2):
            label, value = text(cells[index]), text(cells[index + 1])
            if label and value:
                anchors = cells[index + 1].xpath(".//a[@href]")
                overview.append({"label": label, "value": value,
                                 "url": safe_url(anchors[0].get("href")) if anchors else None})
    columns = [text(cell) for cell in school_table[0].xpath(".//thead/tr[1]/th")]
    schools = [[text(cell) for cell in row.xpath("./td")]
               for row in school_table[0].xpath(".//tbody/tr")]
    schools = [row for row in schools if any(row)]
    if len(overview) < 10 or len(columns) != 8 or not schools:
        raise ValueError(f"{slug}: unexpected table shape ({len(overview)} fields, {len(columns)} columns)")
    for row in schools:
        if len(row) != 8:
            raise ValueError(f"{slug}: school row has {len(row)} columns")

    sections = []
    for heading in document.xpath("//h2"):
        title = text(heading)
        if not re.search(r"Bus Route|Zoning Map|CCO Application", title, re.I):
            continue
        parents = heading.xpath('ancestor::section[contains(concat(" ",normalize-space(@class)," ")," elementor-section ")][1]')
        if not parents:
            continue
        links = []
        for a in parents[0].xpath('.//a[@href]'):
            href = safe_url(a.get("href"))
            if href:
                links.append({"label": text(a) or title, "url": href})
        sections.append({"title": title, "links": links})

    notes = [text(item) for item in document.xpath("//li")
             if re.search(r"information is based on|information deemed reliable|grade shift|students attend", text(item), re.I)]
    return {"slug": slug, "name": name, "sourceUrl": url, "overview": overview,
            "schoolColumns": columns, "schools": schools, "sections": sections, "notes": notes}


def download_assets(records):
    destination = ROOT / "public/maps/bergen-county.png"
    data = get(MAP_URL)
    if not data.startswith(b"\x89PNG\r\n\x1a\n"):
        raise ValueError("Map response is not PNG data")
    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.write_bytes(data)
    print(f"Saved {destination}")

    for town in records:
        for section in town["sections"]:
            if not re.search(r"Zoning Map|CCO Application", section["title"], re.I):
                continue
            for link in section["links"]:
                url = link["url"]
                parsed = urlparse(url)
                suffix = Path(parsed.path).suffix.lower()
                if parsed.netloc != "www.njstreet.com" or suffix not in (".pdf", ".jpg", ".jpeg", ".png"):
                    continue
                filename = Path(parsed.path).name
                target = ROOT / "public/documents" / town["slug"] / filename
                asset = get(url)
                signatures = {".pdf": b"%PDF-", ".jpg": b"\xff\xd8", ".jpeg": b"\xff\xd8", ".png": b"\x89PNG\r\n\x1a\n"}
                if not asset.startswith(signatures[suffix]):
                    raise ValueError(f"{url}: response is not a {suffix} file")
                target.parent.mkdir(parents=True, exist_ok=True)
                target.write_bytes(asset)
                link["url"] = f"/documents/{town['slug']}/{filename}"
                time.sleep(0.4)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    inputs = parser.add_mutually_exclusive_group(required=True)
    inputs.add_argument("--fetch", action="store_true", help="Read public NJStreet pages")
    inputs.add_argument("--pages-dir", type=Path, help="Read owner-provided index.html and <slug>.html")
    parser.add_argument("--download-assets", action="store_true", help="Copy first-party map and PDF documents locally")
    parser.add_argument("--output", type=Path, default=OUTPUT)
    args = parser.parse_args()

    def read(filename, url):
        return get(url) if args.fetch else (args.pages_dir / filename).read_bytes()

    entries = index_links(html.fromstring(read("index.html", INDEX)))
    records = []
    for index, (slug, name, url) in enumerate(entries, 1):
        records.append(parse_town(read(slug + ".html", url), slug, name, url))
        print(f"[{index}/70] {name}: {len(records[-1]['schools'])} schools")
        if args.fetch:
            time.sleep(0.8)
    if args.download_assets:
        download_assets(records)

    args.output.parent.mkdir(parents=True, exist_ok=True)
    temporary = args.output.with_suffix(".tmp")
    temporary.write_text(json.dumps(records, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    temporary.replace(args.output)
    print(f"Updated {args.output} with {len(records)} town records")


if __name__ == "__main__":
    try:
        main()
    except (OSError, ValueError) as error:
        sys.exit(f"Import stopped without replacing town data: {error}")
