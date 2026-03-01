#!/usr/bin/env node
/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const { spawnSync } = require("child_process");

let ffmpegPath;
try {
  ffmpegPath = require("ffmpeg-static");
} catch (err) {
  console.error("Missing dependency: ffmpeg-static");
  console.error("Run: npm install ffmpeg-static --no-save");
  process.exit(1);
}

const root = process.cwd();
const force = process.argv.includes("--force");

function run(cmd, args) {
  const result = spawnSync(cmd, args, { stdio: "pipe", encoding: "utf8" });
  if (result.status !== 0) {
    throw new Error((result.stderr || result.stdout || "ffmpeg failed").trim());
  }
}

function loadGamesData() {
  const dataFile = path.join(root, "js", "games-data.js");
  const code = fs.readFileSync(dataFile, "utf8");
  const ctx = {};
  vm.createContext(ctx);
  vm.runInContext(`${code};globalThis.__data=gamesData;`, ctx);
  if (!Array.isArray(ctx.__data)) {
    throw new Error("Unable to load gamesData array");
  }
  return ctx.__data;
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function exists(filePath) {
  return fs.existsSync(filePath);
}

function getAccentColorByCategory(category) {
  const map = {
    puzzle: "0x00d4ff",
    arcade: "0xff7a00",
    action: "0xff2e63",
    sports: "0x00c853",
    strategy: "0x7c4dff",
    casual: "0xffca28"
  };
  return map[category] || "0x00d4ff";
}

function makeAnimatedVideoFromCover(coverAbsPath, outAbsPath, accentColor) {
  const outDir = path.dirname(outAbsPath);
  ensureDir(outDir);

  const filterGraph =
    "scale=1920:1080:force_original_aspect_ratio=increase:flags=lanczos," +
    "crop=1920:1080," +
    "zoompan=z='min(1.08,1+0.0007*on)':d=125:s=1920x1080," +
    "eq=saturation=1.08:contrast=1.05:brightness=0.01," +
    "unsharp=7:7:1.1:7:7:0.0," +
    "drawbox=x='mod(t*360,iw+260)-260':y=0:w=260:h=ih:color=white@0.035:t=fill," +
    `drawbox=x=0:y=0:w=iw:h=70:color=${accentColor}@0.14:t=fill,` +
    `drawbox=x=0:y=ih-70:w=iw:h=70:color=${accentColor}@0.14:t=fill,` +
    "drawbox=x=72:y=ih-30:w=iw-144:h=10:color=white@0.20:t=fill," +
    `drawbox=x=72:y=ih-30:w='(iw-144)*min(t/5,1)':h=10:color=${accentColor}@0.92:t=fill,` +
    "noise=alls=3:allf=t," +
    "vignette=PI/6," +
    "fade=t=in:st=0:d=0.28," +
    "fade=t=out:st=4.72:d=0.28," +
    "format=yuv420p";

  const args = [
    "-y",
    "-loop",
    "1",
    "-i",
    coverAbsPath,
    "-t",
    "5",
    "-r",
    "25",
    "-vf",
    filterGraph,
    "-an",
    "-c:v",
    "libx264",
    "-preset",
    "medium",
    "-crf",
    "21",
    outAbsPath
  ];

  run(ffmpegPath, args);
}

function copyFile(src, dst) {
  ensureDir(path.dirname(dst));
  fs.copyFileSync(src, dst);
}

function main() {
  const games = loadGamesData();
  let ok = 0;
  const failed = [];
  let skipped = 0;

  for (const game of games) {
    try {
      const coverAbs = path.join(root, game.cover);
      const assetVideoAbs = path.join(root, game.video);
      const leaderboardAbs = path.join(
        root,
        "games",
        game.id,
        "leaderboard",
        "example.mkv"
      );

      if (!exists(coverAbs)) {
        throw new Error(`cover not found: ${game.cover}`);
      }

      if (!force && exists(assetVideoAbs) && exists(leaderboardAbs)) {
        skipped += 1;
        console.log(`SKIP ${game.id}`);
        continue;
      }

      const accentColor = getAccentColorByCategory(game.category);
      makeAnimatedVideoFromCover(coverAbs, leaderboardAbs, accentColor);

      const assetExt = path.extname(assetVideoAbs).toLowerCase();
      if (assetExt === ".mkv") {
        copyFile(leaderboardAbs, assetVideoAbs);
      } else {
        makeAnimatedVideoFromCover(coverAbs, assetVideoAbs, accentColor);
      }

      ok += 1;
      console.log(`OK   ${game.id}`);
    } catch (err) {
      failed.push({ id: game.id, error: err.message });
      console.error(`FAIL ${game.id}: ${err.message}`);
    }
  }

  console.log("");
  console.log(`Done. generated=${ok}, skipped=${skipped}, failed=${failed.length}`);
  if (failed.length > 0) {
    for (const item of failed) {
      console.log(` - ${item.id}: ${item.error}`);
    }
    process.exitCode = 2;
  }
}

main();
