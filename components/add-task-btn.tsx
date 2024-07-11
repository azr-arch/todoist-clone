"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { AddTaskForm } from "./form/add-task-form";

export const AddTaskButton = () => {
    const [isActive, setIsActive] = useState(false);

    const toggleActive = () => {
        setIsActive((prev) => !prev);
    };

    return (
        <>
            {isActive ? (
                <AddTaskForm onClose={toggleActive} />
            ) : (
                <div className="flex items-center gap-x-2" role="button" onClick={toggleActive}>
                    <Plus className="w-4 h-4 text-orange-500" />
                    <p className="font-thin text-neutral-400 hover:text-orange-500 transition cursor-pointer">
                        Add task
                    </p>
                </div>
            )}
        </>
    );
};
