export interface FeaturedProject {
  name: string;
  description: string;
  url: string;
  demoUrl?: string; // Link para o serviço/app funcionando (ex: GitHub Pages)
  image: string;
  category: "Trilhas de Aprendizado" | "Bioinfo Hub" | "Data Ecology" | "Outros";
  tags: string[];
  status?: "Em Breve" | "Ativo" | string;
  pubDate: string; // Formato YYYY-MM-DD para ordenação
}

export const featuredProjects: FeaturedProject[] = [
  // Bioinfo Hub
  {
    name: "CladeX",
    description: "Workbench de sistemática filogenética que transforma árvores estáticas em ferramentas interativas de descoberta.",
    url: "/projects/cladex",
    demoUrl: "https://wilsonfrantine.github.io/cladex/",
    image: "https://wilsonfrantine.github.io/cladex/favicon.svg",
    category: "Bioinfo Hub",
    tags: ["Phylogenetics", "Education", "Bioinformatics", "D3.js"],
    status: "Ativo",
    pubDate: "2026-04-06"
  },
  {
    name: "fastaregex",
    description: "Domador de cabeçalhos FASTA. Limpe a bagunça dos nomes de sequências com regex antes que seu pipeline exploda.",
    url: "/projects/fastaregex",
    demoUrl: "https://wilsonfrantine.github.io/fastaregex/",
    image: "https://cdn-icons-png.flaticon.com/512/2103/2103633.png",
    category: "Bioinfo Hub",
    tags: ["Bioinformatics", "Regex", "JavaScript"],
    status: "Ativo",
    pubDate: "2026-03-15"
  },
  {
    name: "kviewer",
    description: "Visualização de k-mers. Porque ler arquivos de sequenciamento bruto sem ajuda visual é pedir para ter dor de cabeça.",
    url: "/projects/kviewer",
    image: "https://cdn-icons-png.flaticon.com/512/2994/2994311.png",
    category: "Bioinfo Hub",
    tags: ["Bioinformatics", "Genomics", "Tool"],
    status: "Ativo",
    pubDate: "2025-11-20"
  },
  {
    name: "ggrelated",
    description: "Estimativa de parentesco sem sofrimento. Quem é parente de quem? Descubra antes que a árvore genealógica vire um círculo.",
    url: "/projects/ggrelated",
    image: "https://cdn-icons-png.flaticon.com/512/1239/1239719.png",
    category: "Bioinfo Hub",
    tags: ["R", "Population Genetics", "Visualization"],
    status: "Ativo",
    pubDate: "2025-10-10"
  },
  {
    name: "ggDAPC",
    description: "DAPC visual. Agrupar populações nunca foi tão estético. Se os grupos não separarem, a culpa não é do gráfico.",
    url: "/projects/ggdapc",
    image: "https://raw.githubusercontent.com/wilsonfrantine/ggDAPC/main/images/comparison.png",
    category: "Bioinfo Hub",
    tags: ["R", "Population Genetics", "Visualization"],
    status: "Ativo",
    pubDate: "2025-09-05"
  },

  // Data Ecology
  {
    name: "lsma",
    description: "Análise de métricas de paisagem. Porque entender a forma do habitat é melhor do que apenas adivinhar.",
    url: "/projects/lsma",
    image: "https://cdn-icons-png.flaticon.com/512/4773/4773801.png",
    category: "Data Ecology",
    tags: ["R", "Landscape Ecology"],
    status: "Ativo",
    pubDate: "2025-07-20"
  },
  {
    name: "ggmodel",
    description: "Visualização de modelos estatísticos. Transforme outputs chatos do R base em superfícies ggplot2 que as pessoas realmente entendem.",
    url: "/projects/ggmodel",
    image: "https://cdn-icons-png.flaticon.com/512/2280/2280566.png",
    category: "Data Ecology",
    tags: ["R", "Modeling", "Visualization"],
    status: "Ativo",
    pubDate: "2025-06-15"
  },
  {
    name: "R4eco",
    description: "Scripts para ecologia quantitativa. O canivete suíço para quando você precisa processar dados ecológicos sem reinventar a roda.",
    url: "/projects/r4eco",
    image: "https://cdn-icons-png.flaticon.com/512/3723/3723449.png",
    category: "Data Ecology",
    tags: ["R", "Quantitative Ecology"],
    status: "Ativo",
    pubDate: "2025-05-10"
  },

  // Outros / Apps Vivos
  {
    name: "Pale Blue Dot",
    description: "Simulador de escalas astronômicas. Uma dose necessária de humildade cósmica em forma de código.",
    url: "/projects/palebluedot",
    demoUrl: "https://wilsonfrantine.github.io/palebluedot/",
    image: "https://cdn-icons-png.flaticon.com/512/3204/3204731.png",
    category: "Outros",
    tags: ["Astronomy", "Education", "JavaScript"],
    status: "Ativo",
    pubDate: "2025-04-01"
  },
  {
    name: "Aves Urbanas",
    description: "Guia de avifauna. Para você saber quem está cantando na sua janela enquanto você depura código.",
    url: "/projects/aves",
    demoUrl: "https://wilsonfrantine.github.io/aves/",
    image: "https://cdn-icons-png.flaticon.com/512/3069/3069172.png",
    category: "Outros",
    tags: ["Biodiversity", "Ornithology", "Education"],
    status: "Ativo",
    pubDate: "2025-03-15"
  },
  {
    name: "NeuroFlow",
    description: "Foco profundo e sons procedurais. Onde a ciência do som encontra a necessidade desesperada de terminar aquele manuscrito.",
    url: "/projects/neuroflow",
    demoUrl: "https://wilsonfrantine.github.io/neuroflow/",
    image: "https://cdn-icons-png.flaticon.com/512/3043/3043665.png",
    category: "Outros",
    tags: ["Productivity", "Audio", "JavaScript"],
    status: "Ativo",
    pubDate: "2025-02-01"
  }
];
