"use client";

import { copySection } from "@/actions/copy-section";
import { updateSection } from "@/actions/update-section";
import { useAction } from "@/hooks/use-action";
import { SectionWithLists } from "@/lib/types";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { CopyPlus, Edit, MoreHorizontal, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { deleteSection } from "@/actions/delete-section";
import { useCallback } from "react";
import { FormSubmit } from "@/components/form/form-submit";
import { toast } from "sonner";

const ACTIONS_ICON_STYLES = "w-5 h-5 mr-3 text-[#828282]";

interface SectionActionsProps {
    data: SectionWithLists;
    enableEditing: () => void;
}

export const SectionActions = ({ data, enableEditing }: SectionActionsProps) => {
    const { execute: executeCopy, isLoading } = useAction(copySection, {
        onSuccess: () => {
            toast("Section copied successfully");
        },
        onError: (err) => {
            toast(err);
        },
    });

    const { execute: executeDelete } = useAction(deleteSection, {
        onSuccess: () => {
            toast("Section deleted successfully");
        },
        onError: (err) => {
            toast(err);
        },
    });

    const onCopy = useCallback(
        (formData: FormData) => {
            const sectionId = formData.get("sectionId") as string;

            executeCopy({
                sectionId,
            });
        },
        [executeCopy]
    );

    const onDelete = useCallback(
        (formData: FormData) => {
            const sectionId = formData.get("sectionId") as string;

            executeDelete({
                sectionId,
            });
        },
        [executeDelete]
    );

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <MoreHorizontal className="w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-[281px] py-2 text-[#343434]"
                side="bottom"
                sideOffset={4}
            >
                <DropdownMenuItem>
                    <Button
                        onClick={enableEditing}
                        variant={"ghost"}
                        className="font-thin h-fit w-full flex items-center justify-start p-0"
                    >
                        <Edit className={ACTIONS_ICON_STYLES} />
                        Edit
                    </Button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <form action={onCopy}>
                        <input value={data.id} name="sectionId" readOnly type="hidden" />

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
                    <form action={onDelete}>
                        <input value={data.id} name="sectionId" readOnly type="hidden" />

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
    );
};
