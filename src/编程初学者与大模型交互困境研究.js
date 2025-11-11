import { Chart } from "chart.js/auto";

// 等待DOM加载完成
document.addEventListener("DOMContentLoaded", function () {
  // 图表初始化
  initCharts();

  // 目录导航功能
  initTocNavigation();

  // 滚动事件监听
  initScrollEvents();

  // 移动端目录切换
  initMobileTocToggle();

  // 代码块复制功能
  initCodeCopy();
});

// 图表初始化
function initCharts() {
  // 上下文窗口对比图表
  const contextWindowCtx = document
    .getElementById("contextWindowChart")
    .getContext("2d");
  new Chart(contextWindowCtx, {
    type: "bar",
    data: {
      labels: [
        "Claude Code (API)",
        "Claude Code (网页版)",
        "DeepSeek V3.1 (API)",
        "DeepSeek V3.1 (网页版)",
        "行业平均 (网页版)",
      ],
      datasets: [
        {
          label: "上下文窗口大小 (K tokens)",
          data: [200, 128, 65, 128, 96],
          backgroundColor: [
            "rgba(37, 99, 235, 0.8)",
            "rgba(37, 99, 235, 0.6)",
            "rgba(249, 115, 22, 0.8)",
            "rgba(249, 115, 22, 0.6)",
            "rgba(100, 116, 139, 0.5)",
          ],
          borderColor: [
            "rgba(37, 99, 235, 1)",
            "rgba(37, 99, 235, 1)",
            "rgba(249, 115, 22, 1)",
            "rgba(249, 115, 22, 1)",
            "rgba(100, 116, 139, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "K tokens",
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              return `${context.raw}K tokens`;
            },
          },
        },
      },
    },
  });

  // 用户体验评分对比图表
  const userExperienceCtx = document
    .getElementById("userExperienceChart")
    .getContext("2d");
  new Chart(userExperienceCtx, {
    type: "radar",
    data: {
      labels: [
        "响应速度",
        "上下文管理",
        "功能完整性",
        "使用限制透明度",
        "代码质量",
        "稳定性",
      ],
      datasets: [
        {
          label: "Claude Code",
          data: [3.2, 4.5, 4.2, 2.1, 4.6, 3.5],
          backgroundColor: "rgba(37, 99, 235, 0.2)",
          borderColor: "rgba(37, 99, 235, 0.8)",
          pointBackgroundColor: "rgba(37, 99, 235, 1)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(37, 99, 235, 1)",
        },
        {
          label: "DeepSeek V3.1",
          data: [3.8, 2.8, 3.5, 3.9, 4.0, 2.9],
          backgroundColor: "rgba(249, 115, 22, 0.2)",
          borderColor: "rgba(249, 115, 22, 0.8)",
          pointBackgroundColor: "rgba(249, 115, 22, 1)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(249, 115, 22, 1)",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          angleLines: {
            display: true,
          },
          suggestedMin: 0,
          suggestedMax: 5,
        },
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: function (context) {
              return `${context.dataset.label}: ${context.raw}/5.0`;
            },
          },
        },
      },
    },
  });

  // 成本对比图表
  const costComparisonCtx = document
    .getElementById("costComparisonChart")
    .getContext("2d");
  new Chart(costComparisonCtx, {
    type: "bar",
    data: {
      labels: ["Claude Code (美元)", "DeepSeek V3.1 (人民币)"],
      datasets: [
        {
          label: "输入成本",
          data: [0.3, 0.4],
          backgroundColor: "rgba(37, 99, 235, 0.7)",
          borderColor: "rgba(37, 99, 235, 1)",
          borderWidth: 1,
        },
        {
          label: "输出成本",
          data: [0.75, 0.6],
          backgroundColor: "rgba(249, 115, 22, 0.7)",
          borderColor: "rgba(249, 115, 22, 1)",
          borderWidth: 1,
        },
        {
          label: "总成本",
          data: [1.05, 1.0],
          backgroundColor: "rgba(59, 130, 246, 0.8)",
          borderColor: "rgba(59, 130, 246, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "成本 (对应货币单位)",
          },
        },
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: function (context) {
              const currency = context.label.includes("美元")
                ? "美元"
                : "人民币";
              return `${context.dataset.label}: ${context.raw} ${currency}`;
            },
          },
        },
      },
    },
  });
}

