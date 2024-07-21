"use client";

import { Plus } from "lucide-react";
import { useState } from "react";

import { useAddTaskModal } from "@/hooks/use-add-task-modal";
import { AddTaskForm } from "./task-form/add-task-form";
import { Button } from "@/components/ui/button";

export const AddTaskButton = ({ sectionId, labelId }: { sectionId?: string; labelId?: string }) => {
    const [isActive, setIsActive] = useState(false);

    const toggleActive = () => {
        setIsActive((prev) => !prev);
    };

    return (
        <>
            {isActive ? (
                <AddTaskForm onCloseForm={toggleActive} sectionId={sectionId} labelId={labelId} />
            ) : (
                <Button
                    variant={"ghost"}
                    className="flex items-center gap-x-2 mb-4 px-0 hover:bg-transparent"
                    role="button"
                    onClick={toggleActive}
                >
                    <Plus className="w-4 h-4 text-orange-500" />
                    <p className="font-thin text-neutral-400 hover:text-orange-500 transition cursor-pointer">
                        Add task
                    </p>
                </Button>
            )}
        </>
    );
};
