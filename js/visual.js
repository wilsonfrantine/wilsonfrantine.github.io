document.addEventListener("DOMContentLoaded", function () {
  /*******************************************
   * 1) Variáveis & Seletores principais
   *******************************************/
  const header = document.querySelector("header");
  const navLinks = document.getElementById("nav-links");
  const backToTopBtn = document.querySelector(".back-to-top");
  const currentLangElement = document.getElementById("current-lang");
  const savedLang = localStorage.getItem("selectedLang") || "en";

  // ...existing code...

  /*******************************************
   * 2) Navbar: auto-hide e shrink ao rolar
   *******************************************/
  window.addEventListener("scroll", function () {
    const currentScroll =
      window.pageYOffset || document.documentElement.scrollTop;

    // Shrink effect (quando rola mais de 80px)
    if (currentScroll > 80) {
      header.classList.add("shrink");
    } else {
      header.classList.remove("shrink");
    }

    // Auto-hide navbar
    if (Math.abs(lastScrollTop - currentScroll) <= delta) {
      return;
    }
    if (currentScroll > lastScrollTop && currentScroll > navbarHeight) {
      // Rolando para baixo
      header.classList.add("nav-up");
    } else {
      // Rolando para cima
      header.classList.remove("nav-up");
    }
    lastScrollTop = currentScroll;

    // Mostrar / esconder botão "back-to-top"
    if (currentScroll > 400) {
      backToTopBtn.classList.add("show");
    } else {
      backToTopBtn.classList.remove("show");
    }

    if (navLinks.classList.contains("active")) {
      toggleMenu();
    }
  });

  // Mostrar a barra de navegação quando o mouse está próximo ao topo
  window.addEventListener("mousemove", function (event) {
    if (event.clientY <= 50) {
      header.classList.remove("nav-up");
    }
  });

  /*******************************************
   * 3) Voltar ao topo suavemente
   *******************************************/
  window.scrollToTop = function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /*******************************************
   * 4) Menu mobile toggle
   *******************************************/
  window.toggleMenu = function () {
    const expanded = navLinks.getAttribute("aria-expanded") === "true";
    navLinks.classList.toggle("active");
    navLinks.setAttribute("aria-expanded", !expanded);
    document.querySelector(".hamburger").classList.toggle("active"); // Toggle hamburger icon
    header.style.height = expanded ? "5%" : "100%"; // Adjust header height
    header.style.transition = "height 0.4s ease"; // Add smooth transition
  };

  // Close menu when clicking outside or scrolling
  document.addEventListener("click", function (event) {
    if (!event.target.closest("header") && navLinks.classList.contains("active")) {
      toggleMenu();
    }
  });

  /*******************************************
   * 7) Scroll horizontal nos projetos
   *******************************************/
  window.scrollProjects = function (val) {
    const projectListContainer = document.querySelector(".project-list");
    projectListContainer.scrollBy({ left: val, behavior: "smooth" });
  };

  /*******************************************
  * 10) Dark mode toggle (com transição suave)
  *******************************************/
  const savedTheme = localStorage.getItem("theme") || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);

  const themeIcon = document.querySelector(".theme-toggle i");
  themeIcon.className = savedTheme === "light" ? "fas fa-sun" : "fas fa-moon";

  document.querySelector(".theme-toggle").addEventListener("click", toggleTheme);

  function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute("data-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";

    // Cria uma camada de transição
    const transitionOverlay = document.createElement('div');
    transitionOverlay.className = 'theme-transition';
    document.body.appendChild(transitionOverlay);

    // Ativa o fade-in da camada
    requestAnimationFrame(() => {
      transitionOverlay.style.opacity = '1';
    });

    // Após a transição, muda o tema e remove a camada
    setTimeout(() => {
      html.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);

      // Atualiza o ícone
      themeIcon.className = newTheme === "light" ? "fas fa-sun" : "fas fa-moon";

      // Faz o fade-out
      transitionOverlay.style.opacity = '0';
      setTimeout(() => {
        document.body.removeChild(transitionOverlay);
      }, 500);  // Duração do fade-out
    }, 300);  // Duração do fade-in
  }

  /*******************************************
  * 11) Muda páginas suavemente ao clicar no menu
  *******************************************/
  const sections = document.querySelectorAll('section');
  let currentIndex = 0;  // Índice da seção atual
  let isScrolling = false;

  // Detecta a rolagem
  window.addEventListener('wheel', (event) => {
    if (isScrolling) return;  // Evita múltiplas ativações
    
    if (event.deltaY > 1) {
      // Rolar para baixo
      if (currentIndex < sections.length - 1) {
        currentIndex++;
      }
    } else {
      // Rolar para cima
      if (currentIndex > 0) {
        currentIndex--;
      }
    }

    scrollToSection();
  });

  // Função para rolar suavemente até a seção atual
  function scrollToSection() {
    isScrolling = true;
    window.scrollTo({
      top: sections[currentIndex].offsetTop,
      behavior: 'smooth'
    });

    // Aguarda a rolagem terminar antes de permitir outro scroll
    setTimeout(() => {
      isScrolling = false;
    }, 800);  // Ajuste o tempo conforme necessário
  }

  // Atualiza o índice da seção atual ao clicar nos links de navegação
  document.querySelectorAll('.nav-links a').forEach((link, index) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      currentIndex = index;
      scrollToSection();
    });
  });
});
