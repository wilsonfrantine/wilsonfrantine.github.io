document.addEventListener("DOMContentLoaded", function () {
  /*******************************************
   * 1) Variáveis & Seletores principais
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
  };

  /*******************************************
   * 5) Carregar repositórios do GitHub
   *******************************************/
  fetch("https://api.github.com/users/wilsonfrantine/repos")
    .then((response) => response.json())
    .then((data) => {
      // Ordenar por data de update mais recente
      data.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
      // Montar cards dos repositórios
      data.forEach(async (repo) => {
        if (repo.name !== "wilsonfrantine.github.io") {
          const imageUrl = await fetchRepositoryImage(repo);
          const repoCard = createRepositoryDiv(repo, imageUrl);
          projectList.appendChild(repoCard);
        }
      });
    })
    .catch((error) => {
      console.error("Error fetching GitHub repos:", error);
    });

  // Função auxiliar para obter a imagem do repositório
  async function fetchRepositoryImage(repo) {
    const repoImages = {
      R101: "https://cdn-icons-png.flaticon.com/512/6062/6062646.png",
      arvoresuenp: "https://cdn-icons-png.flaticon.com/512/2913/2913520.png",
      ggrelated: "https://cdn-icons-png.flaticon.com/512/4871/4871208.png",
      lsma: "https://cdn-icons-png.flaticon.com/512/4773/4773801.png",
      ggbeast:
        "https://raw.githubusercontent.com/wilsonfrantine/ggbeast/ghpg/img/ggebsp.png",
      ggmodel: "https://cdn-icons-png.flaticon.com/512/2103/2103610.png",
      kviewer: "https://cdn-icons-png.flaticon.com/512/2994/2994311.png",
      ggDAPC:
        "https://raw.githubusercontent.com/wilsonfrantine/ggDAPC/main/images/comparison.png",
      mariorun: "https://cdn-icons-png.flaticon.com/512/1408/1408990.png",
      R4eco: "https://cdn-icons-png.flaticon.com/512/3723/3723449.png",
      ENM101: "https://cdn-icons-png.flaticon.com/512/5145/5145062.png",
      QuickAR: "https://cdn-icons-png.flaticon.com/512/6357/6357965.png",
      aves: "https://cdn-icons-png.flaticon.com/512/6363/6363577.png",
      nucleodrop: "https://cdn-icons-png.flaticon.com/512/620/620341.png",
      easygrade: "https://cdn-icons-png.flaticon.com/512/5231/5231964.png",
    };
    // Retorna a imagem específica ou um ícone padrão
    return (
      repoImages[repo.name] ||
      "https://cdn-icons-png.flaticon.com/512/9496/9496020.png"
    );
  }

  // Função auxiliar para criar o card (div) do repositório
  function createRepositoryDiv(repo, imageUrl) {
    const repositoryDiv = document.createElement("div");
    repositoryDiv.classList.add("repository");
    repositoryDiv.setAttribute("data-repo-name", repo.name.toLowerCase());

    // Clique no card -> abre o repo no GitHub
    repositoryDiv.addEventListener("click", () => {
      window.open(`https://github.com/wilsonfrantine/${repo.name}`, "_blank");
    });

    const img = document.createElement("img");
    img.src = imageUrl;
    img.alt = `Project icon for ${repo.name}`;

    const repoContent = document.createElement("div");
    repoContent.classList.add("repo-content");

    // Limita a descrição
    const description = repo.description
      ? repo.description.length > 60
        ? repo.description.slice(0, 60) + "..."
        : repo.description
      : "No description provided.";

    repoContent.innerHTML = `
        <h4>
          <a 
            href="https://github.com/wilsonfrantine/${repo.name}"
            target="_blank"
            rel="noopener noreferrer"
          >
            ${repo.name}
          </a>
        </h4>
        <p>${description}</p>
      `;

    repositoryDiv.appendChild(img);
    repositoryDiv.appendChild(repoContent);

    return repositoryDiv;
  }

  /*******************************************
   * 6) Filtro de projetos
   *******************************************/
  window.filterProjects = function () {
    const input = document.getElementById("projectSearch").value.toLowerCase();
    const repos = document.querySelectorAll(".repository");
    repos.forEach((repo) => {
      const repoName = repo.getAttribute("data-repo-name");
      repo.style.display = repoName.includes(input) ? "" : "none";
    });
  };

  /*******************************************
   * 7) Scroll horizontal nos projetos
   *******************************************/
  window.scrollProjects = function (val) {
    const projectListContainer = document.querySelector(".project-list");
    projectListContainer.scrollBy({ left: val, behavior: "smooth" });
  };

  /*******************************************
   * 8) ORCID - carregar publicações
   *******************************************/
  fetch(orcidUrl, { headers: { Accept: "application/json" } })
    .then((response) => response.json())
    .then((data) => {
      const works = data.group;
      works.forEach((workGroup) => {
        const workSummary = workGroup["work-summary"][0];
        const title = workSummary.title.title.value;
        const doi = workSummary["external-ids"]["external-id"].find(
          (id) => id["external-id-type"] === "doi"
        );
        const link = doi
          ? `https://doi.org/${doi["external-id-value"]}`
          : workSummary.url
            ? workSummary.url.value
            : "#";

        const pubItem = document.createElement("div");
        pubItem.classList.add("publication");
        pubItem.addEventListener("click", () => {
          window.open(link, "_blank");
        });

        pubItem.innerHTML = `
            <img
              src="https://cdn-icons-png.flaticon.com/512/3073/3073464.png"
              alt="Scientific document"
            />
            <p>${title}</p>
          `;
        researchList.appendChild(pubItem);
      });
    })
    .catch((error) => {
      console.error("Error fetching ORCID data:", error);
      researchList.innerHTML =
        "<p>Unable to load publications at this time.</p>";
    });

  // Botões de scroll horizontal nas publicações (ORCID)
  researchLeftButton.addEventListener("click", () => {
    researchListContainer.scrollBy({ left: -300, behavior: "smooth" });
  });
  researchRightButton.addEventListener("click", () => {
    researchListContainer.scrollBy({ left: 300, behavior: "smooth" });
  });

  /*******************************************
   * 9) Tradução (Language switcher)
   *******************************************/
  // Exibir/ocultar dropdown de idiomas
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

      // Troca de texto onde há data-i18n
      document.querySelectorAll("[data-i18n]").forEach((element) => {
        const key = element.getAttribute("data-i18n");
        if (data[key]) {
          element.innerHTML = data[key];
        }
      });

      // Troca de placeholder onde há data-i18n-placeholder
      document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
        const key = element.getAttribute("data-i18n-placeholder");
        if (data[key]) {
          element.placeholder = data[key];
        }
      });

      // Atualiza o texto do "currentLangElement" (ex: PT ou EN)
      currentLangElement.textContent = lang.toUpperCase();

      // Salva no localStorage (se for para salvar)
      if (save) {
        localStorage.setItem("selectedLang", lang);
      }

      // Fecha o dropdown após selecionar
      document.getElementById("lang-options").style.display = "none";
    } catch (error) {
      console.error("Erro ao carregar arquivo de tradução:", error);
    }
  }

  // Chama a tradução com a linguagem salva, sem sobrescrever no localStorage
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

 })


