// Guides match the rules implemented in games/<id>/index.html.
const gameGuides = {
    "2048": {
        "zh": {
            "intro": "在 4×4 棋盘上合并数字的单人益智游戏。每一次移动都会改变整盘布局，既要做出大数字，也要给下一步留下空间。",
            "gameplay": "向一个方向移动所有方块，相邻且相同的数字会合并为两倍。有效移动后，空位会出现新的 2 或 4，逐步合成 2048。",
            "controls": "电脑使用四个方向键；触屏在游戏区域上下左右滑动。按键无反应时，先点击游戏区域取得焦点。",
            "scoring": "每次合并获得合成数字对应的分数，例如 4+4 合成 8 得 8 分。合成 2048 显示胜利；棋盘填满且无法合并时结束。",
            "tips": "尽量把最大数字留在一个角落，沿同一边排列较大的数字。不要只看眼前能否合并，也要留意移动后还剩多少空格。"
        },
        "en": {
            "intro": "A solo number puzzle on a 4×4 board. Every move shifts the whole board, so growing large tiles and preserving space matter equally.",
            "gameplay": "Slide all tiles in one direction. Adjacent equal numbers merge into their sum. Each effective move adds a new 2 or 4; work toward a 2048 tile.",
            "controls": "Use the arrow keys on a computer or swipe inside the game on a touchscreen. Click the game first if the keyboard does not respond.",
            "scoring": "Merging 4+4 into 8 adds 8 points. Making 2048 shows a win; a full board with no possible merge ends the game.",
            "tips": "Keep the largest tile in a corner and arrange large tiles along one edge. Before moving, check how much empty space will remain."
        },
        "ja": {
            "intro": "4×4 の盤面で数字を合体させる一人用パズルです。大きな数字を作りながら、次の手に使える空きマスも残しましょう。",
            "gameplay": "一方向に全タイルを動かし、隣り合う同じ数字を合体させます。盤面が動くたびに 2 または 4 が追加されます。2048 を目指しましょう。",
            "controls": "パソコンは矢印キー、タッチ画面はゲーム内のスワイプで操作します。キーが反応しない場合はゲーム内を一度クリックしてください。",
            "scoring": "4 と 4 を合わせて 8 にすると 8 点です。2048 を作ると勝利表示、空きマスも合体できる組もなくなると終了です。",
            "tips": "最大の数字を隅に置き、大きい数字を一辺に並べると整理しやすくなります。動かした後の空きマスも確認しましょう。"
        }
    },
    "tetris": {
        "zh": {
            "intro": "用不同形状的下落方块铺满横行。随着消行数增加，下落速度变快，需要兼顾当前方块和下一块的落点。",
            "gameplay": "左右调整位置并旋转方块，填满一整行即可消除。观察“下一个”预览，尽量避免在堆叠内部留下空洞。",
            "controls": "←/→ 移动，↑ 旋转，↓ 加速下落，空格暂停或继续。手机使用游戏内的方向与旋转按钮。",
            "scoring": "一次消除 1/2/3/4 行分别得 100/300/500/800 分，再乘当前等级。每累计 10 行升一级；新方块无法放入时结束。",
            "tips": "优先保持堆叠平整。长条方块适合填竖直缺口，但不要为了等待它而把其余位置堆得太高。"
        },
        "en": {
            "intro": "Arrange falling shapes into complete rows. The drop speed increases as you clear lines, making the next-piece preview useful for planning.",
            "gameplay": "Move and rotate each piece before it lands. A completely filled horizontal row disappears. Avoid leaving buried gaps.",
            "controls": "←/→ move, ↑ rotates, ↓ drops faster, and Space pauses or resumes. On a phone, use the on-screen movement and rotation buttons.",
            "scoring": "Clearing 1/2/3/4 lines at once earns 100/300/500/800 points multiplied by the current level. Every 10 lines raises the level. The game ends when a new piece cannot fit.",
            "tips": "Keep the stack relatively flat. Save narrow gaps for long pieces, but do not build too high while waiting for one."
        },
        "ja": {
            "intro": "落ちてくる形の違うブロックで横一列を埋めるゲームです。消した行が増えると落下が速くなります。",
            "gameplay": "左右移動と回転で置き場所を決めます。横一列が埋まると消えます。「次のブロック」を見て、埋まった穴を作らないようにしましょう。",
            "controls": "←/→ で移動、↑ で回転、↓ で落下を早め、スペースで一時停止・再開。スマートフォンでは画面内の移動・回転ボタンを使います。",
            "scoring": "同時に 1/2/3/4 行消すと 100/300/500/800 点×現在レベル。累計 10 行ごとにレベルが上がり、新しいブロックが入らなくなると終了です。",
            "tips": "積み上げた面を平らに保ちましょう。縦の隙間は長いブロックで埋められますが、待つ間に積みすぎないことが大切です。"
        }
    },
    "memory": {
        "zh": {
            "intro": "从 16 张背面朝上的卡片中找出 8 对相同图案。比起盲目试错，记住每次翻开的图案和位置更重要。",
            "gameplay": "每次翻开两张卡。图案相同就保持翻开；不同则约一秒后盖回。找齐全部 8 对完成本局。",
            "controls": "用鼠标点击或在触屏上点按卡片。两张不同的牌盖回之前，暂时不能翻其他牌。",
            "scoring": "每翻两张算一次尝试，第一张翻开后开始计时。完成时显示尝试次数与用时，越少越好。",
            "tips": "按行或按区域探索新牌，遇到见过的图案就先找它的配对。把位置记成“左上角、第二行中间”等更容易回忆。"
        },
        "en": {
            "intro": "Find eight matching pairs among sixteen face-down cards. Remembering both the picture and its position is more useful than guessing.",
            "gameplay": "Turn over two cards at a time. Matching cards stay open; different cards turn back after about a second. Find all eight pairs to finish.",
            "controls": "Click or tap a card. Wait for a mismatched pair to turn back before selecting another card.",
            "scoring": "Each pair of flips counts as one attempt. The timer starts with the first card. Finish in fewer attempts and less time.",
            "tips": "Explore one row or region at a time. When a familiar picture appears, look for its known partner before opening another new card."
        },
        "ja": {
            "intro": "裏向きの 16 枚から同じ絵柄の 8 組を探します。絵柄と位置をセットで覚えましょう。",
            "gameplay": "一度に 2 枚めくります。同じ絵柄なら開いたまま、違う絵柄なら約 1 秒で裏に戻ります。全 8 組でクリアです。",
            "controls": "カードをクリックまたはタップします。違う 2 枚が裏に戻るまでは次のカードをめくれません。",
            "scoring": "2 枚めくると試行回数が 1 増えます。最初のカードから計時し、クリア時に回数と時間を表示します。少ないほど好成績です。",
            "tips": "行や場所を決めて順番に調べましょう。見覚えのある絵柄が出たら、新しいカードより先にその相手を探します。"
        }
    },
    "minesweeper": {
        "zh": {
            "intro": "根据数字线索判断地雷位置，打开所有安全格。可选初级、中级、高级，棋盘与地雷数量随难度变化。",
            "gameplay": "数字表示周围八格中的地雷数。先打开安全区域，再标记疑似地雷。第一下及其周围不会布雷，空白区域会自动展开。",
            "controls": "鼠标左键打开格子，右键插旗或取消旗帜；点击笑脸重新开始。需要右键标记，推荐用带鼠标的电脑。",
            "scoring": "初级 9×9/10 雷，中级 16×16/40 雷，高级 16×30/99 雷。打开全部非雷格即获胜，踩雷即结束；插旗本身不代表获胜。",
            "tips": "当一个数字周围已有足够旗帜时，其余邻格可进一步判断为安全。不要把尚未证实的猜测当成确定信息。"
        },
        "en": {
            "intro": "Use number clues to locate mines and uncover every safe square. Three difficulty settings change the board size and mine count.",
            "gameplay": "A number counts mines in its eight neighboring squares. The first opened square and its neighbors are mine-free; empty regions expand automatically.",
            "controls": "Left-click to reveal, right-click to add or remove a flag. Click the smiley to restart. A computer with a mouse is recommended for flagging.",
            "scoring": "Easy: 9×9 with 10 mines; medium: 16×16 with 40; hard: 16×30 with 99. Reveal all safe squares to win. Opening a mine ends the game; flags alone do not win it.",
            "tips": "Compare neighboring clues. Once confirmed flags satisfy a number, its remaining neighbors are safe. Keep guesses separate from proven deductions."
        },
        "ja": {
            "intro": "数字を手がかりに地雷を避け、すべての安全なマスを開くゲームです。難易度は 3 段階あります。",
            "gameplay": "数字は周囲 8 マスの地雷数です。最初に開くマスとその周囲には地雷がなく、空白部分は自動で広がります。",
            "controls": "左クリックで開き、右クリックで旗を付け外しします。笑顔ボタンでやり直せます。旗の操作にはマウス付きパソコンがおすすめです。",
            "scoring": "初級は 9×9・10 個、中級は 16×16・40 個、上級は 16×30・99 個。安全なマスを全部開くと勝利、地雷を開くと終了です。旗だけでは勝利になりません。",
            "tips": "複数の数字を照らし合わせましょう。確定した旗が必要数に達した数字の残りの隣接マスは安全です。推測と確定を区別しましょう。"
        }
    },
    "puzzle15": {
        "zh": {
            "intro": "把打乱的 1～15 数字块排回顺序，右下角留空。每次只有空格旁边的方块能移动，考验整体规划。",
            "gameplay": "点击与空格上下左右相邻的数字，把它移进空位。目标是从左到右、从上到下排列 1～15。",
            "controls": "鼠标点击或触屏点按相邻方块；不相邻的方块不会移动。使用重新开始按钮可打乱重玩。",
            "scoring": "每次有效移动记一步，游戏记录用时。全部数字归位后结束，并保存本浏览器的最少步数记录。",
            "tips": "先处理上方行和左侧列，逐渐缩小未整理区域。尽量不要为移动最后几块而破坏已排好的整行。"
        },
        "en": {
            "intro": "Restore the numbers 1–15 to order, leaving the bottom-right square empty. Only tiles beside the empty square can move.",
            "gameplay": "Click a tile directly above, below, left, or right of the gap. Arrange the numbers from left to right and top to bottom.",
            "controls": "Click or tap an adjacent tile. Nonadjacent tiles stay put. Use the restart button to shuffle a new board.",
            "scoring": "Each legal slide counts as one move. The game tracks time and saves the fewest moves in this browser when you solve the board.",
            "tips": "Build the top rows and left columns first, reducing the unsolved area. Avoid breaking completed rows just to move a single remaining tile."
        },
        "ja": {
            "intro": "1～15 の数字を順番に並べ、右下を空白にするパズルです。空白の隣のタイルだけを動かせます。",
            "gameplay": "空白の上下左右にある数字を選び、空白へ移します。左から右、上から下へ 1～15 と並べましょう。",
            "controls": "隣接するタイルをクリックまたはタップします。離れたタイルは動きません。再開ボタンで新しく混ぜて遊べます。",
            "scoring": "有効な移動ごとに手数が増え、時間も計測します。完成すると終了し、このブラウザーでの最少手数を保存します。",
            "tips": "上の行と左の列から整えると、残りの範囲を狭められます。完成した行をなるべく崩さないようにしましょう。"
        }
    },
    "sokoban": {
        "zh": {
            "intro": "在仓库中移动角色，把箱子推到星标位置。箱子只能推不能拉，落进死角后往往需要重新规划。",
            "gameplay": "走到箱子旁并朝它移动即可推动。一次只能推一个箱子，前方有墙或其他箱子时推不动；让所有目标点都有箱子即可过关。",
            "controls": "方向键或小写 WASD 移动，也可点按画面方向按钮。选关按钮切换关卡，“重置关卡”恢复本关初始布局。",
            "scoring": "页面分别统计移动步数和推箱次数。完成当前布局后可进入下一关；推错时使用重置，本版没有撤销按钮。",
            "tips": "先检查箱子最终要从哪一侧推入目标点。不要把箱子推到没有目标的墙角，并为角色绕到箱子后方留通路。"
        },
        "en": {
            "intro": "Push crates onto marked targets in a warehouse. Crates can be pushed but never pulled, so a wrong move can trap one.",
            "gameplay": "Walk toward a crate to push it one square. A wall or another crate blocks the push. Cover every target with a crate to complete the layout.",
            "controls": "Use arrow keys, lowercase WASD, or the on-screen arrows. Select a level with its button; Reset restores its starting layout.",
            "scoring": "Moves and pushes are counted separately. Complete a layout to advance. Use Reset after a deadlock; this version has no undo button.",
            "tips": "Plan which side of each crate you must stand on. Avoid corners without targets and keep a route around the crates."
        },
        "ja": {
            "intro": "倉庫の箱を星印まで押すパズルです。箱は押せますが引けないため、動かす前の確認が大切です。",
            "gameplay": "箱に向かって歩くと一つ先へ押せます。壁や別の箱があれば押せません。すべての目標を箱で埋めるとクリアです。",
            "controls": "矢印キー、小文字 WASD、画面内の方向ボタンで移動します。ステージ選択で切り替え、「リセット」で初期配置に戻せます。",
            "scoring": "歩数と押した回数を別々に数えます。クリア後は次へ進めます。この版には一手戻すボタンがないため、行き詰まったらリセットします。",
            "tips": "最後に箱をどちら側から押すか考えましょう。目標のない隅には押し込まず、箱の後ろへ回れる道を残してください。"
        }
    },
    "maze": {
        "zh": {
            "intro": "在随机生成的迷宫中寻找奖杯出口。走过的路径会留下痕迹，后续关卡的地图会逐渐变大。",
            "gameplay": "从左上方出发，沿通道走到右下方奖杯。墙壁无法穿过，走进死路时可以原路返回，利用已访问痕迹寻找其他分支。",
            "controls": "使用方向键、小写 WASD 或画面方向按钮。“新迷宫”会重新生成本关地图；抵达出口后可点“下一关”。",
            "scoring": "记录当前关卡的步数与用时，碰墙不计有效移动。到达奖杯即可完成，没有倒计时失败限制。",
            "tips": "在岔路处记住未探索的方向，走过的标记能帮助排除重复路线。卡住时先回到最近的岔路再尝试。"
        },
        "en": {
            "intro": "Find the trophy in a randomly generated maze. Visited paths remain marked, and later levels gradually grow larger.",
            "gameplay": "Travel from the upper-left start to the lower-right trophy through open passages. Backtrack from dead ends and explore another branch.",
            "controls": "Use arrow keys, lowercase WASD, or on-screen arrows. New Maze regenerates the current level; Next Level follows a successful escape.",
            "scoring": "The game tracks moves and elapsed time. Walking into a wall adds no move. Reaching the trophy completes the level, with no countdown limit.",
            "tips": "Remember unexplored branches at junctions. Use the visited trail to avoid repeating a dead end."
        },
        "ja": {
            "intro": "ランダムな迷路でトロフィーの出口を探します。通った道には印が残り、後のステージほど迷路が大きくなります。",
            "gameplay": "左上から通路を進み、右下のトロフィーを目指します。壁は通れないので、行き止まりでは分岐まで戻りましょう。",
            "controls": "矢印キー、小文字 WASD、画面内の方向ボタンで移動。「新しい迷路」で同じレベルの地図を作り直し、クリア後は次へ進めます。",
            "scoring": "手数と経過時間を記録します。壁への移動は手数に入りません。トロフィーに着けばクリアで、時間切れはありません。",
            "tips": "分岐でまだ進んでいない方向を覚えましょう。通った印を利用すると、同じ行き止まりへの往復を減らせます。"
        }
    },
    "match3": {
        "zh": {
            "intro": "在 8×8 彩色棋盘上交换相邻棋子，制造三连消除。每局有 30 次有效交换，尽量借助掉落形成连锁。",
            "gameplay": "先选一颗棋子，再点相邻棋子进行交换。横向或竖向连成至少三个同色棋子即可消除，空位补充后可能继续连消。",
            "controls": "鼠标点击或触屏点按两颗上下左右相邻的棋子。不能斜着交换，消除动画期间请等棋盘稳定。",
            "scoring": "每消除一颗得 10 分。能形成消除的交换消耗一步，无效交换会还原且不扣步数。30 步用尽后结算。",
            "tips": "优先观察棋盘下半部，让掉落影响更多位置。交换前看看是否同时形成横向和竖向的消除。"
        },
        "en": {
            "intro": "Swap adjacent gems on an 8×8 board. You have thirty successful swaps, so falling gems and chain reactions can make each move worth more.",
            "gameplay": "Select a gem, then an orthogonally adjacent gem. A row or column of at least three equal gems clears; replacements can trigger further matches.",
            "controls": "Click or tap two neighboring gems. Diagonal swaps are not allowed. Wait for clearing and falling animations to finish.",
            "scoring": "Each cleared gem earns 10 points. Only a swap that creates a match uses a move; invalid swaps revert for free. The game ends after 30 moves.",
            "tips": "Look for swaps low on the board to disturb more gems above. Check whether one swap can create both a horizontal and a vertical match."
        },
        "ja": {
            "intro": "8×8 の盤面で隣の宝石を交換する三つ消しです。成功する交換は 30 回まで。落下による連鎖を狙いましょう。",
            "gameplay": "宝石を一つ選び、その上下左右の宝石を選んで交換します。同じ色が縦か横に 3 個以上並ぶと消え、補充後も連鎖することがあります。",
            "controls": "隣接する二つをクリックまたはタップ。斜めには交換できません。消去・落下のアニメーションが終わるまで待ちます。",
            "scoring": "1 個消すと 10 点。消去が起きる交換だけが手数を使い、成立しない交換は無料で元に戻ります。30 手で終了です。",
            "tips": "盤面の下側を消すと上の配置も変わります。一手で縦と横を同時に消せないか確認しましょう。"
        }
    },
    "guessnumber": {
        "zh": {
            "intro": "找出系统选定的 1～100 整数。每次猜测都会获得太大或太小的反馈，用逻辑不断缩小答案范围。",
            "gameplay": "输入范围内的整数并提交，根据提示更新下一次猜测。页面会显示当前范围和之前的错误猜测，直到猜中答案。",
            "controls": "点击输入框输入数字，按 Enter 或点击猜测按钮提交。重新开始会生成新的答案并清空本局记录。",
            "scoring": "每次有效提交增加一次尝试。猜中即结束，尝试次数越少越好，最佳次数保存在当前浏览器。",
            "tips": "优先猜当前范围的中间数，例如第一猜 50。根据大小提示舍弃一半范围，不要重复已经排除的数字。"
        },
        "en": {
            "intro": "Find a hidden integer from 1 to 100. Every guess tells you whether it is too high or too low, narrowing the possibilities.",
            "gameplay": "Submit an integer, read the hint, and guess again inside the remaining range. The page shows the range and previous wrong guesses.",
            "controls": "Type in the number field, then press Enter or click the guess button. Restart chooses a new answer and clears the current round.",
            "scoring": "Each valid submission adds one attempt. A correct guess finishes the round; fewer attempts are better. Your best count is stored in this browser.",
            "tips": "Guess near the midpoint of the current range, starting around 50. Use each hint to eliminate half the candidates instead of repeating ruled-out numbers."
        },
        "ja": {
            "intro": "1～100 の隠された整数を当てます。「大きすぎる」「小さすぎる」というヒントで範囲を絞りましょう。",
            "gameplay": "整数を送信してヒントを読み、残った範囲から次を選びます。現在の範囲と過去の不正解も表示されます。",
            "controls": "入力欄に数字を入れ、Enter または回答ボタンで送信します。再開すると答えと今回の履歴がリセットされます。",
            "scoring": "有効な回答ごとに試行回数が増えます。正解で終了し、少ない回数ほど好成績。このブラウザーに最少回数を保存します。",
            "tips": "最初は 50 など、残り範囲の中央を選びましょう。毎回候補を半分に絞り、除外した数字は繰り返さないようにします。"
        }
    },
    "snake": {
        "zh": {
            "intro": "控制不断前进的蛇吃红色食物，身体会越来越长，速度也会逐渐提高。留出安全路线比单纯追逐食物更重要。",
            "gameplay": "游戏载入后蛇自动移动。改变方向接近食物，同时避开边界和自己的身体；不能直接向当前前进方向的反方向掉头。",
            "controls": "电脑用四个方向键；窄屏手机可使用游戏下方的方向按钮。先点击游戏区域再使用键盘。",
            "scoring": "每吃一个食物得 10 分并增长，移动间隔逐步缩短。撞墙或撞到身体立即结束，最高分保存在本浏览器。",
            "tips": "用较大的回环保持活动空间。吃到食物后先观察尾巴与前方路线，避免急转后把自己封在角落。"
        },
        "en": {
            "intro": "Steer an automatically moving snake toward red food. Each bite makes it longer and gradually faster, leaving less room for mistakes.",
            "gameplay": "Turn toward food while avoiding walls and your own body. You cannot reverse directly into the opposite direction.",
            "controls": "Use arrow keys on a computer. Narrow phone layouts provide direction buttons below the game. Click the game before using the keyboard.",
            "scoring": "Each food adds 10 points and length. The movement interval gradually shortens. Hitting a wall or your body ends the run; the best score stays in this browser.",
            "tips": "Leave wide loops and an escape route. After eating, check your tail and the path ahead before making a tight turn."
        },
        "ja": {
            "intro": "自動で進むヘビを操作して赤いエサを食べます。食べるほど長く速くなるので、安全な通路を残しましょう。",
            "gameplay": "壁や自分の体を避けながらエサへ向かいます。現在の進行方向と真逆には直接曲がれません。",
            "controls": "パソコンは矢印キー、幅の狭いスマートフォン画面では下の方向ボタンを使います。キーボード操作前にゲーム内をクリックしてください。",
            "scoring": "エサ 1 個で 10 点と体の延長。移動間隔は徐々に短くなります。壁や体に触れると終了し、最高点をこのブラウザーに保存します。",
            "tips": "大きく回る道を残しましょう。食べた直後は尻尾と進路を見て、隅に閉じ込められる急旋回を避けます。"
        }
    },
    "flappy": {
        "zh": {
            "intro": "用一次次轻点控制小鸟高度，穿过上下管道之间的空隙。小鸟会持续下落，需要掌握起落节奏。",
            "gameplay": "开始后每次拍翅都会向上抬升，停止点击则逐渐下落。对准管道空隙中部，连续穿过更多管道。",
            "controls": "按空格、点击游戏画布或触屏点按拍翅。开始画面和结束后可通过拍翅操作开启一局。",
            "scoring": "完整通过一组管道得 1 分。撞上管道、地面或画面顶部都会结束，最高分保存在当前浏览器。",
            "tips": "使用短促、均匀的轻点，而不是不停连按。提前调整高度，靠近管道时避免突然大幅上升。"
        },
        "en": {
            "intro": "Keep a bird airborne with carefully timed taps and pass through gaps between pipes. Gravity keeps pulling it down.",
            "gameplay": "Each flap gives an upward push. Let the bird fall between flaps and aim near the middle of the next opening.",
            "controls": "Press Space, click the canvas, or tap the touchscreen to flap. A flap can also start a new round from the start or game-over screen.",
            "scoring": "Passing a complete pair of pipes earns 1 point. Pipes, the ground, and the top boundary all end the run on contact. The best score is saved locally.",
            "tips": "Use short, even taps. Adjust height early rather than making a large correction right next to a pipe."
        },
        "ja": {
            "intro": "タイミングよく羽ばたいて、上下のパイプの隙間を通ります。何もしないと鳥は重力で下がります。",
            "gameplay": "一回の羽ばたきで上向きの勢いが付きます。合間に下降させ、次の隙間の中央を目指しましょう。",
            "controls": "スペース、画面クリック、タップで羽ばたきます。開始画面や終了後も同じ操作で新しい一局を始められます。",
            "scoring": "パイプ一組を通過すると 1 点。パイプ、地面、上端に触れると終了です。最高点はこのブラウザーに保存されます。",
            "tips": "短く一定の間隔で入力しましょう。パイプの直前で急上昇するより、早めの高さ調整が有効です。"
        }
    },
    "breakout": {
        "zh": {
            "intro": "用底部挡板反弹小球，清除上方砖墙。击球位置会改变反弹方向，可以主动寻找能打到剩余砖块的角度。",
            "gameplay": "点击开始后移动挡板接住下落小球。每关有 5 行、10 列砖块，清空后自动进入下一关。",
            "controls": "使用 ←/→ 或在画布内移动鼠标控制挡板；触屏可左右拖动。按开始按钮发起本局。",
            "scoring": "每块砖得 10×当前关卡分数。共有 3 条生命，小球落出底部扣一条，生命耗尽结束。",
            "tips": "先保证接到球，再利用挡板边缘改变角度。球向下飞时提前移到落点，不要等到贴近挡板才追。"
        },
        "en": {
            "intro": "Bounce a ball off the bottom paddle to clear a wall of bricks. Where the ball hits the paddle changes its rebound angle.",
            "gameplay": "Start a round and catch the falling ball. Each stage contains five rows of ten bricks; clearing them advances automatically.",
            "controls": "Use ←/→ or move the mouse within the canvas. On a touchscreen, drag sideways. Use the start button to begin.",
            "scoring": "A brick earns 10 × the current level. You have three lives; a ball falling below the screen costs one. Losing all three ends the game.",
            "tips": "Prioritize catching the ball, then use the paddle edges to redirect it. Move toward the predicted landing point early."
        },
        "ja": {
            "intro": "下のパドルで球を跳ね返し、上のブロックを壊します。パドルに当たる位置で反射角を変えられます。",
            "gameplay": "開始後、落ちてくる球を受け止めます。各面は 5 行×10 列のブロックで、全消去すると自動で次へ進みます。",
            "controls": "←/→ または画面内のマウス移動で操作。タッチ画面では左右にドラッグします。開始ボタンで遊び始めます。",
            "scoring": "ブロック 1 個は 10×現在レベル点。残機は 3 で、下に落とすと 1 減り、なくなると終了です。",
            "tips": "まずは確実に受け止めましょう。余裕があれば端で当てて角度を変え、落下中に早めに着地点へ移動します。"
        }
    },
    "spaceshooter": {
        "zh": {
            "intro": "驾驶底部飞船迎击成队敌人。敌阵会左右移动并逐渐逼近，还会发射子弹，需要在进攻与躲避之间切换。",
            "gameplay": "点击开始后横向移动飞船，向上射击。清空当前敌群会出现下一波，后续敌人的移动与射击更紧迫。",
            "controls": "←/→ 移动，空格发射子弹。此版本没有触屏移动或射击按钮，建议使用电脑键盘。",
            "scoring": "击毁一个敌人得 100 分。初始 3 条生命，中弹扣一条；生命归零或敌人降到飞船附近时结束。",
            "tips": "不要只盯着上方敌人，要同时留意下落子弹。横向移动时选择空隙，优先消除已逼近底部的敌人。"
        },
        "en": {
            "intro": "Defend the bottom of the screen against moving enemy formations. They descend and fire back, so shooting and dodging both matter.",
            "gameplay": "Start, move sideways, and fire upward. Clearing the formation starts another wave with faster movement and more shooting pressure.",
            "controls": "Use ←/→ to move and Space to shoot. This version has no touch movement or fire buttons; use a computer keyboard.",
            "scoring": "Each enemy earns 100 points. You start with three lives and lose one per bullet hit. Zero lives or enemies reaching the ship area ends the game.",
            "tips": "Watch incoming bullets as well as targets. Move through clear lanes and prioritize enemies close to the bottom."
        },
        "ja": {
            "intro": "画面下の宇宙船で敵の編隊を迎え撃ちます。敵は左右に動きながら下降し、弾も撃ってきます。",
            "gameplay": "開始して左右に移動し、上へ射撃します。編隊を全滅させると次の波が来て、移動や攻撃が激しくなります。",
            "controls": "←/→ で移動、スペースで射撃。この版にはタッチ用の移動・射撃ボタンがないため、パソコンのキーボードを使ってください。",
            "scoring": "敵 1 体で 100 点。初期ライフは 3、被弾で 1 減ります。ライフが尽きるか敵が宇宙船付近まで来ると終了です。",
            "tips": "標的だけでなく下りてくる弾も見ましょう。空いた列へ動き、下に迫った敵を優先して倒します。"
        }
    },
    "runner": {
        "zh": {
            "intro": "角色自动向前奔跑，沿途出现箱子、飞鸟和金币。跑得越远速度越高，目标是在躲障碍的同时延长距离。",
            "gameplay": "观察前方障碍，用跳跃或下滑调整姿态。金币可以收集，但路线危险时优先保住本局距离。",
            "controls": "↑ 或空格跳跃，按住 ↓ 下滑，松开恢复。触屏使用跳跃和下滑按钮；跳跃需在落地且未下滑时发动。",
            "scoring": "距离持续累计并用于本局成绩，金币单独计数。碰到障碍物立即结束；距离增长后会逐步加速。",
            "tips": "看前方一段距离而不只看角色脚下。连续障碍之间要留出落地时间，跳起时不能再次起跳。"
        },
        "en": {
            "intro": "An automatic runner with crates, birds, and coins along the route. The longer you survive, the faster the scene moves.",
            "gameplay": "Read incoming obstacles and jump or slide to change your profile. Collect coins when the route is safe, but prioritize distance.",
            "controls": "↑ or Space jumps; hold ↓ to slide and release to stand. Touch buttons provide jump and slide. Jumping requires being grounded and not sliding.",
            "scoring": "Distance is the run score; coins are counted separately. Any obstacle collision ends the run. Speed increases with distance.",
            "tips": "Watch ahead rather than only beneath the character. Leave time to land between jumps; there is no midair second jump."
        },
        "ja": {
            "intro": "自動で走るキャラクターの前に箱、鳥、コインが現れます。進むほど速くなり、より長い距離を目指します。",
            "gameplay": "前方を見てジャンプやスライドで姿勢を変えます。コインは安全なときに集め、危険な場面では生き残ることを優先しましょう。",
            "controls": "↑ またはスペースでジャンプ、↓ を押している間はスライド。タッチ用ボタンもあります。ジャンプは着地中かつスライドしていないときに使えます。",
            "scoring": "距離が成績となり、コイン数は別に表示します。障害物に触れると終了。距離に応じて速度が上がります。",
            "tips": "少し先の障害物を見ましょう。連続ジャンプには着地時間が必要で、空中でもう一度跳ぶことはできません。"
        }
    },
    "ninjajump": {
        "zh": {
            "intro": "引导忍者在平台之间不断向上弹跳。忍者落在普通平台上会自动起跳，你主要负责左右调整落点。",
            "gameplay": "开始后选择上方可达平台，下降时落在平台上继续上升。后段会出现移动平台和易碎平台，后者会碎裂而不提供弹跳。",
            "controls": "←/→ 或小写 A/D 移动；触屏按住画布左半边或右半边控制方向，松开停止输入。越过左右边缘会从另一侧出现。",
            "scoring": "成绩随达到的上升高度增加。掉到可见画面下方即结束，本浏览器保存最高分。",
            "tips": "先选好下一个落点再横移。遇到易碎平台要准备绕行，不要把它当作稳定支点；利用左右穿屏缩短横向距离。"
        },
        "en": {
            "intro": "Guide a ninja upward from platform to platform. Landing on a normal platform automatically launches another jump; you steer sideways.",
            "gameplay": "Choose a reachable platform and land while falling. Later platforms may move or break; a breaking platform crumbles without bouncing you.",
            "controls": "Use ←/→ or lowercase A/D. On touchscreens, hold the left or right half of the canvas. Crossing a side edge wraps to the other side.",
            "scoring": "Score increases with upward progress. Falling below the visible play area ends the run. Your best is saved in this browser.",
            "tips": "Choose the next landing spot before moving. Avoid relying on breaking platforms, and use side wrapping to shorten a long crossing."
        },
        "ja": {
            "intro": "忍者を左右に導いて足場を登ります。普通の足場に着地すると自動で次のジャンプが始まります。",
            "gameplay": "届く足場を選び、下降中に着地します。後半は動く足場や壊れる足場が登場。壊れる足場では跳ね返らず、崩れます。",
            "controls": "←/→ または小文字 A/D。タッチ画面は左半分・右半分を押して移動し、離すと入力解除。左右の端を越えると反対側へ出ます。",
            "scoring": "到達した高さに応じて得点が増えます。画面の下へ落ちると終了し、最高点をこのブラウザーに保存します。",
            "tips": "動く前に次の着地点を決めましょう。壊れる足場を頼りにせず、横断には左右の回り込みも利用できます。"
        }
    },
    "fruitslice": {
        "zh": {
            "intro": "划过抛起的水果得分，同时避开混在其中的炸弹。水果上升后会落下，需要在落出画面前完成切割。",
            "gameplay": "点击开始，观察水果轨迹，按住并划过水果。炸弹可以放过，普通水果则不要连续漏掉。",
            "controls": "鼠标按住左键拖动切割，松开停止；触屏用手指按住滑动。仅移动鼠标而不按住不会切水果。",
            "scoring": "每个水果 10 分。漏掉 3 个普通水果结束；切到一次炸弹立即结束。分数增加后水果出现更频繁。",
            "tips": "水果靠近最高点时移动较慢，较容易瞄准。遇到炸弹夹在水果中时，使用短划线而不是大范围扫过。"
        },
        "en": {
            "intro": "Slice tossed fruit while avoiding bombs. Fruit falls back down, so cut it before it leaves the screen.",
            "gameplay": "Start, watch the flight paths, and drag through fruit while holding. Let bombs fall safely, but avoid missing ordinary fruit.",
            "controls": "Hold the left mouse button and drag; release to stop. On a touchscreen, press and swipe. Moving the mouse without holding does not slice.",
            "scoring": "Each fruit earns 10 points. Three missed fruits end the run, and slicing one bomb ends it immediately. Spawns become more frequent with score.",
            "tips": "Fruit moves more slowly near the top of its arc. Use short, controlled strokes when a bomb is mixed into a group."
        },
        "ja": {
            "intro": "放り上げられた果物を切り、混ざっている爆弾を避けます。果物が落ちてしまう前に狙いましょう。",
            "gameplay": "開始後、軌道を見ながら押したまま果物をなぞります。爆弾は見逃して構いませんが、普通の果物は取り逃さないようにします。",
            "controls": "マウス左ボタンを押してドラッグ、離すと停止。タッチ画面では指で押してスワイプします。マウスを動かすだけでは切れません。",
            "scoring": "果物 1 個で 10 点。普通の果物を 3 個逃すか、爆弾を 1 回切ると終了。得点とともに出現が増えます。",
            "tips": "軌道の頂点付近は狙いやすい場所です。爆弾が近いときは大きく振らず、短い線で切りましょう。"
        }
    },
    "knifehit": {
        "zh": {
            "intro": "把飞刀投向旋转木靶的空隙。已经插上的刀会随木靶转动，越往后可用空隙越少。",
            "gameplay": "观察靶面转动，在没有旧刀的位置投出新刀。投完本关配额进入下一关，后续会加快转速并出现预插飞刀。",
            "controls": "点击画面、触屏点按或按空格投刀。同一时间只能有一把飞刀在飞行，落靶后才能继续投。",
            "scoring": "每次成功插刀得 10 分。第一关需投 5 把，后续数量增加；撞上已有飞刀立即结束。",
            "tips": "先观察一圈再出手，预留飞刀飞到木靶的时间。不要因为眼前空着就连续猛点，空隙会随靶转走。"
        },
        "en": {
            "intro": "Throw knives into gaps on a rotating wooden target. Stuck knives rotate with it, gradually leaving less room.",
            "gameplay": "Time a throw into a clear section. Use the full knife allowance to advance; later levels spin faster and add pre-stuck knives.",
            "controls": "Click, tap, or press Space to throw. Only one knife can fly at a time; wait for it to land before throwing again.",
            "scoring": "Each successful knife earns 10 points. Level one needs five knives, with more later. Hitting a stuck knife ends the run immediately.",
            "tips": "Watch a rotation before firing and account for travel time. Rapid clicking can fail because a clear gap rotates away before impact."
        },
        "ja": {
            "intro": "回転する木の的の隙間へナイフを投げます。刺さったナイフも回るため、空きが少なくなっていきます。",
            "gameplay": "空いている部分に合わせて投げ、規定本数を刺すと次へ進みます。後半は回転が速くなり、最初から刺さったナイフも増えます。",
            "controls": "クリック、タップ、スペースで投げます。同時に飛ばせるのは 1 本だけで、刺さってから次を投げられます。",
            "scoring": "成功 1 本で 10 点。最初の面は 5 本で、その後は増えます。既存のナイフに当たると即終了です。",
            "tips": "まず回転を観察し、到着までの時間も考えましょう。今空いている場所でも、着くまでに回ってしまうことがあります。"
        }
    },
    "catchfruits": {
        "zh": {
            "intro": "移动篮子接住落下的水果，躲开炸弹。水果越来越密、下落越来越快，判断先接哪一个很关键。",
            "gameplay": "点击开始，把篮子移动到水果下方等待接住。让炸弹从篮子旁边落下，及时赶往下一个水果的位置。",
            "controls": "使用 ←/→、画布内的鼠标移动或触屏横向拖动控制篮子。",
            "scoring": "接一个水果得 10 分。漏接普通水果或接到炸弹各扣 1 条生命；初始 3 条，耗尽结束。",
            "tips": "优先接更靠近底部的水果，提前看上方下一批。水果与炸弹挤在一起时，不要为了 10 分连续损失生命。"
        },
        "en": {
            "intro": "Move a basket under falling fruit and away from bombs. Drops become faster and more frequent as your score grows.",
            "gameplay": "Start and position the basket beneath fruit. Let bombs pass beside it, then move toward the next catch.",
            "controls": "Use ←/→, move the mouse inside the canvas, or drag sideways on a touchscreen.",
            "scoring": "Fruit earns 10 points. Missing ordinary fruit or catching a bomb costs one life. You start with three; losing them all ends the run.",
            "tips": "Catch the lowest fruit first while watching the next drops. Avoid chasing a small reward through a cluster of bombs."
        },
        "ja": {
            "intro": "かごで落ちる果物を受け止め、爆弾を避けます。得点が増えるほど落下が速く、数も増えます。",
            "gameplay": "開始後、果物の下にかごを移します。爆弾は横へ落とし、次の果物へ向かいましょう。",
            "controls": "←/→、画面内のマウス移動、タッチ画面での左右ドラッグで操作します。",
            "scoring": "果物 1 個で 10 点。果物を逃す、または爆弾を受けるとライフが 1 減ります。初期 3 で、なくなると終了です。",
            "tips": "低い位置の果物から優先し、上の次の落下も確認しましょう。爆弾が密集した場所へ無理に追いかけないことが大切です。"
        }
    },
    "dodge": {
        "zh": {
            "intro": "控制圆形角色避开从四周进入的障碍。没有攻击操作，目标是保持安全位置并尽可能久地存活。",
            "gameplay": "开始后在场地中移动，寻找障碍之间的空隙。随着存活时间增加，障碍出现频率和速度都会提高。",
            "controls": "在画布内移动鼠标，或在触屏上拖动手指控制角色。此版本没有方向键移动。",
            "scoring": "成绩是本局存活时间，单位为秒。与任意障碍接触即结束，最长时间保存在本浏览器。",
            "tips": "尽量保留多个逃离方向，不要长时间贴在角落。小幅提前调整通常比突然穿过一大片障碍更稳。"
        },
        "en": {
            "intro": "Move a circular character away from incoming hazards. There is no attack button; survival depends on finding safe space.",
            "gameplay": "Start and navigate between obstacles entering from all four sides. Their speed and spawn frequency increase as time passes.",
            "controls": "Move the mouse inside the canvas or drag your finger on a touchscreen. This version has no arrow-key movement.",
            "scoring": "Your result is survival time in seconds. Touching any hazard ends the run. The longest time is stored in this browser.",
            "tips": "Keep several escape directions open rather than staying in a corner. Make small early adjustments instead of crossing crowded areas suddenly."
        },
        "ja": {
            "intro": "円形のキャラクターを動かし、四方から来る障害物を避けます。攻撃はなく、安全な場所を探して生き残ります。",
            "gameplay": "開始後、障害物の間を移動します。時間が長くなるほど出現頻度と速度が上がります。",
            "controls": "画面内のマウス移動、または指のドラッグで操作。この版には矢印キー移動はありません。",
            "scoring": "成績は秒単位の生存時間です。障害物に触れると終了し、最長時間をこのブラウザーに保存します。",
            "tips": "隅に留まらず、複数の逃げ道を残しましょう。密集地帯を急に横切るより、早めの小さな移動が有効です。"
        }
    },
    "stack": {
        "zh": {
            "intro": "把横向移动的方块一层层叠成高塔。只保留与下层重叠的部分，越叠偏，下一层可用宽度越小。",
            "gameplay": "点击开始，等待移动方块与塔顶对齐后放下。误差很小会保留整层宽度，偏出的部分则掉落。",
            "controls": "点击画面、触屏点按或按空格放置当前方块。方块自动左右移动，不需要拖动。",
            "scoring": "每成功放一层得 1 分。完全没有重叠，或剩余宽度小于 10 像素时结束。后续移动速度逐渐增加。",
            "tips": "盯住塔顶边缘作为参照，找到稳定出手节奏。宁可再等一次往返，也不要在明显错位时放置。"
        },
        "en": {
            "intro": "Stack moving blocks into a tall tower. Only the overlap with the previous layer remains, so inaccurate placements make the next layer narrower.",
            "gameplay": "Start and place each moving block when it aligns with the tower. A very small error preserves its width; larger overhangs fall away.",
            "controls": "Click, tap, or press Space to place. Blocks move sideways automatically; no dragging is needed.",
            "scoring": "Each placed layer earns 1 point. No overlap, or a remaining width below 10 pixels, ends the run. Movement gradually speeds up.",
            "tips": "Use the tower edge as a reference. Wait for another pass rather than dropping a visibly misaligned block."
        },
        "ja": {
            "intro": "左右に動くブロックを積み重ねます。下の段と重なる部分だけが残り、ずれるほど次の段が細くなります。",
            "gameplay": "開始後、塔の上に合った瞬間に置きます。ごく小さい誤差なら幅を保てますが、大きくはみ出した部分は落ちます。",
            "controls": "クリック、タップ、スペースで配置します。ブロックは自動で横に動き、ドラッグは不要です。",
            "scoring": "1 段置くと 1 点。重なりがない、または幅が 10 ピクセル未満になると終了。次第に移動が速くなります。",
            "tips": "塔の端を目印にしましょう。大きくずれているときは、次の往復を待つ方が安定します。"
        }
    },
    "pinball": {
        "zh": {
            "intro": "发射小球撞击圆形弹柱和顶部目标，再用底部挡板接回。这个版本使用一块横向挡板来维持弹跳。",
            "gameplay": "点击开始后发球，左右移动挡板避免小球漏到底部。失去一球后会出现新球，需要再次发射。",
            "controls": "鼠标移动或触屏横向拖动控制挡板；点击画布或按空格发球。",
            "scoring": "初始 3 球。碰弹柱得 50 分；每个顶部目标的前三次命中依次得 300、200、100 分。三球全部落失后结束。",
            "tips": "先把挡板移到落球路线，再用偏心接球改变横向速度。重新发球前可调整挡板，选择起始位置。"
        },
        "en": {
            "intro": "Launch a ball into bumpers and top targets, then catch it with the bottom paddle. This version uses one horizontally moving paddle.",
            "gameplay": "Start, launch, and keep the ball above the bottom edge. After a lost ball, launch the replacement again.",
            "controls": "Move the mouse or drag sideways to position the paddle. Click the canvas or press Space to launch.",
            "scoring": "You have three balls. Bumpers earn 50 points. Each top target awards 300, 200, then 100 on its first three hits. Losing all balls ends the round.",
            "tips": "Get beneath a falling ball early. Off-center paddle hits change its sideways speed, and you can position the paddle before the next launch."
        },
        "ja": {
            "intro": "球を発射してバンパーや上の標的に当て、下のパドルで受け止めます。この版は横移動する一枚のパドルを使います。",
            "gameplay": "開始して発射し、下に落とさないよう受けます。球を失ったら補充された球をもう一度発射します。",
            "controls": "マウス移動か左右ドラッグでパドルを動かし、画面クリックかスペースで発射します。",
            "scoring": "持ち球は 3。バンパーは 50 点、各上部標的は最初の 3 回が順に 300、200、100 点。全て失うと終了です。",
            "tips": "早めに落下地点へ移動しましょう。中心からずらして受けると横方向の速度が変わります。発射前の位置も調整できます。"
        }
    },
    "racing": {
        "zh": {
            "intro": "在三条车道之间切换，避开迎面而来的车辆。汽车自动前进加速，重点是观察道路空隙。",
            "gameplay": "点击开始，在障碍车接近前切到安全车道。换道有过渡过程，需要提前判断，而不是贴近后才闪避。",
            "controls": "←/→ 或小写 A/D 向相邻车道切换，也可点击游戏中的左右按钮。",
            "scoring": "行驶期间分数持续增加，速度随进度提升。与其他车辆碰撞即结束，最佳分数保存在当前浏览器。",
            "tips": "观察两辆车之间的纵向间隔，确认目标车道也安全再换道。尽量保持可继续转移的余地。"
        },
        "en": {
            "intro": "Switch between three lanes to avoid traffic. Your car advances and speeds up automatically, leaving you to choose a safe route.",
            "gameplay": "Start and change lanes before another car gets close. Lane changes animate gradually, so react early.",
            "controls": "Use ←/→, lowercase A/D, or the on-screen left and right buttons to move one lane at a time.",
            "scoring": "Score rises while you drive, and speed increases with progress. A collision ends the run. Your best score is saved locally.",
            "tips": "Check the spacing between cars and confirm the destination lane is clear before moving. Keep another escape route available."
        },
        "ja": {
            "intro": "3 車線を切り替えて車を避けます。自動で前進・加速するので、安全な車線選びに集中しましょう。",
            "gameplay": "開始後、車が近づく前に移動します。車線変更には移動時間があるため、早めの判断が必要です。",
            "controls": "←/→、小文字 A/D、画面内の左右ボタンで隣の車線へ移ります。",
            "scoring": "走行中は得点が増え、進行に応じて速度も上がります。衝突すると終了し、最高点をこのブラウザーに保存します。",
            "tips": "車同士の間隔を見て、移動先も安全か確認しましょう。次に逃げられる車線も残すと安心です。"
        }
    },
    "pong": {
        "zh": {
            "intro": "两位玩家共用一台设备的乒乓对战。移动左右球拍，把球打穿对方防线，本版没有电脑对手。",
            "gameplay": "双方在开始后上下移动自己的球拍。球碰上下边界会反弹，击球会加快球速，落点影响回球角度。",
            "controls": "左侧玩家用 W/S 上下移动，右侧玩家用 ↑/↓。触屏可分别按住对应玩家的上下按钮。",
            "scoring": "球越过一侧边界，对方得 1 分。先得到 5 分的玩家获胜，每次得分后重新发球。",
            "tips": "观察球的运动方向提前移动。用球拍靠边位置接球可以改变回球斜率，但应先保证接到球。"
        },
        "en": {
            "intro": "A two-player paddle match on one shared device. Both paddles are human-controlled; this version has no computer opponent.",
            "gameplay": "Move each paddle up and down after starting. The ball bounces off the top and bottom, speeds up on paddle hits, and changes angle with the contact point.",
            "controls": "Left player: W/S. Right player: ↑/↓. On touchscreens, hold the up or down button for the corresponding player.",
            "scoring": "A ball passing one side gives the opponent 1 point. First to 5 wins, with a new serve after each point.",
            "tips": "Follow the incoming path early. Edge hits create sharper angles, but a secure return is more important than an ambitious shot."
        },
        "ja": {
            "intro": "同じ端末で二人が対戦するパドルゲームです。左右とも人が操作し、この版にコンピューター対戦はありません。",
            "gameplay": "開始後に球を打ち返します。上下の壁で反射し、パドルに当たると速くなります。当てる位置で角度も変わります。",
            "controls": "左プレイヤーは W/S、右は ↑/↓。タッチ画面では各プレイヤーの上下ボタンを押して操作します。",
            "scoring": "左右の端を抜けると相手に 1 点。先に 5 点で勝利し、得点のたびに再サーブします。",
            "tips": "球の進路を見て早めに移動しましょう。パドルの端で角度を付けられますが、まず確実に返すことが大切です。"
        }
    },
    "football": {
        "zh": {
            "intro": "进行一轮 5 次的点球挑战。每脚射门选择目标位置，守门员会随机扑向左、中或右。",
            "gameplay": "点击开始后，选择球门内的落点完成射门。等待本次射门与结果动画结束，再选择下一脚的位置。",
            "controls": "鼠标点击或触屏点按球门区域射门。无需蓄力，点击位置决定瞄准点。",
            "scoring": "记录进球数与未进数，5 轮后结算。守门员是否扑到主要取决于球与守门员最终的横向距离。",
            "tips": "尝试球门两侧并变换瞄准位置。守门员方向具有随机性，同一个点不会保证每次都进球。"
        },
        "en": {
            "intro": "Take five penalty shots. Choose a target for each kick while the goalkeeper randomly dives left, right, or stays central.",
            "gameplay": "Start and select a point inside the goal. Wait for the shot and result animation before taking the next kick.",
            "controls": "Click or tap the goal area. There is no power charging; your selected point sets the aim.",
            "scoring": "Goals and misses are counted across five rounds. Saves mainly depend on the final horizontal distance between the ball and goalkeeper.",
            "tips": "Try both sides and vary your aim. The keeper is random, so repeating one target does not guarantee a goal."
        },
        "ja": {
            "intro": "5 回のペナルティーキックに挑戦します。狙う位置を選び、左右か中央へランダムに動くキーパーをかわします。",
            "gameplay": "開始後、ゴール内の位置を選んで蹴ります。シュートと結果の表示が終わってから次を狙います。",
            "controls": "ゴール内をクリックまたはタップ。力をためる操作はなく、選んだ位置で狙いが決まります。",
            "scoring": "5 回のゴール数と失敗数を集計します。セーブは主に球とキーパーの最終的な横方向の距離で決まります。",
            "tips": "両側を試しながら狙いを変えましょう。キーパーはランダムなので、同じ場所でも必ず決まるわけではありません。"
        }
    },
    "basketball": {
        "zh": {
            "intro": "在 45 秒内把球投进篮筐，连续命中会提高单球分值。拖动方向与距离共同决定出手轨迹。",
            "gameplay": "开始后按住画布向投篮方向的反方向拖动，再松手出球。篮筐在右上方，因此通常向左下拉；等当前球结束后再投。",
            "controls": "鼠标按住拖动后松开；触屏同样按住、拖动、松手。拖得更远力量更大，但力量有上限。",
            "scoring": "连中第 1 球得 1 分，第 2、3 球各 2 分，第 4 球起各 3 分。投失清零连中次数，45 秒到时结算。",
            "tips": "先用小幅调整找到稳定角度，再调力度。不要每球都大幅改动，观察球是过高、过低还是没到篮筐。"
        },
        "en": {
            "intro": "Score baskets within 45 seconds. Consecutive makes increase the value of each shot, while drag direction and distance determine the launch.",
            "gameplay": "Start, drag opposite to the intended shot, and release. The hoop is upper-right, so usually pull down-left. Wait until the current ball is gone before shooting again.",
            "controls": "Hold and drag with the mouse or a finger, then release. A longer drag adds power up to a fixed cap.",
            "scoring": "The first consecutive basket earns 1 point, the second and third earn 2 each, and the fourth onward earns 3 each. A miss resets the streak. Time expires after 45 seconds.",
            "tips": "Adjust the angle a little at a time, then tune power. Watch whether the shot falls short or passes above or below the hoop."
        },
        "ja": {
            "intro": "45 秒以内にゴールを決める投球ゲームです。連続成功で一球の得点が増え、ドラッグの方向と長さで軌道が変わります。",
            "gameplay": "開始後、飛ばしたい方向と逆へ引いて離します。かごは右上なので通常は左下へ引きます。前の球が消えてから次を投げます。",
            "controls": "マウスや指で押し、ドラッグして離します。長く引くほど強くなりますが、力には上限があります。",
            "scoring": "連続成功の 1 球目は 1 点、2・3 球目は各 2 点、4 球目以降は各 3 点。外すと連続回数が戻り、45 秒で終了します。",
            "tips": "角度を少しずつ合わせてから強さを調整しましょう。届かないのか、高すぎるのか、低すぎるのかを見分けます。"
        }
    },
    "tictactoe": {
        "zh": {
            "intro": "两人轮流在 3×3 棋盘落下 X 和 O，抢先连成三个。适合与身边的人共用一台设备轮流操作。",
            "gameplay": "X 先手，双方轮流选择空格。横向、竖向或斜向连成一条三个同符号的线即可获胜。",
            "controls": "鼠标点击或触屏点按空格落子。已占用位置不能重复落子；点击新游戏重开一局。",
            "scoring": "获胜方的累计胜局加一。棋盘填满且无人连线则平局；新局会清空棋盘，当前页面的累计胜局保留。",
            "tips": "先看自己有没有一步获胜的机会，再挡住对方的两连。中心和角落有利于形成多条潜在连线。"
        },
        "en": {
            "intro": "Two people take turns placing X and O on a 3×3 grid. Share one device and try to complete a line of three first.",
            "gameplay": "X starts. Choose an empty square on your turn. Three matching symbols in a row, column, or diagonal win.",
            "controls": "Click or tap an empty square. Occupied squares cannot be reused. The new-game button clears the board for another round.",
            "scoring": "The winner gains one recorded win. A full board without a line is a draw. Starting a new round keeps the current page’s win totals.",
            "tips": "Take an immediate win if available, otherwise block an opponent’s pair. The center and corners can support multiple threats."
        },
        "ja": {
            "intro": "二人で同じ端末を使い、3×3 の盤に X と O を交互に置きます。先に三つ並べましょう。",
            "gameplay": "X が先手です。空きマスへ交互に置き、縦・横・斜めのいずれかで三つそろえると勝利です。",
            "controls": "空きマスをクリックまたはタップ。埋まった場所には置けません。新しいゲームのボタンで盤をリセットします。",
            "scoring": "勝者の勝利数が 1 増えます。満杯で列がなければ引き分け。新しい一局でも現在のページ内の勝利数は残ります。",
            "tips": "一手で勝てるなら優先し、なければ相手の二つ並びを止めましょう。中央と隅は複数の列を狙いやすい場所です。"
        }
    },
    "reversi": {
        "zh": {
            "intro": "两人轮流执黑白棋，在 8×8 棋盘上夹住并翻转对方棋子。页面会标出当前玩家可以落子的位置。",
            "gameplay": "黑棋先手。新落子与已有同色棋子之间必须连续夹住至少一枚对方棋子；横、竖、斜向都可以翻转。",
            "controls": "鼠标点击或触屏点按提示的合法空格。双方共用设备轮流下棋，本版没有电脑对手。",
            "scoring": "一方无合法位置会自动跳过，双方都不能落子时结束，以棋子较多方为胜。重新开始会恢复中央四子的布局。",
            "tips": "角落不容易被翻转，值得争取。开局不要只贪眼前翻子数量，避免轻易把角落旁的位置送给对方。"
        },
        "en": {
            "intro": "A two-player disk-flipping game on an 8×8 board. Legal destinations are highlighted for the current player.",
            "gameplay": "Black moves first. Place a disk so an unbroken line of opposing disks is trapped between it and one of your own. Captures work horizontally, vertically, or diagonally.",
            "controls": "Click or tap a marked legal square. Two people alternate on one device; there is no computer opponent in this version.",
            "scoring": "A player with no legal move is skipped. When neither can move, the game ends and the side with more disks wins. Restart restores the central four disks.",
            "tips": "Corners are stable assets. Avoid focusing only on immediate flips, especially if a move gives the opponent easy access to a corner."
        },
        "ja": {
            "intro": "8×8 の盤で相手の石を挟んで返す二人用ゲームです。現在置ける場所が表示されます。",
            "gameplay": "黒が先手です。新しい石と自分の石の間に相手の石を一つ以上連続して挟みます。縦・横・斜めに返せます。",
            "controls": "表示された合法な空きマスをクリックまたはタップ。同じ端末で交互に操作します。この版にコンピューター対戦はありません。",
            "scoring": "置けない側は自動でパスし、双方置けなくなると終了。石が多い側が勝ちです。再開で中央 4 個の初期配置に戻ります。",
            "tips": "返されない隅を狙いましょう。すぐ返せる数だけを追わず、相手に隅を渡す手を避けることが大切です。"
        }
    },
    "typing": {
        "zh": {
            "intro": "用随机英文单词练习打字，在一分钟内兼顾速度和准确率。目标单词会逐字标出输入是否正确。",
            "gameplay": "点击输入框开始输入，首次输入启动 60 秒计时。输入长度达到目标单词长度后会自动换词，不用额外按空格或 Enter。",
            "controls": "使用键盘输入显示的英文单词。短于目标长度时可用退格修改；达到长度后，即使有错误也会进入下一个单词。",
            "scoring": "结束时显示 WPM、准确率和正确单词数。WPM 按每 5 个正确字符折算一个词，准确率按已提交单词中的字符统计。",
            "tips": "先保证短词准确，再提速。注意错误颜色提示，在自动换词前修正；输入错误也达到目标长度时就不能再改上一词。"
        },
        "en": {
            "intro": "Practice random English words for one minute, balancing speed and accuracy. Character highlighting shows whether your input matches.",
            "gameplay": "Click the input and begin typing to start the 60-second timer. Reaching the target word length automatically advances, without Space or Enter.",
            "controls": "Type the displayed word. Backspace can correct it before it reaches the target length; even an incorrect full-length attempt advances automatically.",
            "scoring": "Results show WPM, accuracy, and correct words. WPM uses five correct characters per word; accuracy counts characters in submitted attempts.",
            "tips": "Build accuracy before speed. Watch the character colors and correct mistakes before the automatic advance."
        },
        "ja": {
            "intro": "ランダムな英単語で 1 分間のタイピングを練習します。入力した文字の正誤が色で示されます。",
            "gameplay": "入力欄を選んで打ち始めると 60 秒の計測開始。目標の文字数に達すると自動で次の単語へ進み、スペースや Enter は不要です。",
            "controls": "表示された英単語を入力します。文字数に達する前なら Backspace で直せますが、同じ文字数になると誤りがあっても次へ進みます。",
            "scoring": "結果は WPM、正確率、正解単語数。WPM は正しい 5 文字を 1 語として換算し、正確率は送信済みの単語の文字から計算します。",
            "tips": "まず正確さを安定させましょう。色の表示を見て、自動で次へ進む前に間違いを直します。"
        }
    },
    "colorswitch": {
        "zh": {
            "intro": "在 30 秒内辨认文字真正显示的颜色，忽略文字写的颜色名称。这是一款注意力反应游戏。",
            "gameplay": "开始后看中央文字的字体颜色，再选对应颜色按钮。例如“红色”两个字用蓝色显示时，应选择蓝色。每次作答都会换题并打乱按钮。",
            "controls": "鼠标点击或触屏点按颜色按钮。看字体本身的颜色，不要按字义或背景颜色作答。",
            "scoring": "答对得 10 分，再加此前连续答对次数×2。答错不扣已有分数，但连对归零。30 秒结束后显示总分与最高连对。",
            "tips": "把注意力放在颜色而不是读词。按钮每轮重新排列，不能一直点击同一个位置。"
        },
        "en": {
            "intro": "Identify the actual ink color within 30 seconds while ignoring the color word’s meaning. This is an attention and response game.",
            "gameplay": "Read the font color, then select its matching button. If the word “red” is drawn in blue, choose blue. Every answer changes the question and shuffles buttons.",
            "controls": "Click or tap a color button. Match the lettering’s color, not the word meaning or background.",
            "scoring": "A correct answer earns 10 plus 2 × the previous correct streak. A wrong answer resets the streak without removing earned points. Results appear after 30 seconds.",
            "tips": "Focus on color rather than reading. Button positions change every round, so do not rely on a fixed location."
        },
        "ja": {
            "intro": "30 秒以内に、色名の意味ではなく文字そのものの色を答える注意力ゲームです。",
            "gameplay": "中央の文字色に合うボタンを選びます。例えば「赤」が青色で書かれていたら青が正解。回答のたびに問題とボタン位置が変わります。",
            "controls": "色ボタンをクリックまたはタップ。文字の意味や背景ではなく、文字に塗られた色を見ます。",
            "scoring": "正解は 10 点＋それまでの連続正解数×2。誤答で得点は減りませんが連続回数はリセット。30 秒後に総点と最高連続数を表示します。",
            "tips": "文字を読むより色に集中しましょう。ボタン配置は毎回変わるので、同じ場所を押し続けないようにします。"
        }
    },
    "reaction": {
        "zh": {
            "intro": "等待信号变绿后尽快点击，测量自己的视觉反应时间。每次等待长度随机，提前猜时间不算有效成绩。",
            "gameplay": "点击测试区域准备，保持等待直到区域变绿，再尽快点击。看到结果后再次点击即可开始下一次。",
            "controls": "鼠标点击或触屏点按测试区域。整个测试只需一次开始点击与一次响应点击。",
            "scoring": "以毫秒显示本次反应时间，数值越小越快。提前点击记为“太早”，不计入有效次数和平均值；统计保留在当前页面内。",
            "tips": "把指针或手指提前放好，注视变色区域。连续做几次观察平均值，避免只用一次碰巧很快的结果判断表现。"
        },
        "en": {
            "intro": "Wait for green, then click as quickly as possible to measure your visual response time. The random wait prevents reliable timing guesses.",
            "gameplay": "Click the test area to get ready. Wait until it turns green, then respond. Click the result area to begin another trial.",
            "controls": "Click with the mouse or tap the test area. Each trial needs one click to prepare and another to respond.",
            "scoring": "Results are milliseconds: lower is faster. Clicking early records “Too early” and is excluded from valid attempts and averages. Statistics last for the current page.",
            "tips": "Position your pointer or finger first and watch the color signal. Compare several trials and the average rather than judging one unusually fast result."
        },
        "ja": {
            "intro": "緑色になってから素早くクリックし、視覚への反応時間を測ります。待ち時間はランダムです。",
            "gameplay": "テスト領域を押して準備し、緑になるまで待ちます。変わったらすぐ押し、結果をもう一度押すと次の試行です。",
            "controls": "マウスクリックまたはタップで操作します。一回につき準備と反応の二回の入力を使います。",
            "scoring": "ミリ秒表示で、小さいほど速い結果です。早押しは有効回数と平均から除外されます。統計は現在のページ内で保持します。",
            "tips": "先に指やポインターを置いて色の変化を見ましょう。一度の偶然速い記録より、何度か試した平均も確認してください。"
        }
    }
};
