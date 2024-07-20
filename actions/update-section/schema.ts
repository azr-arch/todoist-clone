import { z } from "zod";

export const UpdateSectionSchema = z.object({
    sectionId: z.string(),
    title: z
        .string({
            required_error: "Title is required",
            invalid_type_error: "Title is required",
        })
        .min(1),
});
