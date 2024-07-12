"use server";

import { prismaDb } from "@/lib/db";
import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function addTask(prevState: { message: string | null }, formData: FormData) {
    // TODO: Schema parse using zod
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const sectionType = formData.get("sectionType") as string;
    const dueDate = formData.get("dueDate") as string;
    const taskId = formData.get("taskId") as string;

    const user = await currentUser();

    if (!user) {
        return {
            error: "Unauthorized access!",
        };
    }

    try {
        if (taskId) {
            // then it means its a update call
            await prismaDb.task.update({
                where: {
                    id: taskId,
                },
                data: {
                    title,
                    description,
                    sectionType,
                    // TODO: Add duedate update
                },
            });
        } else {
            // then its a new task
            await prismaDb.task.create({
                data: {
                    clerkUserId: user.id,
                    title,
                    description,
                    dueDate: new Date(dueDate),
                    sectionType,
                    email: user.emailAddresses[0].emailAddress,
                },
            });
        }

        revalidatePath(`/app/${sectionType}`);

        return {
            message: `Task ${taskId ? "updated" : "added"} ${!taskId && `to ${sectionType}`}`,
        };
    } catch (error) {
        console.log("[ADD_TASK]: ", error);
        return {
            error: "Internal error",
        };
    }
}
