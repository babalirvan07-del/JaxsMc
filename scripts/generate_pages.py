#!/usr/bin/env python3
from pathlib import Path
import json

root = Path(__file__).resolve().parents[1]

# Each HTML file becomes a tab named after its filename, without .html.
html_dir = root / "html"
pages = []
for file in sorted(html_dir.rglob("*.html")):
    if file.name.lower() == "index.html":
        continue
    pages.append({
        "title": file.stem,
        "path": file.relative_to(root).as_posix()
    })
(html_dir / "pages.json").write_text(
    json.dumps(pages, ensure_ascii=False, indent=2) + "\n",
    encoding="utf-8"
)

# Images placed in img/anilar are automatically included in the photo page.
photo_dir = root / "img" / "anilar"
extensions = {".png", ".jpg", ".jpeg", ".gif", ".webp", ".avif"}
photos = sorted(
    file.name for file in photo_dir.iterdir()
    if file.is_file() and file.suffix.lower() in extensions
)
(photo_dir / "photos.json").write_text(
    json.dumps(photos, ensure_ascii=False, indent=2) + "\n",
    encoding="utf-8"
)
print(f"{len(pages)} HTML sekmesi ve {len(photos)} fotoğraf listelendi.")
