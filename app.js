// menu show and hidde
const showHiddeMenu = () => {
  const navMenu = document.getElementById("nav-menu");
  const navToggle = document.getElementById("nav-toggle");
  const navClose = document.getElementById("nav-close");

  if (navToggle) {
    navToggle.addEventListener("click", () => {
      addClassList(navMenu, "show-menu");
    });
  }

  if (navClose) {
    navClose.addEventListener("click", () => {
      removeClassList(navMenu, "show-menu");
    });
  }
}; //ok

// remove menu mobile
const removeMenuMobile = () => {
  const navlink = document.querySelectorAll(".nav__link");
  const navMenu = document.getElementById("nav-menu");

  navlink.forEach((btn) => {
    btn.addEventListener("click", () => {
      removeClassList(navMenu, "show-menu");
    });
  });
}; //ok

// accordion skills
const showSkills = () => {
  const skillsHeader = document.querySelectorAll(".skills__header");

  skillsHeader.forEach((header) => {
    header.addEventListener("click", toggleSkills);
  });
};//ok

const toggleSkills = (event) => {
  const skillsContent = document.querySelectorAll(".skills__content");
  let itemClass = event.currentTarget.parentNode.className;

  skillsContent.forEach((content) => {
    content.className = "skills__content skills__close";
  });
  if (itemClass === "skills__content skills__close") {
    event.currentTarget.parentNode.className = "skills__content skills__open";
  }
};//ok

// qualification tabs
const showQualifications = () => {
  const buttons = document.querySelectorAll(".qualification__button");
  const contents = document.querySelectorAll(".qualification__content");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-target");

      contents.forEach((content) => {
        const contentId = content.getAttribute("data-id");

        if (contentId === target) {
          addClassList(content, "qualification__active");
        } else {
          removeClassList(content, "qualification__active");
        }
      });

      // Activate/desactivate class on button
      buttons.forEach((button) => {
        if (button === btn) {
          addClassList(button, "qualification__active");
        } else {
          removeClassList(button, "qualification__active");
        }
      });
    });
  });
};

// service modal
const showHiddeModals = () => {
  const modals = document.querySelectorAll(".services__modal");
  const openBtns = document.querySelectorAll(".services__button");
  const closeBtns = document.querySelectorAll(".services__modal-close");

  openBtns.forEach((btn, i) => {
    btn.addEventListener("click", () => {
      addClassList(modals[i], "active-modal");
    });
  });

  closeBtns.forEach((btn, i) => {
    btn.addEventListener("click", () => {
      removeClassList(modals[i], "active-modal");
    });
  });
};

// portfolio swiper
const swiperPortfolio = () => {
  let swiper = new Swiper(".portfolio__container", {
    cssMode: true,
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    mousewheel: true,
    keyboard: true,
  });
};

// testimonial swiper
const swiperTestimonial = () => {
  let swiper = new Swiper(".testimonial__container", {
    loop: true,
    grabCursos: true,
    spceBetween: 48,

    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },
    breakpoints: {
      568: {
        slidesPerView: 2,
      },
    },
  });
};

// change background header
const scrollHeader = () => {
  const nav = document.getElementById("header");
  const scrollPosition = window.scrollY;

  if (scrollPosition >= 80) {
    addClassList(nav, "scroll-header");
  } else {
    removeClassList(nav, "scroll-header");
  }
};

// scroll sections active link
const scrollActive = () => {
  const sections = document.querySelectorAll("section[id]");
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    let sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.add("active-link");
    } else {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.remove("active-link");
    }
  });
};

// show scroll up
const scrollUp = () => {
  const scrollUp = document.getElementById("scroll-up");
  const scrollY = window.pageYOffset;

  if (scrollY >= 560) {
    addClassList(scrollUp, "show-scroll");
  } else {
    removeClassList(scrollUp, "show-scroll");
  }
};

// dark/light theme
const changeTheme = () => {
  const themeButton = document.getElementById("theme-button");

  themeButton.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark-theme");

    const isDarkTheme =
      document.documentElement.classList.contains("dark-theme");

    if (isDarkTheme) {
      themeButton.classList.replace("fa-moon", "fa-sun");
    } else {
      themeButton.classList.replace("fa-sun", "fa-moon");
    }
  });
};

const setThemeBasedOnSystem = () => {
  const themeButton = document.getElementById("theme-button");
  const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (!isDarkMode) {
    themeButton.classList.replace("fa-sun", "fa-moon");
    removeClassList(document.documentElement, "dark-theme");
  }
  themeButton.classList.replace("fa-moon", "fa-sun");
  addClassList(document.documentElement, "dark-theme");
};//ok

const addClassList = (element, className) => {
  element.classList.add(className);
};//ok

const removeClassList = (element, className) => {
  element.classList.remove(className);
};
// events
window.addEventListener("DOMContentLoaded", () => {
  setThemeBasedOnSystem();//ok
  changeTheme();//ok
  showHiddeMenu();//ok
  removeMenuMobile(); //ok
  showSkills();
  showQualifications();
  showHiddeModals();
  swiperPortfolio();
  swiperTestimonial();
});

window.addEventListener("scroll", () => {
  scrollHeader();
  scrollActive();
  scrollUp();
});
