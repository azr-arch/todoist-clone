"use server";

import { InputType, ReturnType } from "./types";
import { createSafeAction } from "@/lib/create-safe-action";
import { UpdateSectionSchema } from "./schema";
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

    const { sectionId, ...values } = data;
    let section;

    try {
        section = await prismaDb.section.update({
            where: {
                id: sectionId,
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

    revalidatePath(`/app/inbox`);

    return { data: section };
};

export const updateSection = createSafeAction(UpdateSectionSchema, handler);
