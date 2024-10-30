document.addEventListener("DOMContentLoaded", function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop,
                    behavior: "smooth"
                });
            }
        });
    });

    // Open external links in a new tab
    document.querySelectorAll('a').forEach(link => {
        const url = new URL(link.href);
        if (url.hostname !== window.location.hostname) {
            link.setAttribute("target", "_blank");
            link.setAttribute("rel", "noopener noreferrer"); // Security measure for external links
        }
    });

    // Fetch and display GitHub repositories
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
                // Add additional project icons here if needed
            };
        
            return repoImages[repo.name] || "https://cdn-icons-png.flaticon.com/512/9496/9496020.png";
        }
        

    function createRepositoryDiv(repo, imageUrl) {
        const repositoryDiv = document.createElement("div");
        repositoryDiv.classList.add("repository");
        repositoryDiv.style.cursor = "pointer";
        repositoryDiv.addEventListener("click", () => {
            window.open(`https://github.com/wilsonfrantine/${repo.name}`, "_blank");
        });

        const image = document.createElement("img");
        image.src = imageUrl;
        image.alt = "Repository Image";

        const repoContentDiv = document.createElement("div");
        repoContentDiv.classList.add("repo-content");

        const { name, description } = repo;
        repoContentDiv.innerHTML = `
            <h3><a href="https://github.com/wilsonfrantine/${repo.name}" target="_blank" rel="noopener noreferrer">${name}</a></h3>
            <p>${description || "No description provided."}</p>
        `;

        repositoryDiv.appendChild(image);
        repositoryDiv.appendChild(repoContentDiv);
        return repositoryDiv;
    }

    // Fetch and display ORCID publications
    const orcidId = "0000-0002-4293-0471"; // Replace with your ORCID iD
    const apiUrl = `https://pub.orcid.org/v3.0/${orcidId}/works`;

    fetch(apiUrl, {
        headers: {
            "Accept": "application/json"
        }
    })
    .then(response => response.json())
    .then(data => {
        const works = data.group;
        const researchList = document.getElementById("research-list");

        works.forEach(workGroup => {
            const workSummary = workGroup["work-summary"][0];
            const title = workSummary.title.title.value;
            const doi = workSummary["external-ids"]["external-id"].find(id => id["external-id-type"] === "doi");
            const link = doi ? `https://doi.org/${doi["external-id-value"]}` : workSummary.url ? workSummary.url.value : "#";

            // Create publication card with clickable link
            const pubItem = document.createElement("div");
            pubItem.classList.add("publication");
            pubItem.style.cursor = "pointer";
            pubItem.addEventListener("click", () => {
                window.open(link, "_blank");
            });
            pubItem.innerHTML = `
                <img src="https://cdn-icons-png.flaticon.com/512/3073/3073464.png" alt="Document Icon">
                <h4>${title}</h4>
            `;
            
            researchList.appendChild(pubItem);
        });
    })
    .catch(error => {
        console.error("Error fetching ORCID data:", error);
        document.getElementById("research-list").innerHTML = "<p>Unable to load publications at this time.</p>";
    });

    // Scroll buttons functionality for research section
    const scrollAmount = 300;
    const scrollLeftButton = document.querySelector(".scroll-left");
    const scrollRightButton = document.querySelector(".scroll-right");
    const researchListContainer = document.querySelector(".research-list");

    scrollLeftButton.addEventListener("click", () => {
        researchListContainer.scrollBy({
            left: -scrollAmount,
            behavior: "smooth"
        });
    });

    scrollRightButton.addEventListener("click", () => {
        researchListContainer.scrollBy({
            left: scrollAmount,
            behavior: "smooth"
        });
    });
});
