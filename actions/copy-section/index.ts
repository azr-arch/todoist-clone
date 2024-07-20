"use server";

import { InputType, ReturnType } from "./types";
import { createSafeAction } from "@/lib/create-safe-action";
import { CopySectionSchema } from "./schema";
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
        const sectionToCopy = await prismaDb.section.findUnique({
            where: {
                id: sectionId,
            },
            include: {
                tasks: true,
            },
        });

        if (!sectionToCopy) {
            return {
                error: "Copied section does not found!",
            };
        }

        const immediateNextSection = await prismaDb.section.findFirst({
            where: {
                order: {
                    gt: sectionToCopy?.order,
                },
            },
        });

        const newOrder = immediateNextSection
            ? Math.floor((sectionToCopy.order + immediateNextSection.order) / 2)
            : sectionToCopy.order + 1000;

        section = await prismaDb.section.create({
            data: {
                title: `Copy of ${sectionToCopy.title}`,
                clerkUserId: user.id,
                order: newOrder,
                tasks: {
                    createMany: {
                        data: sectionToCopy.tasks.map((task) => ({
                            ...task,
                        })),
                    },
                },
            },
            include: {
                tasks: true,
            },
        });

        // Will add audit logs here for actions like update, delete or create!
    } catch (error) {
        console.log("[COPY_SECTION]: ", error);
        return {
            error: "Failed to copy section.",
        };
    }

    revalidatePath(`/app/inbox`);

    return { data: section };
};

export const copySection = createSafeAction(CopySectionSchema, handler);
