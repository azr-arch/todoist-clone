"use client";

import { AddTaskForm } from "@/components/form/add-task-form";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Task } from "@prisma/client";
import { Check, Delete, Edit, MoreVertical, Trash } from "lucide-react";
import { useState } from "react";

export const TaskItem = ({ data }: { data: Task }) => {
    const [isEditing, setIsEditing] = useState(false);

    const enableEditing = () => {
        setIsEditing(true);
    };

    const disableEditing = () => {
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <AddTaskForm
                onClose={disableEditing}
                titleValue={data.title}
                descValue={data.description}
                taskId={data.id}
                sectionTypeValue={data.sectionType}
                dueDateValue={data.dueDate?.toDateString()}
            />
        );
    }

    return (
        <div className="w-full h-20  border-b border-b-neutral-300 flex items-start gap-x-4 relative">
            {/* Checkbox */}
            <div className="group rounded-full w-5 h-5 bg-transparent border cursor-pointer border-neutral-400  flex items-center justify-center">
                <Check className="text-neutral-400 w-[14px] h-[14px] transition-opacity opacity-0 group-hover:opacity-100 " />
            </div>
            <div className="truncate">
                <p className="text-black text-sm leading-none">{data.title}</p>
                {data.description && (
                    <p className="font-thin text-neutral-500 text-xs ">{data.description}</p>
                )}
            </div>

            {/* Actions */}
            <DropdownMenu>
                <DropdownMenuTrigger className="ml-auto">
                    <MoreVertical className="w-4 h-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    className="w-[251px]"
                    side="bottom"
                    sideOffset={4}
                    align="end"
                    alignOffset={-20}
                >
                    <DropdownMenuItem>
                        <Button
                            onClick={enableEditing}
                            variant={"ghost"}
                            className="font-thin h-fit w-full flex items-center justify-start p-0"
                        >
                            <Edit className="w-5 h-5 mr-4" />
                            Edit
                        </Button>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Button
                            variant={"ghost"}
                            className="font-thin text-red-500  w-full flex items-center justify-start  hover:text-red-600 h-fit p-0"
                        >
                            <Trash className="w-5 h-5 mr-4" />
                            Delete
                        </Button>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};
