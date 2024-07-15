import { z } from "zod";

export const UpdateTaskOrderSchema = z.object({
    items: z.array(
        z.object({
            id: z.string(),
            clerkUserId: z.string(),
            userEmail: z.string().nullable(),
            title: z.string(),
            description: z.string().nullable(),
            dueDate: z.date().nullable(),
            sectionType: z.string(),
            order: z.number(),
            createdAt: z.date(),
            updatedAt: z.date(),
        })
    ), // HOw do i achieve the type Task[]
});
