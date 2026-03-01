/**
 * game-i18n.js - 游戏内部多语言支持
 * 每个游戏的 index.html 引入此脚本即可自动翻译常见 UI 文字
 * 用法: <script src="../../js/game-i18n.js"></script>
 */
(function () {
    const lang = localStorage.getItem('gamezone-lang') || 'zh';
    if (lang === 'zh') return; // 默认中文不需要翻译

    // 通用翻译表
    const dict = {
        en: {
            // --- 通用游戏 UI ---
            '分数': 'Score', '得分': 'Score', '最高分': 'Best', '最佳': 'Best',
            '等级': 'Level', '级别': 'Level', '关卡': 'Level',
            '消除行数': 'Lines', '行数': 'Lines',
            '下一个': 'Next', '预览': 'Preview',
            '游戏结束': 'Game Over', '游戏结束!': 'Game Over!', '游戏结束！': 'Game Over!',
            '你赢了! 🎉': 'You Win! 🎉', '你赢了!': 'You Win!', '你赢了！': 'You Win!', '恭喜通关！': 'You Win!',
            '再来一局': 'Play Again', '重新开始': 'Restart', '重新游戏': 'Restart',
            '开始游戏': 'Start Game', '开始': 'Start',
            '暂停': 'Pause', '继续': 'Resume', '继续游戏': 'Resume',
            '返回': 'Back', '退出': 'Exit',
            '时间': 'Time', '用时': 'Time', '剩余时间': 'Time Left',
            '步数': 'Moves', '移动': 'Move', '移动次数': 'Moves',
            '生命': 'Lives', '血量': 'HP', '生命值': 'HP',
            '速度': 'Speed', '难度': 'Difficulty',
            '简单': 'Easy', '普通': 'Normal', '困难': 'Hard',
            '最终分数': 'Final Score', '最终得分': 'Final Score',
            '回合': 'Round', '波次': 'Wave',
            '金币': 'Coins', '连击': 'Combo',
            '旋转': 'Rotate', '加速': 'Speed Up',
            '空格': 'Space',
            '胜利': 'Victory', '失败': 'Defeat',
            '玩家': 'Player', '电脑': 'Computer', 'AI': 'AI',
            '黑棋': 'Black', '白棋': 'White',
            '你的回合': 'Your Turn', '电脑回合': "Computer's Turn",
            '选择难度': 'Select Difficulty',
            '提示': 'Hint', '撤销': 'Undo',
            '射门': 'Shoot', '进球': 'Goal', '扑救': 'Save',
            '投篮': 'Shoot',
            '正确': 'Correct', '错误': 'Wrong',
            '太大了': 'Too High', '太小了': 'Too Low', '猜对了': 'Correct!',
            '请输入数字': 'Enter a number', '猜': 'Guess',
            '目标': 'Target', '当前': 'Current',
            '排名': 'Rank', '长度': 'Length',
            '恭喜': 'Congrats', '完美': 'Perfect',

            // --- 游戏标题 ---
            '俄罗斯方块': 'Tetris', '贪吃蛇': 'Snake', '推箱子': 'Sokoban',
            '扫雷': 'Minesweeper', '记忆翻牌': 'Memory Match', '迷宫': 'Maze',
            '消消乐': 'Match 3', '飞刀': 'Knife Hit', '猜数字': 'Guess Number',
            '切水果': 'Fruit Slice', '点球大战': 'Penalty Kick', '躲避球': 'Dodge Ball',
            '颜色切换': 'Color Switch', '接水果': 'Catch Fruits', '打砖块': 'Breakout',
            '投篮机': 'Basketball', '黑白棋': 'Reversi', '井字棋': 'Tic Tac Toe',
            '堆叠高塔': 'Stack Tower', '太空射击': 'Space Shooter', '弹球': 'Pinball',
            '跳跃忍者': 'Ninja Jump', '乒乓球': 'Pong', '数字华容道': '15 Puzzle',
            '赛车': 'Racing', '无尽跑酷': 'Endless Runner', '反应测试': 'Reaction Test',
            '打字练习': 'Typing Practice',

            // --- breakout 特有 ---
            '🎉 恭喜过关!': '🎉 Level Clear!', '💔 游戏结束': '💔 Game Over',

            // --- football 特有 ---
            '🏆 帽子戏法!': '🏆 Hat Trick!', '👏 表现出色!': '👏 Great Job!',
            '😊 不错!': '😊 Not Bad!', '😅 再接再厉!': '😅 Try Harder!',
            '射门得分': 'Goals Scored', '点球': 'Penalty',

            // --- guessnumber 特有 ---
            '输入一个数字开始游戏': 'Enter a number to start',
            '请输入 1-100 之间的数字': 'Enter a number between 1-100',
            '🎉 正确!': '🎉 Correct!', '📈 太小了!': '📈 Too Low!', '📉 太大了!': '📉 Too High!',
            '我想了一个数字，你能猜到吗？': "I'm thinking of a number. Can you guess it?",
            '猜测次数': 'Attempts', '答案': 'Answer', '次猜中': 'guesses',
            '最佳记录': 'Best Record',

            // --- reaction 特有 ---
            '等待绿色...': 'Wait for green...', '点击!': 'Click!', '快!': 'Now!',
            '太早了!': 'Too early!', '点击重试': 'Click to retry', '点击继续': 'Click to continue',
            '超神! 🚀': 'Godlike! 🚀', '极快! ⚡': 'Lightning! ⚡', '很快! 👍': 'Fast! 👍',
            '不错! 😊': 'Nice! 😊', '继续加油! 💪': 'Keep trying! 💪',
            '最佳时间': 'Best Time', '平均时间': 'Avg Time', '测试次数': 'Attempts',
            '反应时间': 'Reaction Time',

            // --- colorswitch 颜色名 ---
            '红色': 'Red', '蓝色': 'Blue', '绿色': 'Green',
            '黄色': 'Yellow', '紫色': 'Purple', '橙色': 'Orange',
            '最大连击': 'Max Streak',

            // --- minesweeper 特有 ---
            '💣 扫雷': '💣 Minesweeper',
            '左键': 'Left Click', '右键': 'Right Click',
            '翻开格子': 'Reveal Cell', '标记/取消旗帜': 'Toggle Flag',
            '雷数': 'Mines', '初级': 'Beginner', '中级': 'Intermediate', '高级': 'Expert',

            // --- dodge 特有 ---
            '躲避红色方块!': 'Dodge the red blocks!', '存活时间': 'Survival Time',

            // --- sokoban 特有 ---
            '推动次数': 'Pushes', '选择关卡': 'Select Level',

            // --- memory 特有 ---
            '配对': 'Pairs', '翻牌次数': 'Flips',

            // --- maze 特有 ---
            '恭喜通关!': 'Level Clear!',

            // --- runner 特有 ---
            '距离': 'Distance', '最远距离': 'Best Distance',

            // --- typing 特有 ---
            '准确率': 'Accuracy', '正确单词': 'Correct Words', '单词/分钟': 'WPM',

            // --- stack 特有 ---
            '层数': 'Layers',

            // --- spaceshooter 特有 ---
            '到达波次': 'Wave Reached',

            // --- 通用控制说明 ---
            '点击或按空格键': 'Click or press Space', '点击屏幕': 'Tap Screen',
            '使用方向键或滑动屏幕来移动': 'Use arrow keys or swipe to move',

            // --- pong 特有 ---
            '玩家1 (蓝色)': 'Player 1 (Blue)', '玩家2 (红色)': 'Player 2 (Red)',
            '玩家1 获胜!': 'Player 1 Wins!', '玩家2 获胜!': 'Player 2 Wins!',
            '获胜': 'Wins',

            // --- tictactoe/reversi ---
            '平局!': 'Draw!', '平局! 🤝': 'Draw! 🤝', '轮到': "'s Turn",
            '获胜!': 'Wins!', '获胜! 🎉': 'Wins! 🎉',
            '黑棋胜!': 'Black Wins!', '白棋胜!': 'White Wins!', '平局': 'Draw',
            '漏掉': 'Missed',
        },
        ja: {
            '分数': 'スコア', '得分': 'スコア', '最高分': 'ベスト', '最佳': 'ベスト',
            '等级': 'レベル', '级别': 'レベル', '关卡': 'レベル',
            '消除行数': 'ライン', '行数': 'ライン',
            '下一个': '次', '预览': 'プレビュー',
            '游戏结束': 'ゲームオーバー', '游戏结束!': 'ゲームオーバー!', '游戏结束！': 'ゲームオーバー！',
            '你赢了! 🎉': 'クリア! 🎉', '你赢了!': 'クリア!', '你赢了！': 'クリア！', '恭喜通关！': 'クリア！',
            '再来一局': 'もう一回', '重新开始': 'リスタート', '重新游戏': 'リスタート',
            '开始游戏': 'スタート', '开始': 'スタート',
            '暂停': '一時停止', '继续': '再開', '继续游戏': '再開',
            '返回': '戻る', '退出': '終了',
            '时间': '時間', '用时': '時間', '剩余时间': '残り時間',
            '步数': '手数', '移动': '移動', '移动次数': '手数',
            '生命': 'ライフ', '血量': 'HP', '生命值': 'HP',
            '速度': '速度', '难度': '難易度',
            '简单': '簡単', '普通': '普通', '困难': '難しい',
            '最终分数': '最終スコア', '最终得分': '最終スコア',
            '回合': 'ラウンド', '波次': 'ウェーブ',
            '金币': 'コイン', '连击': 'コンボ',
            '旋转': '回転', '加速': '加速',
            '空格': 'スペース',
            '胜利': '勝利', '失败': '敗北',
            '玩家': 'プレイヤー', '电脑': 'コンピュータ',
            '黑棋': '黒', '白棋': '白',
            '你的回合': 'あなたの番', '电脑回合': 'コンピュータの番',
            '选择难度': '難易度選択',
            '提示': 'ヒント', '撤销': '戻す',
            '射门': 'シュート', '进球': 'ゴール', '扑救': 'セーブ',
            '投篮': 'シュート',
            '正确': '正解', '错误': '不正解',
            '太大了': '大きすぎ', '太小了': '小さすぎ', '猜对了': '正解!',
            '请输入数字': '数字を入力', '猜': '当てる',
            '目标': '目標', '当前': '現在',
            '排名': 'ランク', '长度': '長さ',
            '恭喜': 'おめでとう', '完美': 'パーフェクト',

            // --- 游戏标题 第1批 ---
            '俄罗斯方块': 'テトリス', '贪吃蛇': 'スネーク', '推箱子': '倉庫番',
            '扫雷': 'マインスイーパー', '记忆翻牌': '神経衰弱', '迷宫': '迷路',
            '消消乐': 'マッチ3', '飞刀': 'ナイフヒット', '猜数字': '数当て',

            // --- 游戏标题 第2批 ---
            '切水果': 'フルーツスライス', '点球大战': 'PK戦', '躲避球': 'ドッジボール',
            '颜色切换': 'カラースイッチ', '接水果': 'フルーツキャッチ', '打砖块': 'ブロック崩し',
            '投篮机': 'バスケットボール', '黑白棋': 'リバーシ', '井字棋': '三目並べ',

            // --- 游戏标题 第3批 ---
            '堆叠高塔': 'スタックタワー', '太空射击': 'スペースシューター', '弹球': 'ピンボール',
            '跳跃忍者': 'ニンジャジャンプ', '乒乓球': 'ポン', '数字华容道': '15パズル',
            '赛车': 'レーシング', '无尽跑酷': 'エンドレスラン', '反应测试': '反応テスト',
            '打字练习': 'タイピング練習',

            // --- breakout + football ---
            '🎉 恭喜过关!': '🎉 クリア!', '💔 游戏结束': '💔 ゲームオーバー',
            '🏆 帽子戏法!': '🏆 ハットトリック!', '👏 表现出色!': '👏 素晴らしい!',
            '😊 不错!': '😊 いいね!', '😅 再接再厉!': '😅 頑張って!',
            '射门得分': 'ゴール数', '点球': 'PK',

            // --- guessnumber ---
            '输入一个数字开始游戏': '数字を入力してスタート',
            '请输入 1-100 之间的数字': '1-100の数字を入力',
            '🎉 正确!': '🎉 正解!', '📈 太小了!': '📈 小さすぎ!', '📉 太大了!': '📉 大きすぎ!',
            '我想了一个数字，你能猜到吗？': '数字を考えました。当てられますか？',
            '猜测次数': '推測回数', '答案': '答え', '次猜中': '回で正解',
            '最佳记录': 'ベスト記録',

            // --- reaction 第1批 ---
            '等待绿色...': '緑を待って...', '点击!': 'クリック!', '快!': '今!',
            '太早了!': '早すぎ!', '点击重试': 'クリックでリトライ', '点击继续': 'クリックで続行',

            // --- reaction 第2批 + colorswitch ---
            '超神! 🚀': '神! 🚀', '极快! ⚡': '超速! ⚡', '很快! 👍': '速い! 👍',
            '不错! 😊': 'いいね! 😊', '继续加油! 💪': '頑張れ! 💪',
            '最佳时间': 'ベストタイム', '平均时间': '平均タイム', '测试次数': 'テスト回数',
            '反应时间': '反応時間',
            '红色': '赤', '蓝色': '青', '绿色': '緑',
            '黄色': '黄', '紫色': '紫', '橙色': 'オレンジ',
            '最大连击': '最大コンボ',

            // --- minesweeper ---
            '💣 扫雷': '💣 マインスイーパー',
            '左键': '左クリック', '右键': '右クリック',
            '翻开格子': 'セルを開く', '标记/取消旗帜': '旗の切替',
            '雷数': '地雷数', '初级': '初級', '中级': '中級', '高级': '上級',

            // --- dodge/sokoban/memory/maze ---
            '躲避红色方块!': '赤いブロックを避けろ!', '存活时间': '生存時間',
            '推动次数': 'プッシュ数', '选择关卡': 'レベル選択',
            '配对': 'ペア', '翻牌次数': 'めくり回数',
            '恭喜通关!': 'クリア!',

            // --- runner/typing/stack/spaceshooter/通用控制 ---
            '距离': '距離', '最远距离': '最高距離',
            '准确率': '正確率', '正确单词': '正解単語', '单词/分钟': 'WPM',
            '层数': '段数',
            '到达波次': '到達ウェーブ',
            '点击或按空格键': 'クリックまたはスペースキー', '点击屏幕': '画面タップ',
            '使用方向键或滑动屏幕来移动': '矢印キーまたはスワイプで移動',

            // --- pong ---
            '玩家1 (蓝色)': 'プレイヤー1 (青)', '玩家2 (红色)': 'プレイヤー2 (赤)',
            '玩家1 获胜!': 'プレイヤー1の勝ち!', '玩家2 获胜!': 'プレイヤー2の勝ち!',
            '获胜': '勝ち',

            // --- tictactoe/reversi ---
            '平局!': '引き分け!', '平局! 🤝': '引き分け! 🤝', '轮到': 'の番',
            '获胜!': '勝ち!', '获胜! 🎉': '勝ち! 🎉',
            '黑棋胜!': '黒の勝ち!', '白棋胜!': '白の勝ち!', '平局': '引き分け',
            '漏掉': 'ミス',
        }
    };

    const t = dict[lang];
    if (!t) return;

    // 特殊文本模式匹配（带动态值的文本）
    const patterns = {
        en: [
            [/最终分数:\s*/g, 'Final Score: '],
            [/最终得分:\s*/g, 'Final Score: '],
            [/得分:\s*/g, 'Score: '],
            [/分数:\s*/g, 'Score: '],
            [/第\s*(\d+)\s*关/g, 'Level $1'],
            [/第\s*(\d+)\s*回合/g, 'Round $1'],
            [/第\s*(\d+)\s*波/g, 'Wave $1'],
            [/剩余\s*(\d+)\s*次/g, '$1 left'],
            [/(\d+)\s*条评论/g, '$1 comments'],
            [/轮到\s*(.*)/g, "$1's Turn"],
            [/游戏结束!\s*(.*)/g, 'Game Over! $1'],
            [/关卡\s*(\d+)/g, 'Level $1'],
            [/(\S+)\s*获胜!/g, '$1 Wins!'],
        ],
        ja: [
            [/最终分数:\s*/g, '最終スコア: '],
            [/最终得分:\s*/g, '最終スコア: '],
            [/得分:\s*/g, 'スコア: '],
            [/分数:\s*/g, 'スコア: '],
            [/第\s*(\d+)\s*关/g, 'レベル $1'],
            [/第\s*(\d+)\s*回合/g, 'ラウンド $1'],
            [/第\s*(\d+)\s*波/g, 'ウェーブ $1'],
            [/剩余\s*(\d+)\s*次/g, '残り $1 回'],
            [/轮到\s*(.*)/g, '$1の番'],
            [/游戏结束!\s*(.*)/g, 'ゲームオーバー! $1'],
            [/关卡\s*(\d+)/g, 'レベル $1'],
            [/(\S+)\s*获胜!/g, '$1の勝ち!'],
        ]
    };

    // 翻译文本节点
    function translateNode(node) {
        if (node.nodeType === Node.TEXT_NODE) {
            let text = node.textContent;
            if (!text.trim()) return;

            // 精确匹配
            const trimmed = text.trim();
            if (t[trimmed]) {
                node.textContent = text.replace(trimmed, t[trimmed]);
                return;
            }

            // 模式匹配
            if (patterns[lang]) {
                for (const [regex, replacement] of patterns[lang]) {
                    text = text.replace(regex, replacement);
                }
                node.textContent = text;
            }
            return;
        }

        // 翻译 placeholder 属性
        if (node.placeholder) {
            const ph = node.placeholder.trim();
            if (t[ph]) node.placeholder = t[ph];
        }

        // 翻译 title 属性
        if (node.title) {
            const ti = node.title.trim();
            if (t[ti]) node.title = t[ti];
        }

        // 递归子节点
        node.childNodes.forEach(child => translateNode(child));
    }

    // 翻译带混合内容的元素（如 "← → 移动"）
    function translateControls() {
        const controlDivs = document.querySelectorAll('.controls, .control, .help, .info-text');
        controlDivs.forEach(div => translateNode(div));
    }

    // 页面加载后翻译
    function applyTranslation() {
        // 翻译 <title>
        if (document.title) {
            for (const [zh, translated] of Object.entries(t)) {
                if (document.title.includes(zh)) {
                    document.title = document.title.replace(zh, translated);
                }
            }
        }

        // 翻译所有可见文本
        translateNode(document.body);

        // 特别处理控制说明
        translateControls();
    }

    // DOM 加载完成后执行
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', applyTranslation);
    } else {
        applyTranslation();
    }

    // 监听动态添加的元素（如 game-over 弹窗）
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    translateNode(node);
                }
            });
            // 也处理 style.display 变化导致的显示
            if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                const el = mutation.target;
                if (el.style.display !== 'none' && el.textContent) {
                    translateNode(el);
                }
            }
        });
    });

    observer.observe(document.body || document.documentElement, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['style']
    });
})();
