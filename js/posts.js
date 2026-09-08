/* =================================================================
   文章数据
   纯前端方案：把文章内容直接内嵌在 JS 中，
   这样无需服务器 / 构建工具，双击 index.html 即可运行。

   如何新增文章：往 POSTS 数组里加一个对象即可。
   字段说明：
     id       唯一编号（用于详情页 post.html?id=xxx）
     title    标题
     category 分类（会自动生成顶部分类筛选）
     date     日期，格式 YYYY-MM-DD
     tags     标签数组
     emoji    封面 emoji
     gradient 封面渐变背景
     excerpt  摘要（列表页显示）
     content  正文（HTML 字符串）
   ================================================================= */

const SITE = {
  name: "DevLog",
  title: "我的技术博客",
  subtitle: "记录学习，分享技术，一起成长",
  author: "K",
  github: "https://github.com",
};

const POSTS = [
  {
    id: 1,
    title: "从零理解 JavaScript 事件循环（Event Loop）",
    category: "JavaScript",
    date: "2026-08-20",
    tags: ["事件循环", "异步", "V8"],
    emoji: "🔄",
    gradient: "linear-gradient(135deg, #f7b733, #fc4a1a)",
    excerpt:
      "为什么 setTimeout 明明写 0 毫秒，却不是立即执行？宏任务与微任务的执行顺序到底是什么？一文讲清 JavaScript 的事件循环机制。",
    content: `
      <p>很多开发者第一次踩到“异步顺序”的坑，都是从下面这段代码开始的：</p>
      <pre><code>console.log('1');
setTimeout(() =&gt; console.log('2'), 0);
Promise.resolve().then(() =&gt; console.log('3'));
console.log('4');
// 输出顺序：1 4 3 2</code></pre>
      <p>为什么 <code>setTimeout(..., 0)</code> 不是立即执行，而 <code>Promise</code> 的回调反而排在了它前面？要回答这个问题，需要理解 JavaScript 的<b>事件循环</b>。</p>

      <h2>单线程与调用栈</h2>
      <p>JavaScript 是单线程语言，同一时间只能执行一段代码。代码按顺序进入<b>调用栈（Call Stack）</b>，执行完再弹出。当调用栈被清空后，事件循环才会去处理“等待队列”里的任务。</p>

      <h2>任务队列的两条轨道</h2>
      <p>浏览器把异步任务分成两类：</p>
      <ul>
        <li><b>宏任务（Macrotask）</b>：setTimeout、setInterval、I/O、UI 渲染等；</li>
        <li><b>微任务（Microtask）</b>：Promise.then、MutationObserver、queueMicrotask 等。</li>
      </ul>
      <p>每一轮事件循环的流程大致是：执行一个宏任务 → 清空当前所有微任务 → 渲染（如果需要）→ 再执行下一个宏任务。</p>

      <h2>回到开头那段代码</h2>
      <p>同步代码 <code>1</code>、<code>4</code> 先执行；<code>setTimeout</code> 被放入宏任务队列，<code>Promise.then</code> 被放入微任务队列。同步代码跑完后，事件循环先清空微任务（输出 <code>3</code>），再去取下一个宏任务（输出 <code>2</code>）。</p>
      <blockquote>记住一句话：每个宏任务结束后，微任务队列会被彻底清空，然后才轮到下一个宏任务。</blockquote>
      <p>理解了这条规则，绝大多数关于异步顺序的“玄学”问题都能迎刃而解。</p>
    `,
  },
  {
    id: 2,
    title: "CSS Grid 布局实战：十个高频场景",
    category: "CSS",
    date: "2026-08-12",
    tags: ["CSS Grid", "布局", "响应式"],
    emoji: "📐",
    gradient: "linear-gradient(135deg, #667eea, #764ba2)",
    excerpt:
      "还在用 float 和绝对定位硬凑布局吗？Grid 提供了一套二维布局模型，本文用十个常见场景带你快速上手。",
    content: `
      <p>CSS Grid 是目前最强大的二维布局工具：它同时管理<b>行与列</b>，而 Flexbox 更适合一维排列。两者配合使用，几乎能解决所有布局问题。</p>

      <h2>基础：定义一个网格</h2>
      <pre><code>.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}</code></pre>
      <p>上面这段代码创建了一个三列等宽的网格。<code>1fr</code> 表示“一份可用空间”，三列均分容器宽度。</p>

      <h2>场景一：卡片列表（自动填充）</h2>
      <p>响应式卡片墙是 Grid 的经典用法。用 <code>auto-fill</code> 和 <code>minmax()</code> 可以让列数随屏幕宽度自动变化：</p>
      <pre><code>.cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}</code></pre>
      <p>屏幕变宽，列数自动增加；变窄，自动减少，全程无需媒体查询。</p>

      <h2>场景二：圣杯布局</h2>
      <p>经典的“头部 + 侧边栏 + 内容 + 页脚”可以用 <code>grid-template-areas</code> 描述得非常直观：</p>
      <pre><code>.layout {
  display: grid;
  grid-template-areas:
    "header header header"
    "sidebar main   aside"
    "footer footer footer";
  grid-template-columns: 200px 1fr 200px;
}</code></pre>
      <p>每个子元素只需一句 <code>grid-area: sidebar;</code> 就能落位，可读性极高。</p>

      <h2>场景三：完美居中</h2>
      <p>Grid 让“水平垂直居中”变得极其简单：</p>
      <pre><code>.center {
  display: grid;
  place-items: center;
}</code></pre>
      <p>这一行等于同时设置了 <code>align-items</code> 和 <code>justify-items</code> 为 center。</p>

      <blockquote>总结：一维用 Flex，二维用 Grid。两者并不互斥，而是互补。</blockquote>
    `,
  },
  {
    id: 3,
    title: "React Hooks 心智模型：从类组件到函数组件",
    category: "React",
    date: "2026-07-28",
    tags: ["React", "Hooks", "前端"],
    emoji: "⚛️",
    gradient: "linear-gradient(135deg, #00c6ff, #0072ff)",
    excerpt:
      "useState 和 useEffect 究竟怎么用才不踩坑？理解“每次渲染都有自己的 props 和 state”这句话，你就掌握了 Hooks 的精髓。",
    content: `
      <p>React 16.8 引入的 Hooks 让函数组件拥有了状态与生命周期能力。但要真正用好它，关键是转变心智模型。</p>

      <h2>useState：状态快照</h2>
      <pre><code>function Counter() {
  const [count, setCount] = useState(0);
  return (
    &lt;button onClick={() =&gt; setCount(count + 1)}&gt;
      {count}
    &lt;/button&gt;
  );
}</code></pre>
      <p>需要记住的是：<b>每次渲染都有自己独立的 <code>count</code></b>。它不是“会变的变量”，而是这一次渲染的快照。</p>

      <h2>useEffect：与外部系统同步</h2>
      <p>不要把 useEffect 理解成“生命周期”。它表达的是：<b>当依赖变化时，运行一段副作用并清理</b>。</p>
      <pre><code>useEffect(() =&gt; {
  const id = setInterval(() =&gt; console.log('tick'), 1000);
  return () =&gt; clearInterval(id); // 清理函数
}, []);</code></pre>
      <p>返回的清理函数会在依赖变化前、以及组件卸载时执行，避免内存泄漏。</p>

      <h2>三条实用规则</h2>
      <ul>
        <li>只在函数顶层调用 Hook，不要放进条件或循环里；</li>
        <li>依赖数组要如实列出所有用到的外部变量；</li>
        <li>能用派生值就不要用额外的 state，减少状态复杂度。</li>
      </ul>
      <blockquote>Hooks 的难点不在 API，而在“把状态和时间看成数据流”的思维方式。</blockquote>
    `,
  },
  {
    id: 4,
    title: "Node.js 异步编程：回调、Promise 与 async/await",
    category: "Node.js",
    date: "2026-07-10",
    tags: ["Node.js", "异步", "Promise"],
    emoji: "🟢",
    gradient: "linear-gradient(135deg, #11998e, #38ef7d)",
    excerpt:
      "从回调地狱到 Promise 链，再到 async/await 的糖衣语法，梳理 Node.js 异步编程的演进路线与最佳实践。",
    content: `
      <p>Node.js 的一切 I/O 操作都是异步的。理解异步编程的演进，是写好 Node 代码的必修课。</p>

      <h2>回调（Callback）时代</h2>
      <p>早期 Node 依赖“错误优先回调”：</p>
      <pre><code>fs.readFile('a.txt', (err, data) =&gt; {
  if (err) throw err;
  fs.readFile('b.txt', (err, data2) =&gt; {
    // 嵌套越来越深，形成“回调地狱”
  });
});</code></pre>
      <p>多层级嵌套让代码难以阅读和维护。</p>

      <h2>Promise：把异步变成可组合的值</h2>
      <p>Promise 让异步操作可以被 <code>.then()</code> 串联，也能用 <code>.catch()</code> 统一处理错误：</p>
      <pre><code>readFile('a.txt')
  .then((data) =&gt; readFile('b.txt'))
  .then((data2) =&gt; console.log(data2))
  .catch((err) =&gt; console.error(err));</code></pre>

      <h2>async/await：同步写法的异步代码</h2>
      <p><code>async/await</code> 本质是 Promise 的语法糖，让代码读起来像同步流程：</p>
      <pre><code>async function main() {
  try {
    const a = await readFile('a.txt');
    const b = await readFile('b.txt');
    return a + b;
  } catch (err) {
    console.error(err);
  }
}</code></pre>

      <blockquote>推荐：能用 async/await 就尽量用，它让错误处理回归 try/catch，可读性最佳。但别忘了它底层仍是 Promise。</blockquote>
    `,
  },
  {
    id: 5,
    title: "Git 分支管理的最佳实践",
    category: "Git",
    date: "2026-06-25",
    tags: ["Git", "版本控制", "工作流"],
    emoji: "🌿",
    gradient: "linear-gradient(135deg, #f953c6, #b91d73)",
    excerpt:
      "feature 分支什么时候建、什么时候合？rebase 和 merge 到底怎么选？一套清晰的分支规范能显著提升团队协作效率。",
    content: `
      <p>Git 的强大之处在于分支。但如果没有规范，分支很快会变成一团乱麻。</p>

      <h2>常用工作流：Git Flow 与 Trunk-Based</h2>
      <p><b>Git Flow</b> 适合有明确发布周期的团队，分支包括：</p>
      <ul>
        <li><code>main</code> —— 生产稳定分支；</li>
        <li><code>develop</code> —— 集成分支；</li>
        <li><code>feature/xxx</code> —— 功能分支；</li>
        <li><code>hotfix/xxx</code> —— 紧急修复分支。</li>
      </ul>
      <p>而 <b>Trunk-Based Development</b> 主张大家频繁往主干合并，配合 feature flag 控制发布，分支更少、更简洁。</p>

      <h2>merge 还是 rebase？</h2>
      <pre><code># 合并（保留完整历史，会产生合并提交）
git merge feature/login

# 变基（历史更线性，但会改写提交）
git rebase main</code></pre>
      <p>简单经验法则：<b>公共分支用 merge，个人未推送的本地分支用 rebase</b> 保持历史整洁。</p>

      <h2>提交信息规范</h2>
      <p>一条好的提交信息让人一眼看懂改动：</p>
      <pre><code>feat: 新增用户登录接口
fix: 修复列表分页越界问题
refactor: 抽离公共请求封装</code></pre>
      <p>约定前缀（feat / fix / refactor / docs / chore）配合简洁描述，能让提交历史成为一份可读的文档。</p>

      <blockquote>分支管理没有银弹，选一种团队能一致执行的规范，并坚持它。</blockquote>
    `,
  },
  {
    id: 6,
    title: "前端性能优化的关键指标与实操",
    category: "性能优化",
    date: "2026-06-08",
    tags: ["性能", "LCP", "优化"],
    emoji: "🚀",
    gradient: "linear-gradient(135deg, #ff6a00, #ee0979)",
    excerpt:
      "页面加载慢？交互卡顿？先用核心 Web 指标（LCP / INP / CLS）定位问题，再对症下药，避免盲目优化。",
    content: `
      <p>性能优化最忌“凭感觉”。先有度量，再谈优化，才能把钱花在刀刃上。</p>

      <h2>三个核心 Web 指标</h2>
      <ul>
        <li><b>LCP（最大内容绘制）</b>：衡量加载速度，应小于 2.5 秒；</li>
        <li><b>INP（交互到下一次绘制）</b>：衡量响应速度，应小于 200 毫秒；</li>
        <li><b>CLS（累计布局偏移）</b>：衡量视觉稳定性，应小于 0.1。</li>
      </ul>

      <h2>优化 LCP：让主要内容更快出现</h2>
      <ul>
        <li>首屏关键资源内联或预加载（<code>preload</code>）；</li>
        <li>图片使用现代格式（WebP/AVIF）并设置宽高占位；</li>
        <li>非关键 JS 延迟加载（<code>defer</code> / 动态 import）。</li>
      </ul>

      <h2>优化 INP：减少长任务</h2>
      <p>把长时间阻塞主线程的任务拆小，或用 <code>requestIdleCallback</code> 处理非紧急工作：</p>
      <pre><code>// 把大数组分批处理，避免一次阻塞太久
function processInChunks(items, chunk = 100) {
  let i = 0;
  function next() {
    const end = Math.min(i + chunk, items.length);
    for (; i &lt; end; i++) doWork(items[i]);
    if (i &lt; items.length) requestIdleCallback(next);
  }
  requestIdleCallback(next);
}</code></pre>

      <h2>优化 CLS：给布局一个稳定的承诺</h2>
      <p>为图片、视频、广告预留尺寸，避免内容加载后把页面“挤开”。</p>
      <blockquote>先测量，再优化，最后复测验证。没有数据支撑的优化，往往只是心理安慰。</blockquote>
    `,
  },
];
