#!/usr/bin/env python3
"""
Convert all JPG images in assets/images/ to optimized WebP formats using ffmpeg.
"""

import os
import subprocess

IMG_DIR = "/root/wedding-portfolio/assets/images"

def convert_all():
    files = [f for f in os.listdir(IMG_DIR) if f.lower().endswith(('.jpg', '.jpeg', '.png'))]
    print(f"Found {len(files)} images to verify/convert...")
    for f in files:
        base, ext = os.path.splitext(f)
        webp_name = f"{base}.webp"
        webp_path = os.path.join(IMG_DIR, webp_name)
        orig_path = os.path.join(IMG_DIR, f)
        if not os.path.exists(webp_path):
            cmd = ["ffmpeg", "-i", orig_path, "-c:v", "libwebp", "-quality", "85", webp_path, "-y", "-loglevel", "error"]
            res = subprocess.run(cmd)
            if res.returncode == 0:
                print(f"✓ Converted {f} -> {webp_name}")
            else:
                print(f"✗ Failed {f}")
        else:
            print(f"- Already exists: {webp_name}")

if __name__ == "__main__":
    convert_all()
