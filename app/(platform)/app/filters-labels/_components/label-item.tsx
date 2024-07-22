"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@prisma/client";
import { Edit, Heart, MoreHorizontal, Tag } from "lucide-react";
import Link from "next/link";

interface LabelItemProps {
    data: Label;
}

// TODO render the tasks assosiated with Label
export const LabelItem = ({ data }: LabelItemProps) => {
    const formattedLabelName = data.name.replace(/\s+/g, "-");
    const labelUrl = `/app/label/${formattedLabelName}_${data.id}`;

    const clickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        e.preventDefault();
        console.log("Clicked actions");
    };

    return (
        <Link href={labelUrl}>
            <div className="min-h-[34px] group py-1 flex items-center justify-between border-b border-neutral-300/50">
                <div className="flex items-center w-full ">
                    <Tag className="rotate-90 text-neutral-500 w-5 h-5  mr-3" />
                    <h3 className="font-thin text-sm">{data.name}</h3>
                </div>

                <div className="group-hover:opacity-100 group-hover:visible invisible opacity-0 transition-opacity flex items-center gap-x-.5">
                    <Button onClick={clickHandler} size={"icon"} variant={"ghost"}>
                        <Heart className="w-5 h-5" />
                    </Button>
                    <Button onClick={clickHandler} size={"icon"} variant={"ghost"}>
                        <Edit className="w-5 h-5" />
                    </Button>
                    <Button onClick={clickHandler} size={"icon"} variant={"ghost"}>
                        <MoreHorizontal className="w-5 h-5" />
                    </Button>
                </div>
            </div>
        </Link>
    );
};
