export const lessons = [
  {
    id: "2048-one-move",
    game: "2048",
    type: "merge",
    zh: {
      title: "2048：为什么四个 2 不会一步变成 8？",
      desc: "用四格合并实验看清移动顺序、单次合并和得分，再把规则用到完整棋盘。",
      sections: [
        [
          "先看一行，而不是整盘",
          "2048 的一次移动会先挤掉空格，再从移动方向的一端依次配对。新产生的方块在这一步不能再次合并。这是理解局面的关键，比“把大数字放角落”更基础。",
        ],
        [
          "同样的数字，方向会改变结果",
          "对 2、2、4、空格 向左移动，先得到 4、4、空格、空格，增加 4 分。不能在同一步继续得到 8。向右移动会得到 空格、空格、4、4；两次结果数字相同，但落点不同。",
        ],
        [
          "为什么保留空格有用",
          "在完整游戏中，每次有效移动后会随机出现一个 2 或 4。空格少时，你的可选路线会减少。试着把最大数字留在一角，再把较小数字排在它附近；这是一种整理策略，不是保证获胜的公式。",
        ],
        [
          "带回游戏的小目标",
          "先尝试稳定做出 128，不必一开始追求 2048。每次移动前问自己：哪两个数会合并？新空位在哪里？如果方向无效，本站不会生成新方块。",
        ],
      ],
      question:
        "选择一行，再比较左右移动的结果。这里不生成随机新方块，方便单独观察合并。",
      left: "向左合并",
      right: "向右合并",
      earned: "本次增加",
      result: "移动结果",
      note: "新生成的方块，这一步不再合并。",
    },
    en: {
      title: "2048: why four 2s do not become 8 in one move",
      desc: "A four-cell experiment explains merge order, single merges and scoring before you return to the full board.",
      sections: [
        [
          "Read one row first",
          "A move removes gaps and pairs matching neighbors from the destination side. A tile created by a merge cannot merge again during the same move. Understand this before relying on a corner strategy.",
        ],
        [
          "Direction changes the landing positions",
          "Move 2, 2, 4, empty to the left: the result is 4, 4, empty, empty and 4 points. It is not 8. Moving right produces empty, empty, 4, 4. The values match, but the positions matter on a full board.",
        ],
        [
          "Why empty cells help",
          "After each valid move, the full game adds a random 2 or 4. Fewer gaps mean fewer escape routes. Keeping the largest tile in a corner and arranging smaller ones nearby can help you organize the board, but it does not guarantee a win.",
        ],
        [
          "Your next small goal",
          "Try reaching 128 consistently before aiming for 2048. Before moving, predict the pair that will merge and the gap it will leave. An ineffective move does not spawn a tile in this version.",
        ],
      ],
      question:
        "Choose a row and compare both directions. This experiment does not spawn random tiles.",
      left: "Merge left",
      right: "Merge right",
      earned: "Points added",
      result: "Result",
      note: "A newly merged tile cannot merge again in this move.",
    },
    ja: {
      title: "2048：2 が4つあっても、一手で 8 にならない理由",
      desc: "4マスの実験で、合体の順番と得点を確認しましょう。",
      sections: [
        [
          "まず一列で考える",
          "一手では空白を詰め、移動先から同じ数字を順に合体します。その手でできたタイルは、同じ手では再び合体しません。",
        ],
        [
          "向きによって位置が変わる",
          "2、2、4、空白を左に動かすと、4、4、空白、空白で4点加算です。一手で8にはなりません。右なら空白、空白、4、4になります。",
        ],
        [
          "空白を残す理由",
          "本編では有効な移動の後に2か4が出現します。空白が減ると選択肢も減ります。大きい数字を隅に置く方法は整理に役立ちますが、勝利を保証しません。",
        ],
        [
          "次の小さな目標",
          "まず128を安定して作りましょう。動かす前に、合体する組と残る空白を予測します。この版では無効な移動で新しい数字は出ません。",
        ],
      ],
      question:
        "一列を選び、左右の結果を比べましょう。実験ではランダムな新タイルは出ません。",
      left: "左へ合体",
      right: "右へ合体",
      earned: "加算点",
      result: "結果",
      note: "新しく合体したタイルは、この手では再合体しません。",
    },
  },
  {
    id: "minesweeper-first-deduction",
    game: "minesweeper",
    type: "mines",
    zh: {
      title: "扫雷：从一个数字推出第一面旗",
      desc: "区分“确定有雷”和“看起来像雷”，用一个封闭的邻格例子理解数字约束。",
      sections: [
        [
          "数字数的是周围八格",
          "数字 1 表示上下左右和四个对角线的八个邻格里，总共恰好有一颗雷。它不是只看正方向，也不表示这一整行只有一颗雷。",
        ],
        [
          "什么时候能确定插旗",
          "如果一个已打开的 1 周围只有一格未打开，其他邻格都已确认安全，那么那一格必然是雷。如果还有两格没开，你就不能仅凭这个 1 判断是哪一格。",
        ],
        [
          "什么时候能确定安全",
          "某个数字周围的雷都已被逻辑确定后，它剩下的未知邻格才可以判为安全。插旗只是你的标记，系统不会替你证明旗子插得对；误插的旗子会让后续推理一起出错。",
        ],
        [
          "本网站版本的边界",
          "首次打开的位置及其周围不会放雷，空白区域会自动展开。随机棋盘不保证全程无猜测；遇到多种可能时，先寻找别处的确定信息。本版提供插旗模式按钮，手机上可以切换后点格子。",
        ],
      ],
      question:
        "下面是一个局部棋盘。中心数字为 1，灰色格已确认安全，只有右上角尚未打开。右上角是什么？",
      options: ["确定有雷", "确定安全", "信息不足"],
      correct: 0,
      explanation:
        "答案是确定有雷：中心 1 的另外七个邻格都安全，唯一未开的格子必须贡献这颗雷。若还有另一个未知邻格，信息就不足。",
    },
    en: {
      title: "Minesweeper: earn your first flag with logic",
      desc: "Separate a proven mine from a guess using one complete neighborhood.",
      sections: [
        [
          "A number counts eight neighbors",
          "A 1 means exactly one mine among the eight adjacent cells, including diagonals. It does not describe an entire row or only the four cardinal directions.",
        ],
        [
          "When a flag is justified",
          "If a revealed 1 has only one unopened neighbor and its other seven neighbors are known safe, the remaining cell must be a mine. Two unknown neighbors would not be enough to choose between them.",
        ],
        [
          "When a cell is safe",
          "Once all mines around a number have been logically identified, its remaining unknown neighbors are safe. Flags record your judgment; they do not verify it. One incorrect flag can corrupt later deductions.",
        ],
        [
          "Limits of this version",
          "The first opening and its neighbors are protected from mines. Empty regions expand automatically. Random boards are not guaranteed guess-free. Look elsewhere for certain moves before taking a risk. On a phone, toggle Flag mode before tapping a cell.",
        ],
      ],
      question:
        "The center is 1. Gray neighbors are known safe; only the top-right cell is unopened. What is it?",
      options: [
        "Definitely a mine",
        "Definitely safe",
        "Not enough information",
      ],
      correct: 0,
      explanation:
        "It must be a mine. Seven neighbors are safe, so the only unknown cell must supply the one mine. With a second unknown neighbor, that conclusion would not follow.",
    },
    ja: {
      title: "マインスイーパー：数字から最初の旗を決める",
      desc: "一つの周囲8マスを使って、確実な推理と勘を区別します。",
      sections: [
        [
          "数字は周囲8マスを数える",
          "1は斜めを含む隣接8マスに地雷がちょうど1個あるという意味です。行全体や上下左右だけを数えるのではありません。",
        ],
        [
          "旗を確定できるとき",
          "開いた1の周りで、未開封が1マスだけ、残り7マスが安全なら、その1マスは地雷です。未開封が2マスなら、1だけでは特定できません。",
        ],
        [
          "安全を確定できるとき",
          "周囲の地雷をすべて論理的に特定できた数字について、残りのマスは安全です。旗は自分の判断の記録であり、正しさの保証ではありません。",
        ],
        [
          "この版の範囲",
          "最初に開く場所と隣接マスには地雷を置きません。空白は自動で開きます。すべての盤面が推理だけで解ける保証はありません。スマートフォンでは旗モードに切り替えてタップします。",
        ],
      ],
      question:
        "中央は1。灰色は安全で、右上だけが未開封です。右上は何でしょう？",
      options: ["必ず地雷", "必ず安全", "情報不足"],
      correct: 0,
      explanation:
        "必ず地雷です。他の7マスは安全なので、唯一の未開封マスが地雷になります。未開封がもう1マスあれば、この結論は出せません。",
    },
  },
  {
    id: "sokoban-before-you-push",
    game: "sokoban",
    type: "box",
    zh: {
      title: "推箱子：推动之前，先找回来的路",
      desc: "在一个三乘三的局部图中看清死角，避免把可解的关卡推进死局。",
      sections: [
        [
          "人能走回来，箱子不一定能",
          "推箱子只能推，不能拉。一次推动需要人站在箱子后方，箱子前方也要有空地。判断下一步时，要同时看箱子的新位置和人之后能不能站到另一侧。",
        ],
        [
          "非目标死角是不可逆的",
          "如果箱子进入由两面相邻墙组成的角落，而且脚下不是目标，它无法再离开。要把它向下推，你得站在上方墙里；要向右推，你得站在左侧墙里。这就是死锁。",
        ],
        [
          "不要把所有靠墙位置都当成死角",
          "只有一面墙不一定无解，箱子有时能沿墙移动。但如果目标不在那条线上，或者另一侧无法站人，仍可能锁死。先从目标倒推最后一次推动需要站在哪里。",
        ],
        [
          "本网站怎么练",
          "五个关卡由小到大，先观察目标与可站人的位置，再少量推动。推错后可以撤销一步；重置会从当前关卡开头开始。步数与推动次数分开计数，绕路不一定比错误推动更糟。",
        ],
      ],
      question:
        "箱子在左上两面墙的夹角里，脚下不是目标。它还能离开这个角落吗？",
      options: [
        "能，从右边推就行",
        "不能，只能撤销或重置",
        "再推两次会自动复位",
      ],
      correct: 1,
      explanation:
        "不能。右边站人只能把箱子推向左墙，下边站人只能推向上墙。让箱子向右或向下移动，都需要站进墙里。",
    },
    en: {
      title: "Sokoban: plan the way back before you push",
      desc: "Use a small corner diagram to recognize an irreversible move.",
      sections: [
        [
          "A walking route is not a box route",
          "You can push boxes but cannot pull them. A push requires room behind the box for you and a free destination ahead. Consider where you will stand for the next push, not just where the box goes.",
        ],
        [
          "A non-goal corner is a deadlock",
          "A box against two perpendicular walls cannot escape unless that corner is its final goal. To push it down you would need to stand in the upper wall; to push it right you would need to stand in the left wall.",
        ],
        [
          "Not every wall is a deadlock",
          "A single wall may still allow a box to slide along it. But the target must be reachable on that line, and you need space to stand behind each push. Work backward from the goal to its final pushing position.",
        ],
        [
          "Practice in this version",
          "Five compact levels let you practice different box and goal arrangements. Inspect goals and standing positions first. Undo reverses one move; Reset returns to the beginning of the current level. Walking steps and pushes are counted separately.",
        ],
      ],
      question:
        "The box touches the top and left walls, and is not on a goal. Can it leave this corner?",
      options: [
        "Yes, push from the right",
        "No, undo or reset is needed",
        "Two more pushes reset it",
      ],
      correct: 1,
      explanation:
        "No. Standing on the right pushes it into the left wall; standing below pushes it into the upper wall. Moving right or down would require standing inside a wall.",
    },
    ja: {
      title: "倉庫番：押す前に、戻すための場所を考える",
      desc: "小さな角の図で、取り返しのつかない一手を見抜きましょう。",
      sections: [
        [
          "人の通り道と箱の通り道は違う",
          "箱は押せますが引けません。箱の後ろに人が立てて、前方が空いている必要があります。次にどこから押せるかも考えましょう。",
        ],
        [
          "ゴールでない隅は行き止まり",
          "直角の二つの壁に接した箱は出せません。下へ押すには上の壁に、右へ押すには左の壁に人が立つ必要があるためです。",
        ],
        [
          "壁際がすべて詰みとは限らない",
          "壁が一面なら沿って動かせる場合があります。ただし、その線上に目標があり、押すための足場が必要です。目標から最後の押し方を逆算します。",
        ],
        [
          "この版で練習する",
          "5つの小さなステージで練習できます。間違えたら一手戻すか、現在のステージをリセットできます。歩数と押した回数は別々に数えます。",
        ],
      ],
      question:
        "箱は上と左の壁に接し、ゴール上ではありません。この隅から出せますか？",
      options: [
        "右から押せば出せる",
        "出せない。戻すかリセットする",
        "2回押すと元に戻る",
      ],
      correct: 1,
      explanation:
        "出せません。右から押すと左の壁、下から押すと上の壁に当たります。右や下へ動かすには壁の中に立つ必要があります。",
    },
  },
];
