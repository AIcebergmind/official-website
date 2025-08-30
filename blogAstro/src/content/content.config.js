// src/content.config.ts
import { defineCollection, z } from 'astro:content';

const articoliCollection = defineCollection({
  type: 'content',
  // usa la forma funzione per accedere a { image } dal context
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().min(1),
      category: z.string(),
      date: z.coerce.date(),                    // "2025-08-13" → Date
      readingTime: z.coerce.number().int().positive(), // minuti
      image: image().optional(),                // <-- image() dal context, NON importato
      author: z.string().optional(),
      authorRole: z.string().optional(),
      tags: z.array(z.string()).default([]),
      draft: z.boolean().default(false),
    }),
});

export const collections = {
  articoli: articoliCollection,
};




