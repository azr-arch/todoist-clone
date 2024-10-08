"use client";

import { deleteLabel } from "@/actions/delete-label";
import { AddLabelModal } from "@/components/modals/add-label-modal";
import { AlertModal } from "@/components/modals/alert-modal";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAction } from "@/hooks/use-action";
import { useAddLabel } from "@/hooks/use-add-label-modal";
import { Label } from "@prisma/client";
import { Edit, Heart, MoreHorizontal, Tag, Trash } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { toast } from "sonner";

interface LabelItemProps {
    data: Label;
}

// TODO render the tasks assosiated with Label
export const LabelItem = ({ data }: LabelItemProps) => {
    const formattedLabelName = data.name.replace(/\s+/g, "-");
    const labelUrl = `/app/label/${formattedLabelName}_${data.id}`;
    const { isOpen, onClose, onOpen } = useAddLabel();

    const { execute, isLoading } = useAction(deleteLabel, {
        onSuccess: () => {
            toast("Deleted successfully");
        },
        onError: (err) => {
            toast(err);
        },
    });

    const clickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        e.preventDefault();
    };

    const onDelete = (formData: FormData) => {
        const labelId = formData.get("labelId") as string;

        execute({
            labelId,
        });
    };

    return (
        <>
            <AddLabelModal isOpen={isOpen} onClose={onClose} type="edit" />
            {/* TODO work on actionsn hide when dropdown is open */}
            <Link href={labelUrl}>
                <div className="min-h-[34px] group py-1 flex items-center justify-between border-b border-neutral-300/50">
                    <div className="flex items-center w-full ">
                        <Tag className="rotate-90 w-5 h-5  mr-3" />
                        <h3 className="font-thin text-sm">{data.name}</h3>
                    </div>

                    <div className="  flex items-center gap-x-.5">
                        <Button onClick={clickHandler} size={"icon"} variant={"ghost"}>
                            <Heart className="w-5 h-5" />
                        </Button>
                        <Button
                            onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                onOpen({ name: data.name, labelId: data.id, color: data.color });
                            }}
                            size={"icon"}
                            variant={"ghost"}
                        >
                            <Edit className="w-5 h-5" />
                        </Button>

                        <DropdownMenu>
                            <DropdownMenuTrigger className="ml-auto">
                                <Button variant={"ghost"} size={"icon"}>
                                    <MoreHorizontal className="w-5 h-5" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-[251px]"
                                side="bottom"
                                sideOffset={4}
                                align="end"
                                alignOffset={-20}
                            >
                                <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                                    <Button
                                        // onClick={enableEditing}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            e.preventDefault();
                                            onOpen({
                                                name: data.name,
                                                labelId: data.id,
                                                color: data.color,
                                            });
                                        }}
                                        variant={"ghost"}
                                        className="font-thin h-fit w-full flex items-center justify-start p-0"
                                    >
                                        <Edit className="w-5 h-5 mr-4" />
                                        Edit
                                    </Button>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                                    <form action={onDelete}>
                                        <input
                                            type="hidden"
                                            name="labelId"
                                            value={data.id}
                                            readOnly
                                        />
                                        <Button
                                            type="submit"
                                            variant={"ghost"}
                                            className="font-thin text-red-500  w-full flex items-center justify-start  hover:text-red-600 h-fit p-0"
                                        >
                                            <Trash className="w-5 h-5 mr-4" />
                                            Delete
                                        </Button>
                                    </form>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </Link>
        </>
    );
};
