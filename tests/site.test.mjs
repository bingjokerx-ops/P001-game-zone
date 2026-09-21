import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync, statSync } from "node:fs";
import { resolve, join } from "node:path";

function localPath(pathname) {
  const path = join(process.cwd(), decodeURIComponent(pathname));
  if (existsSync(path) && statSync(path).isFile()) return path;
  if (existsSync(path + ".html")) return path + ".html";
  return join(path, "index.html");
}
const urls = [
  ...readFileSync("sitemap.xml", "utf8").matchAll(/<loc>(.*?)<\/loc>/g),
].map((match) => new URL(match[1]));
test("sitemap pages have matching canonical, three language alternatives and no broken local links", () => {
  assert.equal(urls.length, 111);
  assert.equal(new Set(urls.map((u) => u.href)).size, 111);
  for (const url of urls) {
    assert.equal(url.origin, "https://gametest.online");
    const html = readFileSync(localPath(url.pathname), "utf8");
    assert.ok(
      html.includes(`rel="canonical" href="${url.href}"`),
      url.href + " canonical",
    );
    assert.equal(
      (html.match(/hreflang="(?:zh-CN|en|ja)"/g) || []).length,
      3,
      url.href,
    );
    assert.equal((html.match(/<h1[ >]/g) || []).length, 1, url.href);
    assert.ok(
      !html.includes("yoursite.com") && !html.includes("gamezone@example.com"),
      url.href,
    );
    for (const match of html.matchAll(/(?:href|src)="([^"#][^"]*)"/g)) {
      const target = new URL(match[1].replaceAll("&amp;", "&"), url);
      if (target.origin !== url.origin) continue;
      assert.ok(
        existsSync(localPath(target.pathname)),
        `${url.href} -> ${target.pathname}`,
      );
    }
    for (const match of html.matchAll(
      /<script type="application\/(?:ld\+)?json"[^>]*>(.*?)<\/script>/g,
    ))
      assert.doesNotThrow(
        () => JSON.parse(match[1]),
        url.href + " structured data",
      );
  }
});
test("all game detail pages contain rules before JavaScript and a playable game entry", () => {
  for (const url of urls.filter((url) => url.pathname.includes("/play/"))) {
    const html = readFileSync(localPath(url.pathname), "utf8");
    assert.ok(html.includes('id="start-game"'), url.href);
    assert.ok(html.includes('data-src="/games/'), url.href);
    const rules = html.match(/id="rules"([\s\S]*?)<\/section>/)?.[1];
    assert.ok(rules, url.href + " rules");
    assert.equal(
      (rules.match(/<h3[ >]/g) || []).length,
      5,
      url.href + " rule sections",
    );
    assert.ok(!html.includes("localhost:3001"), url.href);
  }
});
test("publisher authorization remains intact and missing pages have a proper fallback", () => {
  assert.equal(
    readFileSync("ads.txt", "utf8").trim(),
    "google.com, pub-4138940319460057, DIRECT, f08c47fec0942fa0",
  );
  assert.match(
    readFileSync("404.html", "utf8"),
    /name="robots" content="noindex"/,
  );
  assert.match(
    readFileSync("_headers", "utf8"),
    /\/games\/\*\n  X-Robots-Tag: noindex, follow/,
  );
});
