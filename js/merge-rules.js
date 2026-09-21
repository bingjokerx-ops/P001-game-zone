/* Shared by the game, worked examples and regression tests. */
(function (root) {
  function mergeRow(row, direction = "left") {
    if (
      !Array.isArray(row) ||
      row.length !== 4 ||
      row.some(
        (value) =>
          !Number.isInteger(value) ||
          value < 0 ||
          (value > 0 && !Number.isInteger(Math.log2(value))),
      )
    )
      throw new Error("Invalid 2048 row: " + JSON.stringify(row));
    if (!["left", "right"].includes(direction))
      throw new Error("Invalid direction: " + direction);
    const ordered = direction === "right" ? [...row].reverse() : [...row];
    const tiles = ordered.filter(Boolean),
      result = [];
    let points = 0;
    for (let i = 0; i < tiles.length; i++) {
      if (tiles[i] === tiles[i + 1]) {
        const merged = tiles[i] * 2;
        result.push(merged);
        points += merged;
        i++;
      } else result.push(tiles[i]);
    }
    while (result.length < 4) result.push(0);
    return { row: direction === "right" ? result.reverse() : result, points };
  }
  root.GameZoneMerge = { mergeRow };
})(globalThis);
