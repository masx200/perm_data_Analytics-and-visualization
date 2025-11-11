console.log("Contact page loaded");

document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contact-form");

  contactForm.innerHTML = `
        <div class="max-w-2xl mx-auto">
            <div class="bg-white rounded-lg shadow-md p-6">
                <h2 class="text-2xl font-semibold mb-4">联系我们</h2>
                <p class="text-gray-600 mb-6">如果您有任何关于JSON处理库的问题或建议，欢迎联系我们。</p>

                <form id="contactFormElement" class="space-y-4">
                    <div>
                        <label for="name" class="block text-sm font-medium text-gray-700 mb-1">姓名</label>
                        <input type="text" id="name" name="name" required
                               class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    </div>

                    <div>
                        <label for="email" class="block text-sm font-medium text-gray-700 mb-1">邮箱</label>
                        <input type="email" id="email" name="email" required
                               class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    </div>

                    <div>
                        <label for="subject" class="block text-sm font-medium text-gray-700 mb-1">主题</label>
                        <select id="subject" name="subject" required
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="">请选择主题</option>
                            <option value="general">一般咨询</option>
                            <option value="technical">技术问题</option>
                            <option value="feedback">反馈建议</option>
                            <option value="collaboration">合作意向</option>
                        </select>
                    </div>

                    <div>
                        <label for="message" class="block text-sm font-medium text-gray-700 mb-1">消息</label>
                        <textarea id="message" name="message" rows="4" required
                                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                    </div>

                    <div class="flex items-center justify-between">
                        <button type="submit"
                                class="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            发送消息
                        </button>
                        <span id="formStatus" class="text-sm text-gray-600"></span>
                    </div>
                </form>
            </div>
        </div>
    `;

  // 表单提交处理
  document
    .getElementById("contactFormElement")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      const status = document.getElementById("formStatus");
      status.textContent = "表单已提交（演示）";
      status.className = "text-sm text-green-600";

      // 重置表单
      setTimeout(() => {
        this.reset();
        status.textContent = "";
      }, 2000);
    });
});
