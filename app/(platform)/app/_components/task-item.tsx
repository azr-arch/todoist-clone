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
import {
    ArrowUpDown,
    Calendar,
    Check,
    Delete,
    Edit,
    MoreHorizontal,
    MoreVertical,
    Trash,
} from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { usePathname, useRouter } from "next/navigation";
import { cn, formatDate } from "@/lib/utils";

import { Draggable, Droppable } from "@hello-pangea/dnd";
import { CircleBackslashIcon } from "@radix-ui/react-icons";

// todo: ADD DUE DATE

export const TaskItem = ({
    data,
    className,
    index,
}: {
    data: Task;
    className?: string;
    index: number;
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    const enableEditing = () => {
        setIsEditing(true);
    };

    const disableEditing = () => {
        setIsEditing(false);
    };

    const onDelete = async () => {
        setLoading(true);
        try {
            await axios.delete(`/api/tasks/${data.id}`);
            router.refresh();
            toast("Task deleted", {
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

    const dueDateText = useMemo(() => {
        if (!data.dueDate) return;
        return formatDate(data.dueDate);
    }, [data.dueDate]);

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
            {/* Work in this */}
            <Draggable draggableId={data.id} index={index}>
                {(provided) => (
                    <div
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                        className={cn(
                            "w-full  border-b border-b-neutral-200 px-2 flex flex-col h-fit justify-between pb-2 items-start group "
                            // `${pathname === "/app/today" ? "h-[70px]" : "h-[58px]"}`
                        )}
                    >
                        <div className="flex items-center gap-x-4 relative w-full">
                            {/* This is the button that should trigger dnd, not whole item */}
                            <div
                                {...provided.dragHandleProps}
                                className="absolute -left-7 -top-.5 z-40 rounded-md p-1 group-hover:opacity-100 cursor-move group-hover:visible opacity-0 invisible transition-colors hover:bg-neutral-200 text-neutral-500 hover:text-neutral-700"
                            >
                                <ArrowUpDown className="w-4 h-4 " />
                            </div>

                            {/* Checkbox */}
                            <div className="rounded-full w-5 h-5 bg-transparent border cursor-pointer border-neutral-400  flex items-center justify-center">
                                <Check className="text-neutral-400 w-[14px] h-[14px] transition-opacity opacity-0 hover:opacity-100 " />
                            </div>
                            <p className="text-black text-sm leading-none truncate">{data.title}</p>

                            {/* Actions */}
                            <DropdownMenu>
                                <DropdownMenuTrigger className="ml-auto">
                                    <MoreHorizontal className="w-4 h-4" />
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

                        <div className="ml-8 ">
                            {data.description && (
                                <p className="font-thin ml-1 text-neutral-500 text-xs leading-relaxed">
                                    {data.description}
                                </p>
                            )}

                            {data.dueDate && pathname === "/app/inbox" ? (
                                <div
                                    className={cn(
                                        "flex items-center px-1 mt-1.5",
                                        `${
                                            dueDateText === "Today"
                                                ? "text-green-600"
                                                : dueDateText === "Tomorrow"
                                                ? "text-red-400"
                                                : "text-neutral-400"
                                        }`
                                    )}
                                >
                                    <Calendar className="w-3 h-3 mr-1" />
                                    <p className={"text-xs font-thin"}>{dueDateText}</p>
                                </div>
                            ) : null}
                        </div>
                    </div>
                )}
            </Draggable>
        </>
    );
};
