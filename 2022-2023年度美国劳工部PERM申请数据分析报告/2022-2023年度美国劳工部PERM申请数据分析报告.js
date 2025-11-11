import { Chart } from "chart.js/auto";
// 申请量增长趋势图表
const applicationCtx = document
  .getElementById("applicationTrendChart")
  .getContext("2d");
const applicationChart = new Chart(applicationCtx, {
  type: "line",
  data: {
    labels: ["2019财年", "2020财年", "2021财年", "2022财年", "2023财年"],
    datasets: [
      {
        label: "PERM申请量",
        data: [102345, 118456, 141952, 158987, 158987],
        borderColor: "#3498db",
        backgroundColor: "rgba(52, 152, 219, 0.1)",
        tension: 0.3,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: "申请数量",
        },
      },
    },
  },
});

// 拒批率变化图表
const approvalCtx = document
  .getElementById("approvalRateChart")
  .getContext("2d");
const approvalChart = new Chart(approvalCtx, {
  type: "bar",
  data: {
    labels: [
      "2021 Q1",
      "2021 Q2",
      "2021 Q3",
      "2021 Q4",
      "2022 Q1",
      "2022 Q2",
      "2022 Q3",
      "2022 Q4",
      "2023 Q1",
    ],
    datasets: [
      {
        label: "拒批率",
        data: [2.8, 3.1, 3.0, 3.3, 3.2, 3.5, 3.8, 4.2, 6.8],
        backgroundColor: [
          "rgba(255, 99, 132, 0.7)",
          "rgba(255, 99, 132, 0.7)",
          "rgba(255, 99, 132, 0.7)",
          "rgba(255, 99, 132, 0.7)",
          "rgba(255, 99, 132, 0.7)",
          "rgba(255, 159, 64, 0.7)",
          "rgba(255, 159, 64, 0.7)",
          "rgba(255, 159, 64, 0.7)",
          "rgba(255, 205, 86, 0.7)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 99, 132)",
          "rgb(255, 99, 132)",
          "rgb(255, 99, 132)",
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 159, 64)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
        ],
        borderWidth: 1,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return context.raw + "%";
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "拒批率 (%)",
        },
        grid: {
          display: true,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  },
});

// 职业分类图表
const occupationCtx = document
  .getElementById("occupationChart")
  .getContext("2d");
const occupationChart = new Chart(occupationCtx, {
  type: "doughnut",
  data: {
    labels: [
      "软件开发",
      "系统开发",
      "电脑系统分析",
      "数据科学",
      "电子工程",
      "其他",
    ],
    datasets: [
      {
        data: [45, 15, 10, 8, 7, 15],
        backgroundColor: [
          "#3498db",
          "#2ecc71",
          "#e74c3c",
          "#9b59b6",
          "#f39c12",
          "#34495e",
        ],
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return context.label + ": " + context.raw + "%";
          },
        },
      },
    },
  },
});

// 中国公民获批情况图表
const chinaApprovalCtx = document
  .getElementById("chinaApprovalChart")
  .getContext("2d");
const chinaApprovalChart = new Chart(chinaApprovalCtx, {
  type: "bar",
  data: {
    labels: ["获批", "被拒", "撤案", "获批但过期"],
    datasets: [
      {
        label: "中国公民",
        data: [85, 8, 5, 2],
        backgroundColor: "#3498db",
        borderColor: "#2c3e50",
        borderWidth: 1,
      },
      {
        label: "印度公民",
        data: [90, 6, 3, 1],
        backgroundColor: "#2ecc71",
        borderColor: "#2c3e50",
        borderWidth: 1,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "百分比 (%)",
        },
        grid: {
          display: true,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  },
});

// 学历分布与获批率图表
const educationCtx = document.getElementById("educationChart").getContext("2d");
const educationChart = new Chart(educationCtx, {
  type: "bar",
  data: {
    labels: ["博士及以上", "硕士", "本科", "本科以下"],
    datasets: [
      {
        label: "申请占比",
        data: [12, 65, 20, 3],
        backgroundColor: "#3498db",
        borderColor: "#2c3e50",
        borderWidth: 1,
      },
      {
        label: "获批率",
        data: [92, 87, 78, 65],
        backgroundColor: "#2ecc71",
        borderColor: "#2c3e50",
        borderWidth: 1,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "百分比 (%)",
        },
        grid: {
          display: true,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  },
});

// 中印对比图表
const comparisonCtx = document
  .getElementById("comparisonChart")
  .getContext("2d");
const comparisonChart = new Chart(comparisonCtx, {
  type: "bar",
  data: {
    labels: ["申请量", "获批率", "平均薪资 ($)", "审计率"],
    datasets: [
      {
        label: "中国公民",
        data: [158987 * 0.15, 85, 110000, 22],
        backgroundColor: "#3498db",
        borderColor: "#2c3e50",
        borderWidth: 1,
      },
      {
        label: "印度公民",
        data: [158987 * 0.6, 90, 95000, 25],
        backgroundColor: "#2ecc71",
        borderColor: "#2c3e50",
        borderWidth: 1,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        mode: "index",
        intersect: false,
        callbacks: {
          label: function (context) {
            const label = context.dataset.label || "";
            const value = context.raw;
            if (context.parsed.y !== null) {
              return label + ": " + value;
            }
            return label;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "数值",
        },
        grid: {
          display: true,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  },
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// 返回顶部按钮
const backToTopButton = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    backToTopButton.classList.add("visible");
  } else {
    backToTopButton.classList.remove("visible");
  }
});

// 导航高亮
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.style.fontWeight = "500";
    link.style.color =
      link.getAttribute("href").substring(1) === current
        ? "#3498db"
        : "#2c3e50";
  });
});
