#!/usr/bin/env python3
"""
Downloads high-resolution editorial foreign wedding photography from Unsplash,
copies the generated Lake Como hero image, and generates optimized WebP variants using ffmpeg.
"""

import os
import shutil
import subprocess
import urllib.request

DEST_DIR = "/root/wedding-portfolio/assets/images"
os.makedirs(DEST_DIR, exist_ok=True)

# 1. Copy our AI-generated Lake Como masterpiece as hero
generated_hero = "/root/.gemini/antigravity-ide/brain/02d0835a-61d1-4c4e-94e0-d0ed1d9a8381/test_editorial_wedding_1791662120259.jpg"
hero_dest = os.path.join(DEST_DIR, "hero_foreign.jpg")
if os.path.exists(generated_hero):
    shutil.copyfile(generated_hero, hero_dest)
    print("✓ Copied AI Lake Como masterpiece to hero_foreign.jpg")

# 2. Curated Unsplash Editorial Wedding Photo IDs
IMAGE_MAP = {
    # 16 Wedding Film Stills
    "film_01_paris.jpg": "photo-1591604466107-ec97de577aff",
    "film_02_como.jpg": "photo-1519741497674-611481863552",
    "film_03_cotswolds.jpg": "photo-1465495976277-4387d4b0b4c6",
    "film_04_amalfi.jpg": "photo-1529636798458-92182e662485",
    "film_05_tribeca.jpg": "photo-1519225429180-ca5a10d87b16",
    "film_06_provence.jpg": "photo-1583939003579-730e3918a45a",
    "film_07_fjord.jpg": "photo-1606800052052-a08af7148866",
    "film_08_plaza.jpg": "photo-1545232979-8bf68ee9b1af",
    "film_09_tuscany.jpg": "photo-1537633552985-df8429e8048b",
    "film_10_bigsur.jpg": "photo-1510076857177-7470076d4498",
    "film_11_mallorca.jpg": "photo-1522673607200-164d1b6ce486",
    "film_12_alps.jpg": "photo-1507676184212-d03ab07a01bf",
    "film_13_santorini.jpg": "photo-1544077960-604201fe74bc",
    "film_14_loire.jpg": "photo-1511285560929-80b456fea0bc",
    "film_15_vienna.jpg": "photo-1520854221256-17451cc331bf",
    "film_16_amangiri.jpg": "photo-1532712938310-34cb3982ef74",

    # 8 Photo Moments for Mosaic
    "photo_moment_1_veil.jpg": "photo-1511285560929-80b456fea0bc",
    "photo_moment_2_vows.jpg": "photo-1606800052052-a08af7148866",
    "photo_moment_3_toast.jpg": "photo-1519225429180-ca5a10d87b16",
    "photo_moment_4_sunset.jpg": "photo-1529636798458-92182e662485",
    "photo_moment_5_silhouette.jpg": "photo-1520854221256-17451cc331bf",
    "photo_moment_6_dance.jpg": "photo-1545232979-8bf68ee9b1af",
    "photo_moment_7_laughter.jpg": "photo-1583939003579-730e3918a45a",
    "photo_moment_8_details.jpg": "photo-1515934751635-c81c6bc9a2d8",

    # 5 Style Cards
    "style_timeless.jpg": "photo-1519741497674-611481863552",
    "style_editorial.jpg": "photo-1469371670807-013ccf25f16a",
    "style_candid.jpg": "photo-1583939003579-730e3918a45a",
    "style_cinematic.jpg": "photo-1545232979-8bf68ee9b1af",
    "style_destination.jpg": "photo-1529636798458-92182e662485",

    # 5 Social Proof Avatars
    "avatar_foreign_1.jpg": "photo-1534528741775-53994a69daeb",
    "avatar_foreign_2.jpg": "photo-1507003211169-0a1dd7228f2d",
    "avatar_foreign_3.jpg": "photo-1494790108377-be9c29b29330",
    "avatar_foreign_4.jpg": "photo-1500648767791-00dcc994a43e",
    "avatar_foreign_5.jpg": "photo-1438761681033-6461ffad8d80"
}

def download_and_convert():
    headers = {"User-Agent": "Mozilla/5.0"}
    for filename, photo_id in IMAGE_MAP.items():
        out_jpg = os.path.join(DEST_DIR, filename)
        base, _ = os.path.splitext(filename)
        out_webp = os.path.join(DEST_DIR, f"{base}.webp")

        if not os.path.exists(out_jpg):
            url = f"https://images.unsplash.com/{photo_id}?w=1200&auto=format&fit=crop&q=82"
            print(f"Downloading {filename} from {photo_id}...")
            try:
                req = urllib.request.Request(url, headers=headers)
                with urllib.request.urlopen(req, timeout=10) as resp, open(out_jpg, "wb") as f:
                    f.write(resp.read())
            except Exception as e:
                print(f"Failed to download {filename}: {e}")
                continue

        # Convert to WebP using ffmpeg
        if os.path.exists(out_jpg) and not os.path.exists(out_webp):
            cmd = ["ffmpeg", "-i", out_jpg, "-c:v", "libwebp", "-quality", "85", out_webp, "-y", "-loglevel", "error"]
            subprocess.run(cmd)
            print(f"  ✓ Converted to {base}.webp")

    # Also convert hero_foreign.jpg if needed
    hero_webp = os.path.join(DEST_DIR, "hero_foreign.webp")
    if os.path.exists(hero_dest) and not os.path.exists(hero_webp):
        cmd = ["ffmpeg", "-i", hero_dest, "-c:v", "libwebp", "-quality", "85", hero_webp, "-y", "-loglevel", "error"]
        subprocess.run(cmd)
        print("  ✓ Converted hero_foreign.webp")

    print("\n🎉 All foreign editorial wedding images successfully downloaded & converted!")

if __name__ == "__main__":
    download_and_convert()
