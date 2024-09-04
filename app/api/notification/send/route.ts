import { prismaDb } from "@/lib/db";
import { sendEmail } from "@/lib/email";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const tasksToNotify = await prismaDb.task.findMany({
            where: {
                dueDate: {
                    lte: new Date(Date.now() + 24 * 60 * 60 * 1000), // Due within 24 hours
                },
                notificationSent: false,
            },
            include: {
                project: true,
            },
        });

        for (const task of tasksToNotify) {
            const emailContent = `
            <h1>Task Reminder</h1>
            <p>Your task "${task.title}" is due soon.</p>
            <p>Due Date: ${task.dueDate?.toLocaleString()}</p>
            ${task.project ? `<p>Project: ${task.project.name}</p>` : ""}
            <p>Description: ${task.description || "No description"}</p>
          `;

            await sendEmail(task.userEmail || "", "Task Due Soon", emailContent);

            await prismaDb.task.update({
                where: { id: task.id },
                data: { notificationSent: true },
            });
        }

        return NextResponse.json({ message: "Notifications sent successfully" });
    } catch (error) {
        console.error("[NOTIFICATION_SEND]", error);
        return new NextResponse("Error sending notifications", { status: 500 });
    }
}
