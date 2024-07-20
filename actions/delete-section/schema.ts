import { z } from "zod";

export const DeleteSectionSchema = z.object({
    sectionId: z.string(),
});
