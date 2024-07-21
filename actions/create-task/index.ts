"use server";

import { InputType, ReturnType } from "./types";
import { createSafeAction } from "@/lib/create-safe-action";
import { AddTaskSchema } from "./schema";
import { prismaDb } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

const handler = async (data: InputType): Promise<ReturnType> => {
    const user = await currentUser();

    if (!user) {
        return {
            error: "Unauthorized",
        };
    }

    const { title, description, dueDate, sectionType, sectionId, labelId } = data;
    let task;

    try {
        const lastTask = await prismaDb.task.findFirst({
            orderBy: {
                order: "desc",
            },
        });

        const newOrder = lastTask ? lastTask.order + 1 : 1;

        const taskData = {
            clerkUserId: user.id,
            title,
            description,
            sectionType,
            dueDate: dueDate ? new Date(dueDate) : null,
            userEmail: user.emailAddresses[0].emailAddress,
            order: newOrder,
            sectionId: sectionId ? sectionId : null,
        };

        if (labelId) {
            taskData.labels = {
                create: {
                    label: {
                        connect: {
                            id: labelId,
                        },
                    },
                },
            };
        }

        task = await prismaDb.task.create({
            data: taskData,
        });
    } catch (error) {
        console.log("[ADD_TASK]: ", error);
        return {
            error: "Failed to create task.",
        };
    }

    revalidatePath(`/app/${sectionType}`);

    return { data: task };
};

export const createTask = createSafeAction(AddTaskSchema, handler);
