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
import { Calendar, Check, Delete, Edit, MoreVertical, Trash } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { usePathname, useRouter } from "next/navigation";
import { cn, formatDate } from "@/lib/utils";

// todo: ADD DUE DATE

export const TaskItem = ({
    data,
    className,
    dueDateVisible,
}: {
    data: Task;
    className?: string;
    dueDateVisible?: boolean;
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
        console.log("delete");
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
            <div
                className={cn(
                    "w-full  border-b border-b-neutral-200 flex flex-col  justify-between pb-2 items-start ",
                    `${pathname === "/app/today" ? "h-[70px]" : "h-[58px]"}`
                )}
            >
                <div className="flex items-start gap-x-4 relative w-full">
                    {/* Checkbox */}
                    <div className="group rounded-full w-5 h-5 bg-transparent border cursor-pointer border-neutral-400  flex items-center justify-center">
                        <Check className="text-neutral-400 w-[14px] h-[14px] transition-opacity opacity-0 group-hover:opacity-100 " />
                    </div>
                    <div className="">
                        <p className="text-black text-sm leading-none truncate">{data.title}</p>
                        {data.description && (
                            <p className="font-thin text-neutral-500 text-xs leading-relaxed">
                                {data.description}
                            </p>
                        )}

                        {dueDateVisible && data.dueDate && (
                            <div className="text-neutral-300 flex items-center text-">
                                <Calendar className="w-3 h-3 mr-2" />
                                <p>{data.dueDate.toISOString()}</p>
                            </div>
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

                <div className="ml-8">
                    {data.dueDate && pathname === "/app/inbox" ? (
                        <div
                            className={cn(
                                "flex items-center px-1 ",
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
        </>
    );
};
