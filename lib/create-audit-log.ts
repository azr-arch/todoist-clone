import { currentUser } from "@clerk/nextjs/server";
import { ACTION } from "@prisma/client";
import { prismaDb } from "./db";

interface Props {
    taskId: string;
    taskTitle: string;
    action: ACTION;
}

export const createAuditLog = async ({ taskId, taskTitle, action }: Props) => {
    try {
        const user = await currentUser();
        if (!user) {
            throw new Error("User not found!");
        }

        await prismaDb.auditLog.create({
            data: {
                taskId,
                taskTitle,
                action,
                clerkUserId: user.id,
                userImage: user.imageUrl,
                userName: user.fullName || user.firstName || "",
            },
        });
    } catch (error) {
        console.log("AUDIT_LOG_ERROR", error);
    }
};
