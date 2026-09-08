# DevLog · 个人技术博客

一个使用纯 **HTML5 + CSS3 + JavaScript** 构建的极简个人技术博客，无框架、无构建工具、无后端依赖。

**双击 `index.html` 即可直接在浏览器中运行**，文章数据内嵌在 JS 里，无需启动任何服务器。

## 项目结构

```
blog/
├── index.html        # 首页（文章列表 + 搜索 + 分类筛选 + 关于我）
├── post.html         # 文章详情页（通过 ?id= 加载）
├── css/
│   └── style.css     # 全局样式（含深浅色主题、响应式）
├── js/
│   ├── posts.js      # 文章数据（新增文章改这里）
│   └── main.js       # 渲染、筛选、搜索、主题切换等逻辑
└── README.md
```

## 功能特性

- ✅ 响应式设计，适配移动端与桌面端
- ✅ 文章列表 + 详情页（上一篇 / 下一篇导航）
- ✅ 关键词搜索（标题 / 摘要 / 标签）
- ✅ 分类筛选（自动从文章数据生成）
- ✅ 深色 / 浅色主题切换，跟随系统偏好并本地记忆
- ✅ 阅读时长自动估算
- ✅ 无需服务器，纯静态文件直接运行

## 如何新增一篇文章

编辑 `js/posts.js`，在 `POSTS` 数组里加一个对象即可：

```js
{
  id: 7,                              // 唯一编号
  title: "我的新文章标题",
  category: "JavaScript",             // 分类（会自动出现在筛选栏）
  date: "2026-09-08",                 // 日期 YYYY-MM-DD
  tags: ["标签一", "标签二"],
  emoji: "📝",                        // 封面 emoji
  gradient: "linear-gradient(135deg, #11998e, #38ef7d)", // 封面渐变
  excerpt: "一句话摘要，展示在列表页。",
  content: `                           // 正文，HTML 字符串
    <h2>小标题</h2>
    <p>段落内容……</p>
    <pre><code>代码块</code></pre>
  `
}
```

保存后刷新页面即可看到新文章。列表按日期倒序自动排列。

## 自定义站点信息

在 `js/posts.js` 顶部的 `SITE` 对象中修改：

```js
const SITE = {
  name: "DevLog",        // Logo 名称
  title: "我的技术博客", // 站点标题
  subtitle: "...",       // 副标题
  author: "K",           // 作者名
  github: "https://github.com",
};
```

## 自定义主题色

在 `css/style.css` 顶部的 `:root` 中修改 CSS 变量：

```css
:root {
  --primary: #2563eb;   /* 主色调 */
  --bg: #ffffff;        /* 背景色 */
  --text: #111827;      /* 主要文字颜色 */
}
```

深色模式对应的变量在 `[data-theme="dark"]` 块中，可一并调整。

## 技术栈

- HTML5 —— 语义化标签
- CSS3 —— 变量、Flexbox、Grid、`color-mix`、响应式
- JavaScript（ES6+）—— 无任何依赖

## 许可证

MIT License
