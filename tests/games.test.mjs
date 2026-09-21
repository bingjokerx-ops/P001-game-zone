import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import vm from "node:vm";

function gameRuntime(id) {
  const elements = new Map(),
    timeouts = new Map(),
    frames = new Map();
  let nextId = 0;
  const canvas = new Proxy({}, { get: () => () => {} });
  function element() {
    const classes = new Set();
    return {
      style: {},
      dataset: {},
      children: [],
      textContent: "",
      classList: {
        add: (c) => classes.add(c),
        remove: (c) => classes.delete(c),
        contains: (c) => classes.has(c),
        toggle: (c, on) => (on ? classes.add(c) : classes.delete(c)),
      },
      set innerHTML(value) {
        this.children = [];
      },
      appendChild(child) {
        this.children.push(child);
      },
      addEventListener() {},
      setAttribute() {},
      getContext: () => canvas,
    };
  }
  const document = {
    getElementById: (id) => {
      if (!elements.has(id)) elements.set(id, element());
      return elements.get(id);
    },
    createElement: element,
    querySelectorAll: () => [],
    addEventListener() {},
  };
  const context = vm.createContext({
    document,
    console,
    Math,
    performance: { now: () => 100 },
    location: { origin: "http://localhost" },
    localStorage: { getItem: () => null, setItem() {} },
    window: { parent: { postMessage() {} } },
    setTimeout: (fn) => {
      timeouts.set(++nextId, fn);
      return nextId;
    },
    clearTimeout: (id) => timeouts.delete(id),
    setInterval: () => ++nextId,
    clearInterval() {},
    requestAnimationFrame: (fn) => {
      frames.set(++nextId, fn);
      return nextId;
    },
  });
  if (id === "2048")
    vm.runInContext(readFileSync("js/merge-rules.js", "utf8"), context);
  const html = readFileSync(`games/${id}/index.html`, "utf8");
  for (const match of html.matchAll(/<script>([\s\S]*?)<\/script>/g))
    vm.runInContext(match[1], context);
  return {
    run: (script) => vm.runInContext(script, context),
    elements,
    timeouts,
    frames,
  };
}

test("all 30 game scripts parse and their entry files exist", () => {
  const ids = readdirSync("games").filter((id) =>
    existsSync(`games/${id}/index.html`),
  );
  assert.equal(ids.length, 30);
  for (const id of ids)
    for (const match of readFileSync(`games/${id}/index.html`, "utf8").matchAll(
      /<script>([\s\S]*?)<\/script>/g,
    ))
      assert.doesNotThrow(() => new vm.Script(match[1]), id);
});

test("2048 merges each tile once, preserves totals and ends input after winning", () => {
  const game = gameRuntime("2048");
  assert.equal(
    game.run("JSON.stringify(GameZoneMerge.mergeRow([2,2,2,2]))"),
    '\{"row":[4,4,0,0],"points":8}',
  );
  assert.equal(
    game.run("JSON.stringify(GameZoneMerge.mergeRow([2,2,4,0]))"),
    '\{"row":[4,4,0,0],"points":4}',
  );
  assert.equal(
    game.run('JSON.stringify(GameZoneMerge.mergeRow([2,2,4,0],"right"))'),
    '\{"row":[0,0,4,4],"points":4}',
  );
  assert.throws(
    () => game.run("GameZoneMerge.mergeRow([2,3,0,0])"),
    /Invalid 2048 row/,
  );
  for (let i = 0; i < 100; i++) {
    const row = Array.from(
      { length: 4 },
      () => [0, 2, 4, 8][Math.floor(Math.random() * 4)],
    );
    const result = JSON.parse(
      game.run(
        `JSON.stringify(GameZoneMerge.mergeRow(${JSON.stringify(row)}))`,
      ),
    );
    assert.equal(
      result.row.reduce((a, b) => a + b),
      row.reduce((a, b) => a + b),
    );
  }
  game.run('grid=[[1024,1024,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];move("left")');
  assert.equal(game.run("ended"), true);
  const wonGrid = game.run("JSON.stringify(grid)");
  game.run('move("right")');
  assert.equal(game.run("JSON.stringify(grid)"), wonGrid);
});

test("tetris restarts its animation and paused controls cannot mutate a piece", () => {
  const game = gameRuntime("tetris");
  game.frames.clear();
  game.run("gameOver=true;gameLoop(2000)");
  assert.equal(game.frames.size, 0);
  game.run("restartGame()");
  assert.equal(game.frames.size, 1);
  const before = game.run("JSON.stringify(currentPiece)");
  game.run("paused=true;move(1);rotate();drop()");
  assert.equal(game.run("JSON.stringify(currentPiece)"), before);
});

