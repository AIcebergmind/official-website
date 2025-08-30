// Assicurati che GSAP + ScrollTrigger siano caricati prima
gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
  console.log("Blog Parallax Initialized");

  const cards = gsap.utils.toArray(".blog-article-card, .featured-card");
  if (!cards.length) return; // Se non ci sono card, esce

  /* ===============================
     PARALLAX SU ELEMENTI INTERNI
  =============================== */
  const parallaxConfig = [
    { selector: ".article-thumb, .featured-image", yPercent: -20 },
    { selector: ".article-title, .featured-title-coi", yPercent: -10 },
    { selector: ".article-excerpt, .featured-excerpt-coi", yPercent: -6 },
    { selector: ".article-meta, .featured-meta-coi", yPercent: -3 }
  ];

  parallaxConfig.forEach(({ selector, yPercent }) => {
    gsap.utils.toArray(selector).forEach(el => {
      gsap.to(el, {
        yPercent,
        ease: "none",
        scrollTrigger: {
          trigger: el.closest(".blog-article-card, .featured-card"),
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    });
  });

  /* ===============================
     FADE-IN CARD INTERE
  =============================== */
  cards.forEach((card, i) => {
    gsap.from(card, {
      opacity: 0,
      y: 40,
      scale: 0.95,
      duration: 0.8,
      ease: "power3.out",
      delay: i * 0.1,
      scrollTrigger: {
        trigger: card// Assicurati che GSAP + ScrollTrigger siano caricati prima
gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
  console.log("Blog Parallax Initialized");

  const featured = document.querySelector(".featured-card");
  const cards = gsap.utils.toArray(".blog-article-card");

  /* ===============================
     PARALLAX SU ELEMENTI INTERNI
  =============================== */
  const parallaxConfig = [
    { selector: ".article-thumb, .featured-image", yPercent: -20 },
    { selector: ".article-title, .featured-title-coi", yPercent: -10 },
    { selector: ".article-excerpt, .featured-excerpt-coi", yPercent: -6 },
    { selector: ".article-meta, .featured-meta-coi", yPercent: -3 }
  ];

  parallaxConfig.forEach(({ selector, yPercent }) => {
    gsap.utils.toArray(selector).forEach(el => {
      gsap.to(el, {
        yPercent,
        ease: "none",
        scrollTrigger: {
          trigger: el.closest(".blog-article-card, .featured-card"),
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    });
  });

  /* ===============================
     FADE-IN FEATURED CARD (solo una volta)
  =============================== */
  if (featured) {
    gsap.from(featured, {
      opacity: 0,
      y: 40,
      scale: 0.95,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: featured,
        start: "top 90%",
        toggleActions: "play none none none" // appare e resta
      }
    });
  }

  /* ===============================
     FADE-IN CARD NORMALI (anche reverse)
  =============================== */
  cards.forEach((card, i) => {
    gsap.from(card, {
      opacity: 0,
      y: 40,
      scale: 0.95,
      duration: 0.8,
      ease: "power3.out",
      delay: i * 0.1,
      scrollTrigger: {
        trigger: card,
        start: "top 90%",
        toggleActions: "play none none reverse" // reverse abilitato
      }
    });
  });

  /* ===============================
     FADE-IN ELEMENTI INTERNI
  =============================== */
  gsap.utils.toArray(
    ".article-title, .article-excerpt, .article-meta, .featured-title-coi, .featured-excerpt-coi, .featured-meta-coi"
  ).forEach((el, i) => {
    gsap.from(el, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "power2.out",
      delay: i * 0.05,
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none reverse"
      }
    });
  });
});

        start: "top 90%",
        toggleActions: "play none none none"
      }
    });
  });

  /* ===============================
     FADE-IN ELEMENTI INTERNI
  =============================== */
  gsap.utils.toArray(
    ".article-title, .article-excerpt, .article-meta, .featured-title-coi, .featured-excerpt-coi, .featured-meta-coi"
  ).forEach((el, i) => {
    gsap.from(el, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "power2.out",
      delay: i * 0.05,
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none reverse"
      }
    });
  });
});
