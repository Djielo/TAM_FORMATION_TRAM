#!/usr/bin/env python3
"""Serveur local docs/ — désactive le cache HTTP ; sert aussi les scans RCT (source/)."""
from http.server import HTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
from urllib.parse import unquote
import mimetypes
import os
import sys

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8080
DOCS_ROOT = Path(__file__).resolve().parent
RCT_IMG_ROOT = DOCS_ROOT.parent / "source" / "images" / "RCT"


class NoCacheHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()

    def do_GET(self):
        if self.path.startswith("/rct-img/"):
            rel = unquote(self.path[len("/rct-img/") :]).split("?")[0]
            rel = os.path.basename(rel)
            if not rel or rel.startswith("."):
                self.send_error(404)
                return
            file_path = RCT_IMG_ROOT / rel
            if not file_path.is_file():
                self.send_error(404, f"Image RCT introuvable : {rel}")
                return
            mime, _ = mimetypes.guess_type(str(file_path))
            if not mime:
                mime = "application/octet-stream"
            data = file_path.read_bytes()
            self.send_response(200)
            self.send_header("Content-Type", mime)
            self.send_header("Content-Length", str(len(data)))
            self.end_headers()
            self.wfile.write(data)
            return
        super().do_GET()


if __name__ == "__main__":
    os.chdir(DOCS_ROOT)
    server = HTTPServer(("", PORT), NoCacheHandler)
    print(f"RCT — http://localhost:{PORT}  (cache désactivé, scans /rct-img/, Ctrl+C pour arrêter)")
    if not RCT_IMG_ROOT.is_dir():
        print(f"Attention : dossier scans introuvable : {RCT_IMG_ROOT}")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nArrêt.")
        server.server_close()
