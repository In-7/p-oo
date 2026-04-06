import { defineCollection, z, reference, } from 'astro:content';
import type { SchemaContext } from 'astro:content';
import { glob } from 'astro/loaders';

const colorSchema = z.string().regex(
  /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$|^rgb\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*\)$|^rgba\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*(0|1|0?\.\d+)\s*\)$|^[a-zA-Z]+$/,
  '颜色格式无效，支持: #RGB, #RRGGBB, rgb(), rgba(), 或颜色名称'
);

const software = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/software' }),
  schema: z.object({
    name: z.string(),
    category: z.string(),
    description: z.string(),
    price: z.string(),
    platform: z.string(),
    icon: z.string(),
    color: colorSchema.optional(),
  }),
});

const system = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/system' }),
  schema: z.object({
    name: z.string(),
    category: z.string(),
    description: z.string(),
    version: z.string(),
    architecture: z.string(),
    icon: z.string(),
    color: colorSchema.optional(),
  }),
});

const game = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/game' }),
  schema: z.object({
    name: z.string(),
    category: z.string(),
    description: z.string(),
    genre: z.string(),
    platform: z.string(),
    releaseYear: z.number(),
    icon: z.string(),
    color: colorSchema.optional(),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: ({ image }: SchemaContext) =>    
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(), 
      category: z.string(),
      author: z.string().optional(),
      tags: z.array(z.string()).optional(),
      relatedGame: reference('game').optional(),
    }),
});

export const collections = { software, system, game, blog };
