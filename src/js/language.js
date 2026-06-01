let currentLang = localStorage.getItem("preferredLanguage") || "en";

document.documentElement.setAttribute("lang", currentLang);

function updateLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("preferredLanguage", lang);
  document.documentElement.setAttribute("lang", lang);

  document.querySelectorAll("[data-lang-en], [data-lang-es]").forEach((el) => {
    const content = el.getAttribute(`data-lang-${lang}`);
    if (content) {
      el.textContent = content;
    }
  });

  document.querySelectorAll("[data-html-lang-en], [data-html-lang-es]").forEach((el) => {
    const content = el.getAttribute(`data-html-lang-${lang}`);
    if (content) {
      el.innerHTML = content;
    }
  });

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });

  document.querySelectorAll("[lang]").forEach((el) => {
    if (el !== document.documentElement) {
      el.style.display = el.getAttribute("lang") === lang ? "" : "none";
    }
  });
}

function updateLanguageWithTransition(lang) {
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
