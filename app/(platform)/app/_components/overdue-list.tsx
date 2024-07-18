"use client";

import { Button } from "@/components/ui/button";
import { Task } from "@prisma/client";
import { ArrowRight, ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import { TaskList } from "./tasklist";

interface OverdueListProps {
    data?: Task[];
}

export const OverdueList = ({ data }: OverdueListProps) => {
    const [open, setOpen] = useState(false);

    const toggleOpen = () => {
        setOpen((prev) => !prev);
    };

    return (
        <div className="w-full">
            {data && data.length > 0 ? (
                <div className="mb-8">
                    <div className="w-full flex items-center h-fit mb-4">
                        <Button onClick={toggleOpen} variant={"ghost"} size={"xs"} className="mr-2">
                            {open ? (
                                <ChevronDown className="w-3 h-3" />
                            ) : (
                                <ChevronRight className="w-3 h-3" />
                            )}
                        </Button>
                        <h3 className="w-full font-semibold text-black border-b border-neutral-200">
                            Overdue
                        </h3>
                    </div>
                    {open ? <TaskList data={data} /> : null}
                </div>
            ) : null}
        </div>
    );
};
