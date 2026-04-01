import { defineCollection, z, reference, } from 'astro:content';
import type { SchemaContext } from 'astro:content';
import { glob } from 'astro/loaders';

const software = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/software' }),
  schema: ({ image }: SchemaContext) =>
    z.object({
      name: z.string(),
      category: z.string(),
      description: z.string(),
      price: z.string(),
      platform: z.string(),
      icon: image(), // 优化：使用 image() 处理本地图片
      color: z.string(),
    }),
});

const system = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/system' }),
  schema: ({ image }: SchemaContext) =>
    z.object({
      name: z.string(),
      category: z.string(),
      description: z.string(),
      version: z.string(),
      architecture: z.string(),
      icon: image(),
      color: z.string(),
    }),
});

const game = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/game' }),
  schema: ({ image }: SchemaContext) =>
    z.object({
      name: z.string(),
      category: z.string(),
      description: z.string(),
      genre: z.string(),
      platform: z.string(),
      releaseYear: z.number(),
      icon: image(),
      color: z.string(),
    }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: ({ image }: SchemaContext) =>    
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(), // 优化：自动转换日期字符串
      category: z.string(),
      author: z.string().optional(),
      tags: z.array(z.string()).optional(),
      // 可选：如果博客关联了游戏或软件
      relatedGame: reference('game').optional(),
    }),
});

export const collections = { software, system, game, blog };
