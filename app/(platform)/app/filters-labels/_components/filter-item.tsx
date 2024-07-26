"use client";

import { deleteFilter } from "@/actions/delete-filter";
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
import { useAddFilterModal } from "@/hooks/use-add-filter-modal";
import { useAddLabel } from "@/hooks/use-add-label-modal";
import { Filter, Label } from "@prisma/client";
import { Droplet, Edit, Heart, MoreHorizontal, Tag, Trash } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

interface FilterItemProps {
    data: Filter;
}

// TODO render the tasks assosiated with Label
export const FilterItem = ({ data }: FilterItemProps) => {
    const formattedFilterName = data.name.replace(/\s+/g, "-");
    const filterUrl = `/app/filter/${formattedFilterName}_${data.id}`;
    const { isOpen, onClose, onOpen } = useAddFilterModal();

    const { execute } = useAction(deleteFilter, {
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
        const filterId = formData.get("filterId") as string;

        execute({
            filterId,
        });
    };

    return (
        <>
            <AddLabelModal isOpen={isOpen} onClose={onClose} type="edit" />
            {/* TODO work on actionsn hide when dropdown is open */}
            <Link href={filterUrl}>
                <div className="min-h-[34px] group py-1 flex items-center justify-between border-b border-neutral-300/50">
                    <div className="flex items-center w-full ">
                        <Droplet className=" w-5 h-5  mr-3" style={{ color: data.color }} />
                        <h3 className="font-thin text-sm">{data.name}</h3>
                    </div>

                    <div className="group-hover:opacity-100  group-focus-visible::opacity-100 group-focus:visible group-hover:visible invisible opacity-0 transition-opacity flex items-center gap-x-.5">
                        <Button onClick={clickHandler} size={"icon"} variant={"ghost"}>
                            <Heart className="w-5 h-5" />
                        </Button>
                        <Button
                            onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                onOpen({
                                    name: data.name,
                                    filterId: data.id,
                                    color: data.color,
                                    query: data.query,
                                });
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
                                                filterId: data.id,
                                                color: data.color,
                                                query: data.query,
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
                                            name="filterId"
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
