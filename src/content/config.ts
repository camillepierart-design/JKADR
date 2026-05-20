import { defineCollection, z } from 'astro:content';

// Team member profiles. Body = full biography (Markdown).
const team = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    role: z.string(),
    order: z.number(),
    portrait: z.string(),
    header: z.string(),
    strip: z.string().optional(),
    cv: z.string().optional(),
    timeline: z
      .array(z.object({ year: z.string(), text: z.string() }))
      .optional(),
    languages: z.array(z.string()).optional(),
    intro: z.string(),
  }),
});

// Narrative pages (About, Practice, Mediation). Body = Markdown.
const pages = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    header: z.string().optional(),
  }),
});

// Long-form structured lists (Experience, Publications, Speaking).
// Kept as Markdown so the client can edit entries without touching code.
const lists = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    header: z.string().optional(),
  }),
});

export const collections = { team, pages, lists };
