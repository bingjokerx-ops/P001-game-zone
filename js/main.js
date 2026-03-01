// ========== 主逻辑 ==========

// DOM元素
const gamesGrid = document.getElementById('games-grid');
const searchInput = document.getElementById('search-input');
const categoryTags = document.querySelectorAll('.category-tag');
const navLinks = document.querySelectorAll('.nav-link');
const sectionTitle = document.getElementById('section-title');

// 当前筛选状态
let currentCategory = 'all';
let currentSort = 'default'; // default, hot, recent, favorites
let searchQuery = '';

// 多语言游戏名称辅助函数
function getGameDisplayName(game) {
    const lang = localStorage.getItem('gamezone-lang') || 'zh';
    if (lang === 'en' && game.nameEn) return game.nameEn;
    if (lang === 'ja' && game.nameJa) return game.nameJa;
    return game.name;
}
function getGameDisplayDesc(game) {
    const lang = localStorage.getItem('gamezone-lang') || 'zh';
    if (lang === 'en' && game.descriptionEn) return game.descriptionEn;
    if (lang === 'ja' && game.descriptionJa) return game.descriptionJa;
    return game.description;
}
function getGameDisplayControls(game) {
    const lang = localStorage.getItem('gamezone-lang') || 'zh';
    if (lang === 'en' && game.controlsEn) return game.controlsEn;
    if (lang === 'ja' && game.controlsJa) return game.controlsJa;
    return game.controls;
}

// ========== 收藏功能 ==========
function getFavorites() {
    return JSON.parse(localStorage.getItem('gameFavorites') || '[]');
}

function saveFavorites(favorites) {
    localStorage.setItem('gameFavorites', JSON.stringify(favorites));
}

function isFavorite(gameId) {
    return getFavorites().includes(gameId);
}

function toggleFavorite(gameId, event) {
    event.stopPropagation();
    let favorites = getFavorites();
    if (favorites.includes(gameId)) {
        favorites = favorites.filter(id => id !== gameId);
    } else {
        favorites.push(gameId);
    }
    saveFavorites(favorites);
    // 更新按钮状态
    const btn = event.target;
    btn.classList.toggle('active');
    // 如果在收藏页面，刷新列表
    if (currentSort === 'favorites') {
        filterAndRenderGames();
    }
}

// 获取游戏热度统计
function getPlayStats() {
    return JSON.parse(localStorage.getItem('gamePlayStats') || '{}');
}

// 获取游戏热度
function getGameHeat(gameId) {
    const stats = getPlayStats();
    return stats[gameId] || 0;
}

// 获取游戏的最佳展示视频路径（排行榜中点赞最高且允许展示的）
// 同点赞按时间近优先
function getBestVideoForGame(gameId) {
    // 从排行榜获取记录
    const leaderboards = JSON.parse(localStorage.getItem('gameLeaderboards') || '{}');
    const gameLeaderboard = leaderboards[gameId] || [];

    console.log(`🎬 [${gameId}] 排行榜数据:`, gameLeaderboard);

    // 筛选有视频且允许展示的记录，按点赞排序（同点赞按时间近优先）
    const showable = gameLeaderboard
        .filter(item => item.showVideo !== false && (item.videoPath || item.recordingId))
        .sort((a, b) => {
            const likeDiff = (b.likes || 0) - (a.likes || 0);
            if (likeDiff !== 0) return likeDiff;
            return (b.time || 0) - (a.time || 0);
        });

    console.log(`🎬 [${gameId}] 可展示的视频记录:`, showable);

    if (showable.length > 0) {
        const best = showable[0];
        console.log(`🎬 [${gameId}] 选中最佳:`, best.name, 'likes:', best.likes, 'time:', best.time);
        if (best.videoPath) {
            // 使用videoPath（文件路径）
            return best.videoPath;
        } else if (best.recordingId) {
            // 录像ID（需要前端特殊处理）
            return `recording:${best.recordingId}`;
        }
    }

    console.log(`🎬 [${gameId}] 无可用视频`);
    return null;
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    renderGames(gamesData);
    setupEventListeners();
    setupHourlySort();
    setupCategoryScroll();
});

