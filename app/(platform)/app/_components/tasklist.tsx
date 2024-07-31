"use client";

import { Label, Priority, Task } from "@prisma/client";
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
    ordering?: "priority" | "order";
    // Add ordering variable that will help in organize the list
    // Like some page where this component used, prefers the tasks to be ordered with data.order not data.prooirty
}

const priorityOrder = [Priority.p1, Priority.p2, Priority.p3, Priority.p4];

export const TaskList = ({
    data,
    className,
    expiredItemExists,
    ordering = "order",
}: TaskListProps) => {
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

    // TODO: Fix reordering when ordering === "priority"
    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result;

        if (!destination || !orderedData) return;

        // Dropped in same position
        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        const sourceTask = orderedData[source.index];
        const destTask = orderedData[destination.index];

        // Prevent reordering between different priority levels
        if (ordering === "priority") {
            if ((sourceTask.priority || "p4") !== (destTask.priority || "p4")) {
                toast("Cannot reorder tasks with different priorities");
                return;
            }
        }

        // Create a deep copy of the objects within orderedData
        const reorderedData = orderedData.map((task) => ({ ...task }));
        const [removedTask] = reorderedData.splice(source.index, 1);
        reorderedData.splice(destination.index, 0, removedTask);

        // Update order numbers within the same priority group
        // const priorityGroup = reorderedData.filter(
        //     (task) => (task.priority || "p4") === (sourceTask.priority || "p4")
        // );
        // priorityGroup.forEach((task, index) => {
        //     task.order = index + 1;
        // });

        // Create a deep copy of the objects within orderedData
        // const reorderedData = orderedData.map((task) => ({ ...task }));
        // const [removedTask] = reorderedData.splice(source.index, 1);
        // reorderedData.splice(destination.index, 0, removedTask);

        // reorderedData[destination.index].order = orderedData[destination.index].order;

        // for (let i = source.index; i < destination.index; i += 1) {
        //     reorderedData[i].order = orderedData[i].order;
        // }

        setOrderedData(reorderedData);

        execute({
            items: reorderedData,
        });
    };

    useEffect(() => {
        if (data) {
            if (ordering === "order") {
                setOrderedData(data);
            } else {
                const sortedData = [...data].sort((a, b) => {
                    const priorityA = a.priority || "p4";
                    const priorityB = b.priority || "p4";
                    const priorityDiff =
                        priorityOrder.indexOf(priorityA) - priorityOrder.indexOf(priorityB);
                    return priorityDiff !== 0 ? priorityDiff : a.order - b.order;
                });

                setOrderedData(sortedData);
            }
        }
    }, [data, ordering]);

    return (
        <div className="w-full  ">
            {expiredItemExists && (
                <h2 className=" w-full font-medium px-2 mb-4 text-black inline-flex items-center border-b border-b-muted">
                    {generateHeading(new Date())}
                </h2>
            )}
            {orderedData && orderedData.length > 0 ? (
                <DragDropContext onDragEnd={onDragEnd}>
                    {ordering === "priority" ? (
                        // Priority-based ordering
                        priorityOrder.map((priority) => (
                            <Droppable
                                key={priority}
                                droppableId={`priority-${priority}`}
                                type="task"
                                direction="vertical"
                            >
                                {(provided) => (
                                    <ul
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                        className="space-y-4 my-4"
                                    >
                                        {orderedData
                                            .filter((task) => task.priority === priority)
                                            .map((task, idx) => (
                                                <li key={task.id}>
                                                    <TaskItem
                                                        index={idx}
                                                        className={className}
                                                        data={task}
                                                    />
                                                </li>
                                            ))}
                                        {provided.placeholder}
                                    </ul>
                                )}
                            </Droppable>
                        ))
                    ) : (
                        // Order-based ordering
                        <Droppable droppableId="tasks" type="task" direction="vertical">
                            {(provided) => (
                                <ul
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    className="space-y-4 w-full"
                                >
                                    {orderedData.map((task, idx) => (
                                        <li key={task.id}>
                                            <TaskItem
                                                index={idx}
                                                className={className}
                                                data={task}
                                            />
                                        </li>
                                    ))}
                                    {provided.placeholder}
                                </ul>
                            )}
                        </Droppable>
                    )}
                </DragDropContext>
            ) : null}
        </div>
    );
};
