#!/usr/bin/env python3
"""Serveur local docs/ — cache désactivé ; scans dans docs/rct-img/."""
from http.server import HTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
import os
import sys

DEFAULT_PORT = 8080
PORT = int(sys.argv[1]) if len(sys.argv) > 1 else DEFAULT_PORT
DOCS_ROOT = Path(__file__).resolve().parent
RCT_IMG_DIR = DOCS_ROOT / "rct-img"


class NoCacheHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()


class ExclusiveHTTPServer(HTTPServer):
    allow_reuse_address = False


def count_scans():
    if not RCT_IMG_DIR.is_dir():
        return 0
    return sum(
        1
        for p in RCT_IMG_DIR.iterdir()
        if p.is_file() and p.suffix.lower() in {".jpg", ".jpeg", ".png", ".webp"}
    )


if __name__ == "__main__":
    os.chdir(DOCS_ROOT)
    n = count_scans()
    if n == 0:
        print(f"ERREUR : aucun scan dans {RCT_IMG_DIR}", file=sys.stderr)
        sys.exit(1)

    try:
        server = ExclusiveHTTPServer(("", PORT), NoCacheHandler)
    except OSError:
        print(f"ERREUR : le port {PORT} est déjà utilisé.", file=sys.stderr)
        print("Fermez l'autre serveur (Ctrl+C dans son terminal), ou :", file=sys.stderr)
        print(f"  python serve.py {PORT + 1}", file=sys.stderr)
        sys.exit(1)

    url = f"http://localhost:{PORT}/"
    test_img = f"http://localhost:{PORT}/rct-img/001.jpg"
    print(f"RCT — {url}")
    print(f"      {n} scans — test image : {test_img}")
    print("      Ctrl+C pour arrêter")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nArrêt.")
        server.server_close()
