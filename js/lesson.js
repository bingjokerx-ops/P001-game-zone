(function () {
  const config = JSON.parse(
    document.getElementById("lesson-config").textContent,
  );
  const result = document.getElementById("experiment-result");
  if (config.type === "merge") {
    const input = document.getElementById("example-row"),
      board = document.getElementById("example-board");
    function render(row) {
      board.replaceChildren(
        ...row.map((value) => {
          const cell = document.createElement("span");
          cell.textContent = value || "—";
          return cell;
        }),
      );
    }
    input.addEventListener("change", () => {
      render(input.value.split(",").map(Number));
      result.textContent = "";
    });
    for (const button of document.querySelectorAll("[data-merge]"))
      button.addEventListener("click", () => {
        const merged = GameZoneMerge.mergeRow(
          input.value.split(",").map(Number),
          button.dataset.merge,
        );
        render(merged.row);
        result.textContent =
          config.result +
          ": " +
          merged.row.map((n) => n || "—").join(" · ") +
          " / " +
          config.earned +
          ": " +
          merged.points;
      });
  } else
    document.getElementById("check-answer").addEventListener("click", () => {
      const selected = document.querySelector("input[name=answer]:checked");
      if (!selected) {
        result.textContent = config.select;
        return;
      }
      result.textContent =
        (Number(selected.value) === config.correct
          ? config.correctLabel
          : config.incorrectLabel) +
        " " +
        config.explanation;
    });
})();
