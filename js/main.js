/* =================================================================
   主程序逻辑
   依赖 js/posts.js（提供 SITE、POSTS 两个全局变量）
   覆盖两个页面：index.html（列表页）与 post.html（详情页）
   ================================================================= */

/* ===== 工具函数 ===== */
/** HTML 转义，防止内容中的特殊字符破坏结构 */
function escapeHtml(str) {
  return String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** 把 YYYY-MM-DD 格式化为「2026年8月20日」 */
function formatDate(dateStr) {
  const [y, m, d] = dateStr.split("-");
  return `${y}年${Number(m)}月${Number(d)}日`;
}

/** 根据正文字数估算阅读时长（分钟） */
function readingTime(html) {
  const text = html.replace(/<[^>]+>/g, "");
  return Math.max(1, Math.round(text.length / 400));
}

/** 判断当前是否为文章详情页 */
function isDetailPage() {
  return document.getElementById("post-container") !== null;
}

/* ===== 主题切换 ===== */
function initTheme() {
  const toggle = document.getElementById("theme-toggle");
  if (!toggle) return;

  const updateIcon = () => {
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    toggle.textContent = isDark ? "☀️" : "🌙";
    toggle.setAttribute("aria-label", isDark ? "切换到浅色模式" : "切换到深色模式");
  };

  toggle.addEventListener("click", () => {
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    document.documentElement.setAttribute("data-theme", isDark ? "light" : "dark");
    localStorage.setItem("theme", isDark ? "light" : "dark");
    updateIcon();
  });

  updateIcon();
}

/* ===== 导航栏：标记当前页 ===== */
function initNav() {
  const page = document.body.dataset.page; // 在 body 上标注，如 "home" / "post"
  document.querySelectorAll(".nav-links a").forEach((a) => {
    if (a.dataset.page === page) a.classList.add("active");
  });
}

/* =================================================================
   列表页
   ================================================================= */
function renderCard(post) {
  const meta = `
    <span>${escapeHtml(formatDate(post.date))}</span>
    <span>·</span>
    <span>${readingTime(post.content)} 分钟阅读</span>
  `;

  const tags = post.tags
    .map((t) => `<span class="tag">${escapeHtml(t)}</span>`)
    .join("");

  return `
    <article class="card">
      <a class="card-cover" href="post.html?id=${post.id}"
         style="background: ${post.gradient};">
        <span class="card-emoji">${post.emoji}</span>
        <span class="card-category">${escapeHtml(post.category)}</span>
      </a>
      <div class="card-body">
        <div class="card-meta">${meta}</div>
        <h3 class="card-title">
          <a href="post.html?id=${post.id}">${escapeHtml(post.title)}</a>
        </h3>
        <p class="card-excerpt">${escapeHtml(post.excerpt)}</p>
        <div class="card-tags">${tags}</div>
      </div>
    </article>
  `;
}

function initListPage() {
  const grid = document.getElementById("articles-grid");
  const searchInput = document.getElementById("search-input");
  const categoriesEl = document.getElementById("categories");

  if (!grid) return;

  // 按日期倒序排列
  const posts = [...POSTS].sort((a, b) => b.date.localeCompare(a.date));
  let currentCategory = "全部";
  let keyword = "";

  /* --- 生成分类筛选 --- */
  const categories = ["全部", ...new Set(POSTS.map((p) => p.category))];
  categoriesEl.innerHTML = categories
    .map(
      (c) =>
        `<button class="chip${c === "全部" ? " active" : ""}"
                 data-category="${escapeHtml(c)}">${escapeHtml(c)}</button>`
    )
    .join("");

  /* --- 渲染 + 筛选 --- */
  function applyFilters() {
    const filtered = posts.filter((post) => {
      const matchCategory = currentCategory === "全部" || post.category === currentCategory;
      const haystack = `${post.title} ${post.excerpt} ${post.tags.join(" ")}`.toLowerCase();
      const matchKeyword = keyword === "" || haystack.includes(keyword);
      return matchCategory && matchKeyword;
    });

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="empty-state">
          <span class="emoji">🔍</span>
          没有找到相关文章，换个关键词或分类试试
        </div>`;
      return;
    }

    grid.innerHTML = filtered.map(renderCard).join("");
  }

  categoriesEl.addEventListener("click", (e) => {
    const chip = e.target.closest(".chip");
    if (!chip) return;
    categoriesEl.querySelectorAll(".chip").forEach((c) => c.classList.remove("active"));
    chip.classList.add("active");
    currentCategory = chip.dataset.category;
    applyFilters();
  });

  searchInput.addEventListener("input", (e) => {
    keyword = e.target.value.trim().toLowerCase();
    applyFilters();
  });

  applyFilters();
}

/* =================================================================
   详情页
   ================================================================= */
function initDetailPage() {
  const container = document.getElementById("post-container");
  if (!container) return;

  const params = new URLSearchParams(location.search);
  const id = Number(params.get("id"));
  const posts = [...POSTS].sort((a, b) => b.date.localeCompare(a.date));
  const index = posts.findIndex((p) => p.id === id);
  const post = posts[index];

  if (!post) {
    container.innerHTML = `
      <div class="empty-state">
        <span class="emoji">😢</span>
        文章不存在或已被删除
        <p style="margin-top:12px">
          <a href="index.html" style="color:var(--primary)">← 返回首页</a>
        </p>
      </div>`;
    return;
  }

  document.title = `${post.title} · ${SITE.title}`;

  const tags = post.tags.map((t) => `<span class="tag">${escapeHtml(t)}</span>`).join("");
  const prev = posts[index + 1];
  const next = posts[index - 1];

  container.innerHTML = `
    <a class="back-link" href="index.html">← 返回文章列表</a>
    <article>
      <header class="post-header">
        <span class="post-category">${escapeHtml(post.category)}</span>
        <h1>${escapeHtml(post.title)}</h1>
        <div class="post-meta">
          <span>👤 ${escapeHtml(SITE.author)}</span>
          <span class="sep">|</span>
          <span>📅 ${escapeHtml(formatDate(post.date))}</span>
          <span class="sep">|</span>
          <span>⏱ ${readingTime(post.content)} 分钟阅读</span>
        </div>
      </header>

      <div class="post-body">${post.content}</div>

      <div class="post-tags">${tags}</div>
    </article>

    <nav class="post-nav">
      ${
        prev
          ? `<a href="post.html?id=${prev.id}" class="prev">
               <span class="dir">← 上一篇</span>
               <span class="title">${escapeHtml(prev.title)}</span>
             </a>`
          : "<span></span>"
      }
      ${
        next
          ? `<a href="post.html?id=${next.id}" class="next">
               <span class="dir">下一篇 →</span>
               <span class="title">${escapeHtml(next.title)}</span>
             </a>`
          : "<span></span>"
      }
    </nav>
  `;
}

/* ===== 初始化 ===== */
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initNav();
  initListPage();
  initDetailPage();
});
