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
    description: "Trilha de aprendizado sobre Modelagem de Nicho Ecológico (Ecological Niche Modeling).",
    url: "/projects/enm101",
    image: "https://cdn-icons-png.flaticon.com/512/5145/5145062.png",
    category: "Trilhas de Aprendizado",
    tags: ["R", "Ecology", "Education"],
    status: "Ativo"
  },
  {
    name: "R101",
    description: "Introdução ao R para análise de dados e estatística básica.",
    url: "/projects/r101",
    image: "https://cdn-icons-png.flaticon.com/512/6062/6062646.png",
    category: "Trilhas de Aprendizado",
    tags: ["R", "Statistics", "Education"],
    status: "Ativo"
  },
  {
    name: "Astro101",
    description: "Introdução à Astronomia e processamento de imagens.",
    url: "/tutorials/astro101-introducao",
    image: "https://cdn-icons-png.flaticon.com/512/3204/3204731.png",
    category: "Trilhas de Aprendizado",
    tags: ["Astronomy", "Education"],
    status: "Ativo"
  },

  // Bioinfo Hub
  {
    name: "kviewer",
    description: "Ferramenta para visualização e análise de k-mers em sequenciamentos genômicos.",
    url: "/projects/kviewer",
    image: "https://cdn-icons-png.flaticon.com/512/2994/2994311.png",
    category: "Bioinfo Hub",
    tags: ["Bioinformatics", "Genomics", "Tool"],
    status: "Ativo"
  },
  {
    name: "ggrelated",
    description: "Extensão ggplot2 para visualização elegante de resultados de parentesco genético.",
    url: "/projects/ggrelated",
    image: "https://cdn-icons-png.flaticon.com/512/1239/1239719.png",
    category: "Bioinfo Hub",
    tags: ["R", "Population Genetics", "Visualization"],
    status: "Ativo"
  },
  {
    name: "ggDAPC",
    description: "Visualização elegante de resultados de DAPC (Discriminant Analysis of Principal Components).",
    url: "/projects/ggdapc",
    image: "https://raw.githubusercontent.com/wilsonfrantine/ggDAPC/main/images/comparison.png",
    category: "Bioinfo Hub",
    tags: ["R", "Population Genetics", "Visualization"],
    status: "Ativo"
  },
  {
    name: "fastaregex",
    description: "Editor web para cabeçalhos FASTA usando expressões regulares.",
    url: "/projects/fastaregex",
    demoUrl: "https://wilsonfrantine.github.io/fastaregex/",
    image: "https://cdn-icons-png.flaticon.com/512/2103/2103633.png",
    category: "Bioinfo Hub",
    tags: ["Bioinformatics", "Regex", "JavaScript"],
    status: "Ativo"
  },

  // Data Ecology
  {
    name: "lsma",
    description: "Landscape Shape Metrics Analysis - Ferramentas para ecologia de paisagem.",
    url: "/projects/lsma",
    image: "https://cdn-icons-png.flaticon.com/512/4773/4773801.png",
    category: "Data Ecology",
    tags: ["R", "Landscape Ecology"],
    status: "Ativo"
  },
  {
    name: "ggmodel",
    description: "Visualização de superfícies de modelos estatísticos do R base usando ggplot2.",
    url: "/projects/ggmodel",
    image: "https://cdn-icons-png.flaticon.com/512/2280/2280566.png",
    category: "Data Ecology",
    tags: ["R", "Modeling", "Visualization"],
    status: "Ativo"
  },
  {
    name: "R4eco",
    description: "Rotinas e scripts consolidados para análises rotineiras em ecologia quantitativa.",
    url: "/projects/r4eco",
    image: "https://cdn-icons-png.flaticon.com/512/3723/3723449.png",
    category: "Data Ecology",
    tags: ["R", "Quantitative Ecology"],
    status: "Ativo"
  },

  // Outros / Apps Vivos
  {
    name: "Pale Blue Dot",
    description: "Simulador didático de escalas astronômicas e homenagem a Carl Sagan.",
    url: "/projects/palebluedot",
    demoUrl: "https://wilsonfrantine.github.io/palebluedot/",
    image: "https://cdn-icons-png.flaticon.com/512/3204/3204731.png",
    category: "Outros",
    tags: ["Astronomy", "Education", "JavaScript"],
    status: "Ativo"
  },
  {
    name: "Aves Urbanas",
    description: "Guia interativo da avifauna de Cornélio Procópio.",
    url: "/projects/aves",
    demoUrl: "https://wilsonfrantine.github.io/aves/",
    image: "https://cdn-icons-png.flaticon.com/512/3069/3069172.png",
    category: "Outros",
    tags: ["Biodiversity", "Ornithology", "Education"],
    status: "Ativo"
  },
  {
    name: "NeuroFlow",
    description: "Aplicação de foco profundo com sons procedurais e Pomodoro.",
    url: "/projects/neuroflow",
    demoUrl: "https://wilsonfrantine.github.io/neuroflow/",
    image: "https://cdn-icons-png.flaticon.com/512/3043/3043665.png",
    category: "Outros",
    tags: ["Productivity", "Audio", "JavaScript"],
    status: "Ativo"
  }
];
