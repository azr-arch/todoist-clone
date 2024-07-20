"use client";

import { Section as SectionType, Task } from "@prisma/client";
import { useState } from "react";
import { AddTaskButton } from "../../_components/add-task-btn";
import { TaskList } from "../../_components/tasklist";
import { SectionHeader } from "./section-header";

interface SectionProps {
    data: SectionType & {
        tasks?: Task[];
    };
}

export const Section = ({ data }: SectionProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
        setIsOpen((prev) => !prev);
    };

    return (
        <div className="w-full">
            <SectionHeader data={data} isOpen={isOpen} toggleListOpen={toggleOpen} />
            {isOpen && (
                <div className="">
                    <TaskList data={data.tasks} />
                    <div className="px-7">
                        <AddTaskButton sectionId={data.id} />
                    </div>
                </div>
            )}
        </div>
    );
};