// 设置分类栏滚动隐藏效果
function setupCategoryScroll() {
    const categories = document.querySelector('.categories');
    const header = document.querySelector('.header');
    let scrollThreshold = 80;
    let isHidden = false;
    let ticking = false;
    let hideTimeout = null;
    let isHovering = false;

    function updateCategoryState() {
        const shouldHide = window.scrollY > scrollThreshold;

        if (shouldHide !== isHidden) {
            isHidden = shouldHide;
            if (shouldHide) {
                categories.classList.add('hidden');
            } else {
                categories.classList.remove('hidden');
                categories.classList.remove('hover-active');
                isHovering = false;
            }
        }
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateCategoryState);
            ticking = true;
        }
    }, { passive: true });

    // 鼠标进入header时显示分类栏
    header.addEventListener('mouseenter', () => {
        console.log('Header enter, hidden:', categories.classList.contains('hidden'));
        clearTimeout(hideTimeout);
        if (categories.classList.contains('hidden')) {
            categories.classList.add('hover-active');
            isHovering = true;
        }
    });

    // 鼠标离开header时，延迟隐藏
    header.addEventListener('mouseleave', (e) => {
        console.log('Header leave, relatedTarget:', e.relatedTarget);
        // 如果鼠标移动到分类栏，不隐藏
        if (e.relatedTarget && categories.contains(e.relatedTarget)) {
            return;
        }
        hideTimeout = setTimeout(() => {
            if (isHovering) {
                categories.classList.remove('hover-active');
                isHovering = false;
            }
        }, 150);
    });

    // 鼠标进入分类栏时保持显示
    categories.addEventListener('mouseenter', () => {
        console.log('Categories enter');
        clearTimeout(hideTimeout);
        isHovering = true;
    });

    // 鼠标离开分类栏时隐藏
    categories.addEventListener('mouseleave', (e) => {
        console.log('Categories leave, relatedTarget:', e.relatedTarget);
        // 如果鼠标移回header，不隐藏
        if (e.relatedTarget && header.contains(e.relatedTarget)) {
            return;
        }
        categories.classList.remove('hover-active');
        isHovering = false;
    });
}

// 每小时自动按热度排序（热门页面）
function setupHourlySort() {
    // 检查上次排序时间
    const lastSortTime = localStorage.getItem('lastHotSort') || 0;
    const now = Date.now();
    const oneHour = 60 * 60 * 1000;

    // 如果超过1小时，自动切换到热门排序
    if (now - lastSortTime >= oneHour) {
        localStorage.setItem('lastHotSort', now);
        // 如果当前在热门页面，刷新排序
        if (currentSort === 'hot') {
            filterAndRenderGames();
        }
    }

    // 设置定时器，每小时刷新一次
    setInterval(() => {
        localStorage.setItem('lastHotSort', Date.now());
        if (currentSort === 'hot') {
            filterAndRenderGames();
            console.log('🔄 热门排行已自动刷新');
        }
    }, oneHour);
}

// 设置事件监听
function setupEventListeners() {
    // 分类标签点击
    categoryTags.forEach(tag => {
        tag.addEventListener('click', () => {
            categoryTags.forEach(t => t.classList.remove('active'));
            tag.classList.add('active');
            currentCategory = tag.dataset.category;
            updateSectionTitle();
            filterAndRenderGames();
        });
    });

    // 导航链接点击 (全部/热门/最新/收藏)
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            currentSort = link.dataset.sort || 'default';
            updateSectionTitle();
            filterAndRenderGames();
        });
    });

    // 搜索输入
    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase().trim();
        filterAndRenderGames();
    });
}

