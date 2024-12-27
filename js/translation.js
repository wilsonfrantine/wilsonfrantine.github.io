document.addEventListener("DOMContentLoaded", function () {
  const translations = {
    "pt": "lang/pt.json",
    "en": "lang/en.json",
    "es": "lang/es.json",
    "fr": "lang/fr.json",
    "ja": "lang/ja.json"
  };
  const currentLangElement = document.getElementById("current-lang");
  const savedLang = localStorage.getItem("selectedLang") || "en";

  document.getElementById("translate-link").addEventListener("click", toggleDropdown);
  document
    .querySelectorAll(".dropdown-menu li")
    .forEach((item) =>
      item.addEventListener("click", function () {
        const selectedLang = this.getAttribute("data-lang");
        setLanguage(selectedLang);
      })
    );

  async function setLanguage(lang, save = true) {
    const langFile = translations[lang];
    try {
      const response = await fetch(langFile);
      const data = await response.json();

      document.querySelectorAll("[data-i18n]").forEach((element) => {
        const key = element.getAttribute("data-i18n");
        if (data[key]) {
          element.innerHTML = data[key];
        }
      });

      document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
        const key = element.getAttribute("data-i18n-placeholder");
        if (data[key]) {
          element.placeholder = data[key];
        }
      });

      currentLangElement.textContent = lang.toUpperCase();

      if (save) {
        localStorage.setItem("selectedLang", lang);
      }

      document.getElementById("lang-options").style.display = "none";
    } catch (error) {
      console.error("Erro ao carregar arquivo de tradução:", error);
    }
  }

  setLanguage(savedLang, false);

  function toggleDropdown(event) {
    event.preventDefault();
    const dropdown = document.getElementById("lang-options");
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
    document.addEventListener("click", closeDropdownOutside);
  }

  function closeDropdownOutside(event) {
    if (!event.target.closest(".dropdown")) {
      document.getElementById("lang-options").style.display = "none";
      document.removeEventListener("click", closeDropdownOutside);
    }
  }
});
