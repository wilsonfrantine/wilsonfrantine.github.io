document.addEventListener("DOMContentLoaded", function() {
    const projectList = document.getElementById("project-list");

    fetch("https://api.github.com/users/wilsonfrantine/repos")
        .then(response => response.json())
        .then(data => {
            data.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

            data.forEach(async repo => {
                if (repo.name !== "wilsonfrantine.github.io") {
                    const imageUrl = await fetchRepositoryImage(repo);
                    const repositoryDiv = createRepositoryDiv(repo, imageUrl);
                    projectList.appendChild(repositoryDiv);
                }
            });
        })
        .catch(error => {
            console.error("Erro ao buscar repositórios do GitHub:", error);
        });

    async function fetchRepositoryImage(repo) {
        const repoImages = {
            "R101": "https://cdn-icons-png.flaticon.com/512/6062/6062646.png",
            "arvoresuenp": "https://cdn-icons-png.flaticon.com/512/2913/2913520.png",
            "ggrelated": "https://cdn-icons-png.flaticon.com/512/4871/4871208.png",
            "lsma": "https://cdn-icons-png.flaticon.com/512/4773/4773801.png",
            "ggbeast": "https://raw.githubusercontent.com/wilsonfrantine/ggbeast/ghpg/img/ggebsp.png",
            "ggmodel": "https://cdn-icons-png.flaticon.com/512/2103/2103610.png",
            "kviewer": "https://cdn-icons-png.flaticon.com/512/2994/2994311.png",
            "ggDAPC": "https://raw.githubusercontent.com/wilsonfrantine/ggDAPC/main/images/comparison.png",
            "mariorun": "https://cdn-icons-png.flaticon.com/512/1408/1408990.png",
            "R4eco": "https://cdn-icons-png.flaticon.com/512/3723/3723449.png",
            "ENM101": "https://cdn-icons-png.flaticon.com/512/5145/5145062.png",
            "QuickAR": "https://cdn-icons-png.flaticon.com/512/6357/6357965.png",
            "aves": "https://cdn-icons-png.flaticon.com/512/6363/6363577.png",
            "nucleodrop": "https://cdn-icons-png.flaticon.com/512/620/620341.png",
            "easygrade": "https://cdn-icons-png.flaticon.com/512/5231/5231964.png"
        };

        return repoImages[repo.name] || "https://cdn-icons-png.flaticon.com/512/9496/9496020.png";
    }

    function createRepositoryDiv(repo, imageUrl) {
        const repositoryDiv = document.createElement("div");
        repositoryDiv.classList.add("repository");
        repositoryDiv.style.cursor = "pointer";
        repositoryDiv.addEventListener("click", () => {
            window.location.href = `https://wilsonfrantine.github.io/${repo.name}`;
        });

        const image = document.createElement("img");
        image.src = imageUrl;
        image.alt = "Repository Image";

        const repoContentDiv = document.createElement("div");
        repoContentDiv.classList.add("repo-content");

        const { name, description } = repo;
        appendChildren(repoContentDiv, [createHeading(name), createParagraph(description || "No description provided.")]);

        appendChildren(repositoryDiv, [image, repoContentDiv]);
        return repositoryDiv;
    }

    function createHeading(text) {
        const heading = document.createElement("h3");
        heading.textContent = text;
        return heading;
    }

    function createParagraph(text) {
        const paragraph = document.createElement("p");
        paragraph.textContent = text;
        return paragraph;
    }

    function appendChildren(parent, children) {
        children.forEach(child => {
            parent.appendChild(child);
        });
    }
});