// 更新标题
function updateSectionTitle() {
    const lang = localStorage.getItem('gamezone-lang') || 'zh';

    // 分类名称映射 (zh/en/ja)
    const categoryNamesI18n = {
        zh: { all: '全部游戏', puzzle: '益智游戏', arcade: '街机游戏', racing: '竞速游戏', sports: '体育游戏', board: '棋牌游戏', casual: '休闲游戏' },
        en: { all: 'All Games', puzzle: 'Puzzle', arcade: 'Arcade', racing: 'Racing', sports: 'Sports', board: 'Board', casual: 'Casual' },
        ja: { all: '全ゲーム', puzzle: 'パズル', arcade: 'アーケード', racing: 'レーシング', sports: 'スポーツ', board: 'ボード', casual: 'カジュアル' }
    };

    const sortLabelsI18n = {
        zh: { favorites: '我的收藏', history: '最近玩过', hot: '热门游戏', recent: '最新游戏' },
        en: { favorites: 'Favorites', history: 'Recently Played', hot: 'Hot Games', recent: 'New Games' },
        ja: { favorites: 'お気に入り', history: '最近プレイ', hot: '人気ゲーム', recent: '新着ゲーム' }
    };

    // 排序前缀
    const sortIcons = {
        'default': '🎮',
        'hot': '🔥',
        'recent': '✨',
        'history': '🕐',
        'favorites': '❤️'
    };

    const icon = sortIcons[currentSort] || '🎮';
    const categoryNames = categoryNamesI18n[lang] || categoryNamesI18n.zh;
    const sortLabels = sortLabelsI18n[lang] || sortLabelsI18n.zh;
    const categoryName = categoryNames[currentCategory] || categoryNames.all;

    // 根据排序生成标题
    if (currentSort === 'favorites') {
        sectionTitle.textContent = icon + ' ' + sortLabels.favorites;
    } else if (currentSort === 'history') {
        sectionTitle.textContent = icon + ' ' + sortLabels.history;
    } else if (currentSort === 'hot') {
        sectionTitle.textContent = icon + ' ' + sortLabels.hot;
    } else if (currentSort === 'recent') {
        sectionTitle.textContent = icon + ' ' + sortLabels.recent;
    } else {
        sectionTitle.textContent = icon + ' ' + categoryName;
    }
}

// 筛选并渲染游戏
function filterAndRenderGames() {
    let filteredGames = [...gamesData];

    // 分类筛选
    if (currentCategory !== 'all') {
        filteredGames = filteredGames.filter(game => game.category === currentCategory);
    }

    // 搜索筛选
    if (searchQuery) {
        filteredGames = filteredGames.filter(game =>
            game.name.toLowerCase().includes(searchQuery) ||
            (game.nameEn && game.nameEn.toLowerCase().includes(searchQuery)) ||
            (game.nameJa && game.nameJa.toLowerCase().includes(searchQuery)) ||
            game.categoryName.includes(searchQuery)
        );
    }

    // 收藏筛选
    if (currentSort === 'favorites') {
        const favIds = getFavorites();
        filteredGames = filteredGames.filter(g => favIds.includes(g.id));
    }

    // 最近玩过筛选（与分类是"且"的关系）
    if (currentSort === 'history') {
        const historyIds = getRecentlyPlayed();
        // 保持最近玩过的顺序，但只显示filteredGames中的
        const filteredIds = new Set(filteredGames.map(g => g.id));
        filteredGames = historyIds
            .filter(id => filteredIds.has(id))
            .map(id => filteredGames.find(g => g.id === id))
            .filter(g => g);
    }

    // 排序
    if (currentSort === 'hot') {
        filteredGames.sort((a, b) => getGameHeat(b.id) - getGameHeat(a.id));
    } else if (currentSort === 'recent') {
        filteredGames.sort((a, b) => {
            const aTime = new Date(a.createdAt || '2000-01-01').getTime();
            const bTime = new Date(b.createdAt || '2000-01-01').getTime();
            return bTime - aTime;
        });
    }

    renderGames(filteredGames);
}

// 渲染游戏列表
function renderGames(games) {
    if (games.length === 0) {
        gamesGrid.innerHTML = `
            <div class="no-games" style="grid-column: 1 / -1;">
                <div class="no-games-icon">🎮</div>
                <p class="no-games-text">没有找到游戏 → <a href="#" class="suggest-game-link" onclick="openSubmitModal(event)">帮我加进来</a></p>
            </div>
        `;
        return;
    }

    gamesGrid.innerHTML = games.map(game => createGameCard(game)).join('');

    // 添加点击和悬停事件
    document.querySelectorAll('.game-card').forEach(card => {
        card.addEventListener('click', (e) => {
            // 如果点击的是放大按钮，不打开游戏
            if (e.target.classList.contains('video-expand-btn')) return;
            openGame(card.dataset.id);
        });

        // 视频悬停播放
        const video = card.querySelector('video');
        if (video) {
            // 如果是录像ID，需要异步加载
            const recordingId = video.dataset.recordingId;
            if (recordingId && !video.src) {
                loadRecordingForVideo(video, recordingId);
            }

            card.addEventListener('mouseenter', () => {
                video.currentTime = 0;
                video.playbackRate = 2;  // 2倍速播放
                video.play().catch(() => { });
                card.classList.add('video-playing');
            });
            card.addEventListener('mouseleave', () => {
                video.pause();
                card.classList.remove('video-playing');
            });
        }

        // 放大按钮事件
        const expandBtn = card.querySelector('.video-expand-btn');
        if (expandBtn) {
            expandBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                expandVideo(expandBtn);
            });
        }
    });
}

