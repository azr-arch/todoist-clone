import { Priority } from "@prisma/client";
import { z } from "zod";

export const AddTaskSchema = z.object({
    title: z
        .string({
            required_error: "Title is required",
            invalid_type_error: "Title is required",
        })
        .min(1),
    description: z.optional(z.string()),
    dueDate: z.optional(z.string()),
    sectionType: z.string(),
    sectionId: z.optional(z.string()),
    labelId: z.optional(z.string()),
    priority: z.optional(z.string()),
    projectId: z.optional(z.string()),
});
