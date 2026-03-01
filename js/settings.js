// ========== 主题和语言设置 ==========

// 主题颜色预设
const themePresets = {
    purple: { primary: '#6366f1', hover: '#4f46e5' },
    blue: { primary: '#3b82f6', hover: '#2563eb' },
    green: { primary: '#10b981', hover: '#059669' },
    orange: { primary: '#f59e0b', hover: '#d97706' },
    pink: { primary: '#ec4899', hover: '#db2777' },
    dark: { primary: '#6366f1', hover: '#4f46e5', isDark: true }
};

// 多语言文本
const translations = {
    zh: {
        'nav.all': '全部',
        'nav.hot': '热门',
        'nav.new': '最新',
        'nav.recent': '最近玩过',
        'nav.favorites': '收藏',
        'settings.theme': '主题颜色',
        'settings.custom': '自定义',
        'settings.language': '语言',
        'search.placeholder': '搜索游戏...',
        'section.all': '🎮 全部游戏',
        'section.hot': '🔥 热门游戏',
        'section.new': '🆕 最新游戏',
        'section.history': '🕐 最近玩过',
        'section.favorites': '❤️ 我的收藏',
        'category.all': '全部游戏',
        'category.puzzle': '🧩 益智',
        'category.arcade': '🎮 街机',
        'category.racing': '🏎️ 竞速',
        'category.sports': '⚽ 体育',
        'category.board': '♟️ 棋牌',
        'category.casual': '🎯 休闲',
        'footer.copyright': '© 2026 GameZone - 免费在线游戏平台',
        'footer.about': '关于我们',
        'footer.privacy': '隐私政策',
        'footer.contact': '联系我们',
        'no.games': '没有找到游戏'
    },
    en: {
        'nav.all': 'All',
        'nav.hot': 'Hot',
        'nav.new': 'New',
        'nav.recent': 'Recent',
        'nav.favorites': 'Favorites',
        'settings.theme': 'Theme Color',
        'settings.custom': 'Custom',
        'settings.language': 'Language',
        'search.placeholder': 'Search games...',
        'section.all': '🎮 All Games',
        'section.hot': '🔥 Hot Games',
        'section.new': '🆕 New Games',
        'section.history': '🕐 Recently Played',
        'section.favorites': '❤️ My Favorites',
        'category.all': 'All Games',
        'category.puzzle': '🧩 Puzzle',
        'category.arcade': '🎮 Arcade',
        'category.racing': '🏎️ Racing',
        'category.sports': '⚽ Sports',
        'category.board': '♟️ Board',
        'category.casual': '🎯 Casual',
        'footer.copyright': '© 2026 GameZone - Free Online Games',
        'footer.about': 'About Us',
        'footer.privacy': 'Privacy Policy',
        'footer.contact': 'Contact Us',
        'no.games': 'No games found'
    },
    ja: {
        'nav.all': '全て',
        'nav.hot': '人気',
        'nav.new': '新着',
        'nav.recent': '最近',
        'nav.favorites': 'お気に入り',
        'settings.theme': 'テーマカラー',
        'settings.custom': 'カスタム',
        'settings.language': '言語',
        'search.placeholder': 'ゲームを検索...',
        'section.all': '🎮 すべてのゲーム',
        'section.hot': '🔥 人気ゲーム',
        'section.new': '🆕 新着ゲーム',
        'section.history': '🕐 最近プレイ',
        'section.favorites': '❤️ お気に入り',
        'category.all': 'すべてのゲーム',
        'category.puzzle': '🧩 パズル',
        'category.arcade': '🎮 アーケード',
        'category.racing': '🏎️ レース',
        'category.sports': '⚽ スポーツ',
        'category.board': '♟️ ボード',
        'category.casual': '🎯 カジュアル',
        'footer.copyright': '© 2026 GameZone - 無料オンラインゲーム',
        'footer.about': '会社概要',
        'footer.privacy': 'プライバシー',
        'footer.contact': 'お問い合わせ',
        'no.games': 'ゲームが見つかりません'
    }
};

let currentLang = localStorage.getItem('gamezone-lang') || 'zh';

