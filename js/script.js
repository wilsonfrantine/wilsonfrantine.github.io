import { visual, githubIntegration, publications, translation } from './main.js';

document.addEventListener("DOMContentLoaded", function () {
  /*******************************************
   * Variáveis & Seletores principais
   *******************************************/
  const header = document.querySelector("header");
  const navLinks = document.getElementById("nav-links");
  const backToTopBtn = document.querySelector(".back-to-top");
  const projectList = document.getElementById("project-list");
  const researchList = document.getElementById("research-list");
  const researchListContainer = document.querySelector(".research-list");
  const researchLeftButton = document.getElementById("researchLeft");
  const researchRightButton = document.getElementById("researchRight");

  // Configurações de navbar
  let lastScrollTop = 0;
  const delta = 5; // threshold para detectar scroll leve
  const navbarHeight = header.offsetHeight;

  // Configurações de ORCID
  const orcidId = "0000-0002-4293-0471";
  const orcidUrl = `https://pub.orcid.org/v3.0/${orcidId}/works`;

  // Configurações de Tradução
  const translations = {
    "pt": "lang/pt.json",
    "en": "lang/en.json",
    "es": "lang/es.json",
    "fr": "lang/fr.json",
    "ja": "lang/ja.json"
  };
  const currentLangElement = document.getElementById("current-lang");
  const savedLang = localStorage.getItem("selectedLang") || "en";

  function moveCarousel(direction) {
    const carousel = document.querySelector('.carousel');
    const items = carousel.querySelectorAll('.carousel-item');
    const itemWidth = items[0].offsetWidth;
    const currentScroll = carousel.scrollLeft;
    const newScroll = currentScroll + (direction * itemWidth);
    carousel.scrollTo({ left: newScroll, behavior: 'smooth' });
  }
});