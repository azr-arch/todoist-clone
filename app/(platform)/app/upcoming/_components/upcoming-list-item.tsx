"use client";

import { DateHeader } from "@/components/date-header";
import { FullTask } from "@/lib/types";
import { generateHeading } from "@/lib/utils";
import { useState } from "react";

interface TaskWithDateProps {
    date: Date;
    tasks: FullTask[];
}

export const TaskWithDate = ({ date, tasks }: TaskWithDateProps) => {
    return (
        <div className="w-full">
            <h1 className="text-lg text-neutral-400 font-medium">{generateHeading(date)}</h1>
        </div>
    );
};
