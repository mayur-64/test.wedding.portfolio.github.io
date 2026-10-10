#!/usr/bin/env python3
"""
Zero-dependency Development Server for Wedding Portfolio Website.
Runs on Port 8085 (Safe port per AGENTS.md rules).
Serves static assets locally with no external pip dependencies.
"""

import http.server
import socketserver
import os
import sys

PORT = 8085
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class WeddingPortfolioHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        # Enable CORS and caching headers for development
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Cache-Control", "no-cache, must-revalidate")
        super().end_headers()

def run_server():
    socketserver.TCPServer.allow_reuse_address = True
    try:
        with socketserver.TCPServer(("0.0.0.0", PORT), WeddingPortfolioHandler) as httpd:
            print(f"✨ RSP Wedding Portfolio Dev Server running at: http://127.0.0.1:{PORT}/")
            print(f"📁 Serving directory: {DIRECTORY}")
            print("Press Ctrl+C to stop.")
            try:
                httpd.serve_forever()
            except KeyboardInterrupt:
                print("\nShutting down dev server.")
    except OSError as e:
        print(f"Error binding to port {PORT}: {e}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    run_server()
