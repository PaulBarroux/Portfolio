#!/usr/bin/env python3
"""Tiny static server that serves the Portfolio repo."""
import os
import sys

ROOT = "/Users/paulbarroux/Documents/GitHub/Portfolio"
os.chdir(ROOT)

from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

port = int(sys.argv[1]) if len(sys.argv) > 1 else 5173
server = ThreadingHTTPServer(("127.0.0.1", port), SimpleHTTPRequestHandler)
print(f"serving {ROOT} at http://127.0.0.1:{port}", flush=True)
server.serve_forever()
