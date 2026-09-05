document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav-link");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
      });
    });
  }

const heroSlides = document.querySelectorAll("#heroSlider .slide");
  let currentHeroSlide = 0;
  function rotateHeroSlides() {
    if (heroSlides.length === 0) return;
    heroSlides[currentHeroSlide].classList.remove("active");
    currentHeroSlide = (currentHeroSlide + 1) % heroSlides.length;
    heroSlides[currentHeroSlide].classList.add("active");
  }if (heroSlides.length > 0) {
    setInterval(rotateHeroSlides, 5000);
  }const skillsWrapper = document.getElementById("skillsWrapper");
  const progressBars = document.querySelectorAll(".progress");
  let animated = false;
  const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !animated) {
        progressBars.forEach((bar) => {
          const val = bar.getAttribute("data-value");
          bar.style.width = val;
        });
        animated = true;
      }
    });
  }, { threshold: 0.3 });

  if (skillsWrapper) {
    skillsObserver.observe(skillsWrapper);
  }}