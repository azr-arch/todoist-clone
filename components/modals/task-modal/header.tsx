"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useTaskModal } from "@/hooks/use-task-modal";
import { FullTask } from "@/lib/types";
import { Task } from "@prisma/client";
import { ChevronDown, ChevronUp, CopyPlus, Inbox, MoreHorizontal, Trash, X } from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { AlertModal } from "../alert-modal";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { FormSubmit } from "@/components/form/form-submit";
import { useAction } from "@/hooks/use-action";
import { copyTask } from "@/actions/copy-task";
import { ACTIONS_ICON_STYLES } from "@/app/(platform)/app/inbox/_components/section-actions";

interface HeaderProps {
    data: FullTask;
}

export const Header = ({ data }: HeaderProps) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const { onClose } = useTaskModal();

    const { execute } = useAction(copyTask, {
        onSuccess: () => {
            toast("Copied task!");
            onClose();
        },
        onError: (err) => {
            toast(err);
        },
    });

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
            onClose();
        }
    };

    const onCopy = (formData: FormData) => {
        const taskId = formData.get("taskId") as string;
        execute({
            taskId,
        });
    };

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
            <div className="px-4 text-neutral-400  h-12 flex items-center justify-between w-full">
                <Button variant={"ghost"} className="gap-x-1.5">
                    <Inbox className="size-4 stroke-1" />
                    Inbox
                </Button>

                <div className="flex items-center gap-x-2 ">
                    <div className="flex items-center">
                        <Button disabled variant={"ghost"} size="icon">
                            <ChevronDown className="size-5" />
                        </Button>

                        <Button disabled variant={"ghost"} size="icon">
                            <ChevronUp className="size-5" />
                        </Button>
                    </div>

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
                                <form action={onCopy} className="w-">
                                    <input type="hidden" name="taskId" value={data.id} readOnly />
                                    <FormSubmit
                                        variant="ghost"
                                        label="Duplicate"
                                        className="font-thin h-fit w-full flex items-center justify-start p-0"
                                        icon={<CopyPlus className={ACTIONS_ICON_STYLES} />}
                                    />
                                </form>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Button
                                    onClick={() => setOpen(true)}
                                    variant={"ghost"}
                                    className="font-thin text-red-500  w-full flex items-center justify-start  hover:text-red-600 h-fit px-0 py-.5"
                                >
                                    <Trash className="w-5 h-5 mr-4 stroke-1" />
                                    Delete
                                </Button>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <Button onClick={onClose} variant={"ghost"} size="icon">
                        <X className="size-5" />
                    </Button>
                </div>
            </div>
        </>
    );
};

Header.Skeleton = function HeaderSkeleton() {
    return (
        <div className="px-4   h-12 flex items-center justify-between w-full">
            <Skeleton className="h-9 w-[90px] px-4 py-2 rounded-md bg-neutral-200" />
            <div className="flex items-center gap-x-2">
                <div className="flex items-center">
                    <Button disabled variant={"ghost"} size="icon">
                        <ChevronDown className="size-5" />
                    </Button>

                    <Button disabled variant={"ghost"} size="icon">
                        <ChevronUp className="size-5" />
                    </Button>
                </div>

                <Button disabled variant={"ghost"} size="icon">
                    <MoreHorizontal className="size-5" />
                </Button>

                <Button disabled variant={"ghost"} size="icon">
                    <X className="size-5" />
                </Button>
            </div>
        </div>
    );
};
