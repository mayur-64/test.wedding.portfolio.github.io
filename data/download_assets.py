#!/usr/bin/env python3
"""
Download and verify media assets for Rohan Shinde Photography & Films portfolio.
Includes primary brand assets and wedding films thumbnails.
"""

import os
import urllib.request

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IMG_DIR = os.path.join(BASE_DIR, "assets", "images")
os.makedirs(IMG_DIR, exist_ok=True)

ASSETS = {
    "hero-rsp07477.jpg": "https://images-pw.pixieset.com/elementfield/195352401/RSP07477-69dd2ece.jpg",
    "logo.png": "https://images-pw.pixieset.com/profile/861801/434536100f1f45790de9bdbbec1230a093f68960247394b540ffc75f3bfcb468.png",
}

# YouTube video thumbnails from user's snippet
VIDEO_THUMBS = {
    "thumb_9yglQHb4C7k.jpg": "https://i.ytimg.com/vi/9yglQHb4C7k/hqdefault.jpg",
    "thumb_FEMnSpClYyo.jpg": "https://i.ytimg.com/vi/FEMnSpClYyo/hqdefault.jpg",
    "thumb_wY5E35YFkhA.jpg": "https://i.ytimg.com/vi/wY5E35YFkhA/hqdefault.jpg",
    "thumb_SuJPTNyEuV8.jpg": "https://i.ytimg.com/vi/SuJPTNyEuV8/hqdefault.jpg",
    "thumb_3RyZOMXqd4I.jpg": "https://i.ytimg.com/vi/3RyZOMXqd4I/hqdefault.jpg",
    "thumb_RaCQIlaLAcE.jpg": "https://i.ytimg.com/vi/RaCQIlaLAcE/hqdefault.jpg",
    "thumb_0vCHgO5dMoA.jpg": "https://i.ytimg.com/vi/0vCHgO5dMoA/hqdefault.jpg",
    "thumb_PqO5OgCC7Kw.jpg": "https://i.ytimg.com/vi/PqO5OgCC7Kw/hqdefault.jpg",
    "thumb_edqpmO6yEZs.jpg": "https://i.ytimg.com/vi/edqpmO6yEZs/hqdefault.jpg",
    "thumb_fM-v0w_xlCE.jpg": "https://i.ytimg.com/vi/fM-v0w_xlCE/hqdefault.jpg",
    "thumb_YyI1nxY_BK0.jpg": "https://i.ytimg.com/vi/YyI1nxY_BK0/hqdefault.jpg",
    "thumb_bmentBejIYc.jpg": "https://i.ytimg.com/vi/bmentBejIYc/hqdefault.jpg",
    "thumb_hpZlmNEtkOg.jpg": "https://i.ytimg.com/vi/hpZlmNEtkOg/hqdefault.jpg",
    "thumb_UquIrNp2bGE.jpg": "https://i.ytimg.com/vi/UquIrNp2bGE/hqdefault.jpg",
    "thumb_jb9MWfn5oMQ.jpg": "https://i.ytimg.com/vi/jb9MWfn5oMQ/hqdefault.jpg",
    "thumb_HBWSOZSQzLQ.jpg": "https://i.ytimg.com/vi/HBWSOZSQzLQ/hqdefault.jpg",
}

ALL_TARGETS = {**ASSETS, **VIDEO_THUMBS}

def download_all():
    print(f"Downloading {len(ALL_TARGETS)} assets into {IMG_DIR}...")
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    }
    success = 0
    for name, url in ALL_TARGETS.items():
        dest = os.path.join(IMG_DIR, name)
        if os.path.exists(dest) and os.path.getsize(dest) > 1000:
            print(f"  [Cached] {name} ({os.path.getsize(dest)} bytes)")
            success += 1
            continue
        try:
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req, timeout=12) as response:
                content = response.read()
                with open(dest, "wb") as f:
                    f.write(content)
            print(f"  ✓ {name}: {len(content)} bytes")
            success += 1
        except Exception as e:
            print(f"  ✗ Failed {name} from {url}: {e}")

    print(f"Download complete: {success}/{len(ALL_TARGETS)} assets ready.")

if __name__ == "__main__":
    download_all()
