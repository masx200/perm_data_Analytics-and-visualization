// 动态加载HTML文件列表 - 使用 import.meta.glob 自动扫描
const htmlFileModules = Object.fromEntries(
  Object.entries(
    import.meta.glob("../*.html", {
      query: "?raw",
      import: "default",
    }),
  )
    .filter(([path, loader]) => {
      return !path.endsWith("index.html");
    })
    .map((a) => [import.meta.resolve(a[0]), a[1]]),
);
// console.log(htmlFileModules)
// 博客应用主逻辑
class BlogApp {
  constructor() {
    this.articles = [];
    this.filteredArticles = [];
    this.currentFilter = "all";
    this.init();
  }

  async init() {
    // 初始化应用
    await this.loadArticles();
    this.setupEventListeners();
    this.renderArticles();
    this.updateArticleCount();
    this.setupScrollEffects();
    this.loadArticleMetadata();
  }

  // 加载HTML文件作为文章
  async loadArticles() {
    // 使用 import.meta.glob 动态获取所有 HTML 文件
    const fileEntries = await Promise.all(
      Object.entries(htmlFileModules).map(async ([path, loader]) => {
        const urltext = await loader();

        const blob = new Blob([urltext], { type: "text/html;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        // 从路径提取文件名
        const filename = path.split("/").pop();
        return {
          filename,
          url,

          navigatelink: filename,
        };
      }),
    );

    this.articles = fileEntries.map((entry, index) => ({
      navigatelink: entry.navigatelink,
      id: index + 1,
      title: this.generateTitleFromFilename(entry.filename),
      filename: entry.filename,
      url: entry.url,
      excerpt: "",
      category: this.generateCategoryFromFilename(entry.filename),
      date: this.generateDate(),
      readTime: this.generateReadTime(),
      author: "技术博主",
      tags: this.generateTagsFromFilename(entry.filename),
    }));
  }

  // 从文件名生成标题
  generateTitleFromFilename(filename) {
    return decodeURIComponent(filename.replace(".html", ""));
  }

  // 从文件名生成分类
  generateCategoryFromFilename(filename) {
    if (filename.includes("JSON")) return "技术研究";
    if (filename.includes("编程智能体")) return "AI研究";
    return "技术文章";
  }

  // 从文件名生成标签
  generateTagsFromFilename(filename) {
    const tags = [];
    if (filename.includes("JSON")) tags.push("JSON", "性能对比");
    if (filename.includes("编程智能体")) tags.push("AI", "稳定性");
    if (filename.includes("研究")) tags.push("研究报告");
    return tags;
  }

  // 生成日期
  generateDate() {
    const now = new Date();
    const daysAgo = Math.floor(Math.random() * 30);
    const date = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
    return date.toLocaleDateString("zh-CN");
  }

  // 生成阅读时间
  generateReadTime() {
    return Math.floor(Math.random() * 15) + 5; // 5-20分钟
  }

  // 加载文章元数据（标题和摘要）
  async loadArticleMetadata() {
    for (let article of this.articles) {
      const url = article.url;
      try {
        const response = await fetch(article.url);
        if (response.ok) {
          const html = await response.text();
          const metadata = this.extractMetadata(html, article.filename);
          article.excerpt = metadata.excerpt;
          article.title = metadata.title || article.title;

          // 更新文章卡片
          this.updateArticleCard(article.id, metadata);
        }
      } catch (error) {
        console.warn(`无法加载文件 ${article.url}:`, error);
      } finally {
        URL.revokeObjectURL(url);
      }
    }
  }

  // 从HTML内容提取标题和摘要
  extractMetadata(html, filename) {
    // 创建临时DOM来解析HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    // 尝试获取标题 - 优先使用 title 标签
    let title = "";

    // 1. 查找 title 标签（优先）
    const titleTag = doc.querySelector("title");
    if (titleTag) {
      title = titleTag.textContent.trim();
    } else {
      // 2. 查找 h1 标签（后备）
      const h1 = doc.querySelector("h1");
      if (h1) {
        title = h1.textContent.trim();
      } else {
        // 3. 使用文件名作为后备
        title = this.generateTitleFromFilename(filename);
      }
    }

    // 提取摘要 - 优先使用 meta description 标签
    let excerpt = "";

    // 1. 查找 meta description 标签（优先）
    const metaDescription = doc.querySelector('meta[name="description"]');
    if (metaDescription && metaDescription.getAttribute("content")) {
      excerpt = metaDescription.getAttribute("content").trim();

      // 如果 meta description 超过 200 字符，截断并添加省略号
      if (excerpt.length > 200) {
        excerpt = excerpt.substring(0, 200) + "...";
      }
    } else {
      // 2. 如果没有 meta description，尝试获取第一个段落的文本
      const firstParagraph = doc.querySelector("p");
      if (firstParagraph) {
        excerpt = firstParagraph.textContent.trim();

        // 截断摘要到适当长度
        if (excerpt.length > 200) {
          excerpt = excerpt.substring(0, 200) + "...";
        }
      } else {
        // 3. 查找任何包含文本的元素
        const textElements = doc.querySelectorAll("h1, h2, h3, p, li, div");
        for (let element of textElements) {
          const text = element.textContent.trim();
          if (text && text.length > 20) {
            excerpt = text;
            break;
          }
        }
      }
    }

    // 如果没有找到合适的文本，使用默认摘要
    if (!excerpt) {
      excerpt = `这是一篇关于 ${this.generateTitleFromFilename(
        filename,
      )} 的技术文章，包含详细的分析和研究内容。`;
    }

    // 确保摘要长度适当
    if (excerpt.length > 200) {
      excerpt = excerpt.substring(0, 200) + "...";
    }

    return { title, excerpt };
  }

  // 更新文章卡片内容
  updateArticleCard(articleId, metadata) {
    const card = document.querySelector(`[data-article-id="${articleId}"]`);
    if (!card) return;

    // 更新标题
    const titleElement = card.querySelector(".article-title");
    if (titleElement && metadata.title) {
      titleElement.textContent = metadata.title;
    }

    // 更新摘要
    const excerptElement = card.querySelector(".article-excerpt");
    if (excerptElement && metadata.excerpt) {
      excerptElement.textContent = metadata.excerpt;
    }

    // 卡片内容已加载完成，无需动画效果
  }

  // 跳转到文章页面
  navigateToArticle(url) {
    // 在新标签页中打开文章
    window.open(url, "_blank");
  }

  // 设置事件监听器
  setupEventListeners() {
    // 移动端菜单切换
    const mobileMenuBtn = document.getElementById("mobileMenuBtn");
    const mobileMenu = document.getElementById("mobileMenu");

    if (mobileMenuBtn && mobileMenu) {
      mobileMenuBtn.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
      });
    }

    // 搜索功能
    const searchInput = document.getElementById("searchInput");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.filterArticles(e.target.value);
      });
    }

    // 回到顶部按钮
    const backToTopBtn = document.getElementById("backToTop");
    if (backToTopBtn) {
      backToTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }

    // 联系表单提交
    // const contactForm = document.getElementById("contactForm");
    // if (contactForm) {
    //   contactForm.addEventListener("submit", (e) => {
    //     e.preventDefault();
    //     this.handleFormSubmit(contactForm);
    //   });
    // }

    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute("href"));
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
          // 关闭移动端菜单
          if (mobileMenu) {
            mobileMenu.classList.add("hidden");
          }
        }
      });
    });
  }

  // 渲染文章列表
  renderArticles() {
    const articleGrid = document.getElementById("articleGrid");
    if (!articleGrid) return;

    articleGrid.innerHTML = "";

    this.filteredArticles = [...this.articles];

    this.filteredArticles.forEach((article) => {
      const articleCard = this.createArticleCard(article);
      articleGrid.appendChild(articleCard);
    });

    // 渲染分类标签
    this.renderCategories();
  }

  // 创建文章卡片
  createArticleCard(article) {
    const card = document.createElement("article");
    card.className =
      "article-card bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl";
    card.setAttribute("data-article-id", article.id);

    // 为整个卡片添加点击跳转事件
    card.addEventListener("click", () => {
      this.navigateToArticle(article.navigatelink);
    });

    card.innerHTML = `
            <div class="aspect-w-16 aspect-h-9 bg-gray-200">
                <img src="https://picsum.photos/seed/${article.id}/400/225.jpg"
                     alt="${article.title}"
                     class="w-full h-48 object-cover">
            </div>
            <div class="p-6">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-sm text-blue-600 font-semibold">${article.category}</span>
                    <span class="text-sm text-gray-500">${article.readTime} 分钟阅读</span>
                </div>
                <h3 class="article-title text-xl font-bold text-gray-800 mb-2 hover:text-blue-600 transition">
                    ${article.title}
                </h3>
                <p class="article-excerpt text-gray-600 mb-4 line-clamp-3">正在加载摘要...</p>
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-2">
                        <img src="https://picsum.photos/seed/avatar/32/32.jpg"
                             alt="${article.author}"
                             class="w-8 h-8 rounded-full">
                        <span class="text-sm text-gray-600">${article.author}</span>
                    </div>
                    <span class="text-sm text-gray-500">${article.date}</span>
                </div>
                <div class="mt-3 flex flex-wrap gap-2">
                    ${article.tags
                      .map(
                        (tag) => `
                        <span class="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                            ${tag}
                        </span>
                    `,
                      )
                      .join("")}
                </div>
                <div class="mt-4">
                    <a href="${article.navigatelink}" class="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm" onclick="event.stopPropagation()">
                        阅读全文 <i class="fas fa-arrow-right ml-1"></i>
                    </a>
                </div>
            </div>
        `;

    return card;
  }

  // 渲染分类标签
  renderCategories() {
    const categoriesContainer = document.getElementById("categories");
    if (!categoriesContainer) return;

    // 获取所有唯一分类
    const categories = [
      "all",
      ...new Set(this.articles.map((article) => article.category)),
    ];

    categoriesContainer.innerHTML = categories
      .map(
        (category) => `
            <button class="category-tag px-4 py-2 rounded-full transition ${
              category === "all"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }" data-category="${category}">
                ${category === "all" ? "全部" : category}
                <span class="ml-2 text-sm">(${
                  category === "all"
                    ? this.articles.length
                    : this.articles.filter((a) => a.category === category)
                        .length
                })</span>
            </button>
        `,
      )
      .join("");

    // 添加分类点击事件
    categoriesContainer.querySelectorAll(".category-tag").forEach((tag) => {
      tag.addEventListener("click", () => {
        const category = tag.getAttribute("data-category");
        this.filterByCategory(category);

        // 更新样式
        categoriesContainer.querySelectorAll(".category-tag").forEach((t) => {
          t.classList.remove("bg-blue-600", "text-white");
          t.classList.add("bg-white", "text-gray-700", "hover:bg-gray-100");
        });
        tag.classList.remove("bg-white", "text-gray-700", "hover:bg-gray-100");
        tag.classList.add("bg-blue-600", "text-white");
      });
    });
  }

  // 按分类筛选文章
  filterByCategory(category) {
    if (category === "all") {
      this.filteredArticles = [...this.articles];
    } else {
      this.filteredArticles = this.articles.filter(
        (article) => article.category === category,
      );
    }
    this.currentFilter = category;
    this.renderFilteredArticles();
  }

  // 搜索文章
  filterArticles(searchTerm) {
    if (!searchTerm.trim()) {
      this.filteredArticles = [...this.articles];
    } else {
      const term = searchTerm.toLowerCase();
      this.filteredArticles = this.articles.filter(
        (article) =>
          article.title.toLowerCase().includes(term) ||
          article.excerpt.toLowerCase().includes(term) ||
          article.tags.some((tag) => tag.toLowerCase().includes(term)),
      );
    }
    this.renderFilteredArticles();
  }

  // 渲染筛选后的文章
  renderFilteredArticles() {
    const articleGrid = document.getElementById("articleGrid");
    if (!articleGrid) return;

    articleGrid.innerHTML = "";

    this.filteredArticles.forEach((article) => {
      const articleCard = this.createArticleCard(article);
      articleGrid.appendChild(articleCard);
    });

    this.updateArticleCount();
  }

  // 更新文章计数
  updateArticleCount() {
    const countElement = document.getElementById("articleCount");
    if (countElement) {
      countElement.textContent = this.filteredArticles.length;
    }
  }

  // 处理表单提交
  // handleFormSubmit(form) {
  //   // 获取表单数据
  //   const formData = new FormData(form);
  //   const data = {
  //     name: formData.get("name") || document.getElementById("name").value,
  //     email: formData.get("email") || document.getElementById("email").value,
  //     subject:
  //       formData.get("subject") || document.getElementById("subject").value,
  //     message:
  //       formData.get("message") || document.getElementById("message").value,
  //   };

  //   // 显示成功消息
  //   this.showNotification("消息已发送！我会尽快回复您。", "success");

  //   // 重置表单
  //   form.reset();
  // }

  // 显示通知
  showNotification(message, type = "info") {
    const notification = document.createElement("div");
    notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
      type === "success" ? "bg-green-500" : "bg-blue-500"
    } text-white`;
    notification.innerHTML = `
            <div class="flex items-center">
                <i class="fas fa-${
                  type === "success" ? "check-circle" : "info-circle"
                } mr-2"></i>
                <span>${message}</span>
            </div>
        `;

    document.body.appendChild(notification);

    // 3秒后自动移除
    setTimeout(() => {
      notification.remove();
    }, 3000);
  }

  // 设置滚动效果
  setupScrollEffects() {
    const backToTopBtn = document.getElementById("backToTop");

    window.addEventListener("scroll", () => {
      // 显示/隐藏回到顶部按钮
      if (window.scrollY > 300) {
        backToTopBtn.classList.remove("hidden");
      } else {
        backToTopBtn.classList.add("hidden");
      }
    });

    // 文章卡片始终显示，无需动画效果
  }
}

// 当 DOM 加载完成后初始化应用
document.addEventListener("DOMContentLoaded", () => {
  const blogApp = new BlogApp();

  // 将应用实例暴露到全局作用域，方便调试
  window.blogApp = blogApp;
});

// 页面加载完成后无需动画效果，文章卡片已直接显示
