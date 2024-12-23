"use client";

import { Task } from "@prisma/client";
import { DateHeader } from "@/components/date-header";
import { useEffect, useState } from "react";
import { generateInitialDates } from "@/lib/utils";
import { FullTask } from "@/lib/types";
import { TaskWithDate } from "./upcoming-list-item";

interface UpcomingListProps {
    data?: Task[];
}

const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
};

export const UpcomingList = ({ data }: UpcomingListProps) => {
    // const [dates, setDates] = useState(generateInitialDates());
    const [groupedTasks, setGroupedTasks] = useState<any>({});

    useEffect(() => {
        if (data) {
            const newGroupedTasks: any = {};
            data.forEach((task) => {
                const dueDate = formatDate(new Date(task.dueDate!)); // Use the formatDate function
                if (dueDate && !newGroupedTasks[dueDate]) {
                    newGroupedTasks[dueDate] = [];
                }

                if (dueDate) {
                    newGroupedTasks[dueDate].push(task);
                }
            });
            setGroupedTasks(newGroupedTasks);
        }
    }, [data]);

    return (
        <div className="w-full  ">
            {/* {dates.map((date) => (
                // <TaskWithDate key={date} date={date} tasks={} />
            ))} */}
            Building....
        </div>
    );
};
