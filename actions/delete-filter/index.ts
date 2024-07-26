"use server";

import { InputType, ReturnType } from "./types";
import { createSafeAction } from "@/lib/create-safe-action";
import { DeleteFilterSchema } from "./schema";
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

    const { filterId } = data;
    let filter;

    try {
        filter = await prismaDb.filter.delete({
            where: {
                id: filterId,
            },
        });
    } catch (error) {
        console.log("[DELETE_FILTER]: ", error);
        return {
            error: "Failed to delete filter.",
        };
    }

    revalidatePath(`/app/filters-labels`);

    return { data: filter };
};

export const deleteFilter = createSafeAction(DeleteFilterSchema, handler);
