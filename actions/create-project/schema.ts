import { z } from "zod";

export const CreateProjectSchema = z.object({
    name: z
        .string({
            required_error: "Name is required",
            invalid_type_error: "Name is required",
        })
        .min(1),
    color: z.string(),
    // adding workspace, view layout
});
