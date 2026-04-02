export interface GitHubRepo {
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  updated_at: string;
  language: string;
}

const REPO_IMAGES: Record<string, string> = {
  R101: "https://cdn-icons-png.flaticon.com/512/6062/6062646.png",
  arvoresuenp: "https://cdn-icons-png.flaticon.com/512/2913/2913520.png",
  ggrelated: "https://cdn-icons-png.flaticon.com/512/4871/4871208.png",
  lsma: "https://cdn-icons-png.flaticon.com/512/4773/4773801.png",
  ggbeast: "https://raw.githubusercontent.com/wilsonfrantine/ggbeast/ghpg/img/ggebsp.png",
  ggmodel: "https://cdn-icons-png.flaticon.com/512/2103/2103610.png",
  kviewer: "https://cdn-icons-png.flaticon.com/512/2994/2994311.png",
  ggDAPC: "https://raw.githubusercontent.com/wilsonfrantine/ggDAPC/main/images/comparison.png",
  mariorun: "https://cdn-icons-png.flaticon.com/512/1408/1408990.png",
  R4eco: "https://cdn-icons-png.flaticon.com/512/3723/3723449.png",
  ENM101: "https://cdn-icons-png.flaticon.com/512/5145/5145062.png",
  QuickAR: "https://cdn-icons-png.flaticon.com/512/6357/6357965.png",
  aves: "https://cdn-icons-png.flaticon.com/512/6363/6363577.png",
  nucleodrop: "https://cdn-icons-png.flaticon.com/512/620/620341.png",
  easygrade: "https://cdn-icons-png.flaticon.com/512/5231/5231964.png",
};

const CATEGORIES: Record<string, string> = {
  kviewer: "Bioinfo Tools",
  ggDAPC: "Bioinfo Tools",
  nucleodrop: "Bioinfo Tools",
  ggbeast: "Data Ecology",
  ggrelated: "Data Ecology",
  lsma: "Data Ecology",
  R101: "Open Resources",
  ENM101: "Open Resources",
  R4eco: "Open Resources",
};

export async function getFeaturedProjects() {
  try {
    const response = await fetch("https://api.github.com/users/wilsonfrantine/repos?per_page=100");
    const data: GitHubRepo[] = await response.json();
    
    return data
      .filter(repo => repo.name !== "wilsonfrantine.github.io")
      .map(repo => ({
        name: repo.name,
        description: repo.description || "Project in development.",
        url: repo.html_url,
        stars: repo.stargazers_count,
        image: REPO_IMAGES[repo.name] || "https://cdn-icons-png.flaticon.com/512/9496/9496020.png",
        category: CATEGORIES[repo.name] || "Personal Project",
        tags: [repo.language, "Open Source"].filter(Boolean)
      }))
      .sort((a, b) => b.stars - a.stars);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}
