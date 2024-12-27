document.addEventListener("DOMContentLoaded", function () {
  const projectList = document.getElementById("project-list");

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
});
