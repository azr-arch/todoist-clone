import { z } from "zod";

export const DeleteLabelSchema = z.object({
    labelId: z.string(),
});
