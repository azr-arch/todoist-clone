"use server";

import { InputType, ReturnType } from "./types";
import { prismaDb } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { UpdateTaskOrderSchema } from "./schema";
import { currentUser } from "@clerk/nextjs/server";

const handler = async (data: InputType): Promise<ReturnType> => {
    const user = await currentUser();

    if (!user) {
        return {
            error: "Unauthorized",
        };
    }

    const { items } = data;
    let tasks;

    try {
        const transaction = items.map((list) =>
            prismaDb.task.update({
                where: {
                    id: list.id,
                },
                data: {
                    order: list.order,
                },
            })
        );

        tasks = await prismaDb.$transaction(transaction);
    } catch (error) {
        return {
            error: "Failed to reorder.",
        };
    }

    revalidatePath(`/app/${items[0].sectionType}}`);

    return { data: tasks };
};

export const updateTaskOrder = createSafeAction(UpdateTaskOrderSchema, handler);
