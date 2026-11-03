"""The game's little local server (the Play .bat files start it): python tools/serve.py [port]

Python's plain `python -m http.server` sometimes leaves a request hanging when the game asks for ~900 pictures and a
dozen scripts at once (Glen 2026-11-02: the loading stuck 1 or 2 short). This one keeps a long queue of waiting
connections, answers every request on its own thread, and tells the browser not to keep stale copies.
Serves the folder it's started from (the .bat files cd to the repo root first).
"""
import sys
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer


class Handler(SimpleHTTPRequestHandler):
    protocol_version = "HTTP/1.1"   # keep-alive: far fewer new connections than one per picture

    def end_headers(self):
        self.send_header("Cache-Control", "no-cache")
        super().end_headers()

    def log_message(self, *a):   # quiet: ~900 lines a load is noise
        pass


class Server(ThreadingHTTPServer):
    request_queue_size = 512
    daemon_threads = True
    allow_reuse_address = True


if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8766
    print(f"David 2 server on http://localhost:{port}  (close this window to stop it)")
    Server(("127.0.0.1", port), Handler).serve_forever()
