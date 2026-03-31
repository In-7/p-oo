import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const software = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/software' }),
  schema: z.object({
    id: z.number(),
    name: z.string(),
    category: z.string(),
    description: z.string(),
    price: z.string(),
    platform: z.string(),
    icon: z.string(),
    color: z.string(),
  }),
});

const system = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/system' }),
  schema: z.object({
    id: z.number(),
    name: z.string(),
    category: z.string(),
    description: z.string(),
    version: z.string(),
    architecture: z.string(),
    icon: z.string(),
    color: z.string(),
  }),
});

const game = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/game' }),
  schema: z.object({
    id: z.number(),
    name: z.string(),
    category: z.string(),
    description: z.string(),
    genre: z.string(),
    platform: z.string(),
    releaseYear: z.number(),
    icon: z.string(),
    color: z.string(),
  }),
});

export const collections = { software, system, game };