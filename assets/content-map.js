// assets/content-map.js
// 站点内容分区、关键词标签与搜索过滤函数

const siteConfig = {
  baseUrl: 'https://web-app-aiyouxi.com.cn',
  siteName: '爱游戏',
  defaultLang: 'zh-CN'
};

const contentSections = [
  {
    id: 'news',
    title: '新闻动态',
    keywords: ['爱游戏', '更新', '活动', '公告'],
    items: [
      { title: '爱游戏平台新版本上线', tags: ['爱游戏', '更新'], date: '2025-03-10' },
      { title: '周末双倍经验活动', tags: ['活动', '爱游戏'], date: '2025-03-08' }
    ]
  },
  {
    id: 'guides',
    title: '攻略指南',
    keywords: ['攻略', '技巧', '新手指南', '爱游戏'],
    items: [
      { title: '新手如何快速上手', tags: ['新手指南', '爱游戏'], date: '2025-03-05' },
      { title: '高级技巧汇总', tags: ['技巧', '攻略'], date: '2025-03-02' }
    ]
  },
  {
    id: 'community',
    title: '社区交流',
    keywords: ['论坛', '玩家', '分享', '爱游戏'],
    items: [
      { title: '玩家心得分享', tags: ['分享', '玩家'], date: '2025-02-28' },
      { title: '版本讨论贴', tags: ['论坛', '爱游戏'], date: '2025-02-25' }
    ]
  }
];

function getAllKeywords() {
  const keywordSet = new Set();
  contentSections.forEach(section => {
    section.keywords.forEach(kw => keywordSet.add(kw));
    section.items.forEach(item => {
      item.tags.forEach(tag => keywordSet.add(tag));
    });
  });
  return Array.from(keywordSet);
}

function searchContent(query) {
  const results = [];
  const lowerQuery = query.toLowerCase();
  contentSections.forEach(section => {
    const sectionMatch = section.keywords.some(kw => kw.toLowerCase().includes(lowerQuery));
    const matchingItems = section.items.filter(item => {
      const titleMatch = item.title.toLowerCase().includes(lowerQuery);
      const tagMatch = item.tags.some(tag => tag.toLowerCase().includes(lowerQuery));
      return titleMatch || tagMatch;
    });
    if (sectionMatch || matchingItems.length > 0) {
      results.push({
        sectionId: section.id,
        sectionTitle: section.title,
        matchedItems: matchingItems.length > 0 ? matchingItems : null
      });
    }
  });
  return results;
}

function filterByTag(tag) {
  const results = [];
  contentSections.forEach(section => {
    const filteredItems = section.items.filter(item =>
      item.tags.some(t => t.toLowerCase() === tag.toLowerCase())
    );
    if (filteredItems.length > 0) {
      results.push({
        sectionId: section.id,
        sectionTitle: section.title,
        items: filteredItems
      });
    }
  });
  return results;
}

function getSiteInfo() {
  return {
    url: siteConfig.baseUrl,
    name: siteConfig.siteName,
    language: siteConfig.defaultLang,
    sectionCount: contentSections.length,
    totalItems: contentSections.reduce((acc, sec) => acc + sec.items.length, 0)
  };
}

// 示例使用（仅用于演示，非自动执行）
// console.log(getSiteInfo());
// console.log(searchContent('爱游戏'));
// console.log(filterByTag('攻略'));

// 导出供其他模块使用（如果环境支持）
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    siteConfig,
    contentSections,
    getAllKeywords,
    searchContent,
    filterByTag,
    getSiteInfo
  };
}