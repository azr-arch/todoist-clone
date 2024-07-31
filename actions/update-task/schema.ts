import { Priority } from "@prisma/client";
import { z } from "zod";

export const UpdateTaskSchema = z.object({
    taskId: z.string(),
    title: z.optional(
        z
            .string({
                required_error: "Title cannot be empty",
                invalid_type_error: "Title is required",
            })
            .min(1)
    ),
    description: z.optional(z.string()),
    dueDate: z.optional(z.string()),
    sectionType: z.optional(z.string()),
    priority: z.optional(z.string()),
});
