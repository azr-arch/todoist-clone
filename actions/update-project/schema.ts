import { z } from "zod";

export const UpdateProjectSchema = z.object({
    projectId: z.string(),
    name: z
        .string({
            required_error: "Title is required",
            invalid_type_error: "Title is required",
        })
        .min(1),
    color: z.string(),
});
