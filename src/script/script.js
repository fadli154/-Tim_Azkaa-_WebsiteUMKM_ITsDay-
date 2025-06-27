// ========== DOM ELEMENT SELECTION ==========
const navbar = document.querySelector("#navbar");
const hamburger = document.querySelector("#hamburger");
const navMenu = document.querySelector("#mobile-menu");
const blankDisplay = document.querySelector("#blank-display");
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".wrapper-navbar-link");

// ========== SCROLL BEHAVIOR ==========
window.onscroll = function () {
  const scrollY = window.scrollY;
  const navA = document.querySelectorAll(".nav-link");
  const fixedNavbar = navbar.offsetTop;

  // Toggle navbar style on scroll
  if (scrollY > fixedNavbar) {
    navbar.classList.add("navbar-scrolled", "backdrop-blur-md");
  } else {
    navbar.classList.remove("navbar-scrolled", "backdrop-blur-md");
  }

  // Highlight active section in navbar
  let current = "";
  sections.forEach((section) => {
    if (scrollY >= section.offsetTop) {
      current = section.getAttribute("id");
    }
  });

  navA.forEach((a) => {
    a.classList.toggle("text-active", a.getAttribute("href") === `#${current}`);
  });
};

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
    blankDisplay.classList.add("scale-0");
    hamburger.classList.remove("hamburger-active");
    navMenu.classList.remove("navbar-menu-active", "-right-0");
    navMenu.classList.add("-right-96");
  });
});

// ========== CLOSE NAV WHEN CLICK OUTSIDE ==========
document.addEventListener("click", (evt) => {
  const target = evt.target;

  // Click inside nav or hamburger icon
  if (navMenu.classList.contains("navbar-menu-active") && !(target === hamburger || target.classList.contains("navbar-part"))) {
    hamburger.classList.remove("hamburger-active");
    navMenu.classList.remove("navbar-menu-active", "-right-0");
    navMenu.classList.add("-right-96");
  }

  // Click on hamburger line (icon parts)
  if (target.classList.contains("hamburger-line")) {
    hamburger.classList.toggle("hamburger-active");
    navMenu.classList.toggle("navbar-menu-active");
    navMenu.classList.toggle("-right-96");
    navMenu.classList.toggle("-right-0");
  }

  // Click on background overlay
  if (target.classList.contains("blank-display")) {
    blankDisplay.classList.add("scale-0");
  }
});

// ========== RESPONSIVE GLIDER CAROUSEL ==========
let isGliderInitialized = false;

function checkAndInitGlider() {
  const draggableElement = document.querySelector(".draggable");
  const gliderElement = document.querySelector(".artikel-glider");

  if (window.innerWidth > 1024) {
    const target = gliderElement || draggableElement;

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

// ========== INIT GLIDER ON LOAD & RESIZE ==========
window.addEventListener("load", checkAndInitGlider);

window.addEventListener("resize", () => {
  checkAndInitGlider();

  // Close nav if resized above breakpoint
  if (window.innerWidth > 768) {
    blankDisplay.classList.add("scale-0");
  } else if (navMenu.classList.contains("navbar-menu-active")) {
    hamburger.classList.remove("hamburger-active");
    navMenu.classList.remove("navbar-menu-active", "-right-0");
    navMenu.classList.add("-right-96");
  }
});
