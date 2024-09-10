import { prismaDb } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { AuditLog } from "@prisma/client";
import { Check } from "lucide-react";
import Image from "next/image";

const CompletedPage = async () => {
    // const upcomingTasks = await prismaDb.task.findMany({
    //     where: {
    //         isCompleted: {
    //             equals: true,
    //         },
    //     },
    //     orderBy: {
    //         order: "asc",
    //     },
    // });
    const user = await currentUser();
    const logs = await prismaDb.auditLog.findMany({
        where: {
            clerkUserId: user?.id,
            action: {
                equals: "COMPLETE",
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return (
        <div className="h-full">
            <div className="mb-10 ">
                <h1 className="text-3xl font-semibold hover:outline hover:outline-1 outline-neutral-200 rounded-md ">
                    Activity
                </h1>
            </div>

            <div>
                {/* Loop over tasks, and differentiately render them according to dates */}
                {/* <UpcomingList data={upcomingTasks} /> */}
                <List data={logs} />
            </div>
        </div>
    );
};

export default CompletedPage;

function List({ data }: { data: AuditLog[] }) {
    // Create an object to store grouped tasks
    const groupedTasks: Record<string, AuditLog[]> = {};

    if (data?.length! <= 0) {
        return <p className="text-neutral-300">No task found</p>;
    }

    // Group tasks by date
    if (data) {
        data.forEach((log) => {
            const createdAt = log.createdAt!.toDateString(); // Convert createdAt to a string (e.g., "Mon Jul 25 2024")
            if (!groupedTasks[createdAt]) {
                groupedTasks[createdAt] = []; // Initialize an empty array for this date
            }
            groupedTasks[createdAt].push(log); // Add the log to the corresponding date
        });
    }

    return (
        <div className="w-full  ">
            {!groupedTasks && <p>Nothings here</p>}

            {Object.entries(groupedTasks).map(([date, logs]) => {
                const formattedDate = new Date(date).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                });
                const dayOfWeek = new Date(date).toLocaleDateString("en-US", {
                    weekday: "long",
                });

                return (
                    <div key={date} className="w-full mb-4">
                        <h2 className=" w-full  text-black inline-flex items-center border-b border-b-muted">
                            {formattedDate}
                            <span className="mx-4 w-1.5 h-1.5 rounded-full bg-neutral-300" />
                            {dayOfWeek}
                        </h2>
                        <ul className="space-y-2 mt-3 w-full">
                            {logs.map((log) => (
                                <li key={log.id} className="w-full border-b border-neutral-200 ">
                                    {/* Render task details here */}
                                    <div className="min-h-[55px] flex items-center gap-x-2  py-2 w-full">
                                        <div className="relative">
                                            <Image
                                                src={log.userImage}
                                                alt={`${log.userName}'s avatar`}
                                                width={50}
                                                height={50}
                                                className="object-cover rounded-full"
                                            />

                                            <div className="absolute bottom-0 right-0 z-30 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                                                <Check className="w-3 h-3 text-white " />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <p className="text-sm font-thin">
                                                <span className="font-medium">{log.userName} </span>
                                                {log.action.toLowerCase()}d a task:{" "}
                                                <span className="text-neutral-400">
                                                    {log.taskTitle}
                                                </span>
                                            </p>
                                            <span className="text-xs text-neutral-400">
                                                {log.createdAt.getHours()}:
                                                {log.createdAt.getMinutes()}
                                            </span>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                );
            })}
        </div>
    );
}
