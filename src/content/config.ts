// 1. Import utilities from `astro:content`
import { z, defineCollection } from "astro:content";

const projectsCollection = defineCollection({
  type: "data",
  schema: ({ image }) =>
    z
      .object({
        name: z.string(),
        image: image(),
        description: z.string(),
        link: z.string().optional(),
      })
      .strict(),
});

export const collections = {
  projects: projectsCollection,
};
