(async function () {
  const lang = document.body.dataset.language || "zh";
  const response = await fetch("/js/site-labels.json");
  if (!response.ok)
    throw new Error("Unable to load interface labels: " + response.status);
  const labels = (await response.json())[lang];
  const status = document.getElementById("site-status");
  function storageWarning(error) {
    console.warn("GameZone local storage unavailable:", error.name);
    status.textContent = labels.storageError;
  }
  function read(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw === null ? fallback : JSON.parse(raw);
    } catch (error) {
      if (error instanceof SyntaxError || error.name === "SecurityError") {
        storageWarning(error);
        return fallback;
      }
      throw error;
    }
  }
  function save(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      if (["QuotaExceededError", "SecurityError"].includes(error.name)) {
        storageWarning(error);
        return;
      }
      throw error;
    }
  }
  const favoritesValue = read("gameFavorites", []),
    recentValue = read("gamezone-recent", []);
  let favorites = Array.isArray(favoritesValue)
    ? favoritesValue.filter((v) => typeof v === "string")
    : [];
  let recent = Array.isArray(recentValue)
    ? recentValue.filter((v) => typeof v === "string")
    : [];
  try {
    localStorage.setItem("gamezone-lang", lang);
  } catch (error) {
    storageWarning(error);
  }
  const saveButtons = [...document.querySelectorAll("[data-save]")];
  function updateSaves() {
    for (const button of saveButtons) {
      const active = favorites.includes(button.dataset.save);
      button.setAttribute("aria-pressed", String(active));
      button.textContent = button.classList.contains("save")
        ? active
          ? "♥"
          : "♡"
        : active
          ? "♥ " + labels.saved
          : "♡ " + labels.favorite;
    }
  }
  for (const button of saveButtons)
    button.addEventListener("click", () => {
      const id = button.dataset.save;
      favorites = favorites.includes(id)
        ? favorites.filter((v) => v !== id)
        : [...favorites, id];
      save("gameFavorites", favorites);
      updateSaves();
      filterGames();
    });
  updateSaves();
  const search = document.getElementById("search"),
    category = document.getElementById("category"),
    collection = document.getElementById("collection");
  const cards = [...document.querySelectorAll("#catalog-grid .game-card")];
  function filterGames() {
    if (!search) return;
    const query = search.value.trim().toLowerCase();
    let count = 0;
    for (const card of cards) {
      const matches =
        card.dataset.search.includes(query) &&
        (category.value === "all" ||
          category.value === card.dataset.category) &&
        (collection.value === "all" ||
          (collection.value === "favorites" ? favorites : recent).includes(
            card.dataset.game,
          ));
      card.hidden = !matches;
      if (matches) count++;
    }
    document.getElementById("result-count").textContent =
      count + " " + labels.results;
    const empty = document.getElementById("empty-results");
    empty.hidden = count > 0;
    empty.textContent =
      collection.value === "all" ? labels.searchEmpty : labels.collectionNone;
  }
  if (search) {
    search.addEventListener("input", filterGames);
    category.addEventListener("change", filterGames);
    collection.addEventListener("change", filterGames);
    document
      .querySelector(".filters")
      .addEventListener("submit", (e) => e.preventDefault());
    document
      .querySelector(".filters")
      .addEventListener("reset", () => setTimeout(filterGames, 0));
  }
  document.getElementById("clear-local")?.addEventListener("click", () => {
    for (const key of [
      "gameFavorites",
      "gamezone-recent",
      "gamezone-results",
      "gamePlayStats",
    ])
      localStorage.removeItem(key);
    favorites = [];
    recent = [];
    updateSaves();
    status.textContent = labels.cleared;
  });
  const area = document.querySelector("[data-playing]");
  if (!area) return;
  const id = area.dataset.playing,
    stage = document.getElementById("game-stage"),
    start = document.getElementById("start-game"),
    full = document.getElementById("fullscreen"),
    reload = document.getElementById("reload-game"),
    loadStatus = document.getElementById("game-load-status");
  const storedResults = read("gamezone-results", {});
  const records =
    storedResults &&
    typeof storedResults === "object" &&
    !Array.isArray(storedResults)
      ? storedResults
      : {};
  function showResult(record) {
    const output = document.getElementById("last-result");
    if (
      output &&
      record &&
      Number.isFinite(record.score) &&
      Number.isFinite(record.time)
    )
      output.textContent =
        record.score +
        " · " +
        new Date(record.time).toLocaleDateString(wordsLocale(lang));
  }
  function wordsLocale(l) {
    return l === "zh" ? "zh-CN" : l === "ja" ? "ja-JP" : "en-US";
  }
  showResult(records[id]);
  let frame;
  function launch() {
    if (frame) frame.remove();
    frame = document.createElement("iframe");
    frame.title = start.dataset.title;
    frame.src = start.dataset.src + "?lang=" + lang;
    frame.setAttribute("allow", "fullscreen");
    frame.setAttribute("sandbox", "allow-scripts allow-same-origin");
    frame.addEventListener("load", () => {
      loadStatus.textContent = "";
      frame.focus();
    });
    stage.replaceChildren(frame);
    full.disabled = false;
    reload.disabled = false;
    recent = [id, ...recent.filter((v) => v !== id)].slice(0, 30);
    save("gamezone-recent", recent);
  }
  start.addEventListener("click", launch);
  reload.addEventListener("click", launch);
  full.addEventListener("click", async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else if (stage.requestFullscreen) await stage.requestFullscreen();
      else loadStatus.textContent = labels.retry;
    } catch (error) {
      console.warn("Fullscreen unavailable", error);
      loadStatus.textContent = labels.retry;
    }
  });
  window.addEventListener("message", (event) => {
    if (
      !frame ||
      event.source !== frame.contentWindow ||
      event.origin !== location.origin
    )
      return;
    const result = event.data;
    if (
      !result ||
      result.type !== "gameScore" ||
      result.game !== id ||
      !Number.isFinite(result.score) ||
      result.score < 0 ||
      result.score > 1e12
    )
      return;
    records[id] = { score: result.score, time: Date.now() };
    save("gamezone-results", records);
    showResult(records[id]);
  });
})().catch((error) => {
  console.error(error);
  const status = document.getElementById("site-status");
  if (status)
    status.textContent =
      "部分功能未加载，请刷新页面 / Some controls did not load. Please refresh.";
});
