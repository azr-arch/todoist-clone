"use client";

import axios from "axios";
import { AlertModal } from "@/components/alert-modal";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAction } from "@/hooks/use-action";
import { Task } from "@prisma/client";
import { Check, Delete, Edit, MoreVertical, Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// todo: ADD DUE DATE

export const TaskItem = ({ data }: { data: Task }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const enableEditing = () => {
        setIsEditing(true);
    };

    const disableEditing = () => {
        setIsEditing(false);
    };

    const onDelete = async () => {
        console.log("delete");
        setLoading(true);
        try {
            await axios.delete(`/api/tasks/${data.id}`);
            router.refresh();
            toast("Task delete", {
                description: "Task deleted successfully.",
            });
        } catch (error) {
            toast("Error occured", {
                description: "Make sure Task is not already delete.",
            });
        } finally {
            setLoading(false);
        }
    };

    // if (isEditing) {
    //     return (
    //         <AddTaskForm
    //             onClose={disableEditing}
    //             titleValue={data.title}
    //             descValue={data.description}
    //             taskId={data.id}
    //             sectionTypeValue={data.sectionType}
    //             dueDateValue={data.dueDate?.toDateString()}
    //         />
    //     );
    // }

    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                loading={loading}
                confirmLabel="Delete"
                title="Delete Task?"
            />
            <div className="w-full h-[70px] border-b border-b-neutral-200 flex items-start gap-x-4 relative">
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
                                onClick={() => setOpen(true)}
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
        </>
    );
};
