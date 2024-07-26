"use server";

import { InputType, ReturnType } from "./types";
import { createSafeAction } from "@/lib/create-safe-action";
import { DeleteLabelSchema } from "./schema";
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

    const { labelId } = data;
    let label;

    try {
        label = await prismaDb.label.delete({
            where: {
                id: labelId,
            },
        });
    } catch (error) {
        console.log("[DELETE_LABEL]: ", error);
        return {
            error: "Failed to delete label.",
        };
    }

    revalidatePath(`/app/filters-labels`);

    return { data: label };
};

export const deleteLabel = createSafeAction(DeleteLabelSchema, handler);
