import { z } from "zod";

export const DeleteFilterSchema = z.object({
    filterId: z.string(),
});
