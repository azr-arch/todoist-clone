"use server";

import { InputType, ReturnType } from "./types";
import { createSafeAction } from "@/lib/create-safe-action";
import { CreateProjectSchema } from "./schema";
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
    let project;

    try {
        // Find the immediate next section with an order greater than prevOrder
        // const nextProject = await prismaDb.project.findFirst({
        //     orderBy: {
        //         createdAt: "desc",
        //     },
        // });

        // todo reimplement this
        // let newOrder;
        // if (!nextSection) {
        //     // If no next section is found, set newOrder to prevOrder + 1000
        //     newOrder = prevOrder + 1000;
        // } else {
        //     // If a next section is found, calculate newOrder as the average of prevOrder and nextSection.order
        //     newOrder = Math.floor((prevOrder + nextSection.order) / 2);
        // }
        // const newOrder = nextProject ? nextProject.order + 1000 : 1000;

        // Create the new label with the calculated order
        project = await prismaDb.project.create({
            data: {
                clerkUserId: user.id,
                name,
                color,
            },
        });
    } catch (error) {
        console.log("[CREATE_PROJECT]: ", error);
        return {
            error: "Failed to create project.",
        };
    }

    revalidatePath(`/app`);

    return { data: project };
};

export const createProject = createSafeAction(CreateProjectSchema, handler);
