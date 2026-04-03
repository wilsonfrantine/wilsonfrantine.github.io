import { defineCollection, reference, z } from 'astro:content';
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
    series: z.string().optional(), // ID da série a que pertence
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
  series,
};
