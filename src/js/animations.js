/* ============================================
   MINIMAL INTERACTIONS
   Smooth scroll + scroll-triggered reveal animations.
   All visual motion is handled by CSS transitions.
   Respects prefers-reduced-motion.
   ============================================ */

// Smooth scroll for anchor navigation
document.addEventListener(
  "click",
  (e) => {
    const target = e.target.closest('a[href^="#"]');
    if (target) {
      e.preventDefault();
      const id = target.getAttribute("href").slice(1);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  },
  { passive: false },
);

// Scroll-triggered fade-in animations
(function () {
  // Respect reduced motion preference
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  if (prefersReducedMotion) return;

  const revealElements = document.querySelectorAll(
    ".section, .project-featured, .project-card, .experience-card, .article-row, .testimonial-card",
  );

  if (!revealElements.length) return;

  // Add initial hidden state
  revealElements.forEach((el) => {
    el.classList.add("reveal");
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal--visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    },
  );

  revealElements.forEach((el) => observer.observe(el));
})();
