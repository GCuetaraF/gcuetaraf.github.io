// Language management
let currentLang = localStorage.getItem("preferredLanguage") || "en";

// Set current language on page load
document.documentElement.setAttribute("lang", currentLang);

// Update UI based on current language
function updateLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("preferredLanguage", lang);
  document.documentElement.setAttribute("lang", lang);

  // Update all elements with data-lang-* attributes
  document.querySelectorAll("[data-lang-en], [data-lang-es]").forEach((el) => {
    const content = el.getAttribute(`data-lang-${lang}`);
    if (content) {
      el.textContent = content;
    }
  });

  // Update HTML content with data-html-lang-* attributes
  document.querySelectorAll("[data-html-lang-en], [data-html-lang-es]").forEach((el) => {
    const content = el.getAttribute(`data-html-lang-${lang}`);
    if (content) {
      el.innerHTML = content;
    }
  });

  // Update active state on language switcher
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });

  // Show/hide language-specific sections
  document.querySelectorAll("[lang]").forEach((el) => {
    if (el !== document.documentElement) {
      el.style.display = el.getAttribute("lang") === lang ? "" : "none";
    }
  });
}

// Update language with view transition
function updateLanguageWithTransition(lang) {
  // Check if View Transitions API is supported
  if (!document.startViewTransition) {
    updateLanguage(lang);
    return;
  }

  // Start view transition
  document.startViewTransition(() => {
    updateLanguage(lang);
  });
}

// Initialize language on page load
updateLanguage(currentLang);

// Language switcher event listeners
document.addEventListener("DOMContentLoaded", () => {
  const languageSwitcher = document.getElementById("languageSwitcher");

  if (languageSwitcher) {
    languageSwitcher.addEventListener("click", (e) => {
      if (e.target.classList.contains("lang-btn")) {
        const newLang = e.target.dataset.lang;
        updateLanguageWithTransition(newLang);
      }
    });
  }
});
