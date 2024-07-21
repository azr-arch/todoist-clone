"use server";

import { InputType, ReturnType } from "./types";
import { createSafeAction } from "@/lib/create-safe-action";
import { CreateLabelSchema } from "./schema";
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

    const { name, color } = data;
    let label;

    try {
        // Find the immediate next section with an order greater than prevOrder
        const nextLabel = await prismaDb.section.findFirst({
            orderBy: {
                createdAt: "desc",
            },
        });

        // todo reimplement this
        // let newOrder;
        // if (!nextSection) {
        //     // If no next section is found, set newOrder to prevOrder + 1000
        //     newOrder = prevOrder + 1000;
        // } else {
        //     // If a next section is found, calculate newOrder as the average of prevOrder and nextSection.order
        //     newOrder = Math.floor((prevOrder + nextSection.order) / 2);
        // }
        const newOrder = nextLabel ? nextLabel.order + 1000 : 1000;

        // Create the new label with the calculated order
        label = await prismaDb.label.create({
            data: {
                clerkUserId: user.id,
                userEmail: user.emailAddresses[0].emailAddress,
                name,
                color,
                order: newOrder,
            },
        });
    } catch (error) {
        console.log("[CREATE_LABEL]: ", error);
        return {
            error: "Failed to create label.",
        };
    }

    revalidatePath(`/app/filters-labels`);

    return { data: label };
};

export const createLabel = createSafeAction(CreateLabelSchema, handler);
