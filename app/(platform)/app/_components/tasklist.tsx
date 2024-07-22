"use client";

import { Label, Task } from "@prisma/client";
import { TaskItem } from "./task-item";
import { DragDropContext, DropResult, Droppable } from "@hello-pangea/dnd";
import Image from "next/image";
import { useEffect, useState } from "react";
import { generateHeading } from "@/lib/utils";
import { useAction } from "@/hooks/use-action";
import { updateTaskOrder } from "@/actions/update-task-order";
import { toast } from "sonner";
import { CustomCalendar } from "@/components/custom-calendar";

interface TaskListProps {
    data?: Task[];
    className?: string;
    expiredItemExists?: boolean;
    label?: Label;
}

export const TaskList = ({ data, className, expiredItemExists, label }: TaskListProps) => {
    const [orderedData, setOrderedData] = useState(data);

    const { execute } = useAction(updateTaskOrder, {
        onComplete: () => {},
        onSuccess: () => {
            toast("Tasks reordered");
        },

        onError: (err) => {
            toast(err);
        },
    });

    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result;

        if (!destination || !orderedData) return;

        // Dropped in same position
        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        // Create a deep copy of the objects within orderedData
        const reorderedData = orderedData.map((task) => ({ ...task }));
        const [removedTask] = reorderedData.splice(source.index, 1);
        reorderedData.splice(destination.index, 0, removedTask);

        reorderedData[destination.index].order = orderedData[destination.index].order;

        for (let i = source.index; i < destination.index; i += 1) {
            reorderedData[i].order = orderedData[i].order;
        }

        setOrderedData(reorderedData);

        execute({
            items: reorderedData,
        });
    };

    useEffect(() => {
        setOrderedData(data);
    }, [data]);

    return (
        <div className="w-full  ">
            {/* For now this heading is only available in inbox page */}

            {/* Todo: reimplement date heading  */}
            {expiredItemExists && (
                <h2 className=" w-full font-medium px-2 mb-4 text-black inline-flex items-center border-b border-b-muted">
                    {generateHeading(new Date())}
                </h2>
            )}
            {orderedData && orderedData.length > 0 ? (
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="tasks" type="task" direction="vertical">
                        {(provided) => (
                            <ul
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className="space-y-4 w-full"
                            >
                                {orderedData.map((task, idx) => {
                                    return (
                                        <li key={task.id}>
                                            <TaskItem
                                                index={idx}
                                                className={className}
                                                data={task}
                                            />
                                        </li>
                                    );
                                })}

                                {provided.placeholder}
                            </ul>
                        )}
                    </Droppable>
                </DragDropContext>
            ) : null}
        </div>
    );
};
