import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

export const collections = {
	docs: defineCollection({
		loader: docsLoader(),
		schema: docsSchema({
			extend: z.object({
				pubDate: z.coerce.date().optional(),
				cover: z.string().optional(),
				coverAlt: z.string().optional(),
			}),
		}),
	}),
};
