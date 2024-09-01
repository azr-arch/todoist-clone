"use server";

import { InputType, ReturnType } from "./types";
import { createSafeAction } from "@/lib/create-safe-action";
import { UpdateTaskSchema } from "./schema";
import { prismaDb } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { Priority } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
    const user = await currentUser();

    if (!user) {
        return {
            error: "Unauthorized",
        };
    }

    const { taskId, ...values } = data;
    let task;

    try {
        let data = {
            ...values,

            dueDate: values.dueDate ? new Date(values.dueDate) : null,
        };

        if (values.priority) {
            data.priority = values.priority as Priority;
        }

        task = await prismaDb.task.update({
            where: {
                id: taskId,
            },
            data: {
                title: values.title,
                description: values.description,
                dueDate: values.dueDate ? new Date(values?.dueDate) : null,
                sectionType: values.sectionType,
                priority: values.priority as Priority,
            },
        });

        // Will add audit logs here for actions like update, delete or create!
    } catch (error) {
        console.log("[UPDATE_TASK]: ", error);
        return {
            error: "Failed to update task.",
        };
    }

    revalidatePath(`/app/${values.sectionType}`);

    return { data: task };
};

export const updateTask = createSafeAction(UpdateTaskSchema, handler);
