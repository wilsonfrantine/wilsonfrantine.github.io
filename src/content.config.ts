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
    image: z.string().optional(),
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

export const collections = {
  tutorials,
  snippets,
};