/*******************************************
* 12) Wipes to content
*******************************************/
document.addEventListener("DOMContentLoaded", async function () {
  await loadSocialData();

  const modal = document.getElementById("social-modal");

  document.querySelectorAll(".social-btn").forEach(button => {
    ['click', 'mouseover'].forEach(event => {
      button.addEventListener(event, function (e) {
        assignModal(button);  // Passa o botão inteiro, não apenas o id
      });
    });
  });
});

function assignModal(button) {
  event.preventDefault();
  event.stopPropagation();

  const modal = document.getElementById("social-modal");

  const platform = button.getAttribute("data-platform");
  const data = socialData[platform];

  if (data) {
    document.getElementById("modal-title").innerText = data.title;
    document.getElementById("modal-icon").src = data.icon || '';
    document.getElementById("modal-html").innerHTML = data.html || '';

    const rect = button.getBoundingClientRect();
    const scrollY = window.scrollY || window.scrollY;

    const modalWidth = modal.offsetWidth;
    const modalHeight = modal.offsetHeight;

    modal.style.left = `${rect.left + rect.width / 2 - modalWidth / 2}px`;
    modal.style.top = `${rect.top + scrollY - modalHeight - 15}px`;

    modal.classList.add("show");
  } else {
    window.open(button.getAttribute('data-link'), '_blank');  // Usa o data-link do botão
  }
}

// Fecha o modal ao clicar fora
document.addEventListener("click", function (e) {
  const modal = document.getElementById("social-modal");
  if (!modal.contains(e.target) && !e.target.classList.contains("social-btn")) {
    closeModal();
  }
});

function closeModal() {
  const modal = document.getElementById("social-modal");
  modal.classList.remove("show");
}

// Função para carregar dados sociais do JSON
async function loadSocialData() {
  try {
    const response = await fetch('src/socialData.json');
    socialData = await response.json();
  } catch (error) {
    console.error("Erro ao carregar socialData.json:", error);
  }
}


