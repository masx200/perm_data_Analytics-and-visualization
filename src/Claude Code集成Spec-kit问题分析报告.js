import { Chart } from "chart.js/auto";
// 问题表现频率图表
const problemCtx = document
  .getElementById("problemFrequencyChart")
  .getContext("2d");
const problemChart = new Chart(problemCtx, {
  type: "bar",
  data: {
    labels: [
      "上下文过载",
      "自动压缩触发",
      "请求超时",
      "工具调用失败",
      "记忆丢失",
    ],
    datasets: [
      {
        label: "发生频率",
        data: [95, 75, 60, 30, 85],
        backgroundColor: [
          "rgba(239, 68, 68, 0.7)",
          "rgba(249, 115, 22, 0.7)",
          "rgba(234, 179, 8, 0.7)",
          "rgba(168, 85, 247, 0.7)",
          "rgba(59, 130, 246, 0.7)",
        ],
        borderColor: [
          "rgba(239, 68, 68, 1)",
          "rgba(249, 115, 22, 1)",
          "rgba(234, 179, 8, 1)",
          "rgba(168, 85, 247, 1)",
          "rgba(59, 130, 246, 1)",
        ],
        borderWidth: 1,
      },
    ],
  },
  options: {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: function (value) {
            return value + "%";
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  },
});

// 工作流阶段Token消耗图表
const workflowCtx = document
  .getElementById("workflowTokenChart")
  .getContext("2d");
const workflowChart = new Chart(workflowCtx, {
  type: "line",
  data: {
    labels: [
      "Constitution",
      "Specify",
      "Clarify",
      "Plan",
      "Tasks",
      "Analyze",
      "Implement",
    ],
    datasets: [
      {
        label: "Token消耗 (千)",
        data: [2.5, 6.5, 4, 10, 8, 5, 20],
        fill: true,
        backgroundColor: "rgba(168, 85, 247, 0.2)",
        borderColor: "rgba(168, 85, 247, 1)",
        tension: 0.3,
        pointBackgroundColor: "rgba(168, 85, 247, 1)",
        pointRadius: 4,
      },
    ],
  },
  options: {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return value + "K";
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  },
});
