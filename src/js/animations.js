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

  // Magnetic button effect
  initMagneticButtons();

  // Cursor glow effect
  initCursorGlow();

  // Floating code symbols
  initFloatingSymbols();

  // Staggered card animations
  initStaggeredAnimations();
});

// Magnetic button effect
function initMagneticButtons() {
  const buttons = document.querySelectorAll(".btn, .social-link");

  buttons.forEach((button) => {
    button.addEventListener("mousemove", (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      const distance = Math.sqrt(x * x + y * y);
      const maxDistance = Math.max(rect.width, rect.height) / 2;

      if (distance < maxDistance * 1.5) {
        const moveX = (x / maxDistance) * 10;
        const moveY = (y / maxDistance) * 10;
        button.style.transform = `translate(${moveX}px, ${moveY}px)`;
      }
    });

    button.addEventListener("mouseleave", () => {
      button.style.transform = "";
    });
  });
}

// Cursor glow effect
function initCursorGlow() {
  const cursorGlow = document.createElement("div");
  cursorGlow.className = "cursor-glow";
  document.body.appendChild(cursorGlow);

  let mouseX = 0,
    mouseY = 0;
  let glowX = 0,
    glowY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateGlow() {
    glowX += (mouseX - glowX) * 0.1;
    glowY += (mouseY - glowY) * 0.1;

    cursorGlow.style.left = glowX + "px";
    cursorGlow.style.top = glowY + "px";

    requestAnimationFrame(animateGlow);
  }

  animateGlow();
}

// Floating code symbols
function initFloatingSymbols() {
  const hero = document.querySelector(".hero");
  if (!hero) return;

  const symbols = ["</", "/>", "{", "}", "( )", "[ ]", "=>", "< >"];
  const colors = ["var(--color-primary)", "var(--color-secondary)", "var(--color-accent)"];

  for (let i = 0; i < 15; i++) {
    const symbol = document.createElement("div");
    symbol.className = "floating-symbol";
    symbol.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    symbol.style.left = Math.random() * 100 + "%";
    symbol.style.top = Math.random() * 100 + "%";
    symbol.style.color = colors[Math.floor(Math.random() * colors.length)];
    symbol.style.animationDelay = Math.random() * 5 + "s";
    symbol.style.animationDuration = 10 + Math.random() * 10 + "s";
    hero.appendChild(symbol);
  }
}

// Staggered animations for cards
function initStaggeredAnimations() {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
  });
}

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

// Ripple effect for buttons
document.addEventListener("click", (e) => {
  const button = e.target.closest(".btn");
  if (button) {
    const ripple = document.createElement("span");
    ripple.className = "ripple";
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";

    button.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  }
});