// 从IndexedDB加载录像并设置到video元素
async function loadRecordingForVideo(video, recordingId) {
    try {
        console.log('🎥 尝试加载录像:', recordingId, typeof recordingId);

        // 确保recordingId是数字类型（因为IndexedDB中存的是数字）
        const id = parseInt(recordingId, 10);

        const db = await openRecordingsDB();
        const tx = db.transaction('recordings', 'readonly');
        const store = tx.objectStore('recordings');
        const recording = await new Promise((resolve, reject) => {
            const req = store.get(id);
            req.onsuccess = () => resolve(req.result);
            req.onerror = () => reject(req.error);
        });

        console.log('🎥 录像数据:', recording ? '找到' : '未找到');

        if (recording && recording.blob) {
            const url = URL.createObjectURL(recording.blob);
            video.src = url;
            console.log('🎥 视频已加载');
        }
    } catch (e) {
        console.log('加载录像失败:', e);
    }
}

// 打开IndexedDB录像数据库
function openRecordingsDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('GameRecordings', 1);
        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result);
        request.onupgradeneeded = (e) => {
            const db = e.target.result;
            if (!db.objectStoreNames.contains('recordings')) {
                db.createObjectStore('recordings', { keyPath: 'id' });
            }
        };
    });
}

// 放大视频预览（首页卡片）
async function expandVideo(btn) {
    const recordingIdRaw = btn.dataset.recordingId;
    const videoSrc = btn.dataset.videoSrc;
    const gameName = btn.dataset.gameName;

    // 处理录像ID（可能是 "recording:xxx" 格式或纯数字）
    let recordingId = null;
    if (recordingIdRaw && recordingIdRaw !== '') {
        if (recordingIdRaw.startsWith('recording:')) {
            recordingId = parseInt(recordingIdRaw.replace('recording:', ''), 10);
        } else {
            recordingId = parseInt(recordingIdRaw, 10);
        }
    }

    if (recordingId && !isNaN(recordingId)) {
        // 从IndexedDB加载录像
        try {
            const db = await openRecordingsDB();
            const tx = db.transaction('recordings', 'readonly');
            const store = tx.objectStore('recordings');
            const recording = await new Promise((resolve, reject) => {
                const req = store.get(recordingId);
                req.onsuccess = () => resolve(req.result);
                req.onerror = () => reject(req.error);
            });
            if (recording && recording.blob) {
                const url = URL.createObjectURL(recording.blob);
                showVideoModal(url, gameName, true);
            }
        } catch (e) {
            console.log('加载录像失败:', e);
        }
    } else if (videoSrc && videoSrc !== '') {
        // 使用预置视频
        showVideoModal(videoSrc, gameName, false);
    }
}

