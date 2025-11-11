import { Chart } from "chart.js/auto";
window.addEventListener("load", async () => {
  // const { Chart } = await import("chart.js/auto");

  // 移动端菜单切换
  //   document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const sidebar = document.getElementById("sidebar");
  const backToTopButton = document.getElementById("back-to-top");
  const navLinks = document.querySelectorAll("#sidebar a");

  // 移动端菜单切换
  mobileMenuButton.addEventListener("click", function () {
    sidebar.classList.toggle("hidden");
    sidebar.classList.toggle("fixed");
    sidebar.classList.toggle("inset-0");
    sidebar.classList.toggle("z-20");
  });

  // 返回顶部按钮
  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.remove("opacity-0", "invisible");
      backToTopButton.classList.add("opacity-100", "visible");
    } else {
      backToTopButton.classList.add("opacity-0", "invisible");
      backToTopButton.classList.remove("opacity-100", "visible");
    }

    // 更新当前活跃的导航链接
    const sections = document.querySelectorAll("section[id], subsection[id]");
    let currentSection = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      if (
        window.pageYOffset >= sectionTop &&
        window.pageYOffset < sectionTop + sectionHeight
      ) {
        currentSection = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("nav-active");
      if (link.getAttribute("href") === `#${currentSection}`) {
        link.classList.add("nav-active");
      }
    });
  });

  // 返回顶部功能
  backToTopButton.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // 关闭移动菜单（当点击导航链接时）
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      if (window.innerWidth < 768) {
        sidebar.classList.add("hidden");
        sidebar.classList.remove("fixed", "inset-0", "z-20");
      }
    });
  });

  // 初始化图表
  initCharts();
  //});

  // 初始化所有图表
  function initCharts() {
    // 1. 性能衰减图表
    const performanceDecayCtx = document
      .getElementById("performanceDecayChart")
      .getContext("2d");
    new Chart(performanceDecayCtx, {
      type: "line",
      data: {
        labels: [
          "8K",
          "16K",
          "32K",
          "48K",
          "64K",
          "80K",
          "96K",
          "112K",
          "128K",
        ],
        datasets: [
          {
            label: "Llama 3.1 405B",
            data: [98, 96, 92, 82, 68, 52, 38, 25, 18],
            borderColor: "#2563eb",
            backgroundColor: "rgba(37, 99, 235, 0.1)",
            tension: 0.3,
            fill: true,
          },
          {
            label: "Llama 3.1 70B",
            data: [97, 93, 85, 70, 52, 35, 22, 15, 10],
            borderColor: "#6366f1",
            backgroundColor: "rgba(99, 102, 241, 0.1)",
            tension: 0.3,
            fill: true,
          },
          {
            label: "Llama 3.1 8B",
            data: [95, 88, 75, 55, 35, 20, 12, 8, 5],
            borderColor: "#a855f7",
            backgroundColor: "rgba(168, 85, 247, 0.1)",
            tension: 0.3,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "不同模型在长上下文下的性能衰减曲线",
            font: {
              size: 14,
              weight: "bold",
            },
          },
          legend: {
            position: "bottom",
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                return `${context.dataset.label}: ${context.raw}% 正确率`;
              },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            title: {
              display: true,
              text: "模型正确率 (%)",
            },
          },
          x: {
            title: {
              display: true,
              text: "上下文长度 (tokens)",
            },
          },
        },
      },
    });

    // 2. 代码质量影响图表
    const codeQualityCtx = document
      .getElementById("codeQualityChart")
      .getContext("2d");
    new Chart(codeQualityCtx, {
      type: "bar",
      data: {
        labels: ["完整提示词", "2片分片", "4片分片", "8片分片", "16片分片"],
        datasets: [
          {
            label: "GPT-4",
            data: [98.1, 85.3, 72.6, 58.2, 45.7],
            backgroundColor: "rgba(37, 99, 235, 0.7)",
          },
          {
            label: "Claude 3",
            data: [97.5, 83.2, 70.1, 55.8, 42.3],
            backgroundColor: "rgba(99, 102, 241, 0.7)",
          },
          {
            label: "Llama 3.1",
            data: [92.3, 78.5, 63.8, 48.5, 35.2],
            backgroundColor: "rgba(168, 85, 247, 0.7)",
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "提示词分片对代码生成质量的影响",
            font: {
              size: 14,
              weight: "bold",
            },
          },
          legend: {
            position: "bottom",
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                return `${context.dataset.label}: ${context.raw}% 正确率`;
              },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            title: {
              display: true,
              text: "代码生成正确率 (%)",
            },
          },
          x: {
            title: {
              display: true,
              text: "提示词分片方式",
            },
          },
        },
      },
    });

    // 3. 压缩效果图表
    const compressionEffectCtx = document
      .getElementById("compressionEffectChart")
      .getContext("2d");
    new Chart(compressionEffectCtx, {
      type: "radar",
      data: {
        labels: ["压缩比", "性能保留率", "内存节省", "推理速度", "信息完整性"],
        datasets: [
          {
            label: "Activation Beacon",
            data: [85, 92, 88, 90, 86],
            backgroundColor: "rgba(37, 99, 235, 0.2)",
            borderColor: "rgba(37, 99, 235, 0.8)",
            pointBackgroundColor: "rgba(37, 99, 235, 1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(37, 99, 235, 1)",
          },
          {
            label: "ICAE",
            data: [75, 88, 72, 75, 90],
            backgroundColor: "rgba(99, 102, 241, 0.2)",
            borderColor: "rgba(99, 102, 241, 0.8)",
            pointBackgroundColor: "rgba(99, 102, 241, 1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(99, 102, 241, 1)",
          },
          {
            label: "QGC",
            data: [90, 85, 65, 80, 88],
            backgroundColor: "rgba(168, 85, 247, 0.2)",
            borderColor: "rgba(168, 85, 247, 0.8)",
            pointBackgroundColor: "rgba(168, 85, 247, 1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(168, 85, 247, 1)",
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "不同上下文压缩技术的效果对比",
            font: {
              size: 14,
              weight: "bold",
            },
          },
          legend: {
            position: "bottom",
          },
        },
        scales: {
          r: {
            angleLines: {
              display: true,
            },
            suggestedMin: 0,
            suggestedMax: 100,
          },
        },
      },
    });

    // 4. 上下文管理策略对比图表
    const contextManagementCtx = document
      .getElementById("contextManagementChart")
      .getContext("2d");
    new Chart(contextManagementCtx, {
      type: "bar",
      data: {
        labels: [
          "文件写入成功率",
          "上下文溢出率",
          "错误恢复率",
          "长上下文处理能力",
          "用户满意度",
        ],
        datasets: [
          {
            label: "KiloCode",
            data: [72, 28, 65, 68, 65],
            backgroundColor: "rgba(59, 130, 246, 0.7)",
          },
          {
            label: "Claude Code",
            data: [91, 12, 88, 92, 89],
            backgroundColor: "rgba(139, 92, 246, 0.7)",
          },
        ],
      },
      options: {
        indexAxis: "y",
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "KiloCode与Claude Code上下文管理策略效果对比",
            font: {
              size: 14,
              weight: "bold",
            },
          },
          legend: {
            position: "bottom",
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                return `${context.dataset.label}: ${context.raw}%`;
              },
            },
          },
        },
        scales: {
          x: {
            beginAtZero: true,
            max: 100,
            title: {
              display: true,
              text: "性能指标 (%)",
            },
          },
        },
      },
    });

    // 5. 模型集成度对比图表
    const modelIntegrationCtx = document
      .getElementById("modelIntegrationChart")
      .getContext("2d");
    new Chart(modelIntegrationCtx, {
      type: "polarArea",
      data: {
        labels: ["API兼容性", "性能优化", "错误处理", "上下文利用", "更新同步"],
        datasets: [
          {
            label: "KiloCode (多模型)",
            data: [95, 65, 70, 75, 60],
            backgroundColor: [
              "rgba(59, 130, 246, 0.7)",
              "rgba(14, 165, 233, 0.7)",
              "rgba(16, 185, 129, 0.7)",
              "rgba(245, 158, 11, 0.7)",
              "rgba(239, 68, 68, 0.7)",
            ],
          },
          {
            label: "Claude Code (专属模型)",
            data: [80, 95, 92, 94, 96],
            backgroundColor: [
              "rgba(99, 102, 241, 0.7)",
              "rgba(124, 58, 237, 0.7)",
              "rgba(168, 85, 247, 0.7)",
              "rgba(192, 132, 252, 0.7)",
              "rgba(217, 119, 6, 0.7)",
            ],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "模型与工具集成度对比",
            font: {
              size: 14,
              weight: "bold",
            },
          },
          legend: {
            position: "bottom",
          },
        },
        scales: {
          r: {
            suggestedMin: 0,
            suggestedMax: 100,
          },
        },
      },
    });
  }
});
