// open menu mobile
const displayMenu = () => {
  const navMenu = document.getElementById("nav-menu");
  const openButton = document.getElementById("nav-toggle");

  openButton.addEventListener("click", () => {
    addClass(navMenu, "show-menu");
    removeMenu(navMenu);
    removeMenuOnClick(navMenu);
  });
};

// remove menu mobile
const removeMenu = (navMenu) => {
  const closeButton = document.getElementById("nav-close");

  closeButton.addEventListener("click", () => {
    removeClass(navMenu, "show-menu");
  });
};

// remove menu when a nav link is clicked
const removeMenuOnClick = (navMenu) => {
  const navlinks = document.querySelectorAll(".nav__link");

  navlinks.forEach((link) => {
    link.addEventListener("click", () => {
      removeClass(navMenu, "show-menu");
    });
  });
};

// skills
const setSkillsClick = () => {
  const skillsHeader = document.querySelectorAll(".skills__header");

  skillsHeader.forEach((header) => {
    header.addEventListener("click", displaySkills);
  });
};

const displaySkills = (e) => {
  const skillsContent = document.querySelectorAll(".skills__content");
  const closeClass = "skills__content skills__close";
  const openClass = "skills__content skills__open";
  let itemClass = e.currentTarget.parentNode.className;

  skillsContent.forEach((content) => {
    content.className = closeClass;
  });

  if (itemClass === closeClass) {
    e.currentTarget.parentNode.className = openClass;
  }
};

// qualification tabs
const setQualificationsClick = () => {
  const tabButtons = document.querySelectorAll(".qualification__button");

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      displayQualifications(tabButtons, button);
    });
  });
};

const displayQualifications = (buttons, selectedButton) => {
  const contents = document.querySelectorAll(".qualification__content");
  const selectedTarget = selectedButton.getAttribute("data-target");

  contents.forEach((content) => {
    const contentId = content.getAttribute("data-id");

    toggleVisibility(contentId === selectedTarget, content);
  });
  toggleButton(buttons, selectedButton);
};

const toggleButton = (buttons, selectedButton) => {
  buttons.forEach((button) => {
    toggleVisibility(button === selectedButton, button);
  });
};

const toggleVisibility = (condition, element) => {
  if (condition) {
    addClass(element, "qualification__active");
  } else {
    removeClass(element, "qualification__active");
  }
};

// service modal
const displayModals = () => {
  const modals = document.querySelectorAll(".services__modal");
  const openButtons = document.querySelectorAll(".services__button");

  openButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      addClass(modals[index], "active-modal");
    });
  });
  removeModals(modals);
};

const removeModals = (modals) => {
  const closeButtons = document.querySelectorAll(".services__modal-close");
  closeButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      removeClass(modals[index], "active-modal");
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

// add header shadow when scroll
const scrollHeader = () => {
  const nav = document.getElementById("header");
  const scrollPosition = window.scrollY;

  if (scrollPosition >= 100) {
    addClass(nav, "scroll-header");
  } else {
    removeClass(nav, "scroll-header");
  }
};

// active nav section link when scroll
const activeNavLink = () => {
  const { sections, scrollY } = getSectionsAndScrollHeight();

  sections.forEach((current) => {
    const sectionId = current.getAttribute("id");
    const isActive = isSectionActive(current, scrollY);
    toggleActiveClass(sectionId, isActive);
  });
};

const getSectionsAndScrollHeight = () => {
  const sections = document.querySelectorAll("section[id]");
  const scrollY = window.scrollY;

  return { sections, scrollY };
};

const isSectionActive = (current, scrollY) => {
  const sectionHeight = current.offsetHeight;
  const sectionTop = current.offsetTop - 50;
  return scrollY > sectionTop && scrollY <= sectionTop + sectionHeight;
};

const toggleActiveClass = (sectionId, isActive) => {
  const link = document.querySelector(".nav__menu a[href*=" + sectionId + "]");

  if (isActive) {
    addClass(link, "active-link");
  } else {
    removeClass(link, "active-link");
  }
};

// display scroll up page button
const scrollUpPage = () => {
  const scrollUp = document.getElementById("scroll-up");
  const scrollY = window.scrollY;

  if (scrollY >= 460) {
    addClass(scrollUp, "show-scroll");
  } else {
    removeClass(scrollUp, "show-scroll");
  }
};

// theme
const setThemeBasedOnSystem = () => {
  const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (!isDarkMode) {
    removeClass(document.documentElement, "dark-theme");
  }

  addClass(document.documentElement, "dark-theme");
  changeThemeIcon(isDarkMode);
};

const changeTheme = () => {
  const themeButton = document.getElementById("theme-button");

  themeButton.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark-theme");

    const isDarkTheme =
      document.documentElement.classList.contains("dark-theme");

    changeThemeIcon(isDarkTheme);
  });
};

const changeThemeIcon = (isDark) => {
  const themeButton = document.getElementById("theme-button");

  if (isDark) {
    replaceClass(themeButton, "fa-moon", "fa-sun");
  } else {
    replaceClass(themeButton, "fa-sun", "fa-moon");
  }
};

// reusable functions
const addClass = (element, className) => {
  element.classList.add(className);
};

const removeClass = (element, className) => {
  element.classList.remove(className);
};

const replaceClass = (element, currentClass, newClass) => {
  element.classList.replace(currentClass, newClass);
};

window.addEventListener("DOMContentLoaded", () => {
  displayMenu();
  setSkillsClick();
  setQualificationsClick();
  displayModals();
  swiperPortfolio();
  swiperTestimonial();
  changeTheme();
  setThemeBasedOnSystem();
});

window.addEventListener("scroll", () => {
  scrollHeader();
  activeNavLink();
  scrollUpPage();
});
