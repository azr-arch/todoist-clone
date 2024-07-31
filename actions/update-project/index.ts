"use server";

import { InputType, ReturnType } from "./types";
import { createSafeAction } from "@/lib/create-safe-action";
import { UpdateProjectSchema } from "./schema";
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

    const { projectId, ...values } = data;
    let project;

    try {
        project = await prismaDb.project.update({
            where: {
                id: projectId,
            },
            data: {
                ...values,
            },
        });

        // Will add audit logs here for actions like update, delete or create!
    } catch (error) {
        console.log("[UPDATE_SECTION]: ", error);
        return {
            error: "Failed to update section.",
        };
    }

    revalidatePath(`/app/projects`);

    return { data: project };
};

export const updateProject = createSafeAction(UpdateProjectSchema, handler);
