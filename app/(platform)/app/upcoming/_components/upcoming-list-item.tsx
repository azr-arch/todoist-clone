"use client";

import axios from "axios";
import { AlertModal } from "@/components/modals/alert-modal";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label, Task } from "@prisma/client";
import { ArrowUpDown, Calendar, Check, Edit, MoreHorizontal, Tag, Trash } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { usePathname, useRouter } from "next/navigation";
import { cn, formatDate } from "@/lib/utils";

import { Draggable, Droppable } from "@hello-pangea/dnd";
import { EditTaskForm } from "../../_components/task-form/edit-task-form";

interface UpcomingListItemProps {
    data: Task & {
        labels?: {
            label?: Label;
        }[];
    };
}

export const UpcomingListItem = ({ data }: UpcomingListItemProps) => {
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
                description: "Make sure Task is not already deleted.",
            });
        } finally {
            setLoading(false);
        }
    };

    const onComplete = async () => {
        setLoading(true);
        try {
            await axios.patch(`/api/tasks/${data.id}`);
            router.refresh();
            toast("1 Task completed", {
                description: "Task completed!.",
            });
        } catch (error) {
            console.log("Error while completing task");
            toast("Error occured", {
                description: "Make sure the Task exists.",
            });
        } finally {
            setLoading(false);
        }
    };

    if (isEditing) {
        return (
            <EditTaskForm
                onClose={disableEditing}
                taskId={data.id}
                defaultFormValues={{
                    title: data.title,
                    description: data.description!,
                    dueDate: data.dueDate!,
                    sectionType: data.sectionType!,
                }}
            />
        );
    }
    // TODO fix group hover bug
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
            {/* Implement draggable , but instead of ordering, change due date! */}
            <div
                // {...provided.draggableProps}
                // ref={provided.innerRef}
                className={cn(
                    "w-full border-b h-fit min-h-[55px] border-b-neutral-200 px-2 flex flex-col justify-between pb-2 items-start group"
                )}
            >
                <div className="flex items-center gap-x-4 relative w-full">
                    <div
                        // {...provided.dragHandleProps}
                        className="absolute -left-7 -top-.5 z-40 rounded-md p-1 group-hover:opacity-100 cursor-move group-hover:visible opacity-0 invisible transition-colors hover:bg-neutral-200 text-neutral-500 hover:text-neutral-700"
                    >
                        <ArrowUpDown className="w-4 h-4 " />
                    </div>

                    {/* Checkbox to comeplete task */}
                    <button
                        disabled={loading}
                        onClick={onComplete}
                        className="disabled:opacity-50 disabled:cursor-not-allowed rounded-full w-5 h-5 bg-transparent border cursor-pointer border-neutral-400  flex items-center justify-center"
                    >
                        <Check className="text-neutral-400 w-[14px] h-[14px] transition-opacity opacity-0 hover:opacity-100 " />
                    </button>
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

                    <div className="flex items-end gap-x-1.5">
                        {data.labels && data.labels.length > 0
                            ? data.labels.map((label) => {
                                  // This logs correct value, why am i getting double label nested ?
                                  return (
                                      <div
                                          key={label.label?.id}
                                          className="flex items-center gap-x-1.5 "
                                          style={{ color: label.label?.color }}
                                      >
                                          <Tag className="rotate-90 size-3" />
                                          <p className="text-xs font-thin">{label.label?.name}</p>
                                      </div>
                                  );
                              })
                            : null}
                    </div>
                </div>
            </div>
        </>
    );
};
