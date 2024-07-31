"use server";

import { InputType, ReturnType } from "./types";
import { createSafeAction } from "@/lib/create-safe-action";
import { CopyTask } from "./schema";
import { prismaDb } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { Priority, Task } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
    const user = await currentUser();

    if (!user) {
        return {
            error: "Unauthorized",
        };
    }

    const { taskId } = data;
    let task;

    try {
        const tasksToCopy = await prismaDb.task.findUnique({
            where: {
                id: taskId,
            },
            include: {
                section: true,
                labels: {
                    select: {
                        label: true,
                    },
                },
                project: {
                    include: {
                        tasks: true,
                    },
                },
            },
        });

        if (!tasksToCopy) {
            return {
                error: "Copied task does not found!",
            };
        }

        const immediateNextTask = await prismaDb.task.findFirst({
            where: {
                order: {
                    gt: tasksToCopy.order,
                },
            },
        });

        const newOrder = immediateNextTask
            ? Math.floor((tasksToCopy.order + immediateNextTask.order) / 2)
            : tasksToCopy.order + 1000;

        console.log(tasksToCopy.labels);

        task = await prismaDb.task.create({
            data: {
                title: tasksToCopy.title,
                description: tasksToCopy.description,
                dueDate: tasksToCopy.dueDate,
                sectionType: tasksToCopy.sectionType,
                clerkUserId: tasksToCopy.clerkUserId,
                userEmail: tasksToCopy.userEmail,
                order: newOrder,
                projectId: tasksToCopy.projectId,
                sectionId: tasksToCopy.sectionId,
                // TODO Add label
            },
        });
    } catch (error) {
        console.log("[ADD_TASK]: ", error);
        return {
            error: "Failed to create task.",
        };
    }

    revalidatePath(`/app/${task.sectionType}`);

    return { data: task };
};

export const copyTask = createSafeAction(CopyTask, handler);
