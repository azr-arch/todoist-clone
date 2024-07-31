"use server";

import { InputType, ReturnType } from "./types";
import { createSafeAction } from "@/lib/create-safe-action";
import { CopyProjectSchema } from "./schema";
import { prismaDb } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { Project, Task } from "@prisma/client";

// TODO: LINK LABELS TOO WHILE COPYING
const handler = async (data: InputType): Promise<ReturnType> => {
    const user = await currentUser();

    if (!user) {
        return {
            error: "Unauthorized",
        };
    }

    const { projectId } = data;
    let project: Project;

    try {
        const projectToCopy = await prismaDb.project.findUnique({
            where: {
                id: projectId,
            },
            include: {
                tasks: true,
                sections: {
                    include: {
                        tasks: true,
                    },
                },
            },
        });

        if (!projectToCopy) {
            return {
                error: "Copied project does not found!",
            };
        }

        project = await prismaDb.project.create({
            data: {
                name: `Copy of ${projectToCopy.name}`,
                color: projectToCopy.color,
                clerkUserId: user.id,
            },
        });

        // Copying project-level tasks
        const taskToCopyAtProjectLvl = projectToCopy.tasks.map((task) => ({
            ...task,
            projectId: project.id,
            id: undefined, // Remove the original ID to avoid conflicts
            createdAt: undefined, // Remove timestamps to avoid conflicts
            updatedAt: undefined,
        }));

        await prismaDb.task.createMany({
            data: taskToCopyAtProjectLvl,
        });

        // Copying section-level tasks
        projectToCopy.sections.map(async (section) => {
            const newSection = await prismaDb.section.create({
                data: {
                    title: section.title,
                    clerkUserId: user.id,
                    order: section.order,
                    projectId: project.id,
                    tasks: undefined,
                },
            });

            const tasksToCopy = section.tasks.map((task) => ({
                ...task,
                projectId: project.id,
                sectionId: newSection.id,
                id: undefined,
                createdAt: undefined,
                updatedAt: undefined,
            }));

            await prismaDb.task.createMany({
                data: tasksToCopy,
            });
        });

        // await Promise.all(sectionsToCopy);
    } catch (error) {
        console.log("[COPY_PROJECT]: ", error);
        return {
            error: "Failed to copy project.",
        };
    }

    revalidatePath(`/app/projects`);

    return { data: project };
};

export const copyProject = createSafeAction(CopyProjectSchema, handler);
