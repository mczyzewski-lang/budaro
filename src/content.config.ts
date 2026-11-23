import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const poradnik = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/poradnik' }),
  schema: z.object({
    title: z.string(), short: z.string(), description: z.string(), order: z.number(),
    updated: z.string(), readMin: z.number(), cover: z.string(),
    magnet: z.enum(['checklista-dzialki', 'katalog-z-cenami', 'formalnosci-krok-po-kroku']),
    author: z.string().default('Łukasz Gruszkiewicz'),
  }),
});
export const collections = { poradnik };