// 通用视频模态框（首页用）
function showVideoModal(videoUrl, title, shouldRevokeUrl = false) {
    const modal = document.createElement('div');
    modal.className = 'video-modal';
    modal.innerHTML = `
        <div class="video-modal-content">
            <div class="video-modal-header">
                <span>🎬 ${title}</span>
                <div class="speed-controls">
                    <button class="speed-btn" data-speed="1">1x</button>
                    <button class="speed-btn active" data-speed="1.5">1.5x</button>
                    <button class="speed-btn" data-speed="2">2x</button>
                </div>
                <button class="modal-close-btn">&times;</button>
            </div>
            <div class="video-wrapper">
                <video autoplay src="${videoUrl}"></video>
                <div class="custom-controls">
                    <button class="play-pause-btn">⏸️</button>
                    <div class="progress-container">
                        <div class="progress-bar">
                            <div class="progress-filled"></div>
                        </div>
                    </div>
                    <span class="time-display">0:00 / --:--</span>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    const video = modal.querySelector('video');
    const playPauseBtn = modal.querySelector('.play-pause-btn');
    const progressBar = modal.querySelector('.progress-bar');
    const progressFilled = modal.querySelector('.progress-filled');
    const timeDisplay = modal.querySelector('.time-display');

    let videoDuration = 0;
    video.playbackRate = 1.5;

    function formatTime(seconds) {
        if (!isFinite(seconds) || seconds <= 0) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    function fixVideoDuration() {
        if (video.duration && isFinite(video.duration) && video.duration > 0) {
            videoDuration = video.duration;
            updateProgress();
            return;
        }
        video.currentTime = Number.MAX_SAFE_INTEGER;
        video.ontimeupdate = function () {
            video.ontimeupdate = null;
            videoDuration = video.currentTime;
            video.currentTime = 0;
            video.play();
            updateProgress();
        };
    }

    function updateProgress() {
        if (videoDuration > 0) {
            const percent = (video.currentTime / videoDuration) * 100;
            progressFilled.style.width = `${Math.min(100, percent)}%`;
            timeDisplay.textContent = `${formatTime(video.currentTime)} / ${formatTime(videoDuration)}`;
        }
    }

    progressBar.addEventListener('click', (e) => {
        if (videoDuration <= 0) return;
        const rect = progressBar.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        video.currentTime = Math.max(0, Math.min(videoDuration, percent * videoDuration));
    });

    let isDragging = false;
    progressBar.addEventListener('mousedown', () => isDragging = true);
    document.addEventListener('mouseup', () => isDragging = false);
    document.addEventListener('mousemove', (e) => {
        if (isDragging && videoDuration > 0) {
            const rect = progressBar.getBoundingClientRect();
            let percent = (e.clientX - rect.left) / rect.width;
            percent = Math.max(0, Math.min(1, percent));
            video.currentTime = percent * videoDuration;
        }
    });

    playPauseBtn.addEventListener('click', () => {
        if (video.paused) {
            video.play();
            playPauseBtn.textContent = '⏸️';
        } else {
            video.pause();
            playPauseBtn.textContent = '▶️';
        }
    });

    video.addEventListener('timeupdate', updateProgress);
    video.addEventListener('loadedmetadata', fixVideoDuration);
    video.addEventListener('play', () => playPauseBtn.textContent = '⏸️');
    video.addEventListener('pause', () => playPauseBtn.textContent = '▶️');

    modal.querySelectorAll('.speed-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            modal.querySelectorAll('.speed-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            video.playbackRate = parseFloat(btn.dataset.speed);
        });
    });

    const closeModal = () => {
        if (shouldRevokeUrl) URL.revokeObjectURL(videoUrl);
        modal.remove();
    };
    modal.querySelector('.modal-close-btn').onclick = closeModal;
    modal.onclick = (e) => {
        if (e.target === modal) closeModal();
    };
}

// 创建游戏卡片
function createGameCard(game, isCompact = false) {
    const heat = getGameHeat(game.id);
    const favorited = isFavorite(game.id);

    const displayName = getGameDisplayName(game);

    const coverHtml = game.cover
        ? `<img class="cover" src="${game.cover}" alt="${displayName}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">`
        : '';

    // 优先使用排行榜中点赞最高的视频，没有则使用预置视频
    const bestVideo = getBestVideoForGame(game.id);
    let videoSrc = game.video; // 默认使用预置视频
    let recordingId = null;

    if (bestVideo) {
        if (bestVideo.startsWith('recording:')) {
            // IndexedDB录像 - 标记ID后续异步加载
            recordingId = bestVideo.replace('recording:', '');
            videoSrc = null; // 先不设置src，等异步加载
        } else {
            videoSrc = bestVideo; // 使用排行榜中的视频路径
        }
    }

    const videoHtml = recordingId
        ? `<video class="video" muted loop preload="metadata" data-recording-id="${recordingId}"></video>`
        : (videoSrc ? `<video class="video" muted loop preload="metadata"><source src="${videoSrc}"></video>` : '');

    // 放大按钮（仅当有视频时显示）
    const expandBtnHtml = (recordingId || videoSrc)
        ? `<button class="video-expand-btn" data-recording-id="${recordingId || ''}" data-video-src="${videoSrc || ''}" data-game-name="${displayName}">⛶</button>`
        : '';

    const heatHtml = heat > 0 ? `<div class="game-heat">🔥${heat}</div>` : '';

    let timeHtml = '';
    if (currentSort === 'recent' && game.createdAt) {
        const date = new Date(game.createdAt);
        timeHtml = `<div class="game-time">📅 ${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}</div>`;
    }

    return `
    <div class="game-card" data-id="${game.id}">
        <div class="game-thumbnail">
            ${coverHtml}
            <div class="placeholder" ${game.cover ? 'style="display:none"' : ''}>${game.icon}</div>
            ${videoHtml}
            ${expandBtnHtml}
            <div class="favorite-zone" onclick="toggleFavorite('${game.id}', event)"></div>
            <button class="favorite-btn ${favorited ? 'active' : ''}" onclick="toggleFavorite('${game.id}', event)"></button>
            <div class="play-overlay"><div class="play-btn">▶</div></div>
        </div>
        <div class="game-info">
            <div class="game-title-row">
                <h3 class="game-title">${displayName}</h3>
                ${heat > 0 ? `<span class="game-heat">🔥${heat}</span>` : ''}
            </div>
        </div>
    </div>
    `;
}

// 打开游戏
function openGame(gameId) {
    const game = gamesData.find(g => g.id === gameId);
    if (game) {
        saveRecentlyPlayed(gameId);
        window.location.href = `game.html?id=${gameId}`;
    }
}

// 保存最近玩过的游戏
function saveRecentlyPlayed(gameId) {
    let recent = JSON.parse(localStorage.getItem('recentGames') || '[]');
    recent = recent.filter(id => id !== gameId);
    recent.unshift(gameId);
    recent = recent.slice(0, 10);
    localStorage.setItem('recentGames', JSON.stringify(recent));
}

// 获取最近玩过的游戏
function getRecentlyPlayed() {
    return JSON.parse(localStorage.getItem('recentGames') || '[]');
}

// ========== 游戏提交功能 ==========
let currentScreenshot = null;

// 获取提交记录
function getSubmissions() {
    return JSON.parse(localStorage.getItem('gameSubmissions') || '[]');
}

// 保存提交记录
function saveSubmission(submission) {
    const submissions = getSubmissions();
    submissions.unshift(submission);
    localStorage.setItem('gameSubmissions', JSON.stringify(submissions));
}

// 打开提交模态框
function openSubmitModal(event) {
    if (event) event.preventDefault();
    document.getElementById('submit-modal').classList.add('active');
    document.getElementById('submit-form-view').style.display = 'block';
    document.getElementById('submit-success-view').style.display = 'none';
    // 重置表单
    document.getElementById('game-desc').value = '';
    document.getElementById('game-link').value = '';
    document.getElementById('screenshot-preview').style.display = 'none';
    document.querySelector('.upload-placeholder').style.display = 'block';
    currentScreenshot = null;

    // 设置粘贴监听
    document.addEventListener('paste', handlePaste);
}

// 关闭提交模态框
function closeSubmitModal() {
    document.getElementById('submit-modal').classList.remove('active');
    document.removeEventListener('paste', handlePaste);
}

// 处理粘贴图片
function handlePaste(e) {
    const items = e.clipboardData?.items;
    if (!items) return;

    for (let item of items) {
        if (item.type.startsWith('image/')) {
            const file = item.getAsFile();
            processScreenshot(file);
            break;
        }
    }
}

// 处理截图上传
function handleScreenshot(input) {
    if (input.files && input.files[0]) {
        processScreenshot(input.files[0]);
    }
}

// 处理截图文件
function processScreenshot(file) {
    const reader = new FileReader();
    reader.onload = function (e) {
        currentScreenshot = e.target.result;
        document.getElementById('screenshot-preview').src = currentScreenshot;
        document.getElementById('screenshot-preview').style.display = 'block';
        document.querySelector('.upload-placeholder').style.display = 'none';
    };
    reader.readAsDataURL(file);
}

// 提交游戏
function submitGame(event) {
    event.preventDefault();

    const desc = document.getElementById('game-desc').value.trim();
    const link = document.getElementById('game-link').value.trim();

    // 保存提交
    const submission = {
        id: Date.now(),
        desc: desc || '(未填写描述)',
        link: link,
        screenshot: currentScreenshot,
        time: new Date().toLocaleString('zh-CN')
    };
    saveSubmission(submission);

    // 显示成功视图
    document.getElementById('submit-form-view').style.display = 'none';
    document.getElementById('submit-success-view').style.display = 'block';

    // 显示查看记录链接
    document.getElementById('view-my-submissions').style.display = 'block';
}

// 显示我的提交记录
function showMySubmissions() {
    closeSubmitModal();
    document.getElementById('my-modal').classList.add('active');
    renderMySubmissions();
}

// 关闭我的模态框
function closeMyModal() {
    document.getElementById('my-modal').classList.remove('active');
}

// 渲染我的提交记录
function renderMySubmissions() {
    const submissions = getSubmissions();
    const list = document.getElementById('my-submissions-list');

    if (submissions.length === 0) {
        list.innerHTML = '<div class="no-submissions">暂无提交记录</div>';
        return;
    }

    list.innerHTML = submissions.map(s => `
        <div class="submission-item">
            <div class="submission-desc">${escapeHtml(s.desc)}</div>
            ${s.link ? `<a href="${escapeHtml(s.link)}" class="submission-link" target="_blank">${escapeHtml(s.link)}</a>` : ''}
            ${s.screenshot ? `<img src="${s.screenshot}" class="submission-img" alt="截图">` : ''}
            <div class="submission-time">${s.time}</div>
        </div>
    `).join('');
}

// HTML转义
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// 点击模态框外部关闭
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
        e.target.classList.remove('active');
    }
});

// ========== 主页板块功能 ==========
// 生成随机昵称
function generateRandomNickname() {
    const adjectives = ['快乐的', '勇敢的', '神秘的', '闪亮的', '酷炫的', '机智的', '超级', '无敌的'];
    const nouns = ['玩家', '勇士', '大师', '高手', '达人', '王者', '冠军', '少侠'];
    const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    const num = Math.floor(Math.random() * 9000) + 1000;
    return adj + noun + num;
}

(function initProfilePanel() {
    const profileDropdown = document.getElementById('profile-dropdown');
    const profilePanel = document.getElementById('profile-panel');
    if (!profileDropdown || !profilePanel) return;

    // 临时存储修改（未保存）
    let tempProfile = {};

    // 导航切换
    const navItems = document.querySelectorAll('.profile-nav-item');
    const sections = document.querySelectorAll('.profile-section');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const sectionId = item.dataset.section;

            // 更新导航active状态
            navItems.forEach(n => n.classList.remove('active'));
            item.classList.add('active');

            // 切换内容区
            sections.forEach(s => s.classList.remove('active'));
            document.getElementById('section-' + sectionId)?.classList.add('active');

            // 切换到相应区域时加载数据
            if (sectionId === 'submissions') {
                renderProfileSubmissions();
            } else if (sectionId === 'stats') {
                renderProfileStats();
            }
        });
    });

    // 头像选择
    const avatarOptions = document.querySelectorAll('.avatar-option');
    avatarOptions.forEach(opt => {
        opt.addEventListener('click', () => {
            avatarOptions.forEach(a => a.classList.remove('selected'));
            opt.classList.add('selected');
            tempProfile.avatar = opt.dataset.avatar;
        });
    });

    // 昵称输入
    const nicknameInput = document.getElementById('profile-nickname');
    if (nicknameInput) {
        nicknameInput.addEventListener('input', (e) => {
            tempProfile.nickname = e.target.value;
        });
    }

    // 保存按钮
    const saveBtn = document.getElementById('profile-save-btn');
    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            saveProfile();
            saveBtn.textContent = '✓ 已保存';
            saveBtn.classList.add('saved');
            setTimeout(() => {
                saveBtn.textContent = '💾 保存设置';
                saveBtn.classList.remove('saved');
            }, 2000);
        });
    }

    // 面板打开时加载数据
    profileDropdown.addEventListener('mouseenter', () => {
        loadProfile();
    });

    // 加载保存的资料
    function loadProfile() {
        const saved = JSON.parse(localStorage.getItem('gamezone-profile') || '{}');

        // 如果没有昵称，自动生成随机昵称
        if (!saved.nickname) {
            saved.nickname = generateRandomNickname();
            localStorage.setItem('gamezone-profile', JSON.stringify(saved));
        }

        tempProfile = { ...saved };

        // 设置昵称
        if (nicknameInput) {
            nicknameInput.value = saved.nickname || '';
        }

        // 设置头像
        avatarOptions.forEach(opt => {
            opt.classList.remove('selected');
            if (opt.dataset.avatar === (saved.avatar || '👤')) {
                opt.classList.add('selected');
            }
        });

        // 加载游戏设置
        const joinLeaderboardCheckbox = document.getElementById('setting-join-leaderboard');
        if (joinLeaderboardCheckbox) {
            joinLeaderboardCheckbox.checked = saved.joinLeaderboard !== false; // 默认为true
        }
        const showVideoCheckbox = document.getElementById('setting-show-video');
        if (showVideoCheckbox) {
            showVideoCheckbox.checked = saved.showVideo !== false; // 默认为true
        }

        // 渲染统计
        renderProfileStats();
    }

    // 保存资料
    function saveProfile() {
        const current = JSON.parse(localStorage.getItem('gamezone-profile') || '{}');
        const updated = { ...current, ...tempProfile };

        // 保存游戏设置
        const joinLeaderboardCheckbox = document.getElementById('setting-join-leaderboard');
        if (joinLeaderboardCheckbox) {
            updated.joinLeaderboard = joinLeaderboardCheckbox.checked;
        }
        const showVideoCheckbox = document.getElementById('setting-show-video');
        if (showVideoCheckbox) {
            updated.showVideo = showVideoCheckbox.checked;
        }

        localStorage.setItem('gamezone-profile', JSON.stringify(updated));

        // 更新按钮显示的头像
        const myBtn = document.getElementById('my-btn');
        if (myBtn && updated.avatar) {
            myBtn.textContent = updated.avatar;
        }
    }

    // 渲染提交记录（迷你版）
    function renderProfileSubmissions() {
        const submissions = JSON.parse(localStorage.getItem('gameSubmissions') || '[]');
        const list = document.getElementById('profile-submissions-list');
        const noData = document.getElementById('no-submissions');

        if (!list) return;

        if (submissions.length === 0) {
            list.innerHTML = '';
            if (noData) noData.style.display = 'block';
            return;
        }

        if (noData) noData.style.display = 'none';
        list.innerHTML = submissions.slice(0, 5).map(s => `
            <div class="submission-item-mini">
                <div class="desc">${escapeHtml(s.desc)}</div>
                <div class="time">${s.time}</div>
            </div>
        `).join('');
    }

    // 渲染游戏统计
    function renderProfileStats() {
        const playStats = JSON.parse(localStorage.getItem('gamePlayStats') || '{}');
        const favorites = JSON.parse(localStorage.getItem('gameFavorites') || '[]');
        const history = JSON.parse(localStorage.getItem('gameHistory') || '[]');

        // 玩过的游戏数
        const playedCount = Object.keys(playStats).length;
        document.getElementById('stat-played')?.textContent
            && (document.getElementById('stat-played').textContent = playedCount);

        // 收藏数
        document.getElementById('stat-favorites')?.textContent
            && (document.getElementById('stat-favorites').textContent = favorites.length);

        // 总游玩次数
        const totalPlays = Object.values(playStats).reduce((sum, val) => sum + val, 0);
        document.getElementById('stat-total-plays')?.textContent
            && (document.getElementById('stat-total-plays').textContent = totalPlays);

        // 获赞数（评论区获得的赞）
        const allComments = JSON.parse(localStorage.getItem('gameComments') || '{}');
        const profile = JSON.parse(localStorage.getItem('gamezone-profile') || '{}');
        const myNickname = profile.nickname || '匿名玩家';
        let totalLikes = 0;
        // 遍历所有游戏的评论，统计当前用户获得的赞
        Object.values(allComments).forEach(comments => {
            comments.forEach(c => {
                if (c.author === myNickname && c.likes) {
                    totalLikes += c.likes;
                }
            });
        });
        document.getElementById('stat-likes')?.textContent
            && (document.getElementById('stat-likes').textContent = totalLikes);
    }

    // 页面加载时设置按钮头像
    const saved = JSON.parse(localStorage.getItem('gamezone-profile') || '{}');
    const myBtn = document.getElementById('my-btn');
    if (myBtn && saved.avatar) {
        myBtn.textContent = saved.avatar;
    }
})();
