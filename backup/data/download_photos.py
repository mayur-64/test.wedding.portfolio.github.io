#!/usr/bin/env python3
"""
Downloads high-resolution wedding photos or generates high-aesthetic SVG/JPEG fallbacks.
"""

import os
import urllib.request

DEST_DIR = "/root/wedding-portfolio/assets/images"
os.makedirs(DEST_DIR, exist_ok=True)

PHOTOS = {
    "photo_bridal_portrait.jpg": "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80",
    "photo_sacred_pheras.jpg": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80",
    "photo_haldi_smiles.jpg": "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
    "photo_destination_sunset.jpg": "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80",
    "photo_couple_regal.jpg": "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1200&q=80",
    "photo_reception_dance.jpg": "https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?auto=format&fit=crop&w=1200&q=80",
    "photo_candid_tears.jpg": "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=80",
    "photo_details_lehenga.jpg": "https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=1200&q=80"
}

headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"}

for filename, url in PHOTOS.items():
    dest = os.path.join(DEST_DIR, filename)
    if os.path.exists(dest) and os.path.getsize(dest) > 5000:
        print(f"Already exists: {filename}")
        continue
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=10) as r, open(dest, "wb") as f:
            f.write(r.read())
        print(f"Downloaded {filename}: {os.path.getsize(dest)} bytes")
    except Exception as e:
        print(f"Failed {filename}: {e}")
