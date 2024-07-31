"use client";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn, createFormattedNameAndUrl } from "@/lib/utils";
import { Project } from "@prisma/client";
import { CopyPlus, Edit, Hash, MoreHorizontal, Trash2 } from "lucide-react";
import Link from "next/link";
import { ACTIONS_ICON_STYLES } from "../../inbox/_components/section-actions";
import { FormSubmit } from "@/components/form/form-submit";
import { useRouter } from "next/navigation";
import { useAction } from "@/hooks/use-action";
import { deleteProject } from "@/actions/delete-project";
import { toast } from "sonner";
import { copyProject } from "@/actions/copy-project";
import { AddProjectModal } from "@/components/modals/add-project-modal";
import { useState } from "react";

export const ProjectItem = ({ data }: { data: Project }) => {
    const { projectUrl, formattedProjectName } = createFormattedNameAndUrl(data.name, data.id);

    return (
        <div className="flex items-center justify-between min-h-[51px] gap-x-6 hover:bg-neutral-100 transition-colors px-2  rounded-md">
            <Link href={projectUrl} className="w-full ">
                <div className="flex  items-center gap-x-2">
                    <Hash className="size-4 font-thin" style={{ color: data.color }} />
                    <span className="font-thin text-sm text-neutral-600">{data.name}</span>
                </div>
            </Link>
            {/* This is dropdown menu with, trigger button */}
            <ProjectItemActions data={data} />
        </div>
    );
};

function ProjectItemActions({ data }: { data: Project }) {
    const [open, setOpen] = useState(false);

    const { execute: executeDelete, fieldErrors } = useAction(deleteProject, {
        onComplete: () => {},
        onSuccess: () => {
            toast("Project deleted successfully!");
        },
        onError: (err) => {
            toast(err);
        },
    });

    const { execute: executeCopy } = useAction(copyProject, {
        onComplete: () => {},
        onSuccess: () => {
            toast("Project Duplicated!");
        },
        onError: (err) => {
            toast(err);
        },
    });

    const onDelete = (formData: FormData) => {
        const projectId = formData.get("projectId") as string;
        executeDelete({ projectId });
    };

    const onCopy = (formData: FormData) => {
        const projectId = formData.get("projectId") as string;
        executeCopy({ projectId });
    };

    return (
        <>
            <AddProjectModal
                isOpen={open}
                onClose={() => setOpen(!open)}
                defaultFormValues={{
                    name: data.name,
                    projectId: data.id,
                    color: data.color,
                }}
            />
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Button
                        size={"icon"}
                        className="w-fit h-auto hover:bg-neutral-200"
                        variant={"ghost"}
                        asChild
                    >
                        <MoreHorizontal className="size-4  stroke-1" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    className="w-[281px] py-2 text-[#343434] "
                    side="left"
                    sideOffset={4}
                >
                    <DropdownMenuItem>
                        <Button
                            onClick={() => setOpen(true)}
                            variant={"ghost"}
                            className="font-thin h-fit w-full flex items-center text-sm justify-start p-0"
                        >
                            <Edit className={ACTIONS_ICON_STYLES} />
                            Edit
                        </Button>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <form action={onCopy} className="w-full">
                            <input value={data.id} name="projectId" readOnly type="hidden" />

                            <FormSubmit
                                variant="ghost"
                                label="Duplicate"
                                className="font-thin h-fit w-full flex items-center justify-start p-0"
                                icon={<CopyPlus className={ACTIONS_ICON_STYLES} />}
                            />
                        </form>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="w-full h-[1px] text-neutral-300 my-1.5" />
                    <DropdownMenuItem>
                        <form action={onDelete} className="w-full">
                            <input value={data.id} name="projectId" readOnly type="hidden" />

                            <FormSubmit
                                variant="ghost"
                                label="Delete"
                                className="font-thin text-red-400 hover:text-red-600 h-fit w-full flex items-center justify-start p-0"
                                icon={
                                    <Trash2
                                        className={cn(
                                            ACTIONS_ICON_STYLES,
                                            "text-inherit hover:text-inherit"
                                        )}
                                    />
                                }
                            />
                        </form>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}
