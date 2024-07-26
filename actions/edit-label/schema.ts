import { z } from "zod";

export const EditLabelSchema = z.object({
    labelId: z.string(),
    name: z
        .string({
            required_error: "Name is required",
            invalid_type_error: "Name is required",
        })
        .min(1),
    color: z.string(),
});
