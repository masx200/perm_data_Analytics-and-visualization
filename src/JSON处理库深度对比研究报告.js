import { Chart } from "chart.js/auto";
window.addEventListener("load", async () => {
  // const { Chart } = await import("chart.js/auto");

  // 性能对比图表

  const performanceCtx = document
    .getElementById("performanceChart")
    .getContext("2d");
  const performanceChart = new Chart(performanceCtx, {
    type: "bar",
    data: {
      labels: ["JSON (基准)", "JSONStream", "stream-json"],
      datasets: [
        {
          label: "吞吐量 (KByte/sec)",
          data: [2907899, 513910, 1800000],
          backgroundColor: [
            "rgba(34, 197, 94, 0.7)",
            "rgba(239, 68, 68, 0.7)",
            "rgba(59, 130, 246, 0.7)",
          ],
          borderColor: [
            "rgba(34, 197, 94, 1)",
            "rgba(239, 68, 68, 1)",
            "rgba(59, 130, 246, 1)",
          ],
          borderWidth: 1,
        },
        {
          label: "CPU时钟 (ms)",
          data: [37360, 38180, 37800],
          backgroundColor: [
            "rgba(34, 197, 94, 0.3)",
            "rgba(239, 68, 68, 0.3)",
            "rgba(59, 130, 246, 0.3)",
          ],
          borderColor: [
            "rgba(34, 197, 94, 0.7)",
            "rgba(239, 68, 68, 0.7)",
            "rgba(59, 130, 246, 0.7)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: "top" },
        tooltip: {
          callbacks: {
            label: function (context) {
              let label = context.dataset.label || "";
              if (label) {
                label += ": ";
              }
              if (context.parsed.y !== null) {
                if (context.datasetIndex === 0) {
                  label += new Intl.NumberFormat().format(context.parsed.y);
                } else {
                  label += context.parsed.y + " ms";
                }
              }
              return label;
            },
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function (value, index, values) {
              if (value >= 1000000) {
                return (value / 1000000).toFixed(1) + "M";
              } else if (value >= 1000) {
                return (value / 1000).toFixed(1) + "K";
              }
              return value;
            },
          },
        },
      },
    },
  });

  // 社区活跃度图表

  const communityCtx = document
    .getElementById("communityChart")
    .getContext("2d");
  const communityChart = new Chart(communityCtx, {
    type: "radar",
    data: {
      labels: ["Star数量", "Fork数量", "维护频率", "文档完善度", "社区活跃度"],
      datasets: [
        {
          label: "stream-json",
          data: [95, 80, 85, 90, 85],
          backgroundColor: "rgba(59, 130, 246, 0.2)",
          borderColor: "rgba(59, 130, 246, 1)",
          pointBackgroundColor: "rgba(59, 130, 246, 1)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(59, 130, 246, 1)",
        },
        {
          label: "large-json-reader-writer",
          data: [10, 5, 20, 30, 15],
          backgroundColor: "rgba(168, 85, 247, 0.2)",
          borderColor: "rgba(168, 85, 247, 1)",
          pointBackgroundColor: "rgba(168, 85, 247, 1)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(168, 85, 247, 1)",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      elements: { line: { borderWidth: 3 } },
      scales: {
        r: {
          angleLines: { display: true },
          suggestedMin: 0,
          suggestedMax: 100,
        },
      },
    },
  });
});
