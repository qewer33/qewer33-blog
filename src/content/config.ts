import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
    type: "content",
	schema: z.object({
		title: z.string(),
		description: z.string(),
        tags: z.array(z.string()),
		created: z.string().or(z.date()).transform((val) => new Date(val)),
		thumbnail: z.string(),
	}),
});

export const collections = { blog };
