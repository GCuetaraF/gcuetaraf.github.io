// Console message for curious developers
console.log("%c👋 Hey there, fellow developer!", "color: #10b981; font-size: 16px; font-weight: bold;");
console.log(
  "%cIf you're reading this, you care about the details. Let's connect!\n\n" +
    "📧 garycuetara@gmail.com\n" +
    "💼 linkedin.com/in/gabrielcuetara\n" +
    "🐙 github.com/gcuetaraf\n\n" +
    "Built with: Eleventy, vanilla JS, and a lot of ☕\n\n" +
    "💡 Try typing help() in the console!",
  "color: #d1d5db; font-size: 12px; line-height: 1.6;",
);

// Interactive console commands
window.help = function () {
  console.log("%cAvailable Commands:", "color: #10b981; font-size: 14px; font-weight: bold; margin-top: 10px;");
  console.log(
    "%c" +
      "  skills()    - View my technical skills\n" +
      "  projects()  - Check out my projects\n" +
      "  contact()   - Get my contact info\n" +
      "  coffee()    - My current caffeine level\n" +
      "  secret()    - Find the hidden message",
    "color: #d1d5db; font-size: 12px; line-height: 1.8; font-family: monospace;",
  );
};

window.skills = function () {
  console.log("%cTech Stack:", "color: #10b981; font-size: 14px; font-weight: bold;");
  console.log(
    "%c" +
      "Frontend:\n" +
      "  • React / React Native\n" +
      "  • TypeScript / JavaScript\n" +
      "  • Next.js / Eleventy\n" +
      "  • Tailwind CSS\n\n" +
      "Backend:\n" +
      "  • Node.js\n" +
      "  • REST APIs\n" +
      "  • Database integration\n\n" +
      "Tools:\n" +
      "  • Git\n" +
      "  • Docker\n" +
      "  • CI/CD",
    "color: #d1d5db; font-size: 12px; line-height: 1.8;",
  );
};

window.projects = function () {
  console.log("%cFeatured Projects:", "color: #10b981; font-size: 14px; font-weight: bold;");
  console.log(
    "%cCheck them out at: https://github.com/gcuetaraf\n\n" +
      "🚀 Building web experiences that matter\n" +
      "🔧 From concept to deployment\n" +
      "💡 Always learning, always improving",
    "color: #d1d5db; font-size: 12px; line-height: 1.8;",
  );
};

window.contact = function () {
  console.log("%cLet's Connect!", "color: #10b981; font-size: 14px; font-weight: bold;");
  console.log(
    "%c" +
      "📧 Email:    garycuetara@gmail.com\n" +
      "💼 LinkedIn: linkedin.com/in/gabrielcuetara\n" +
      "🐙 GitHub:   github.com/gcuetaraf\n\n" +
      "I'm always open to interesting projects and collaborations!",
    "color: #d1d5db; font-size: 12px; line-height: 1.8;",
  );
};

window.coffee = function () {
  const levels = [
    "☕ Running on fumes... need coffee ASAP",
    "☕☕ Getting started, one cup down",
    "☕☕☕ In the zone! Perfect caffeine levels",
    "☕☕☕☕ Fully charged and ready to code",
    "☕☕☕☕☕ Maximum overdrive! 🚀",
  ];
  const level = Math.floor(Math.random() * levels.length);
  console.log("%c" + levels[level], "color: #d1d5db; font-size: 12px;");
};

window.secret = function () {
  console.log("%c🎉 You found the secret!", "color: #10b981; font-size: 14px; font-weight: bold;");
  console.log(
    "%c" +
      "The best developers are those who never stop learning.\n" +
      "Keep exploring, keep building, keep growing.\n\n" +
      "- Gabriel",
    "color: #d1d5db; font-size: 12px; line-height: 1.8; font-style: italic;",
  );
};
