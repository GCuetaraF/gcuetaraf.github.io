function copyToClipboard(text, button) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      const originalText = button.textContent;
      const originalHTML = button.innerHTML;

      button.innerHTML = '<span data-lang-en="Copied!" data-lang-es="¡Copiado!">Copied!</span>';
      button.classList.add("copied");

      const lang = document.documentElement.getAttribute("lang") || "en";
      const copiedText = lang === "es" ? "¡Copiado!" : "Copied!";
      button.querySelector("span").textContent = copiedText;

      setTimeout(() => {
        button.innerHTML = originalHTML;
        button.classList.remove("copied");
      }, 2000);
    })
    .catch((err) => {
      console.error("Failed to copy:", err);
    });
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-copy]").forEach((button) => {
    button.addEventListener("click", () => {
      const textToCopy = button.getAttribute("data-copy");
      copyToClipboard(textToCopy, button);
    });
  });
});
