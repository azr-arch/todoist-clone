import { prismaDb } from "@/lib/db";
import { sendEmail } from "@/lib/email";
import { Task } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const today = new Date();
        const formattedDate = today.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });

        // Map to group overdue tasks by user emai
        let userEmailToTaskMap: Record<string, Task[]> = {};

        // Fetch all overdue tasks
        const overdueTasks = await prismaDb.task.findMany({
            where: {
                dueDate: { lt: today }, // Already due task
                isCompleted: false, // Not a complete
                notificationSent: false,
            },
            include: {},
        });

        // Group all the task to specific user
        for (const task of overdueTasks) {
            if (userEmailToTaskMap[task.userEmail!]) {
                userEmailToTaskMap[task.userEmail!].push(task);
            } else {
                userEmailToTaskMap[task.userEmail!] = [task];
            }
        }

        const notifiedTaskIds: string[] = [];

        for (const [userEmail, tasks] of Object.entries(userEmailToTaskMap)) {
            const taskCount = tasks.length;

            const emailContent = `
                    <h1>Tasks for ${formattedDate} -> ${taskCount} overdue</h1>
                    <p>You have no task due today, but you do have ${taskCount} overdue task</p>
                    <p>No problem, you can reschedule and even delete these task.</p>
                    `;

            try {
                await sendEmail(userEmail, "Overdue Task Notification", emailContent);
                console.log(`[EMAIL_SENT]: Successfully sent to ${userEmail}`);

                // Add all task IDs to the list for batch update
                notifiedTaskIds.push(...tasks.map((task) => task.id));
            } catch (error) {
                console.error(`[EMAIL_ERROR]: Failed to send to ${userEmail}:`, error);
            }
        }

        // Batch update the `notificationSent` field for all tasks
        if (notifiedTaskIds.length > 0) {
            await prismaDb.task.updateMany({
                where: {
                    id: { in: notifiedTaskIds },
                },
                data: {
                    notificationSent: true,
                },
            });

            console.log(`[DB_UPDATE]: Marked ${notifiedTaskIds.length} tasks as notified.`);
        }

        return NextResponse.json({ success: true, message: "Sent email to user successfully" });
    } catch (error) {
        console.error("[CRON_JOB]: ", error);
        return new NextResponse("Error sending notification to user", { status: 500 });
    }
}
