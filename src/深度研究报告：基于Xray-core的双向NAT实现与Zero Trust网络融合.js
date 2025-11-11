// 导航栏滚动效果
window.addEventListener("scroll", function () {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 50) {
    navbar.classList.remove("nav-not-scrolled");
    navbar.classList.add("nav-scrolled");
  } else {
    navbar.classList.remove("nav-scrolled");
    navbar.classList.add("nav-not-scrolled");
  }
});

// 移动端菜单切换
document
  .getElementById("mobile-menu-btn")
  .addEventListener("click", function () {
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

// 高亮当前章节
window.addEventListener("scroll", function () {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link, .toc-link");

  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

// 初始化
document.addEventListener("DOMContentLoaded", function () {
  // 设置初始导航栏状态
  const navbar = document.getElementById("navbar");
  navbar.classList.add("nav-not-scrolled");

  // 高亮第一个章节
  document
    .querySelector('.nav-link[href="#introduction"]')
    .classList.add("active");
  document
    .querySelector('.toc-link[href="#introduction"]')
    .classList.add("active");
});
