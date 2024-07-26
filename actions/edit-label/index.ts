"use server";

import { InputType, ReturnType } from "./types";
import { createSafeAction } from "@/lib/create-safe-action";
import { EditLabelSchema } from "./schema";
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

    const { name, color, labelId } = data;
    let label;

    try {
        const labelExists = await prismaDb.label.findUnique({
            where: {
                id: labelId,
            },
        });

        if (!labelExists) {
            return {
                error: "Label not found",
            };
        }
        // Create the new label with the calculated order

        await prismaDb.label.update({
            where: {
                id: labelId,
            },
            data: {
                name,
                color,
            },
        });
    } catch (error) {
        console.log("[EDIT_LABEL]: ", error);
        return {
            error: "Failed to edit label.",
        };
    }

    revalidatePath(`/app/filters-labels`);

    return { data: label };
};

export const editLabel = createSafeAction(EditLabelSchema, handler);
