"use client";

import { Task } from "@prisma/client";
import { Circle } from "lucide-react";
import { UpcomingListItem } from "./upcoming-list-item";
import { AddTaskButton } from "../../_components/add-task-btn";
import { EmptyTasks } from "@/components/empty-tasks";

interface UpcomingListProps {
    data?: Task[];
}

export const UpcomingList = ({ data }: UpcomingListProps) => {
    // Create an object to store grouped tasks
    const groupedTasks: Record<string, Task[]> = {};

    if (data?.length! <= 0) {
        return <p className="text-neutral-300">No task found</p>;
    }

    // Group tasks by date
    if (data) {
        data.forEach((task) => {
            const dueDate = task.dueDate!.toDateString(); // Convert dueDate to a string (e.g., "Mon Jul 25 2024")
            if (!groupedTasks[dueDate]) {
                groupedTasks[dueDate] = []; // Initialize an empty array for this date
            }
            groupedTasks[dueDate].push(task); // Add the task to the corresponding date
        });
    }

    return (
        <div className="w-full  ">
            {!groupedTasks && <EmptyTasks />}

            {Object.entries(groupedTasks).map(([date, tasks]) => {
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
                        <ul className="space-y-2 mt-3">
                            {tasks.map((task) => (
                                <li key={task.id}>
                                    {/* Render task details here */}
                                    <UpcomingListItem data={task} />
                                </li>
                            ))}
                        </ul>
                        <div className="">
                            <AddTaskButton />
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
