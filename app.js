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
  }
  if (heroSlides.length > 0) {
    setInterval(rotateHeroSlides, 5000);
  }
  const skillsWrapper = document.getElementById("skillsWrapper");
  const progressBars = document.querySelectorAll(".progress");
  let animated = false;
  const skillsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !animated) {
          progressBars.forEach((bar) => {
            const val = bar.getAttribute("data-value");
            bar.style.width = val;
          });
          animated = true;
        }
      });
    },
    { threshold: 0.3 },
  );

  if (skillsWrapper) {
    skillsObserver.observe(skillsWrapper);
  }

  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");

      projectCards.forEach((card) => {
        const cat = card.getAttribute("data-category");
        if (filter === "all" || filter === cat) {
          card.classList.remove("hide");
        } else {
          card.classList.add("hide");
        }
      });
    });
  });

  const testimonials = [
    {
      text: '"Lorem ipsum dolor sit amet consectetur. In id cursus nibh scelerisque. At leo urna velit neque molestie id tellus vitae."',
      img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      name: "Name 1",
      role: "CEO",
    },
    {
      text: '"Kristine managed to deliver our web project well ahead of schedule. The code quality and attention to detail are top-notch!"',
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      name: "George Maisuradze",
      role: "Project Manager",
    },
    {
      text: '"Extremely pleased with how accurately the Figma design was translated into clean, responsive HTML/CSS code. Highly recommended!"',
      img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
      name: "Nino Beridze",
      role: "Product Owner",
    },
    {
      text: '"Fast communication, high responsibility, and true professionalism! We will definitely work together on future projects."',
      img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      name: "David Kipiani",
      role: "CTO",
    },
  ];

  const testiText = document.getElementById("testiText");
  const testiImg = document.getElementById("testiImg");
  const testiName = document.getElementById("testiName");
  const testiRole = document.getElementById("testiRole");
  const dots = document.querySelectorAll(".slider-dots .dot");
  const testimonialCard = document.getElementById("testimonialCard");

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const index = parseInt(dot.getAttribute("data-index"));

      dots.forEach((d) => d.classList.remove("active"));
      dot.classList.add("active");

      if (testimonialCard) {
        testimonialCard.style.opacity = "0";

        setTimeout(() => {
          testiText.textContent = testimonials[index].text;
          testiImg.src = testimonials[index].img;
          testiName.textContent = testimonials[index].name;
          testiRole.textContent = testimonials[index].role;
          testimonialCard.style.opacity = "1";
        }, 300);
      }
    });
  });
  const contactForm = document.getElementById("contactForm");
  const modalBackdrop = document.getElementById("modalBackdrop");
  const modalClose = document.getElementById("modalClose");
  const modalBtn = document.getElementById("modalBtn");

  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const payload = {
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        website: document.getElementById("website").value.trim(),
        message: document.getElementById("message").value.trim(),
      };

      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          },
        );

        if (response.ok) {
          contactForm.reset();
          if (modalBackdrop) modalBackdrop.classList.add("show");
        }
      } catch (err) {
        console.error("Form submission error:", err);
      }
    });
  }

  function closeModal() {
    if (modalBackdrop) modalBackdrop.classList.remove("show");
  }

  if (modalClose) modalClose.addEventListener("click", closeModal);
  if (modalBtn) modalBtn.addEventListener("click", closeModal);
});
