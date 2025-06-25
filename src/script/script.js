const navbar = document.querySelector("#navbar");
const hamburger = document.querySelector("#hamburger");
const navMenu = document.querySelector("#mobile-menu");
const blankDisplay = document.querySelector("#blank-display");

window.onscroll = function () {
  const fixedNavbar = navbar.offsetTop;

  if (window.scrollY > fixedNavbar) {
    navbar.classList.add("navbar-scrolled");
    navbar.classList.add("backdrop-blur-md");
  } else {
    navbar.classList.remove("navbar-scrolled");
    navbar.classList.remove("backdrop-blur-md");
  }
};

// hamburger menu

hamburger.addEventListener("click", function () {
  blankDisplay.classList.toggle("scale-0");
  hamburger.classList.toggle("hamburger-active");
  navMenu.classList.toggle("navbar-menu-active");
  navMenu.classList.toggle("-right-96");
  navMenu.classList.toggle("-right-0");
});

// listen to clicks in document
document.addEventListener("click", (evt) => {
  let targetElement = evt.target;

  if (navMenu.classList.contains("navbar-menu-active")) {
    if (targetElement == hamburger || targetElement.classList.contains("navbar-part")) {
      return;
    } else {
      hamburger.classList.remove("hamburger-active");
      navMenu.classList.toggle("navbar-menu-active");
      navMenu.classList.add("-right-96");
      navMenu.classList.remove("-right-0");
    }
  }

  if (targetElement.classList.contains("hamburger-line")) {
    hamburger.classList.toggle("hamburger-active");
    navMenu.classList.toggle("navbar-menu-active");
    navMenu.classList.toggle("-right-96");
    navMenu.classList.toggle("-right-0");
  }

  if (targetElement.classList.contains("blank-display")) {
    blankDisplay.classList.add("scale-0");
  }
});

// Memanggil fungsi saat lebar layar berubah
window.addEventListener("resize", function () {
  if (window.innerWidth > 768) {
    if (!blankDisplay.classList.contains("scale-0")) {
      blankDisplay.classList.add("scale-0");
    }
  } else if (navMenu.classList.contains("navbar-menu-active")) {
    hamburger.classList.remove("hamburger-active");
    navMenu.classList.toggle("navbar-menu-active");
    navMenu.classList.add("-right-96");
    navMenu.classList.remove("-right-0");
  }
});
