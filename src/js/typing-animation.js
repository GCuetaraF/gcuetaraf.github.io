/* ============================================
   TYPING ANIMATION
   Cycles through hero accent phrases with a typing effect.
   Respects prefers-reduced-motion.
   ============================================ */

(function () {
  // Respect reduced motion preference
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  const typingElement = document.querySelector(".hero__typing-text");
  if (!typingElement) return;

  // Get the current language
  const getCurrentLanguage = () => {
    return document.documentElement.getAttribute("lang") || "en";
  };

  // Get phrases from data attribute based on current language
  const getPhrases = () => {
    const lang = getCurrentLanguage();
    const dataAttr = `data-lang-${lang}`;
    const phrasesString = typingElement.getAttribute(dataAttr);
    return phrasesString ? phrasesString.split("|") : [];
  };

  let phrases = getPhrases();
  if (!phrases.length) return;

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = prefersReducedMotion ? 0 : 100;
  let deletingSpeed = prefersReducedMotion ? 0 : 50;
  let pauseAfterTyping = prefersReducedMotion ? 0 : 2000;
  let pauseAfterDeleting = prefersReducedMotion ? 0 : 500;
  let typingTimeout = null;

  // If reduced motion is preferred, just show all phrases instantly without animation
  if (prefersReducedMotion) {
    typingElement.textContent = phrases[0];
    return;
  }

  function type() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      // Delete one character
      typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingTimeout = setTimeout(type, pauseAfterDeleting);
        return;
      }
    } else {
      // Type one character
      typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;

      if (charIndex === currentPhrase.length) {
        isDeleting = true;
        typingTimeout = setTimeout(type, pauseAfterTyping);
        return;
      }
    }

    typingTimeout = setTimeout(type, isDeleting ? deletingSpeed : typingSpeed);
  }

  // Start typing animation
  typingTimeout = setTimeout(type, 500);

  // Watch for language changes using MutationObserver
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === "attributes" && mutation.attributeName === "lang") {
        // Clear current animation
        if (typingTimeout) {
          clearTimeout(typingTimeout);
        }

        // Reset and restart with new language
        phrases = getPhrases();
        if (phrases.length) {
          phraseIndex = 0;
          charIndex = 0;
          isDeleting = false;
          typingElement.textContent = "";
          typingTimeout = setTimeout(type, 500);
        }
      }
    });
  });

  // Observe language changes on the html element
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["lang"],
  });
})();
