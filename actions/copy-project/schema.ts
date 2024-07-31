import { z } from "zod";

export const CopyProjectSchema = z.object({
    projectId: z.string(),
});
