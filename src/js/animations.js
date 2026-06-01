const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate-in");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".animate-on-scroll").forEach((el) => {
    observer.observe(el);
  });
});

document.addEventListener("click", (e) => {
  const target = e.target.closest('a[href^="#"]');
  if (target) {
    e.preventDefault();
    const id = target.getAttribute("href").slice(1);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      if (element.classList.contains("project-card")) {
        document.querySelectorAll(".project-card.highlight").forEach((card) => {
          card.classList.remove("highlight");
        });

        element.classList.add("highlight");

        setTimeout(() => {
          element.classList.remove("highlight");
        }, 2000);
      }
    }
  }
});
