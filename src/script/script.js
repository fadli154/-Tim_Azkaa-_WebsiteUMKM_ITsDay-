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

// Glider artikel

// Menyimpan status inisialisasi Glider
let isGliderInitialized = false;

function checkAndInitGlider() {
  const draggableElement = document.querySelector(".draggable");
  const gliderElement = document.querySelector(".artikel-glider");

  if (window.innerWidth > 1024) {
    // Jika elemen .glider tidak ada dan lebar layar lebih besar dari 1024, inisialisasi Glider
    if (gliderElement) {
      const glider = new Glider(gliderElement, {
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

      gliderElement._glider = glider; // Store the Glider instance
      gliderElement.classList.add("glider-initialized");
      gliderElement.classList.add("glider");
      isGliderInitialized = true;
    } else if (draggableElement) {
      const glider = new Glider(draggableElement, {
        slidesToShow: 3,
        slidesToScroll: 3,
        draggable: true,
        dots: ".dots",
        arrows: {
          prev: ".glider-prev",
          next: ".glider-next",
        },
      });

      draggableElement._glider = glider; // Store the Glider instance
      draggableElement.classList.add("glider-initialized");
      draggableElement.classList.add("glider");
      isGliderInitialized = true;
    }
  } else if (gliderElement && window.innerWidth < 1024) {
    // Jika elemen .glider ada dan lebar layar tidak lebih besar dari 1024, hancurkan Glider
    if (isGliderInitialized) {
      if (gliderElement._glider) {
        gliderElement._glider.destroy(); // Destroy the Glider instance
        delete gliderElement._glider; // Remove the stored Glider instance
      }
      gliderElement.classList.remove("glider-initialized");
      isGliderInitialized = false;
    }
  }
}

// Memanggil fungsi saat halaman dimuat
window.addEventListener("load", checkAndInitGlider);

// Memanggil fungsi saat lebar layar berubah
window.addEventListener("resize", function () {
  checkAndInitGlider();

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
