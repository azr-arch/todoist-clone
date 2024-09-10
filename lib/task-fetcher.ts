// utils/taskFetcher.ts

import { currentUser } from "@clerk/nextjs/server";
import { prismaDb } from "./db";
import { Task } from "@prisma/client";

interface FetchTasksProps {
    isCompleted?: boolean;
    startDate?: Date;
    endDate?: Date;
    includeOverdue?: boolean;
    sectionId?: string;
    projectId?: string;
}

export async function fetchTasks({
    isCompleted = false,
    startDate,
    endDate,
    includeOverdue = false,
    sectionId = undefined,
    projectId = undefined,
}: FetchTasksProps) {
    const user = await currentUser();

    if (!user?.id) {
        throw new Error("User not authenticated");
    }

    const baseQuery: any = {
        where: {
            clerkUserId: user.id,
            isCompleted: isCompleted,
        },
        orderBy: {
            order: "asc",
        },
        include: {
            labels: {
                select: {
                    label: true,
                },
            },
        },
    };

    if (startDate) {
        baseQuery.where.dueDate = {
            gte: startDate,
        };
    }

    if (endDate) {
        baseQuery.where.dueDate.lte = endDate;
    }

    if (sectionId !== undefined) {
        baseQuery.where.sectionId = sectionId;
    }

    if (projectId !== undefined) {
        baseQuery.where.projectId = projectId;
    }

    const tasks = await prismaDb.task.findMany(baseQuery);

    let overdueTasks: Task[] = [];
    if (includeOverdue) {
        overdueTasks = await prismaDb.task.findMany({
            where: {
                clerkUserId: user.id,
                isCompleted: false,
                dueDate: {
                    lt: startDate || new Date(),
                },
            },
            orderBy: {
                order: "asc",
            },
            include: {
                labels: {
                    select: {
                        label: true,
                    },
                },
            },
        });
    }

    return { tasks, overdueTasks };
}