// 目录导航功能
function initTocNavigation() {
  const tocItems = document.querySelectorAll(".toc-item");
  const sections = document.querySelectorAll('section[id^="section-"]');

  // 点击目录项滚动到对应章节
  tocItems.forEach((item) => {
    item.addEventListener("click", function () {
      const targetId = this.getAttribute("data-target");
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });

        // 移动端点击后关闭目录
        if (window.innerWidth < 768) {
          document.getElementById("toc").classList.add("hidden");
        }
      }
    });
  });

  // 监听滚动，高亮当前章节
  window.addEventListener("scroll", function () {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (pageYOffset >= sectionTop - 100) {
        current = section.getAttribute("id");
      }
    });

    tocItems.forEach((item) => {
      item.classList.remove("active");
      if (item.getAttribute("data-target") === current) {
        item.classList.add("active");

        // 滚动到当前目录项
        const tocContainer = document.getElementById("toc");
        if (tocContainer) {
          tocContainer.scrollTo({
            top: item.offsetTop - 50,
            behavior: "smooth",
          });
        }
      }
    });
  });
}

// 滚动事件监听
function initScrollEvents() {
  const scrollTopBtn = document.getElementById("scrollTop");
  const mobileScrollTopBtn = document.getElementById("mobileScrollTop");

  // 滚动显示/隐藏回到顶部按钮
  window.addEventListener("scroll", function () {
    if (pageYOffset > 300) {
      scrollTopBtn.classList.remove("opacity-0", "invisible");
      scrollTopBtn.classList.add("opacity-100", "visible");

      mobileScrollTopBtn.classList.remove("opacity-0", "invisible");
      mobileScrollTopBtn.classList.add("opacity-100", "visible");
    } else {
      scrollTopBtn.classList.add("opacity-0", "invisible");
      scrollTopBtn.classList.remove("opacity-100", "visible");

      mobileScrollTopBtn.classList.add("opacity-0", "invisible");
      mobileScrollTopBtn.classList.remove("opacity-100", "visible");
    }
  });

  // 回到顶部功能
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  scrollTopBtn.addEventListener("click", scrollToTop);
  mobileScrollTopBtn.addEventListener("click", scrollToTop);
}

// 移动端目录切换
function initMobileTocToggle() {
  const toggleBtn = document.getElementById("toggleToc");
  const toc = document.getElementById("toc");

  if (toggleBtn && toc) {
    toggleBtn.addEventListener("click", function () {
      toc.classList.toggle("hidden");
      toc.classList.toggle("fixed");
      toc.classList.toggle("inset-0");
      toc.classList.toggle("z-50");
      toc.classList.toggle("bg-white");
      toc.classList.toggle("p-6");
    });
  }

  // 响应式调整
  function adjustTocLayout() {
    if (window.innerWidth >= 768) {
      toc.classList.remove(
        "hidden",
        "fixed",
        "inset-0",
        "z-50",
        "bg-white",
        "p-6",
      );
      toc.classList.add(
        "block",
        "fixed",
        "h-[calc(100vh-60px)]",
        "overflow-y-auto",
        "scrollbar-hide",
      );
    } else {
      toc.classList.add("hidden");
    }
  }

  // 初始调整
  adjustTocLayout();

  // 窗口大小变化时调整
  window.addEventListener("resize", adjustTocLayout);
}

// 代码块复制功能
function initCodeCopy() {
  const codeBlocks = document.querySelectorAll(".notion-code-block");

  codeBlocks.forEach((block) => {
    // 创建复制按钮
    const copyBtn = document.createElement("button");
    copyBtn.className =
      "absolute top-2 right-2 bg-gray-200 hover:bg-gray-300 text-gray-700 px-2 py-1 rounded text-xs transition-colors";
    copyBtn.innerHTML = '<i class="fa fa-copy mr-1"></i> 复制';

    // 设置代码块为相对定位
    block.style.position = "relative";

    // 添加复制按钮到代码块
    block.appendChild(copyBtn);

    // 复制功能
    copyBtn.addEventListener("click", function () {
      const code = block.textContent.trim();

      navigator.clipboard
        .writeText(code)
        .then(() => {
          // 显示复制成功
          copyBtn.innerHTML = '<i class="fa fa-check mr-1"></i> 已复制';
          copyBtn.classList.remove("bg-gray-200", "hover:bg-gray-300");
          copyBtn.classList.add("bg-green-100", "text-green-700");

          // 恢复原始文本
          setTimeout(() => {
            copyBtn.innerHTML = '<i class="fa fa-copy mr-1"></i> 复制';
            copyBtn.classList.remove("bg-green-100", "text-green-700");
            copyBtn.classList.add("bg-gray-200", "hover:bg-gray-300");
          }, 2000);
        })
        .catch((err) => {
          console.error("复制失败:", err);
          copyBtn.innerHTML = '<i class="fa fa-times mr-1"></i> 复制失败';
          copyBtn.classList.remove("bg-gray-200", "hover:bg-gray-300");
          copyBtn.classList.add("bg-red-100", "text-red-700");
        });
    });
  });
}
