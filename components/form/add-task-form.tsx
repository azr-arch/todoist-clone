"use client";

import { DatePickerDemo } from "../date-picker";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { AutosizeTextArea } from "./autosize-textarea";
import { SubmitButton } from "./submit-button";
import { useFormState } from "react-dom";
import { addTask } from "@/actions/add-task";
import { usePathname } from "next/navigation";

const initialState = {
    message: null,
};

export const AddTaskForm = ({ onClose }: { onClose: () => void }) => {
    const [state, formAction] = useFormState(addTask, initialState);
    const pathname = usePathname();

    return (
        <div className="w-full rounded-md border-neutral-300 border min-h-[158px] ">
            <form action={formAction} className="w-full h-full">
                <div className="p-2 flex flex-col items-start w-full">
                    <input
                        name="title"
                        placeholder="Task name"
                        type="text"
                        className="font-medium text-neutral-600 bg-transparent w-full focus:outline-none p-1"
                    />

                    <AutosizeTextArea />
                    <div className="mt-3">
                        <DatePickerDemo />
                        {/* <input type="date" name="dueDate" /> */}
                    </div>
                </div>

                <Separator className="my-1 w-full bg-muted" />

                <div className="px-2 pt-1 pb-2 flex items-center justify-between">
                    {/* Project DropDown menu */}
                    <input
                        name="sectionType"
                        type="hidden"
                        value={pathname.split("/").slice(-1)[0]}
                    />

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
