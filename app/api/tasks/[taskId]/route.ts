import { createAuditLog } from "@/lib/create-audit-log";
import { prismaDb } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, { params }: { params: { taskId: string } }) {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 403 });
        }

        if (!params.taskId) {
            return new NextResponse("Task id is required", { status: 400 });
        }

        const task = await prismaDb.task.delete({
            where: {
                id: params.taskId,
            },
        });

        console.log({ task });

        return NextResponse.json(task);
    } catch (error) {
        console.log("[TASK_DELETE_API]", error);
        return new NextResponse("INTERNAL ERROR ", { status: 500 });
    }
}

export async function PATCH(req: Request, { params }: { params: { taskId: string } }) {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 403 });
        }

        if (!params.taskId) {
            return new NextResponse("Task id is required", { status: 400 });
        }

        const task = await prismaDb.task.update({
            where: {
                id: params.taskId,
            },
            data: {
                isCompleted: true,
            },
        });

        await createAuditLog({
            taskId: params.taskId,
            taskTitle: task.title,
            action: "COMPLETE",
        });

        return NextResponse.json(task);
    } catch (error) {
        console.log("[TASK_PATCH_API]", error);
        return new NextResponse("INTERNAL ERROR ", { status: 500 });
    }
}
