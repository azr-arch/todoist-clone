"use client";

import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight, Plus } from "lucide-react";
import { useState } from "react";
import { LabelItem } from "./label-item";
import { Filter, Label } from "@prisma/client";
import { LabelWithLists } from "@/lib/types";
import { FilterItem } from "./filter-item";

interface CollapsibleListProps {
    title: string;
    onDialogOpen?: () => void;
    data?: LabelWithLists[]; // Add filter type too..
    type: "filter" | "label";
}

export const CollapsibleList = ({ title, onDialogOpen, data, type }: CollapsibleListProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleList = () => {
        setIsOpen((prev) => !prev);
    };

    return (
        <div>
            <div className="relative border-b border-neutral-200 ">
                <div className="w-full flex items-center justify-between">
                    <h3 className="font-medium text-black leading-relaxed">{title}</h3>
                    <Button onClick={onDialogOpen} variant={"ghost"} size={"icon"}>
                        <Plus className="w-4 h-4" />
                    </Button>
                </div>

                {/* Open / Close list btn */}
                <Button
                    onClick={toggleList}
                    size={"xs"}
                    className="px-1 absolute top-1.5 -left-7"
                    variant={"ghost"}
                >
                    {isOpen ? (
                        <ChevronDown className="w-4 h-4" />
                    ) : (
                        <ChevronRight className="w-4 h-4" />
                    )}
                </Button>
            </div>

            <div className="py-1">
                {isOpen ? (
                    !data || data.length <= 0 ? (
                        <p className="text-sm font-thin text-neutral-400">
                            {type === "filter"
                                ? "Your list of filters will show up here."
                                : "Your list of labels will show up here."}
                        </p>
                    ) : (
                        <ul>
                            {data.map((item) => {
                                // render filter item
                                if (type === "filter") {
                                    return <FilterItem key={item.id} data={item as Filter} />;
                                } else if (type === "label") {
                                    // render label item
                                    return <LabelItem key={item.id} data={item} />;
                                }
                                return null;
                            })}
                        </ul>
                    )
                ) : null}
            </div>
        </div>
    );
};
