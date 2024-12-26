// 1. Carrega dados das redes sociais do JSON
export async function loadSocialData(url = './src/social-data.json') {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Erro ao carregar dados sociais');
        const socialData = await response.json();
        return socialData;  // Retorna os dados carregados
    } catch (error) {
        console.error("Erro ao carregar social-data.json:", url, error);
        return {};  // Retorna objeto vazio em caso de erro
    }
}

// 2. Renderização Modularizada por Rede Social
function renderTwitter(data) {
    document.getElementById("modal-icon").src = data.icon;
    document.getElementById("modal-title").innerText = data.title;
    return `
        <div class="username">${data.username}</div>
        <div class="profile-bio">${data.bio}</div>
        <div class="additional-info">${data.location + "<br/>" + data.joined}</div>
    `;
}

function renderGoogleScholar(data) {
    document.getElementById("modal-icon").src = data.icon;
    document.getElementById("modal-title").innerText = data.title;
    const baseYear = data.base_year || 2017;

    // Create the bar chart data
    const chartData = data.citations_by_year.map((citations, index) => {
        return { year: baseYear + index, citations: citations };
    });

    // Generate the bar chart HTML
    const chartBars = chartData.map(item => {
        return `<div class="bar" style="height: ${item.citations}px;" title="${item.year}: ${item.citations} citations"></div>`;
    }).join('');

    // Generate the years HTML
    const chartYears = chartData.map(item => {
        return `<div class="year">${item.year}</div>`;
    }).join('');

    return `
        <div class="username">${data.username}</div>
        <div class="additional-info">
            <div style="display: flex; justify-content: space-around; margin-bottom: 1rem;">
                <b>Citations: ${data.citations}</b>
                <b>h-index: ${data.h_index}</b>
                <b>i10-index: ${data.i10_index}</b>
            </div>
            <div>
                <div class="chart-container">
                    <div class="chart-bars">
                        ${chartBars}
                    </div>
                    <div class="chart-years">
                        ${chartYears}
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderResearchGate(data) {
    document.getElementById("modal-icon").src = data.icon;
    document.getElementById("modal-title").innerText = data.title;
    return `
        <div class="username">${data.username}</div>
        <div class="profile-bio">${data.bio}</div>
        <div class="additional-info" style="text-align: center; display: flex; justify-content: space-around;">
        <div><h4>${data.reads}      </h4>Reads</div>
        <div><h4>${data.citations}  </h4>Citations</div>
        <div><h4>${data.ri_score}   </h4>R.I. score</div>
        <div><h4>${data.recomendations}   </h4>Recomm.</div>
        </div>
    `;
}

// Função de renderização para Instagram
function renderInstagram(data) {
    document.getElementById("modal-icon").src = data.icon;
    document.getElementById("modal-title").innerText = data.title;
    let followers = "👥 Followers: " + data.followers;
    let following = "➡️ Following: " + data.following;
    let posts = "📸 Posts: " + data.posts;
    let additional_info = `${followers} <br /> ${following} <br /> ${posts}`;
    return `
        <div class="username">${data.username}</div>
        <div class="profile-bio">${data.bio}</div>
        <div class="additional-info">${additional_info}</div>
    `;
}

// Função de renderização para ORCID
function renderORCID(data) {
    document.getElementById("modal-icon").src = data.icon;
    document.getElementById("modal-title").innerText = data.title;
    return `
        <div class="username">${data.username}</div>
        <div class="username"><a href=${data.link} target="_blank" style="font-size: 1.3em">${data.id}</a></div>
        <div class="profile-bio">${data.bio}</div>
    `;
}

// Função de renderização para GitHub
function renderGitHub(data) {
    document.getElementById("modal-icon").src = data.icon;
    document.getElementById("modal-title").innerText = data.title;
    return `
        <div class="username">${data.username}</div>
        <div class="profile-bio">${data.bio}</div>
        <div class="additional-info">💻 Repositories: ${data.repos}</div>
        <div class="additional-info">👥 Commits: ${data.commits}</div>
        <div class="additional-info">➡️ Languages: ${data.languages}</div>
    `;
}

// 3. Mapeamento de Renderização
const socialRenderers = {
    twitter: renderTwitter,
    scholar: renderGoogleScholar,
    researchgate: renderResearchGate,
    instagram: renderInstagram,
    orcid: renderORCID,
    github: renderGitHub
};

// 4. Exibe o Modal com Base nos Dados
export function assignModal(button, socialData) {
    event.preventDefault();
    event.stopPropagation();

    const modal = document.getElementById("social-modal");
    const platform = button.getAttribute("data-platform");
    const data = socialData[platform];

    if (data && socialRenderers[platform]) {
        const content = socialRenderers[platform](data);

        document.getElementById("modal-bio").innerHTML = content;
        document.getElementById("profile-link-a").href = data.link;

        // Posicionamento do modal
        const rect = button.getBoundingClientRect();
        const scrollY = window.scrollY;

        const modalWidth = modal.offsetWidth;
        const modalHeight = modal.offsetHeight;

        modal.style.left = `${rect.left + rect.width / 2 - modalWidth / 2}px`;
        modal.style.top = `${rect.bottom + scrollY + 10}px`;

        modal.classList.add("show");
    } else {
        const link = button.getAttribute('data-link');
        if (link) {
            window.open(link, '_blank');
        }
    }
}

// 5. Fecha o Modal
export function closeModal() {
    const modal = document.getElementById("social-modal");
    modal.classList.remove("show");
}

// 6. Inicializa Listeners
export function initSocialModalListeners(socialData) {
    document.querySelectorAll(".social-btn").forEach(button => {
        ['click', 'mouseover'].forEach(event => {
            button.addEventListener(event, function () {
                assignModal(button, socialData);
            });
        });
    });

    // Fecha o modal ao clicar fora
    document.addEventListener("click", function (e) {
        const modal = document.getElementById("social-modal");
        if (!modal.contains(e.target) && !e.target.classList.contains("social-btn")) {
            closeModal();
        }
    });
}