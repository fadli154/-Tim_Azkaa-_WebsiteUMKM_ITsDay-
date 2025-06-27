// ========== DOM ELEMENT SELECTION ==========
const navbar = document.querySelector("#navbar");
const hamburger = document.querySelector("#hamburger");
const navMenu = document.querySelector("#mobile-menu");
const blankDisplay = document.querySelector("#blank-display");
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".wrapper-navbar-link");
const navHighlightLinks = document.querySelectorAll(".nav-link");

// ========== COMMON FUNCTION ==========
function closeNav() {
  blankDisplay.classList.add("scale-0");
  hamburger.classList.remove("hamburger-active");
  navMenu.classList.remove("navbar-menu-active", "-right-0");
  navMenu.classList.add("-right-96");
}

function handleScrollHighlight() {
  const scrollY = window.scrollY;
  const fixedNavbar = navbar.offsetTop;

  // Toggle navbar blur on scroll
  if (scrollY > fixedNavbar) {
    navbar.classList.add("navbar-scrolled", "backdrop-blur-md");
  } else {
    navbar.classList.remove("navbar-scrolled", "backdrop-blur-md");
  }

  // Highlight active nav link
  let currentSection = "";
  sections.forEach((section) => {
    if (scrollY >= section.offsetTop - 100) {
      currentSection = section.getAttribute("id");
    }
  });

  navHighlightLinks.forEach((link) => {
    link.classList.toggle("text-active", link.getAttribute("href") === `#${currentSection}`);
  });
}

// ========== SCROLL HIGHLIGHT ==========
window.addEventListener("scroll", () => {
  clearTimeout(window.__scrollTimer);
  window.__scrollTimer = setTimeout(handleScrollHighlight, 100);
});

// ========== HAMBURGER MENU TOGGLE ==========
hamburger.addEventListener("click", () => {
  blankDisplay.classList.toggle("scale-0");
  hamburger.classList.toggle("hamburger-active");
  navMenu.classList.toggle("navbar-menu-active");
  navMenu.classList.toggle("-right-96");
  navMenu.classList.toggle("-right-0");
});

// ========== CLOSE NAV WHEN LINK CLICKED ==========
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    closeNav();
    setTimeout(handleScrollHighlight, 300);
  });
});

// ========== CLOSE NAV WHEN CLICK OUTSIDE ==========
document.addEventListener("click", (evt) => {
  const target = evt.target;

  if (navMenu.classList.contains("navbar-menu-active") && ![hamburger, ...hamburger.querySelectorAll("*")].includes(target) && !target.classList.contains("navbar-part")) {
    closeNav();
  }

  if (target.classList.contains("hamburger-line")) {
    hamburger.classList.toggle("hamburger-active");
    navMenu.classList.toggle("navbar-menu-active");
    navMenu.classList.toggle("-right-96");
    navMenu.classList.toggle("-right-0");
  }

  if (target.classList.contains("blank-display")) {
    blankDisplay.classList.add("scale-0");
  }
});

// ========== RESPONSIVE GLIDER CAROUSEL ==========
let isGliderInitialized = false;

function checkAndInitGlider() {
  const draggableElement = document.querySelector(".draggable");
  const gliderElement = document.querySelector(".artikel-glider");
  const target = gliderElement || draggableElement;

  if (window.innerWidth > 1024) {
    if (target && !target.classList.contains("glider-initialized")) {
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
    }
  } else if (isGliderInitialized && gliderElement && gliderElement._glider) {
    gliderElement._glider.destroy();
    delete gliderElement._glider;
    gliderElement.classList.remove("glider-initialized");
    isGliderInitialized = false;
  }
}

window.addEventListener("load", checkAndInitGlider);
window.addEventListener("resize", () => {
  checkAndInitGlider();

  if (window.innerWidth > 768) {
    blankDisplay.classList.add("scale-0");
  } else if (navMenu.classList.contains("navbar-menu-active")) {
    closeNav();
  }
});

// ========== TYPED JS ==========
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
