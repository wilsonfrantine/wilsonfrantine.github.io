import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const tutorials = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/tutorials" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    author: z.string().default('Wilson Frantine'),
    category: z.enum(['Genética', 'Bioinformática', 'Ecologia', 'Dados', 'Astronomia']),
    tags: z.array(z.string()).optional(),
    series: z.string().optional(),
  }),
});

const snippets = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/snippets" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    category: z.string(),
    language: z.string(),
  }),
});

// Projetos agora são Markdown para flexibilidade máxima
const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    repo: z.string(), // Link com GitHub para fetch do README
    title: z.string(),
    description: z.string(), // Resumo curto para cards
    category: z.enum(['Bioinfo Hub', 'Data Ecology', 'Trilhas de Aprendizado', 'Outros']),
    pubDate: z.date(),
    insight: z.string().optional(),
    tags: z.array(z.string()).optional(),
    image: z.string().optional(), // Imagem de destaque opcional
  }),
});

const series = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/series" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    items: z.array(z.object({
      id: z.string(),
      collection: z.enum(['tutorials', 'snippets'])
    })),
  }),
});

export const collections = {
  tutorials,
  snippets,
  projects,
  series,
};
