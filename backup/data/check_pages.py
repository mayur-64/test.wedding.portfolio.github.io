#!/usr/bin/env python3
import subprocess
import json

res = subprocess.run(["gh", "api", "repos/mayur-64/test.wedding.portfolio/pages"], capture_output=True, text=True)
if res.returncode == 0:
    data = json.loads(res.stdout)
    print("GitHub Pages Status:", data.get("status"))
    print("GitHub Pages Live URL:", data.get("html_url"))
    print("Source branch:", data.get("source", {}).get("branch"))
else:
    print("GitHub Pages query error:", res.stderr.strip())
