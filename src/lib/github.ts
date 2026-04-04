export async function getRepoReadme(repo: string) {
  const GITHUB_USERNAME = "wilsonfrantine";
  
  // Tenta buscar o README principal
  const url = `https://api.github.com/repos/${GITHUB_USERNAME}/${repo}/readme`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/vnd.github.raw+json',
        // 'Authorization': `token ${import.meta.env.GITHUB_TOKEN}` // Opcional se atingir o limite
      }
    });
    
    if (!response.ok) {
        return `## Documentação Técnica não disponível para: ${repo}\n\nPor favor, visite o repositório diretamente no [GitHub](https://github.com/${GITHUB_USERNAME}/${repo}).`;
    }
    
    return await response.text();
  } catch (error) {
    console.error(`Erro ao buscar README de ${repo}:`, error);
    return "Ocorreu um erro ao carregar o README do GitHub.";
  }
}
