import { Chart } from "chart.js/auto";
window.addEventListener("load", async () => {
  // const { Chart } = await import("chart.js/auto");
  // 错误检测能力对比图表
  const ctx = document.getElementById("errorDetectionChart").getContext("2d");
  const errorDetectionChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: [
        "数据块篡改检测",
        "元数据篡改检测",
        "实时错误报告",
        "自动修复能力",
        "离线检测能力",
      ],
      datasets: [
        {
          label: "ZFS",
          data: [95, 95, 90, 85, 80],
          backgroundColor: "rgba(59, 130, 246, 0.7)",
          borderColor: "rgba(59, 130, 246, 1)",
          borderWidth: 1,
        },
        {
          label: "EXT4",
          data: [10, 85, 15, 10, 70],
          backgroundColor: "rgba(239, 68, 68, 0.7)",
          borderColor: "rgba(239, 68, 68, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      responsive: true,
      plugins: {
        legend: {
          position: "top",
          labels: {
            font: {
              size: 14,
              family: "'Poppins', 'Noto Sans SC', sans-serif",
            },
          },
        },
        tooltip: {
          titleFont: {
            size: 16,
            family: "'Poppins', 'Noto Sans SC', sans-serif",
          },
          bodyFont: {
            size: 14,
            family: "'Poppins', 'Noto Sans SC', sans-serif",
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          ticks: {
            callback: function (value) {
              return value + "%";
            },
            font: {
              size: 12,
              family: "'Poppins', 'Noto Sans SC', sans-serif",
            },
          },
          grid: {
            color: "rgba(0, 0, 0, 0.05)",
          },
        },
        x: {
          ticks: {
            font: {
              size: 12,
              family: "'Poppins', 'Noto Sans SC', sans-serif",
            },
          },
          grid: {
            display: false,
          },
        },
      },
    },
  });
});