// 初始化设置
function initSettings() {
    // 恢复保存的主题
    const savedTheme = localStorage.getItem('gamezone-theme');
    const savedColor = localStorage.getItem('gamezone-color');

    if (savedTheme) {
        applyTheme(savedTheme, savedColor);
        // 高亮对应的预设按钮
        document.querySelectorAll('.theme-preset').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.theme === savedTheme);
        });
    }

    // 恢复自定义颜色输入
    if (savedColor) {
        const colorInput = document.getElementById('custom-color');
        if (colorInput) colorInput.value = savedColor;
    }

    // 恢复保存的语言
    currentLang = localStorage.getItem('gamezone-lang') || 'zh';
    applyLanguage(currentLang);
    document.querySelectorAll('.lang-option').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === currentLang);
    });

    // 绑定主题预设点击
    document.querySelectorAll('.theme-preset').forEach(btn => {
        btn.addEventListener('click', () => {
            const theme = btn.dataset.theme;
            const preset = themePresets[theme];
            applyTheme(theme, preset.primary);
            localStorage.setItem('gamezone-theme', theme);
            localStorage.setItem('gamezone-color', preset.primary);
            // 更新激活状态
            document.querySelectorAll('.theme-preset').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // 绑定自定义颜色选择
    const customColorInput = document.getElementById('custom-color');
    if (customColorInput) {
        customColorInput.addEventListener('input', (e) => {
            const color = e.target.value;
            applyTheme('custom', color);
            localStorage.setItem('gamezone-theme', 'custom');
            localStorage.setItem('gamezone-color', color);
            // 取消预设激活状态
            document.querySelectorAll('.theme-preset').forEach(b => b.classList.remove('active'));
        });
    }

    // 绑定语言切换
    document.querySelectorAll('.lang-option').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            currentLang = lang;
            applyLanguage(lang);
            localStorage.setItem('gamezone-lang', lang);
            // 更新激活状态
            document.querySelectorAll('.lang-option').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            // 重新渲染游戏卡片以更新游戏名称语言
            if (typeof filterAndRenderGames === 'function') {
                filterAndRenderGames();
            }
        });
    });
}

// 应用主题
function applyTheme(themeName, primaryColor) {
    const root = document.documentElement;
    const preset = themePresets[themeName];

    // 设置主色调
    root.style.setProperty('--primary-color', primaryColor);

    // 计算hover色（稍微深一点）
    const hoverColor = preset?.hover || adjustColor(primaryColor, -20);
    root.style.setProperty('--primary-hover', hoverColor);

    // 处理深色模式
    if (preset?.isDark) {
        root.setAttribute('data-theme', 'dark');
    } else {
        root.removeAttribute('data-theme');
    }
}

// 调整颜色亮度
function adjustColor(color, amount) {
    const hex = color.replace('#', '');
    const r = Math.max(0, Math.min(255, parseInt(hex.substr(0, 2), 16) + amount));
    const g = Math.max(0, Math.min(255, parseInt(hex.substr(2, 2), 16) + amount));
    const b = Math.max(0, Math.min(255, parseInt(hex.substr(4, 2), 16) + amount));
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

// 应用语言
function applyLanguage(lang) {
    const texts = translations[lang] || translations.zh;

    // 更新所有带 data-i18n 属性的元素
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (texts[key]) {
            el.textContent = texts[key];
        }
    });

    // 更新搜索框placeholder
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.placeholder = texts['search.placeholder'];
    }

    // 更新分类标签
    const categoryMap = {
        'all': 'category.all',
        'puzzle': 'category.puzzle',
        'arcade': 'category.arcade',
        'racing': 'category.racing',
        'sports': 'category.sports',
        'board': 'category.board',
        'casual': 'category.casual'
    };
    document.querySelectorAll('.category-tag').forEach(tag => {
        const cat = tag.dataset.category;
        if (categoryMap[cat] && texts[categoryMap[cat]]) {
            tag.textContent = texts[categoryMap[cat]];
        }
    });

    // 更新页脚
    const footerP = document.querySelector('.footer p');
    if (footerP) footerP.textContent = texts['footer.copyright'];

    const footerLinks = document.querySelectorAll('.footer-links a');
    if (footerLinks.length >= 3) {
        footerLinks[0].textContent = texts['footer.about'];
        footerLinks[1].textContent = texts['footer.privacy'];
        footerLinks[2].textContent = texts['footer.contact'];
    }

    // 更新 HTML lang 属性
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : (lang === 'ja' ? 'ja' : 'en');
}

// 获取当前语言的文本
function t(key) {
    const texts = translations[currentLang] || translations.zh;
    return texts[key] || key;
}

// 页面加载时初始化设置
document.addEventListener('DOMContentLoaded', initSettings);
