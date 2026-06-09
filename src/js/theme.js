/**
 * Theme Toggle (Dark Mode)
 * - Respects system preference via prefers-color-scheme
 * - Allows manual override stored in localStorage
 * - Uses data-theme attribute on <html> for CSS token switching
 */

(function () {
  const STORAGE_KEY = "preferredTheme";
  const toggle = document.querySelector(".theme-toggle");

  function getSystemTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  function getStoredTheme() {
    return localStorage.getItem(STORAGE_KEY);
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
  }

  function toggleTheme() {
    const currentTheme =
      document.documentElement.getAttribute("data-theme") || getSystemTheme();
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    localStorage.setItem(STORAGE_KEY, newTheme);
    applyTheme(newTheme);
  }

  // Listen for system preference changes
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      // Only follow system if user hasn't manually chosen
      if (!getStoredTheme()) {
        applyTheme(e.matches ? "dark" : "light");
      }
    });

  // Bind click
  if (toggle) {
    toggle.addEventListener("click", toggleTheme);
  }
})();
