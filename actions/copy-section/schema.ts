import { z } from "zod";

export const CopySectionSchema = z.object({
    sectionId: z.string(),
    projectId: z.optional(z.string()),
});
