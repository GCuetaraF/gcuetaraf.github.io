let currentLang = localStorage.getItem("preferredLanguage") || "en";

// If we're on a blog post page, use the page's language instead
const pageType = document.body.dataset.pageType;
const blogLang = document.body.dataset.blogLang;
if (pageType === "blog-post" && blogLang) {
  currentLang = blogLang;
}

document.documentElement.setAttribute("lang", currentLang);

// Cache DOM queries for better performance
let cachedElements = null;

function cacheLanguageElements() {
  if (cachedElements) return cachedElements;

  cachedElements = {
    textElements: document.querySelectorAll("[data-lang-en], [data-lang-es]"),
    htmlElements: document.querySelectorAll("[data-html-lang-en], [data-html-lang-es]"),
    langButtons: document.querySelectorAll(".lang-btn"),
    langElements: Array.from(document.querySelectorAll("[lang]")).filter((el) => el !== document.documentElement),
    blogCards: document.querySelectorAll(".blog-card[data-lang]"),
  };

  return cachedElements;
}

function updateLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("preferredLanguage", lang);
  document.documentElement.setAttribute("lang", lang);

  const elements = cacheLanguageElements();

  // Batch DOM updates
  requestAnimationFrame(() => {
    elements.textElements.forEach((el) => {
      const content = el.getAttribute(`data-lang-${lang}`);
      if (content) {
        el.textContent = content;
      }
    });

    elements.htmlElements.forEach((el) => {
      const content = el.getAttribute(`data-html-lang-${lang}`);
      if (content) {
        el.innerHTML = content;
      }
    });

    elements.langButtons.forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.lang === lang);
    });

    elements.langElements.forEach((el) => {
      el.style.display = el.getAttribute("lang") === lang ? "" : "none";
    });

    elements.blogCards.forEach((card) => {
      card.style.display = card.getAttribute("data-lang") === lang ? "" : "none";
    });
  });
}

function updateLanguageWithTransition(lang) {
  // Check if we're on a blog post page
  const pageType = document.body.dataset.pageType;
  const blogSlug = document.body.dataset.blogSlug;
  const currentLang = document.body.dataset.blogLang;

  if (pageType === "blog-post" && blogSlug) {
    // Navigate to the alternate language version of the blog post
    if (lang === "es" && currentLang === "en") {
      window.location.href = `/blog/${blogSlug}/es/`;
      return;
    } else if (lang === "en" && currentLang === "es") {
      window.location.href = `/blog/${blogSlug}/`;
      return;
    }
  }

  // Regular language switching for non-blog pages
  if (!document.startViewTransition) {
    updateLanguage(lang);
    return;
  }

  document.startViewTransition(() => {
    updateLanguage(lang);
  });
}

updateLanguage(currentLang);

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

  // CV Download button functionality
  const downloadCvBtn = document.getElementById("downloadCvBtn");
  if (downloadCvBtn) {
    downloadCvBtn.addEventListener("click", () => {
      const cvFile = currentLang === "es" ? "curriculum-es.pdf" : "curriculum-en.pdf";
      const cvPath = `/assets/${cvFile}`;

      // Create a temporary link and trigger download
      const link = document.createElement("a");
      link.href = cvPath;
      link.download = cvFile;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }
});
