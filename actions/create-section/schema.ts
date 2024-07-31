import { z } from "zod";

export const CreateSectionSchema = z.object({
    title: z
        .string({
            required_error: "Title is required",
            invalid_type_error: "Title is required",
        })
        .min(1),
    prevOrder: z.number(),
    projectId: z.optional(z.string()),
});
