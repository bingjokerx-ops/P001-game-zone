import http from "node:http";
import { readFile, stat } from "node:fs/promises";
import { resolve, extname, sep } from "node:path";
const root = resolve(".");
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".mp4": "video/mp4",
};
http
  .createServer(async (req, res) => {
    try {
      const path = decodeURIComponent(
        new URL(req.url, "http://localhost").pathname,
      );
      let file = resolve(root, "." + path);
      if (file !== root && !file.startsWith(root + sep)) {
        res.writeHead(403);
        res.end();
        return;
      }
      try {
        if ((await stat(file)).isDirectory())
          file = resolve(file, "index.html");
      } catch (error) {
        if (error.code !== "ENOENT") throw error;
        if (!extname(file)) file += ".html";
      }
      const bytes = await readFile(file);
      res.writeHead(200, {
        "Content-Type": types[extname(file)] || "application/octet-stream",
        "Cache-Control": "no-store",
      });
      res.end(bytes);
    } catch (error) {
      if (error.code === "ENOENT") {
        res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
        res.end(await readFile(resolve(root, "404.html")));
      } else {
        console.error(error);
        res.writeHead(500);
        res.end("Local preview failed");
      }
    }
  })
  .listen(8768, "127.0.0.1", () =>
    console.log("Preview http://127.0.0.1:8768"),
  );
