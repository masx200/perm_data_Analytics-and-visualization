import axios from "axios";
import "./style.css";

const API_BASE = "/api";

let navigations = [];
let editingId = null;

// DOM 元素
const navGrid = document.getElementById("navGrid");
const addNavBtn = document.getElementById("addNavBtn");
const navModal = document.getElementById("navModal");
const navForm = document.getElementById("navForm");
const modalTitle = document.getElementById("modalTitle");
const cancelBtn = document.getElementById("cancelBtn");
const iconFile = document.getElementById("iconFile");

// 表单输入
const navTitle = document.getElementById("navTitle");
const navUrl = document.getElementById("navUrl");
const navIcon = document.getElementById("navIcon");
const navDescription = document.getElementById("navDescription");
const navSort = document.getElementById("navSort");

// 获取所有导航
async function fetchNavigations() {
  try {
    const response = await axios.get(`${API_BASE}/icons`);
    navigations = response.data.icons;
    renderNavigations();
  } catch (error) {
    console.error("获取导航失败:", error);
    alert("获取导航失败");
  }
}

// 渲染导航卡片
function renderNavigations() {
  navGrid.innerHTML = "";
  navigations.forEach((nav) => {
    const card = document.createElement("div");
    card.className = "nav-card p-4 relative group";
    card.innerHTML = `
      <div class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button onclick="editNav(${nav.id})" class="text-blue-500 hover:text-blue-700 mr-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
          </svg>
        </button>
        <button onclick="deleteNav(${nav.id})" class="text-red-500 hover:text-red-700">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
          </svg>
        </button>
      </div>
      <a href="${nav.url}" target="_blank" class="block">
       
        <h3 class="nav-title">${nav.name}</h3>
        ${
          nav.description
            ? `<p class="text-xs text-gray-500 text-center mt-1">${nav.description}</p>`
            : ""
        }
      </a>
    `;
    navGrid.appendChild(card);
  });
}

// 显示模态框
function showModal(title = "添加导航", nav = null) {
  modalTitle.textContent = title;
  navModal.classList.remove("hidden");

  if (nav) {
    navTitle.value = nav.name;
    navUrl.value = nav.url;
    navIcon.value = nav.icon_url || "";
    navDescription.value = nav.description || "";
    navSort.value = nav.position || 0;
    editingId = nav.id;
  } else {
    navForm.reset();
    editingId = null;
  }
}

// 隐藏模态框
function hideModal() {
  navModal.classList.add("hidden");
  navForm.reset();
  editingId = null;
  iconFile.value = ""; // 清除文件上传
}

// 保存导航
async function saveNavigation(e) {
  e.preventDefault();

  const data = {
    name: navTitle.value,
    url: navUrl.value,
    icon_url: navIcon.value,
    description: navDescription.value,
    position: parseInt(navSort.value) || 0,
  };

  try {
    if (editingId) {
      await axios.put(`${API_BASE}/icons/${editingId}`, data);
    } else {
      await axios.post(`${API_BASE}/icons`, data);
    }
    await fetchNavigations();
    hideModal();
  } catch (error) {
    console.error("保存失败:", error);
    alert("保存失败");
  }
}

// 编辑导航
window.editNav = async function (id) {
  const nav = navigations.find((n) => n.id === id);
  if (nav) {
    showModal("编辑导航", nav);
  }
};

// 删除导航
window.deleteNav = async function (id) {
  if (confirm("确定要删除这个导航吗？")) {
    try {
      await axios.delete(`${API_BASE}/icons/${id}`);
      await fetchNavigations();
    } catch (error) {
      console.error("删除失败:", error);
      alert("删除失败");
    }
  }
};

// 上传图标
iconFile.addEventListener("change", async function (e) {
  const file = e.target.files[0];
  if (file) {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(`${API_BASE}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navIcon.value = response.data.url;
    } catch (error) {
      console.error("上传失败:", error);
      alert("上传失败");
    }
  }
});

// 事件监听
addNavBtn.addEventListener("click", () => showModal());
cancelBtn.addEventListener("click", (e) => {
  e.preventDefault();
  hideModal();
});
navForm.addEventListener("submit", saveNavigation);

// 点击模态框外部关闭
navModal.addEventListener("click", function (e) {
  if (e.target === navModal) {
    hideModal();
  }
});

// 初始化
fetchNavigations();
