"use server";

import { InputType, ReturnType } from "./types";
import { createSafeAction } from "@/lib/create-safe-action";
import { CreateFilterSchema } from "./schema";
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

    const { name, color, query } = data;
    let filter;

    try {
        const nextFilter = await prismaDb.filter.findFirst({
            orderBy: {
                createdAt: "desc",
            },
        });

        const newOrder = nextFilter ? nextFilter.order + 1000 : 1000;

        // Create the new label with the calculated order
        filter = await prismaDb.filter.create({
            data: {
                clerkUserId: user.id,
                userEmail: user.emailAddresses[0].emailAddress,
                name,
                color,
                order: newOrder,
                query,
            },
        });
    } catch (error) {
        console.log("[CREATE_FILTER]: ", error);
        return {
            error: "Failed to create filter.",
        };
    }

    revalidatePath(`/app/filters-labels`);

    return { data: filter };
};

export const createFilter = createSafeAction(CreateFilterSchema, handler);
