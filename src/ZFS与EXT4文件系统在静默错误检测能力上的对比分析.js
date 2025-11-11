// 移动端菜单切换
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("hidden");
});

// 平滑滚动到锚点
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      // 关闭移动端菜单
      navMenu.classList.add("hidden");
    }
  });
});

// 回到顶部按钮
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// 滚动动画
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in");
    }
  });
}, observerOptions);

document.querySelectorAll("section").forEach((section) => {
  observer.observe(section);
});

// 代码块复制功能
document.querySelectorAll(".code-block").forEach((block) => {
  const button = document.createElement("button");
  button.className =
    "absolute top-2 right-2 bg-gray-700 text-white px-2 py-1 rounded text-xs hover:bg-gray-600";
  button.innerHTML = '<i class="fas fa-copy mr-1"></i>复制';
  button.onclick = () => {
    navigator.clipboard.writeText(block.querySelector("pre").textContent);
    button.innerHTML = '<i class="fas fa-check mr-1"></i>已复制';
    setTimeout(() => {
      button.innerHTML = '<i class="fas fa-copy mr-1"></i>复制';
    }, 2000);
  };
  block.style.position = "relative";
  block.appendChild(button);
});
