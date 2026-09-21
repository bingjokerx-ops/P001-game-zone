import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";
import vm from "node:vm";
import {
  site,
  words,
  categories,
  featured,
  desktopOnly,
  twoPlayers,
  shortGames,
} from "../content/site.mjs";
import { lessons } from "../content/lessons.mjs";
const scope = {};
vm.createContext(scope);
vm.runInContext(
  readFileSync("js/games-data.js", "utf8") +
    "\nglobalThis.catalog = gamesData;",
  scope,
);
vm.runInContext(
  readFileSync("js/game-guides.js", "utf8") +
    "\nglobalThis.guides = gameGuides;",
  scope,
);
const games = scope.catalog,
  guides = scope.guides;
const languages = ["zh", "en", "ja"],
  paths = [];
const esc = (s) =>
  String(s).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const prefix = (lang) => (lang === "zh" ? "" : `/${lang}`);
const name = (game, lang) =>
  lang === "en" ? game.nameEn : lang === "ja" ? game.nameJa : game.name;
const route = (lang, path = "") => `${prefix(lang)}/${path}`;
function write(path, body) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, body + "\n", "utf8");
}
function category(game, lang) {
  return (categories[game.category] || categories.casual)[
    languages.indexOf(lang)
  ];
}
function meta(game, lang) {
  const t = words[lang];
  return [
    twoPlayers.has(game.id) ? t.duo : t.solo,
    shortGames.has(game.id) ? t.minutes : t.ownPace,
    desktopOnly.has(game.id) ? t.keyboard : t.touch,
  ];
}
function documentPage(lang, path, title, description, body, extra = "") {
  const t = words[lang],
    canonical = site.origin + route(lang, path);
  const output =
    prefix(lang).slice(1) + (lang === "zh" ? "" : "/") + path || "index.html";
  paths.push(canonical);
  const alternate = languages
    .map(
      (l) =>
        `<link rel="alternate" hreflang="${words[l].lang}" href="${site.origin + route(l, path)}">`,
    )
    .join("");
  const nav = languages
    .map(
      (l) =>
        `<a href="${route(l, path)}" lang="${words[l].lang}" ${l === lang ? 'aria-current="page"' : ""}>${{ zh: "中文", en: "EN", ja: "日本語" }[l]}</a>`,
    )
    .join("");
  const html = `<!doctype html><html lang="${t.lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)} · GameZone</title><meta name="description" content="${esc(description)}"><meta name="google-adsense-account" content="ca-pub-4138940319460057"><link rel="canonical" href="${canonical}">${alternate}<link rel="alternate" hreflang="x-default" href="${site.origin + route("zh", path)}"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:url" content="${canonical}"><meta property="og:type" content="website"><link rel="icon" href="/assets/mark.svg" type="image/svg+xml"><link rel="stylesheet" href="/css/site.css"><script defer src="/js/site.js"></script>${extra}</head><body data-language="${lang}"><a class="skip" href="#main">${t.jump}</a><header class="site-header"><a class="brand" href="${route(lang)}"><img src="/assets/mark.svg" width="36" height="36" alt=""><span>GameZone<small>PLAY • LEARN • REPEAT</small></span></a><nav aria-label="${t.home}"><a href="${route(lang)}">${t.home}</a><a href="${route(lang, "learn/")}">${t.learn}</a><a href="${route(lang, "about")}">${t.about}</a></nav><div class="languages" aria-label="Language">${nav}</div></header><main id="main">${body}</main><p id="site-status" class="status" role="status" aria-live="polite"></p><footer><a class="brand" href="${route(lang)}">GameZone</a><p>${t.local}</p><nav><a href="${route(lang, "about")}">${t.about}</a><a href="${route(lang, "privacy")}">${t.privacy}</a><a href="${site.issues}">${t.feedback}</a></nav><small>© 2026 GameZone · gametest.online</small></footer></body></html>`;
  write(output.endsWith("/") ? output + "index.html" : output, html);
}
function art(game, index) {
  // Original geometric illustrations, with no third-party game artwork.
  const palettes = [
    ["#dee5ff", "#3f52c6", "#ffc76c"],
    ["#d8f1eb", "#127f70", "#ffdf8b"],
    ["#eee0f6", "#87539c", "#e79b6d"],
  ];
  const [bg, ink, accent] = palettes[index % 3];
  let pattern = "";
  for (let y = 0; y < 3; y++)
    for (let x = 0; x < 4; x++) {
      const n = (index + x + y * 3) % 7;
      const xx = 66 + x * 54,
        yy = 30 + y * 54;
      if (game.id === "2048")
        pattern += `<rect x="${xx}" y="${yy}" width="46" height="46" rx="9" fill="${n % 2 ? ink : accent}"/><text x="${xx + 23}" y="${yy + 29}" fill="${n % 2 ? "white" : "#253059"}" font-family="sans-serif" font-weight="700" font-size="20" text-anchor="middle">${2 ** (1 + ((x + y) % 5))}</text>`;
      else if (["board", "sports"].includes(game.category))
        pattern += `<circle cx="${xx + 23}" cy="${yy + 23}" r="${n % 3 ? 19 : 10}" fill="${n % 2 ? ink : accent}"/>`;
      else
        pattern += `<rect x="${xx}" y="${yy}" width="46" height="46" rx="${game.category === "puzzle" ? 5 : 20}" fill="${n < 4 ? ink : accent}" opacity="${n === 0 ? ".25" : "1"}"/>`;
    }
  write(
    `assets/tiles/${game.id}.svg`,
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 210"><rect width="360" height="210" fill="${bg}"/>${pattern}<path d="M20 180h24m-12-12v24M318 26h20m-10-10v20" stroke="${ink}" stroke-width="3" opacity=".4"/></svg>`,
  );
}
function card(game, lang) {
  const t = words[lang];
  return `<article class="game-card" data-game="${game.id}" data-category="${game.category}" data-search="${esc([game.name, game.nameEn, game.nameJa, guides[game.id][lang].intro].join(" ").toLowerCase())}"><a href="${route(lang, `play/${game.id}/`)}"><img src="/assets/tiles/${game.id}.svg" width="360" height="210" alt="" loading="lazy"><div class="card-copy"><span class="category">${category(game, lang)}</span><h3>${esc(name(game, lang))}</h3><p>${esc(guides[game.id][lang].intro)}</p><small>${meta(game, lang).slice(0, 2).join(" · ")}</small></div></a><button class="save" type="button" data-save="${game.id}" aria-label="${t.favorite} ${esc(name(game, lang))}" aria-pressed="false">♡</button></article>`;
}
function lessonCard(lesson, lang) {
  return `<a class="lesson-card" href="${route(lang, `learn/${lesson.id}/`)}"><span class="category">${name(
    games.find((g) => g.id === lesson.game),
    lang,
  )}</span><h3>${esc(lesson[lang].title)}</h3><p>${esc(lesson[lang].desc)}</p><span aria-hidden="true">↗</span></a>`;
}
for (const [i, game] of games.entries()) {
  if (!guides[game.id]) throw new Error(`Missing guide: ${game.id}`);
  art(game, i);
}
write(
  "assets/mark.svg",
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><rect width="40" height="40" rx="12" fill="#3f52c6"/><path d="M10 15h10v10H10zm15 0h5v5h-5zm0 10h5v5h-5z" fill="#fff"/><path d="M13 11h4v18h-4M6 18h18v4H6" fill="#ffc76c"/></svg>',
);
for (const lang of languages) {
  const t = words[lang];
  const heroGame = games.find((g) => g.id === "2048");
  const home = `<section class="hero"><div class="hero-copy"><span class="eyebrow">GAMEZONE / ${t.minutes}</span><h1>${t.hero.split("\n").join("<br>")}</h1><p>${t.promise}</p><div class="actions"><a class="button primary" href="#catalog">${t.browse} ↓</a><a class="button" href="${route(lang, "learn/2048-one-move/")}">${t.tryLesson} ↗</a></div></div><a class="hero-board" href="${route(lang, "play/2048/")}"><div class="tile-board" aria-hidden="true">${[2, 4, 8, 16, 4, 8, 16, 32, 8, 16, 32, 64, 16, 32, 64, 128].map((n) => `<span class="tile tile-${n}">${n}</span>`).join("")}</div><div class="board-caption"><strong>2048</strong><span>${t.start} ↗</span></div></a></section><section><div class="section-heading"><div><h2>${t.featured}</h2><p>${t.featuredText}</p></div><span class="pill">${games.length} ${t.total}</span></div><div class="game-grid featured">${featured
    .map((id) =>
      card(
        games.find((g) => g.id === id),
        lang,
      ),
    )
    .join(
      "",
    )}</div></section><section class="learning-strip"><div class="section-heading"><div><span class="eyebrow">${t.learn}</span><h2>${t.guide}</h2><p>${t.guideIntro}</p></div></div><div class="lesson-grid">${lessons.map((l) => lessonCard(l, lang)).join("")}</div></section><section id="catalog"><div class="section-heading"><div><h2>${t.collection}</h2><p>${t.collectionText}</p></div></div><form class="filters" role="search"><label><span>${t.search}</span><input id="search" type="search" placeholder="2048, ${name(
    games.find((g) => g.id === "snake"),
    lang,
  )}…" autocomplete="off"></label><label><span>${t.filter}</span><select id="category"><option value="all">${t.all}</option>${Object.entries(
    categories,
  )
    .map(
      ([id, c]) =>
        `<option value="${id}">${c[languages.indexOf(lang)]}</option>`,
    )
    .join(
      "",
    )}</select></label><label><span>${t.collection}</span><select id="collection"><option value="all">${t.all}</option><option value="favorites">${t.favorites}</option><option value="recent">${t.recent}</option></select></label><button class="button" type="reset">${t.reset}</button></form><p id="result-count" class="muted" role="status">${games.length} ${t.results}</p><p id="empty-results" hidden>${t.searchEmpty}</p><div class="game-grid" id="catalog-grid">${games.map((g) => card(g, lang)).join("")}</div></section><section class="faq"><h2>${t.faq}</h2>${[1, 2, 3].map((i) => `<details><summary>${t["faq" + i]}</summary><p>${t["answer" + i]}</p></details>`).join("")}</section>`;
  documentPage(
    lang,
    "",
    `${t.home} — ${games.length} ${t.total}`,
    t.promise,
    home,
  );
  for (const game of games) {
    const guide = guides[game.id][lang];
    for (const field of ["intro", "gameplay", "controls", "scoring", "tips"])
      if (!guide?.[field])
        throw new Error(`${game.id}/${lang}/${field} missing`);
    const associated = lessons.filter((l) => l.game === game.id);
    const related = games
      .filter((g) => g.id !== game.id && g.category === game.category)
      .slice(0, 3);
    const content = `<div class="breadcrumbs"><a href="${route(lang)}">${t.home}</a><span>/</span><span>${category(game, lang)}</span></div><section class="game-heading"><div><h1>${esc(name(game, lang))}</h1><p>${esc(guide.intro)}</p><div class="tags">${meta(
      game,
      lang,
    )
      .map((m) => `<span class="pill">${m}</span>`)
      .join(
        "",
      )}</div></div><button class="button" data-save="${game.id}" aria-pressed="false">♡ ${t.favorite}</button></section><div class="play-layout"><section class="play-area" data-playing="${game.id}"><div id="game-stage"><div class="launch"><img src="/assets/tiles/${game.id}.svg" width="360" height="210" alt=""><h2>${t.ready}</h2><p>${t.load}</p><button id="start-game" class="button primary" data-src="/${game.url}" data-title="${esc(name(game, lang))}">${t.start} →</button></div></div><div class="game-toolbar"><button id="fullscreen" class="button" disabled>${t.fullscreen}</button><button id="reload-game" class="button" disabled>${t.restart}</button><a href="/${game.url}?lang=${lang}" target="_blank" rel="noopener">${t.standalone} ↗</a></div><p class="muted" id="game-load-status" role="status"></p><p class="muted">${t.retry}</p><noscript><p><a href="/${game.url}?lang=${lang}">${t.standalone}</a></p></noscript></section><aside class="quick-guide"><span class="eyebrow">${t.controls}</span><p>${esc(guide.controls)}</p><h2>${t.tips}</h2><p>${esc(guide.tips)}</p><a href="#rules">${t.gameplay} ↓</a>${readFileSync(game.url, "utf8").includes("type: 'gameScore'") ? `<div class="local-record"><h2>${t.record}</h2><p id="last-result">${t.noRecord}</p></div>` : ""}</aside></div><section class="rules" id="rules"><div class="section-heading"><h2>${t.gameplay}</h2><span class="muted">${t.updated} ${site.updated}</span></div><div class="rules-grid">${[
      ["intro", t.intro],
      ["gameplay", t.gameplay],
      ["controls", t.controls],
      ["scoring", t.scoring],
      ["tips", t.tips],
    ]
      .map(
        ([key, title]) =>
          `<article><h3>${title}</h3><p>${esc(guide[key])}</p></article>`,
      )
      .join(
        "",
      )}</div></section>${associated.length ? `<section><h2>${t.guide}</h2><div class="lesson-grid">${associated.map((l) => lessonCard(l, lang)).join("")}</div></section>` : ""}<section><h2>${t.related}</h2><div class="game-grid related">${related.map((g) => card(g, lang)).join("")}</div><a class="text-link" href="${route(lang)}">← ${t.exit}</a></section>`;
    const schema = {
      "@context": "https://schema.org",
      "@type": "VideoGame",
      name: name(game, lang),
      url: site.origin + route(lang, `play/${game.id}/`),
      description: guide.intro,
      inLanguage: t.lang,
      gamePlatform: "Web browser",
      playMode: twoPlayers.has(game.id) ? "MultiPlayer" : "SinglePlayer",
      isAccessibleForFree: true,
    };
    documentPage(
      lang,
      `play/${game.id}/`,
      `${name(game, lang)} — ${t.gameplay}`,
      guide.intro,
      content,
      `<script type="application/ld+json">${JSON.stringify(schema).replace(/</g, "\\u003c")}</script>`,
    );
  }
  documentPage(
    lang,
    "learn/",
    t.learn,
    t.guideIntro,
    `<section class="page-intro"><span class="eyebrow">${t.learn}</span><h1>${t.guide}</h1><p>${t.guideIntro}</p></section><div class="lesson-grid">${lessons.map((l) => lessonCard(l, lang)).join("")}</div>`,
  );
  for (const lesson of lessons) {
    const l = lesson[lang];
    let interactive =
      lesson.type === "merge"
        ? `<label>${lang === "zh" ? "选择起始行" : lang === "ja" ? "開始列を選択" : "Choose a starting row"}<select id="example-row"><option value="2,2,2,2">2 · 2 · 2 · 2</option><option value="2,2,4,0">2 · 2 · 4 · —</option><option value="4,0,4,4">4 · — · 4 · 4</option><option value="8,8,16,16">8 · 8 · 16 · 16</option></select></label><div id="example-board" class="example-row" aria-label="2048"><span>2</span><span>2</span><span>2</span><span>2</span></div><div class="actions"><button class="button primary" data-merge="left">${l.left}</button><button class="button" data-merge="right">${l.right}</button></div><p>${l.note}</p>`
        : `<div class="puzzle-diagram" aria-hidden="true">${(lesson.type === "mines" ? ["·", "·", "?", "·", "1", "·", "·", "·", "·"] : ["█", "█", "█", "█", "□", "·", "█", "·", "·"]).map((s) => `<span class="${s === "█" ? "wall" : s === "?" || s === "□" ? "unknown" : ""}">${s}</span>`).join("")}</div><fieldset><legend>${l.question}</legend>${l.options.map((o, i) => `<label class="choice"><input type="radio" name="answer" value="${i}"> ${o}</label>`).join("")}</fieldset><button class="button primary" id="check-answer">${t.check}</button>`;
    const json = {
      type: lesson.type,
      correct: l.correct,
      explanation: l.explanation,
      earned: l.earned,
      result: l.result,
      select:
        lang === "zh"
          ? "请先选择一个答案。"
          : lang === "ja"
            ? "答えを選んでください。"
            : "Choose an answer first.",
      correctLabel:
        lang === "zh"
          ? "判断正确。"
          : lang === "ja"
            ? "正解です。"
            : "Correct.",
      incorrectLabel:
        lang === "zh"
          ? "再想想。"
          : lang === "ja"
            ? "もう一度考えましょう。"
            : "Not quite.",
    };
    const body = `<div class="breadcrumbs"><a href="${route(lang, "learn/")}">${t.learn}</a><span>/</span><span>${name(
      games.find((g) => g.id === lesson.game),
      lang,
    )}</span></div><article class="lesson"><header class="page-intro"><span class="eyebrow">${t.learn}</span><h1>${l.title}</h1><p>${l.desc}</p><small>${t.updated} ${site.updated} · GameZone</small></header><div class="lesson-layout"><div class="prose">${l.sections.map(([h, p]) => `<section><h2>${h}</h2><p>${p}</p></section>`).join("")}<p><a class="button primary" href="${route(lang, `play/${lesson.game}/`)}">${t.playNow} →</a></p></div><section class="experiment"><h2>${t.tryLesson}</h2>${lesson.type === "merge" ? `<p>${l.question}</p>` : ""}${interactive}<p id="experiment-result" role="status" aria-live="polite"></p><details><summary>${t.complete}</summary><p>${l.explanation || l.sections[1][1]}</p></details><noscript><p>${l.explanation || l.sections[1][1]}</p></noscript></section></div></article>`;
    documentPage(
      lang,
      `learn/${lesson.id}/`,
      l.title,
      l.desc,
      body,
      `<script type="application/json" id="lesson-config">${JSON.stringify(json).replace(/</g, "\\u003c")}</script><script defer src="/js/merge-rules.js"></script><script defer src="/js/lesson.js"></script>`,
    );
  }
}
// Information pages contain only services actually provided by this release.
const information = {
  zh: {
    about: [
      [
        "关于 GameZone",
        "GameZone 是一个独立维护的浏览器小游戏网站，服务于想在短暂休息中玩一局、并学会一点玩法的人。无需账号、无需下载。",
      ],
      [
        "这里提供什么",
        "你可以按分类找游戏、收藏常玩的游戏、查看本机最近记录，并阅读对应版本的规则。练习室用可以操作的例题解释规则，不把其他版本的攻略直接套到本站。",
      ],
      [
        "如何制作内容",
        "网站代码、玩法说明和练习使用 AI 辅助开发与编写。说明依据本网站游戏实现整理，规则练习配有可重复验证的例子。维护者会持续修正问题；AI 辅助与自动测试不等于所有内容已由真人玩家验证。",
      ],
      [
        "记录与反馈",
        "本站没有联网账号、跨设备存档或全站排行榜。收藏、最近游玩及游戏返回的成绩保存在当前浏览器。反馈通过 GitHub Issues 提交，需要 GitHub 账号；请说明游戏名称、设备、复现步骤和预期结果。",
      ],
      [
        "游戏与素材",
        "游戏采用常见益智、棋盘与街机规则。门户缩略图是本站用几何图形制作的插图，不是游戏截图。游戏名称用于辨认玩法，不表示与同名品牌存在合作。版权或内容问题请通过反馈入口联系维护者。",
      ],
      [
        "本次维护",
        "2026-09-21：重做游戏导航与可直接阅读的详情页，增加三组规则练习，修正已发现的游戏故障，并清理占位联系方式与无法联网的社区入口。",
      ],
    ],
    privacy: [
      [
        "隐私说明",
        "本说明更新于 2026-09-21，适用于 gametest.online。本站无需注册，不提供联网评论和账号资料上传。",
      ],
      [
        "保存在设备上的记录",
        "收藏、最近游戏、语言选择、游戏报告的成绩以及部分游戏内部存档保存在浏览器 localStorage。它们不跨设备同步。可使用下方按钮清除门户收藏及历史；要清除游戏内的存档，可在浏览器设置中删除本站的网站数据。旧版曾把评论、昵称及录像保存在本机；旧数据不会自动公开或上传，删除全部网站数据可一并移除。",
      ],
      [
        "网站托管与访问统计",
        "网站由 Cloudflare Pages 托管。访问时，网络服务提供商会处理 IP 地址、请求路径、浏览器信息等提供服务所需的数据。Cloudflare 可能提供汇总访问和性能统计；不能将页面浏览次数直接当成真实人数。本站当前未部署 Google Analytics 或自行建立跨站追踪标识。",
      ],
      [
        "广告与意见征求",
        "本站已申请 Google AdSense，尚未获准展示广告；本版本不加载 AdSense 广告脚本。ads.txt 和账号元标记用于发布商授权与验证，不会单独展示广告。后续启用广告前，将核对并发布适用的隐私选择消息，更新本说明。",
      ],
      [
        "外部链接与反馈",
        "点击 GitHub 反馈或其他外部链接后，对方按其隐私政策处理信息。反馈内容可能公开，请勿填写密码、完整地址、支付资料或其他敏感信息。",
      ],
      [
        "联系与变更",
        "隐私或数据问题可通过本站 GitHub Issues 联系维护者。服务或数据用途发生变化时，我们会更新本页。",
      ],
    ],
    contact: "前往 GitHub 反馈",
    references: "服务提供商隐私说明",
  },
  en: {
    about: [
      [
        "About GameZone",
        "GameZone is an independently maintained browser-game site for a short break and a small skill to learn. No account or download is required.",
      ],
      [
        "What you can do",
        "Browse by category, save favorites, revisit games and read rules specific to this implementation. The practice room explains mechanics with interactive examples rather than assuming every version plays identically.",
      ],
      [
        "How content is made",
        "AI assists with code and writing. Guides are based on the games implemented here, and practice examples are reproducible. We continue to correct problems; AI assistance and automated tests do not mean every page has been verified by human players.",
      ],
      [
        "Records and feedback",
        "There are no online accounts, cross-device saves or global leaderboards. Favorites, recent games and reported results stay in this browser. Report problems through GitHub Issues, which requires a GitHub account. Include the game, device, steps and expected result.",
      ],
      [
        "Games and artwork",
        "Games use familiar puzzle, board and arcade rules. Portal thumbnails are geometric illustrations made for this site, not gameplay screenshots. Names identify game styles and do not imply affiliation with similarly named brands. Use the feedback link for rights or content concerns.",
      ],
      [
        "Maintenance update",
        "2026-09-21: rebuilt browsing and directly readable game pages, added three worked lessons, fixed identified game defects and removed placeholder contact information and non-networked community interfaces.",
      ],
    ],
    privacy: [
      [
        "Privacy notice",
        "Updated September 21, 2026. This notice applies to gametest.online. No registration, online comments or profile uploads are offered.",
      ],
      [
        "Records on your device",
        "Favorites, recent games, language choice, reported results and some game saves use browser localStorage. They do not sync. The button below clears portal favorites and history; use your browser site-data settings to remove game saves. Previous versions stored comments, nicknames and recordings locally. These are not automatically published or uploaded; clearing all site data removes them.",
      ],
      [
        "Hosting and traffic information",
        "Cloudflare Pages hosts the site. Serving requests involves processing IP addresses, paths and browser information. Cloudflare may supply aggregate traffic and performance reports. Page views do not equal people. This release does not install Google Analytics or create a cross-site tracking identifier.",
      ],
      [
        "Advertising and consent",
        "We have applied to Google AdSense but are not approved to display ads. This release does not load an AdSense ad script. The ads.txt file and publisher meta tag provide authorization and verification, not ad display. Before enabling ads, we will check and publish the applicable consent message and update this notice.",
      ],
      [
        "External links and feedback",
        "GitHub and other linked services process information under their own policies. Feedback may be public: do not include passwords, full addresses, payment details or sensitive information.",
      ],
      [
        "Contact and changes",
        "Use the GitHub Issues link for privacy questions. This page will be updated if our services or data uses change.",
      ],
    ],
    contact: "Report via GitHub",
    references: "Service provider privacy notices",
  },
  ja: {
    about: [
      [
        "GameZone について",
        "短い休憩で一局を楽しみ、遊び方を学ぶための独立したブラウザゲームサイトです。登録やダウンロードは不要です。",
      ],
      [
        "できること",
        "ジャンル検索、お気に入り、最近の履歴、実装に合った遊び方を提供します。練習室では操作できる例題からルールを学べます。",
      ],
      [
        "制作方法",
        "コードと文章の制作にAIを利用しています。説明は本站の実装を基に作成し、練習には再現できる例を用意しています。AIや自動テストだけで、全内容が人間のプレイヤーに検証されたことにはなりません。問題は継続して修正します。",
      ],
      [
        "記録とフィードバック",
        "オンラインアカウント、端末間同期、世界ランキングはありません。お気に入りと履歴はブラウザ内だけに保存します。問題はGitHub Issuesで報告できます。GitHubアカウントが必要です。ゲーム名、端末、手順、期待する結果を記載してください。",
      ],
      [
        "ゲームと画像",
        "一般的なパズル・ボード・アーケードのルールを使っています。サムネイルは本站が作成した幾何学図形で、ゲーム画面の写真ではありません。同名ブランドとの提携を意味しません。権利や内容については報告リンクをご利用ください。",
      ],
      [
        "更新",
        "2026-09-21：ナビゲーションと詳細ページを改修し、3つの例題を追加。確認できた不具合を修正し、仮の連絡先と未接続のコミュニティ機能を取り除きました。",
      ],
    ],
    privacy: [
      [
        "プライバシーについて",
        "2026年9月21日更新。gametest.online に適用します。登録、オンラインコメント、プロフィール送信は提供しません。",
      ],
      [
        "端末内の記録",
        "お気に入り、履歴、言語、結果、一部のゲーム保存はlocalStorageに記録し、同期しません。下のボタンでお気に入りと履歴を消せます。ゲーム内保存や旧版のローカルコメント・録画は、ブラウザのサイトデータ削除から消去できます。自動で公開やアップロードはしません。",
      ],
      [
        "ホスティングとアクセス",
        "Cloudflare Pages が配信します。配信にはIPアドレス、パス、ブラウザ情報などの処理が伴います。Cloudflare が集計アクセス・性能情報を提供する場合があります。ページ閲覧数は人数ではありません。現版にGoogle Analyticsや独自のサイト横断識別子はありません。",
      ],
      [
        "広告と同意",
        "AdSenseに申請していますが、まだ広告表示の承認を得ていません。現版は広告スクリプトを読み込みません。ads.txtとメタタグは確認用で、単独で広告を表示しません。広告導入前に必要な同意メッセージを確認・公開し、この説明を更新します。",
      ],
      [
        "外部リンクと報告",
        "GitHubなどの外部サービスでは各社の規約に従って情報が処理されます。報告は公開される場合があるため、パスワード、住所、支払い情報は書かないでください。",
      ],
      [
        "連絡と変更",
        "プライバシーに関する質問はGitHub Issuesをご利用ください。サービスやデータの利用が変わる場合はこのページを更新します。",
      ],
    ],
    contact: "GitHub で報告",
    references: "サービス提供者のプライバシー情報",
  },
};
for (const lang of languages)
  for (const kind of ["about", "privacy"]) {
    const t = words[lang],
      info = information[lang];
    const body = `<article class="information prose"><h1>${t[kind]}</h1>${info[kind].map(([h, p], i) => `<section ${i === 3 && kind === "about" ? 'id="contact"' : ""}><h2>${h}</h2><p>${p}</p></section>`).join("")}<a class="button" href="${site.issues}">${info.contact} ↗</a>${kind === "privacy" ? `<p><button class="button" id="clear-local">${t.clearLocal}</button></p><h2>${info.references}</h2><p><a href="https://www.cloudflare.com/privacypolicy/">Cloudflare</a> · <a href="https://policies.google.com/privacy">Google</a> · <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement">GitHub</a></p>` : ""}</article>`;
    documentPage(lang, `${kind}.html`, t[kind], info[kind][0][1], body);
  }
