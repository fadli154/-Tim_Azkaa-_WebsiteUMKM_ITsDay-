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

  if (scrollY > fixedNavbar) {
    navbar.classList.add("navbar-scrolled", "backdrop-blur-md");
  } else {
    navbar.classList.remove("navbar-scrolled", "backdrop-blur-md");
  }

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
    setTimeout(handleScrollEffect, 300);
  });
});

document.addEventListener("click", (evt) => {
  const target = evt.target;
  const isInsideHamburger = hamburger.contains(target);
  const isNavbarPart = target.classList.contains("navbar-part");

  if (navMenu.classList.contains("navbar-menu-active") && !isInsideHamburger && !isNavbarPart) {
    closeNav();
  }

  if (target.classList.contains("blank-display")) {
    blankDisplay.classList.add("scale-0");
  }
});

// ========== RESPONSIVE GLIDER CAROUSEL ==========
let isGliderInitialized = false;

// AUTOPLAY FUNCTION with pause on hover
function autoPlayGlider(gliderInstance, targetElement, delay = 4000) {
  let currentIndex = 0;
  const totalSlides = gliderInstance.track.childElementCount;
  let autoplayInterval;

  function startAutoplay() {
    autoplayInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % totalSlides;
      gliderInstance.scrollItem(currentIndex);
    }, delay);
  }

  function stopAutoplay() {
    clearInterval(autoplayInterval);
  }

  targetElement.addEventListener("mouseenter", stopAutoplay);
  targetElement.addEventListener("mouseleave", startAutoplay);

  startAutoplay(); // Mulai pertama kali
}

function checkAndInitGlider() {
  const target = document.querySelector(".articles-glider");

  if (!target || target.classList.contains("glider-initialized")) return;

  const glider = new Glider(target, {
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: true,
    rewind: true,
    dots: ".dots",
    arrows: {
      prev: ".glider-prev",
      next: ".glider-next",
    },
    responsive: [
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
    ],
  });

  target._glider = glider;
  target.classList.add("glider", "glider-initialized");
  isGliderInitialized = true;

  // AUTOPLAY dengan pause on hover
  autoPlayGlider(glider, target, 2000);
}

// ========== INIT GLIDER ==========
window.addEventListener("load", checkAndInitGlider);
window.addEventListener("resize", () => {
  checkAndInitGlider();
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
