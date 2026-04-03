export interface FeaturedProject {
  name: string;
  description: string;
  url: string;
  image: string;
  category: "Trilhas de Aprendizado" | "Bioinfo Hub" | "Data Ecology";
  tags: string[];
  status?: "Em Breve" | "Ativo";
}

export const featuredProjects: FeaturedProject[] = [
  // Trilhas de Aprendizado
  {
    name: "ENM101",
    description: "Trilha de aprendizado sobre Modelagem de Nicho Ecológico (Ecological Niche Modeling).",
    url: "https://github.com/wilsonfrantine/ENM101",
    image: "https://cdn-icons-png.flaticon.com/512/5145/5145062.png",
    category: "Trilhas de Aprendizado",
    tags: ["R", "Ecology", "Education"],
    status: "Ativo"
  },
  {
    name: "R101",
    description: "Introdução ao R para análise de dados e estatística básica.",
    url: "https://github.com/wilsonfrantine/R101",
    image: "https://cdn-icons-png.flaticon.com/512/6062/6062646.png",
    category: "Trilhas de Aprendizado",
    tags: ["R", "Statistics", "Education"],
    status: "Ativo"
  },
  {
    name: "Astro101",
    description: "Introdução à Astronomia e processamento de imagens.",
    url: "#",
    image: "https://cdn-icons-png.flaticon.com/512/3204/3204731.png",
    category: "Trilhas de Aprendizado",
    tags: ["Astronomy", "Education"],
    status: "Em Breve"
  },

  // Bioinfo Hub
  {
    name: "kviewer",
    description: "Ferramenta para visualização e análise de k-mers em sequenciamentos genômicos.",
    url: "https://github.com/wilsonfrantine/kviewer",
    image: "https://cdn-icons-png.flaticon.com/512/2994/2994311.png",
    category: "Bioinfo Hub",
    tags: ["Bioinformatics", "Genomics", "Tool"],
    status: "Ativo"
  },
  {
    name: "ggDAPC",
    description: "Extensão ggplot2 para visualização elegante de resultados de DAPC (Discriminant Analysis of Principal Components).",
    url: "https://github.com/wilsonfrantine/ggDAPC",
    image: "https://raw.githubusercontent.com/wilsonfrantine/ggDAPC/main/images/comparison.png",
    category: "Bioinfo Hub",
    tags: ["R", "Population Genetics", "Visualization"],
    status: "Ativo"
  },
  {
    name: "nucleodrop",
    description: "Análise automatizada de dados espectrofotométricos (NanoDrop).",
    url: "https://github.com/wilsonfrantine/nucleodrop",
    image: "https://cdn-icons-png.flaticon.com/512/620/620341.png",
    category: "Bioinfo Hub",
    tags: ["R", "Laboratory", "Tool"],
    status: "Ativo"
  },

  // Data Ecology
  {
    name: "ggbeast",
    description: "Visualização de árvores filogenéticas e dados do BEAST integrados ao ggplot2.",
    url: "https://github.com/wilsonfrantine/ggbeast",
    image: "https://raw.githubusercontent.com/wilsonfrantine/ggbeast/ghpg/img/ggebsp.png",
    category: "Data Ecology",
    tags: ["R", "Phylogenetics", "Ecology"],
    status: "Ativo"
  },
  {
    name: "ggrelated",
    description: "Pacote R para análise e visualização de matrizes de parentesco e relacionamento estruturado.",
    url: "https://github.com/wilsonfrantine/ggrelated",
    image: "https://cdn-icons-png.flaticon.com/512/4871/4871208.png",
    category: "Data Ecology",
    tags: ["R", "Genetics", "Ecology"],
    status: "Ativo"
  },
  {
    name: "lsma",
    description: "Landscape Shape Metrics Analysis - Ferramentas para ecologia de paisagem.",
    url: "https://github.com/wilsonfrantine/lsma",
    image: "https://cdn-icons-png.flaticon.com/512/4773/4773801.png",
    category: "Data Ecology",
    tags: ["R", "Landscape Ecology"],
    status: "Ativo"
  },
  {
    name: "R4eco",
    description: "Rotinas e scripts consolidados para análises rotineiras em ecologia quantitativa.",
    url: "https://github.com/wilsonfrantine/R4eco",
    image: "https://cdn-icons-png.flaticon.com/512/3723/3723449.png",
    category: "Data Ecology",
    tags: ["R", "Quantitative Ecology"],
    status: "Ativo"
  }
];