write(
  "game.html",
  `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,follow"><title>GameZone — 游戏入口</title><link rel="stylesheet" href="/css/site.css"><script defer src="/js/legacy-route.js"></script></head><body><main class="information"><h1>选择游戏 / Choose a game</h1><p>旧游戏链接会自动转到新版详情页。</p><ul>${games.map((g) => `<li><a href="/play/${g.id}/">${esc(g.name)} / ${esc(g.nameEn)}</a></li>`).join("")}</ul><a href="/">游戏大厅 / All games</a></main></body></html>`,
);
write(
  "js/legacy-route.js",
  `const allowedGames = ${JSON.stringify(games.map((g) => g.id))};\nconst id = new URLSearchParams(location.search).get('id');\nlet lang='zh';\ntry { lang=localStorage.getItem('gamezone-lang') || 'zh'; } catch(error) { console.warn('Language preference unavailable', error.name); }\nif(allowedGames.includes(id)) location.replace((['en','ja'].includes(lang)?'/'+lang:'')+'/play/'+id+'/');`,
);
write(
  "404.html",
  '<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>找不到页面 · GameZone</title><link rel="stylesheet" href="/css/site.css"></head><body><main class="information"><h1>这页没有找到 / Page not found</h1><p>链接可能已变更。返回游戏大厅，继续寻找下一局。</p><a class="button primary" href="/">游戏大厅 / All games</a></main></body></html>',
);
write(
  "robots.txt",
  `User-agent: *\nAllow: /\nDisallow: /scripts/\nDisallow: /tests/\nDisallow: /docs/\nDisallow: /work/\nSitemap: ${site.origin}/sitemap.xml`,
);
write(
  "sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths.map((path) => `<url><loc>${path.replace(/\.html$/, "")}</loc><lastmod>${site.updated}</lastmod></url>`).join("\n")}\n</urlset>`,
);
// Cloudflare Pages normalizes .html URLs. Keep canonicals consistent with that behavior.
for (const lang of languages)
  for (const page of ["about", "privacy"]) {
    const file = `${prefix(lang).slice(1)}${lang === "zh" ? "" : "/"}${page}.html`;
    writeFileSync(
      file,
      readFileSync(file, "utf8").replaceAll(`${page}.html`, page),
    );
  }
write(
  "_headers",
  `/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  Permissions-Policy: camera=(), microphone=(), geolocation=()\n/games/*\n  X-Robots-Tag: noindex, follow\n/test*\n  X-Robots-Tag: noindex, nofollow\n/video-test*\n  X-Robots-Tag: noindex, nofollow\n/scripts/*\n  X-Robots-Tag: noindex, nofollow\n/docs/*\n  X-Robots-Tag: noindex, nofollow\n/tests/*\n  X-Robots-Tag: noindex, nofollow\n/content/*\n  X-Robots-Tag: noindex, nofollow`,
);
write(
  "js/site-labels.json",
  JSON.stringify(Object.fromEntries(languages.map((l) => [l, words[l]]))),
);
console.log(
  `Built ${paths.length} indexable pages, ${games.length} original illustrations, sitemap and legacy routes.`,
);
