#!/usr/bin/env python3
"""Serveur local docs/ — désactive le cache HTTP (évite JS/CSS obsolètes en dev)."""
from http.server import HTTPServer, SimpleHTTPRequestHandler
import sys

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8080


class NoCacheHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()


if __name__ == "__main__":
    server = HTTPServer(("", PORT), NoCacheHandler)
    print(f"RCT — http://localhost:{PORT}  (cache désactivé, Ctrl+C pour arrêter)")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nArrêt.")
        server.server_close()
