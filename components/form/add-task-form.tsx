"use client";

import { DatePickerDemo } from "../date-picker";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { AutosizeTextArea } from "./autosize-textarea";
import { SubmitButton } from "./submit-button";
import { useFormState } from "react-dom";
import { addTask } from "@/actions/add-task";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { Check, Info } from "lucide-react";
import { toast } from "sonner";

const initialState: { message: string | null } = {
    message: null,
};

interface AddTaskFormProps {
    onClose: () => void;
    titleValue?: string | null;
    descValue?: string | null;
    taskId?: string | null;
    sectionTypeValue?: string | null;
    // Implement this
    dueDateValue?: string;
    // add form actions and make it dynamic
}

export const AddTaskForm = ({
    onClose,
    titleValue,
    descValue,
    taskId,
    sectionTypeValue,
    dueDateValue,
}: AddTaskFormProps) => {
    const [state, formAction] = useFormState(addTask, initialState);
    const pathname = usePathname();

    useEffect(() => {
        if (state.error) {
            toast(state.error, {
                description: "An error occured, please try again later!",
            });
        } else if (state.message) {
            toast(state.message, {
                description: `The task has been successfully ${
                    state.message.includes("updated") ? "updated" : "added"
                }.`,
            });
        }

        // This is temporary
        if (state.message) {
            onClose();
        }
    }, [onClose, state]);

    return (
        <div className="w-full rounded-md border-neutral-300 border min-h-[158px] relative">
            <form action={formAction} className="w-full h-full">
                <div className="p-2 flex flex-col items-start w-full">
                    <input
                        name="title"
                        placeholder="Task name"
                        type="text"
                        className="font-medium text-black placeholder:text-neutral-400 bg-transparent w-full focus:outline-none p-1"
                        autoComplete="off"
                        defaultValue={titleValue || ""}
                    />

                    <AutosizeTextArea value={descValue || ""} />
                    <div className="mt-3">
                        <DatePickerDemo />
                    </div>
                </div>

                <Separator className="my-1 w-full bg-muted" />

                <div className="px-2 pt-1 pb-2 flex items-center justify-between">
                    {/* Project DropDown menu */}
                    <input
                        name="sectionType"
                        type="hidden"
                        value={sectionTypeValue || pathname.split("/").slice(-1)[0]}
                        readOnly
                    />

                    {/* If its existin task then we have to update it */}
                    {taskId && <input type="hidden" value={taskId} name="taskId" readOnly />}

                    <div className="ml-auto space-x-2">
                        <Button onClick={onClose} variant={"outline"}>
                            Cancel
                        </Button>
                        <SubmitButton />
                    </div>
                </div>
            </form>
        </div>
    );
};
