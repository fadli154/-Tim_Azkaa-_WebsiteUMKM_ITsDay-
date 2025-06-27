// ========== DOM ELEMENT SELECTION ==========
const navbar = document.querySelector("#navbar");
const hamburger = document.querySelector("#hamburger");
const navMenu = document.querySelector("#mobile-menu");
const blankDisplay = document.querySelector("#blank-display");
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".wrapper-navbar-link");
const navHighlightLinks = document.querySelectorAll(".nav-link");

// ========== COMMON FUNCTION ==========
function openNav() {
  blankDisplay.classList.remove("scale-0");
  hamburger.classList.add("hamburger-active");
  navMenu.classList.add("navbar-menu-active", "-right-0");
  navMenu.classList.remove("-right-96");
}

function closeNav() {
  blankDisplay.classList.add("scale-0");
  hamburger.classList.remove("hamburger-active");
  navMenu.classList.remove("navbar-menu-active", "-right-0");
  navMenu.classList.add("-right-96");
}

function toggleNav() {
  const isOpen = navMenu.classList.contains("navbar-menu-active");
  isOpen ? closeNav() : openNav();
}

// ========== SCROLL & NAVBAR BEHAVIOR ==========
function handleScrollEffect() {
  const scrollY = window.scrollY;
  const fixedNavbar = navbar.offsetTop;

  // Blur effect on scroll
  if (scrollY > fixedNavbar) {
    navbar.classList.add("navbar-scrolled", "backdrop-blur-md");
  } else {
    navbar.classList.remove("navbar-scrolled", "backdrop-blur-md");
  }

  // Highlight active section in nav
  let currentSection = "";
  sections.forEach((section) => {
    if (scrollY >= section.offsetTop - 100) {
      currentSection = section.getAttribute("id");
    }
  });

  navHighlightLinks.forEach((link) => {
    const href = link.getAttribute("href");
    link.classList.toggle("text-active", href === `#${currentSection}`);
  });
}

// ========== EVENT BINDING ==========
window.addEventListener("scroll", handleScrollEffect);

hamburger.addEventListener("click", toggleNav);

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    closeNav();
    setTimeout(handleScrollEffect, 300); // Ensure highlight after scroll
  });
});

document.addEventListener("click", (evt) => {
  const target = evt.target;

  // Close nav if clicked outside menu/hamburger
  const isInsideHamburger = hamburger.contains(target);
  const isNavbarPart = target.classList.contains("navbar-part");

  if (navMenu.classList.contains("navbar-menu-active") && !isInsideHamburger && !isNavbarPart) {
    closeNav();
  }

  // Click on overlay background
  if (target.classList.contains("blank-display")) {
    blankDisplay.classList.add("scale-0");
  }
});

// ========== RESPONSIVE GLIDER CAROUSEL ==========
let isGliderInitialized = false;

function checkAndInitGlider() {
  const draggable = document.querySelector(".draggable");
  const gliderEl = document.querySelector(".articles-glider");
  const target = gliderEl || draggable;

  if (window.innerWidth > 1024 && target && !target.classList.contains("glider-initialized")) {
    const glider = new Glider(target, {
      slidesToShow: 3,
      slidesToScroll: 3,
      draggable: true,
      rewind: true,
      dots: ".dots",
      arrows: {
        prev: ".glider-prev",
        next: ".glider-next",
      },
    });

    target._glider = glider;
    target.classList.add("glider", "glider-initialized");
    isGliderInitialized = true;
  } else if (window.innerWidth <= 1024 && isGliderInitialized && gliderEl && gliderEl._glider) {
    gliderEl._glider.destroy();
    delete gliderEl._glider;
    gliderEl.classList.remove("glider-initialized");
    isGliderInitialized = false;
  }
}

// ========== INIT GLIDER ==========
window.addEventListener("load", checkAndInitGlider);
window.addEventListener("resize", () => {
  checkAndInitGlider();

  // Responsive: auto close nav on desktop
  if (window.innerWidth > 768) {
    blankDisplay.classList.add("scale-0");
  } else if (navMenu.classList.contains("navbar-menu-active")) {
    closeNav();
  }
});

// ========== TYPED.JS INIT ==========
new Typed("#element", {
  strings: ["Sunda."],
  loop: true,
  typeSpeed: 250,
  backSpeed: 250,
  backDelay: 700,
  smartBackspace: true,
});

// ========== AOS INIT ==========
AOS.init();
