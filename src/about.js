console.log("About page loaded");

document.addEventListener("DOMContentLoaded", function () {
  const content = document.getElementById("about-content");

  content.innerHTML = `
        <div class="max-w-4xl mx-auto">
            <div class="bg-white rounded-lg shadow-md p-6">
                <h2 class="text-2xl font-semibold mb-4">项目介绍</h2>
                <p class="text-gray-700 mb-4">
                    本项目是一个关于JSON处理库深度对比研究报告的前端项目，主要对比分析stream-json和large-json-reader-writer两个库的性能、特性、适用场景等。
                </p>

                <h3 class="text-xl font-semibold mb-3">技术栈</h3>
                <ul class="list-disc list-inside text-gray-700 mb-4">
                    <li>构建工具: Vite 7.x</li>
                    <li>CSS框架: Tailwind CSS 4.x</li>
                    <li>HTTP客户端: axios</li>
                    <li>图表库: Chart.js</li>
                </ul>

                <h3 class="text-xl font-semibold mb-3">项目特点</h3>
                <ul class="list-disc list-inside text-gray-700">
                    <li>单页应用(SPA)架构</li>
                    <li>交互式图表展示</li>
                    <li>响应式设计</li>
                    <li>模块化代码结构</li>
                </ul>
            </div>
        </div>
    `;
});