test("memory restart cancels pending mismatch and win callbacks", () => {
  const game = gameRuntime("memory");
  game.run('flippedCards=[createCard("A",0),createCard("B",1)];checkMatch()');
  assert.equal(game.timeouts.size, 1);
  game.run("initGame()");
  assert.equal(game.timeouts.size, 0);
  game.run(
    'matchedPairs=7;flippedCards=[createCard("A",0),createCard("A",1)];checkMatch()',
  );
  assert.equal(game.timeouts.size, 1);
  game.run("initGame()");
  assert.equal(game.timeouts.size, 0);
});

test("reversi final move updates board and scores before declaring the winner", () => {
  const game = gameRuntime("reversi");
  game.run(
    'board=Array.from({length:8},()=>Array(8).fill("black"));board[0][0]=null;board[0][1]="white";currentPlayer="black";updateScore();makeMove(0,0)',
  );
  assert.equal(Number(game.elements.get("blackCount").textContent), 64);
  assert.equal(Number(game.elements.get("whiteCount").textContent), 0);
  assert.match(game.elements.get("message").textContent, /黑棋获胜/);
});

test("minesweeper first click is safe at every difficulty and flags toggle without revealing", () => {
  const game = gameRuntime("minesweeper");
  for (const difficulty of ["easy", "medium", "hard"]) {
    game.run(`currentDifficulty='${difficulty}';initGame();handleClick(0,0)`);
    assert.equal(
      game.run("board.flat().filter(n=>n===-1).length===mineCount"),
      true,
    );
    assert.equal(game.run("board[0][0]===0 && !gameOver && !firstClick"), true);
  }
  game.run("initGame();handleRightClick(3,3)");
  assert.equal(game.run("flagged[3][3]&&!revealed[3][3]&&firstClick"), true);
  game.run("handleRightClick(3,3)");
  assert.equal(game.run("flagged[3][3]"), false);
});

function solveLevel(level) {
  const width = level[0].length,
    cells = level.join(""),
    goals = [],
    boxes = [];
  assert.ok(level.every((row) => row.length === width));
  for (let i = 0; i < cells.length; i++) {
    if (cells[i] === ".") goals.push(i);
    if (cells[i] === "$") boxes.push(i);
    if (
      i < width ||
      i >= cells.length - width ||
      i % width === 0 ||
      i % width === width - 1
    )
      assert.equal(cells[i], "#");
  }
  assert.equal(boxes.length, goals.length);
  assert.ok(boxes.length > 0);
  const start = {
    player: cells.indexOf("@"),
    boxes: boxes.sort((a, b) => a - b),
    path: [],
  };
  const queue = [start],
    visited = new Set();
  for (let head = 0; head < queue.length; head++) {
    assert.ok(head < 150000, "level search exceeds bounded test budget");
    const state = queue[head];
    if (goals.every((goal) => state.boxes.includes(goal))) return state.path;
    for (const [dx, dy] of [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ]) {
      const next = state.player + dx + dy * width;
      if (cells[next] === "#") continue;
      let nextBoxes = state.boxes;
      if (state.boxes.includes(next)) {
        const beyond = next + dx + dy * width;
        if (cells[beyond] === "#" || state.boxes.includes(beyond)) continue;
        nextBoxes = state.boxes
          .map((box) => (box === next ? beyond : box))
          .sort((a, b) => a - b);
      }
      const key = next + ":" + nextBoxes.join(",");
      if (visited.has(key)) continue;
      visited.add(key);
      queue.push({
        player: next,
        boxes: nextBoxes,
        path: [...state.path, [dx, dy]],
      });
    }
  }
  throw new Error("Unsolvable level: " + level.join("/"));
}

test("every sokoban level is solvable in the actual game; undo restores its exact previous state", () => {
  const game = gameRuntime("sokoban"),
    levels = JSON.parse(game.run("JSON.stringify(levels)"));
  assert.equal(levels.length, 5);
  levels.forEach((level, index) => {
    const path = solveLevel(level);
    game.run(`loadLevel(${index})`);
    for (const [dx, dy] of path) game.run(`move(${dx},${dy})`);
    assert.equal(game.run("won"), true, `level ${index + 1}`);
    for (let i = 0; i < path.length; i++) game.run("undoMove()");
    const restored = game.run("JSON.stringify({board,player,moves,pushes})");
    game.run(`loadLevel(${index})`);
    assert.equal(
      game.run("JSON.stringify({board,player,moves,pushes})"),
      restored,
    );
  });
});
