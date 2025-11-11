import { Chart } from "chart.js/auto";

// 移动端菜单切换
document.getElementById("menu-toggle").addEventListener("click", function () {
  const mobileMenu = document.getElementById("mobile-menu");
  mobileMenu.classList.toggle("hidden");
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: "smooth",
      });
      // 关闭移动端菜单
      document.getElementById("mobile-menu").classList.add("hidden");
    }
  });
});

// 滚动时导航栏效果
window.addEventListener("scroll", function () {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("shadow-lg");
  } else {
    navbar.classList.remove("shadow-lg");
  }
});

// 滚动显示动画
const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.1,
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

document.querySelectorAll(".section-fade").forEach((section) => {
  observer.observe(section);
});

// DOM节点对比图表
const domCtx = document.getElementById("domComparisonChart").getContext("2d");
new Chart(domCtx, {
  type: "bar",
  data: {
    labels: ["语雀", "掘金"],
    datasets: [
      {
        label: "DOM节点数量",
        data: [14000, 2000],
        backgroundColor: ["rgba(245, 63, 63, 0.7)", "rgba(0, 180, 42, 0.7)"],
        borderColor: ["rgba(245, 63, 63, 1)", "rgba(0, 180, 42, 1)"],
        borderWidth: 1,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "DOM节点数量对比 (1.4万字文档)",
        font: {
          size: 16,
        },
      },
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "节点数量",
        },
      },
    },
  },
});

// 内存占用对比图表
const memoryCtx = document
  .getElementById("memoryComparisonChart")
  .getContext("2d");
new Chart(memoryCtx, {
  type: "bar",
  data: {
    labels: ["语雀", "掘金"],
    datasets: [
      {
        label: "内存占用 (MB)",
        data: [160, 80],
        backgroundColor: ["rgba(245, 63, 63, 0.7)", "rgba(0, 180, 42, 0.7)"],
        borderColor: ["rgba(245, 63, 63, 1)", "rgba(0, 180, 42, 1)"],
        borderWidth: 1,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "内存占用对比 (1.4万字文档)",
        font: {
          size: 16,
        },
      },
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "内存占用 (MB)",
        },
      },
    },
  },
});

// API响应时间对比图表
const apiCtx = document.getElementById("apiResponseChart").getContext("2d");
new Chart(apiCtx, {
  type: "bar",
  data: {
    labels: ["语雀", "飞书文档", "腾讯文档", "Notion"],
    datasets: [
      {
        label: "TTFB (ms)",
        data: [500, 200, 250, 380],
        backgroundColor: [
          "rgba(245, 63, 63, 0.7)",
          "rgba(0, 180, 42, 0.7)",
          "rgba(255, 125, 0, 0.7)",
          "rgba(107, 114, 128, 0.7)",
        ],
        borderColor: [
          "rgba(245, 63, 63, 1)",
          "rgba(0, 180, 42, 1)",
          "rgba(255, 125, 0, 1)",
          "rgba(107, 114, 128, 1)",
        ],
        borderWidth: 1,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "API响应时间对比 (TTFB)",
        font: {
          size: 16,
        },
      },
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "TTFB (ms)",
        },
      },
    },
  },
});

// 网络协议性能对比图表
const protocolCtx = document
  .getElementById("protocolComparisonChart")
  .getContext("2d");
new Chart(protocolCtx, {
  type: "line",
  data: {
    labels: ["HTTP/1.1", "HTTP/2", "HTTP/3"],
    datasets: [
      {
        label: "加载时间 (ms)",
        data: [1200, 800, 600],
        fill: false,
        backgroundColor: "rgba(22, 93, 255, 0.7)",
        borderColor: "rgba(22, 93, 255, 1)",
        tension: 0.1,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "不同网络协议性能对比",
        font: {
          size: 16,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "加载时间 (ms)",
        },
      },
    },
  },
});

// 各场景性能评分图表
const scenarioCtx = document
  .getElementById("scenarioPerformanceChart")
  .getContext("2d");
new Chart(scenarioCtx, {
  type: "radar",
  data: {
    labels: ["加载速度", "响应性能", "内存占用", "协作效率", "大文档处理"],
    datasets: [
      {
        label: "普通用户日常使用",
        data: [60, 70, 65, 50, 40],
        fill: true,
        backgroundColor: "rgba(255, 125, 0, 0.2)",
        borderColor: "rgba(255, 125, 0, 0.8)",
        pointBackgroundColor: "rgba(255, 125, 0, 1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(255, 125, 0, 1)",
      },
      {
        label: "团队协作高频使用",
        data: [40, 45, 50, 35, 30],
        fill: true,
        backgroundColor: "rgba(245, 63, 63, 0.2)",
        borderColor: "rgba(245, 63, 63, 0.8)",
        pointBackgroundColor: "rgba(245, 63, 63, 1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(245, 63, 63, 1)",
      },
      {
        label: "大型知识库浏览",
        data: [25, 30, 20, 25, 15],
        fill: true,
        backgroundColor: "rgba(107, 114, 128, 0.2)",
        borderColor: "rgba(107, 114, 128, 0.8)",
        pointBackgroundColor: "rgba(107, 114, 128, 1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(107, 114, 128, 1)",
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      line: {
        borderWidth: 2,
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

// 竞品性能对比图表
const competitorCtx = document
  .getElementById("competitorComparisonChart")
  .getContext("2d");
new Chart(competitorCtx, {
  type: "bar",
  data: {
    labels: ["飞书文档", "腾讯文档", "Notion", "语雀"],
    datasets: [
      {
        label: "平均加载时间 (秒)",
        data: [2.3, 1.8, 3.8, 5.2],
        backgroundColor: [
          "rgba(0, 180, 42, 0.7)",
          "rgba(0, 180, 42, 0.7)",
          "rgba(255, 125, 0, 0.7)",
          "rgba(245, 63, 63, 0.7)",
        ],
        borderColor: [
          "rgba(0, 180, 42, 1)",
          "rgba(0, 180, 42, 1)",
          "rgba(255, 125, 0, 1)",
          "rgba(245, 63, 63, 1)",
        ],
        borderWidth: 1,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "竞品加载时间对比",
        font: {
          size: 16,
        },
      },
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "加载时间 (秒)",
        },
      },
    },
  },
});
