export interface FeaturedProject {
  name: string;
  description: string;
  url: string;
  demoUrl?: string; // Link para o serviço/app funcionando (ex: GitHub Pages)
  image: string;
  category: "Trilhas de Aprendizado" | "Bioinfo Hub" | "Data Ecology" | "Outros";
  tags: string[];
  status?: "Em Breve" | "Ativo" | string;
}

export const featuredProjects: FeaturedProject[] = [
  // Trilhas de Aprendizado
  {
    name: "ENM101",
    description: "Trilha de aprendizado sobre Modelagem de Nicho Ecológico. Para quando você quer saber onde a espécie está (ou onde ela acha que está).",
    url: "/projects/enm101",
    image: "https://cdn-icons-png.flaticon.com/512/5145/5145062.png",
    category: "Trilhas de Aprendizado",
    tags: ["R", "Ecology", "Education"],
    status: "Ativo"
  },
  {
    name: "R101",
    description: "Introdução ao R. Onde a jornada para transformar café em gráficos elegantes (e erros de sintaxe) começa.",
    url: "/projects/r101",
    image: "https://cdn-icons-png.flaticon.com/512/6062/6062646.png",
    category: "Trilhas de Aprendizado",
    tags: ["R", "Statistics", "Education"],
    status: "Ativo"
  },
  {
    name: "Astro101",
    description: "Astronomia e imagens. Porque às vezes olhar para o DNA não é suficiente e precisamos de uma perspectiva maior.",
    url: "/tutorials/astro101-introducao",
    image: "https://cdn-icons-png.flaticon.com/512/3204/3204731.png",
    category: "Trilhas de Aprendizado",
    tags: ["Astronomy", "Education"],
    status: "Ativo"
  },

  // Bioinfo Hub
  {
    name: "kviewer",
    description: "Visualização de k-mers. Porque ler arquivos de sequenciamento bruto sem ajuda visual é pedir para ter dor de cabeça.",
    url: "/projects/kviewer",
    image: "https://cdn-icons-png.flaticon.com/512/2994/2994311.png",
    category: "Bioinfo Hub",
    tags: ["Bioinformatics", "Genomics", "Tool"],
    status: "Ativo"
  },
  {
    name: "ggrelated",
    description: "Estimativa de parentesco sem sofrimento. Quem é parente de quem? Descubra antes que a árvore genealógica vire um círculo.",
    url: "/projects/ggrelated",
    image: "https://cdn-icons-png.flaticon.com/512/1239/1239719.png",
    category: "Bioinfo Hub",
    tags: ["R", "Population Genetics", "Visualization"],
    status: "Ativo"
  },
  {
    name: "ggDAPC",
    description: "DAPC visual. Agrupar populações nunca foi tão estético. Se os grupos não separarem, a culpa não é do gráfico.",
    url: "/projects/ggdapc",
    image: "https://raw.githubusercontent.com/wilsonfrantine/ggDAPC/main/images/comparison.png",
    category: "Bioinfo Hub",
    tags: ["R", "Population Genetics", "Visualization"],
    status: "Ativo"
  },
  {
    name: "fastaregex",
    description: "Domador de cabeçalhos FASTA. Limpe a bagunça dos nomes de sequências com regex antes que seu pipeline exploda.",
    url: "/projects/fastaregex",
    demoUrl: "https://wilsonfrantine.github.io/fastaregex/",
    image: "https://cdn-icons-png.flaticon.com/512/2103/2103633.png",
    category: "Bioinfo Hub",
    tags: ["Bioinformatics", "Regex", "JavaScript"],
    status: "Ativo"
  },
  {
    name: "CladeX",
    description: "Simulador de tree-thinking e sistemática filogenética. Para quando o papel e o quadro branco não são suficientes.",
    url: "/projects/cladex",
    demoUrl: "https://wilsonfrantine.github.io/cladex/",
    image: "https://cdn-icons-png.flaticon.com/512/3222/3222792.png",
    category: "Bioinfo Hub",
    tags: ["Phylogenetics", "Education", "Bioinformatics", "D3.js"],
    status: "Ativo"
  },

  // Data Ecology
  {
    name: "lsma",
    description: "Análise de métricas de paisagem. Porque entender a forma do habitat é melhor do que apenas adivinhar.",
    url: "/projects/lsma",
    image: "https://cdn-icons-png.flaticon.com/512/4773/4773801.png",
    category: "Data Ecology",
    tags: ["R", "Landscape Ecology"],
    status: "Ativo"
  },
  {
    name: "ggmodel",
    description: "Visualização de modelos estatísticos. Transforme outputs chatos do R base em superfícies ggplot2 que as pessoas realmente entendem.",
    url: "/projects/ggmodel",
    image: "https://cdn-icons-png.flaticon.com/512/2280/2280566.png",
    category: "Data Ecology",
    tags: ["R", "Modeling", "Visualization"],
    status: "Ativo"
  },
  {
    name: "R4eco",
    description: "Scripts para ecologia quantitativa. O canivete suíço para quando você precisa processar dados ecológicos sem reinventar a roda.",
    url: "/projects/r4eco",
    image: "https://cdn-icons-png.flaticon.com/512/3723/3723449.png",
    category: "Data Ecology",
    tags: ["R", "Quantitative Ecology"],
    status: "Ativo"
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
    status: "Ativo"
  },
  {
    name: "Aves Urbanas",
    description: "Guia de avifauna. Para você saber quem está cantando na sua janela enquanto você depura código.",
    url: "/projects/aves",
    demoUrl: "https://wilsonfrantine.github.io/aves/",
    image: "https://cdn-icons-png.flaticon.com/512/3069/3069172.png",
    category: "Outros",
    tags: ["Biodiversity", "Ornithology", "Education"],
    status: "Ativo"
  },
  {
    name: "NeuroFlow",
    description: "Foco profundo e sons procedurais. Onde a ciência do som encontra a necessidade desesperada de terminar aquele manuscrito.",
    url: "/projects/neuroflow",
    demoUrl: "https://wilsonfrantine.github.io/neuroflow/",
    image: "https://cdn-icons-png.flaticon.com/512/3043/3043665.png",
    category: "Outros",
    tags: ["Productivity", "Audio", "JavaScript"],
    status: "Ativo"
  }
];
