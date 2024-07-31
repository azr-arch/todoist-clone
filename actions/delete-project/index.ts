"use server";

import { InputType, ReturnType } from "./types";
import { createSafeAction } from "@/lib/create-safe-action";
import { DeleteProjectSchema } from "./schema";
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

    const { projectId } = data;
    let project;

    try {
        project = await prismaDb.project.delete({
            where: {
                id: projectId,
            },
        });

        // Will add audit logs here for actions like update, delete or create!
    } catch (error) {
        console.log("[DELETE_PROJECT]: ", error);
        return {
            error: "Failed to delete project.",
        };
    }

    revalidatePath(`/app/projects`);

    return { data: project };
};

export const deleteProject = createSafeAction(DeleteProjectSchema, handler);
