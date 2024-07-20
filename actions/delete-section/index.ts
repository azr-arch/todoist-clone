"use server";

import { InputType, ReturnType } from "./types";
import { createSafeAction } from "@/lib/create-safe-action";
import { DeleteSectionSchema } from "./schema";
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

    const { sectionId } = data;
    let section;

    try {
        section = await prismaDb.section.delete({
            where: {
                id: sectionId,
            },
        });

        // Will add audit logs here for actions like update, delete or create!
    } catch (error) {
        console.log("[DELETE_SECTION]: ", error);
        return {
            error: "Failed to delete section.",
        };
    }

    revalidatePath(`/app/inbox`);

    return { data: section };
};

export const deleteSection = createSafeAction(DeleteSectionSchema, handler);
