#!/usr/bin/env python3
"""
Downloads curated British countryside, Dorset coast, and documentary wedding images from Unsplash
for the Robin Goodlad Photography layout on branch sample2.
Converts all images to optimized WebP format with ffmpeg.
"""

import os
import subprocess
import urllib.request

DEST_DIR = "/root/wedding-portfolio/assets/images/dorset"
os.makedirs(DEST_DIR, exist_ok=True)

IMAGE_MAP = {
    # Hero & Introduction
    "hero_dorset.jpg": "photo-1519741497674-611481863552",
    "robin_portrait.jpg": "photo-1507003211169-0a1dd7228f2d",

    # The 3 Pillars (Authentic Moments, Two of You, Sense of Place)
    "pillar_authentic.jpg": "photo-1583939003579-730e3918a45a",
    "pillar_two_of_you.jpg": "photo-1465495976277-4387d4b0b4c6",
    "pillar_sense_of_place.jpg": "photo-1529636798458-92182e662485",

    # The Art of Observation Gallery (6 images)
    "obs_01_laughter.jpg": "photo-1583939003579-730e3918a45a",
    "obs_02_light.jpg": "photo-1511285560929-80b456fea0bc",
    "obs_03_landscape.jpg": "photo-1529636798458-92182e662485",
    "obs_04_intimacy.jpg": "photo-1522673607200-164d1b6ce486",
    "obs_05_dance.jpg": "photo-1545232979-8bf68ee9b1af",
    "obs_06_details.jpg": "photo-1515934751635-c81c6bc9a2d8",

    # Featured Weddings (6 Dorset Venues)
    "feat_lulworth_castle.jpg": "photo-1591604466107-ec97de577aff",
    "feat_sopley_mill.jpg": "photo-1537633552985-df8429e8048b",
    "feat_salcombe_coast.jpg": "photo-1529636798458-92182e662485",
    "feat_axnoller_cheddington.jpg": "photo-1465495976277-4387d4b0b4c6",
    "feat_larmer_tree.jpg": "photo-1522673607200-164d1b6ce486",
    "feat_st_giles_house.jpg": "photo-1520854221256-17451cc331bf",

    # Albums & Presentation
    "album_presentation.jpg": "photo-1532712938310-34cb3982ef74",
    "film_35mm.jpg": "photo-1469371670807-013ccf25f16a"
}

def download_and_convert():
    headers = {"User-Agent": "Mozilla/5.0"}
    for filename, photo_id in IMAGE_MAP.items():
        out_jpg = os.path.join(DEST_DIR, filename)
        base, _ = os.path.splitext(filename)
        out_webp = os.path.join(DEST_DIR, f"{base}.webp")

        if not os.path.exists(out_jpg):
            url = f"https://images.unsplash.com/{photo_id}?w=1400&auto=format&fit=crop&q=82"
            print(f"Downloading {filename}...")
            try:
                req = urllib.request.Request(url, headers=headers)
                with urllib.request.urlopen(req, timeout=10) as resp, open(out_jpg, "wb") as f:
                    f.write(resp.read())
            except Exception as e:
                print(f"Failed to download {filename}: {e}")
                continue

        if os.path.exists(out_jpg) and not os.path.exists(out_webp):
            cmd = ["ffmpeg", "-i", out_jpg, "-c:v", "libwebp", "-quality", "85", out_webp, "-y", "-loglevel", "error"]
            subprocess.run(cmd)
            print(f"  ✓ Converted to {base}.webp")

    print("\n🎉 All Dorset wedding placeholder assets ready!")

if __name__ == "__main__":
    download_and_convert()
