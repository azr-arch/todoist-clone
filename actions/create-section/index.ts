"use server";

import { InputType, ReturnType } from "./types";
import { createSafeAction } from "@/lib/create-safe-action";
import { CreateSectionSchema } from "./schema";
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

    const { title, prevOrder, projectId } = data;
    console.log("in actions: ", projectId);

    let section;

    try {
        // Find the immediate next section with an order greater than prevOrder
        const nextSection = await prismaDb.section.findFirst({
            where: {
                order: {
                    gt: prevOrder,
                },
            },
        });

        let newOrder;
        if (!nextSection) {
            // If no next section is found, set newOrder to prevOrder + 1000
            newOrder = prevOrder + 1000;
        } else {
            // If a next section is found, calculate newOrder as the average of prevOrder and nextSection.order
            newOrder = Math.floor((prevOrder + nextSection.order) / 2);
        }

        const taskData: any = {
            clerkUserId: user.id,
            title,
            order: newOrder,
        };

        if (projectId) {
            taskData.projectId = projectId;
        }

        // Create the new section with the calculated order
        section = await prismaDb.section.create({
            data: taskData,
        });
    } catch (error) {
        console.log("[CREATE_SECTION]: ", error);
        return {
            error: "Failed to create section.",
        };
    }

    revalidatePath(`/app/inbox`);

    return { data: section };
};

export const createSection = createSafeAction(CreateSectionSchema, handler);
