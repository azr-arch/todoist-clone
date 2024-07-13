"use client";

import { DatePickerDemo } from "@/components/date-picker";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { AutosizeTextArea } from "@/components/form/autosize-textarea";
import { SubmitButton } from "@/components/form/submit-button";
import { usePathname } from "next/navigation";

import { addTask } from "@/actions/add-task";
import { useAction } from "@/hooks/use-action";
import { toast } from "sonner";
import { FormInput } from "@/components/form/form-input";
import { useEffect, useRef } from "react";

interface AddTaskFormProps {
    onClose: () => void;
}

// Todo complete this

export const EditTaskForm = ({ onClose }: AddTaskFormProps) => {
    const { execute, fieldErrors, isLoading, errors } = useAction(addTask, {
        onComplete: () => {
            onClose();
        },
        onSuccess: () => {
            toast("Task added", {
                description: `The task has been successfully created.`,
            });
        },
        onError: (err) => {
            toast(err, {
                description: "An error occured, please try again later!",
            });
        },
    });

    const pathname = usePathname();
    const inputRef = useRef<HTMLInputElement | null>(null);

    const onSubmit = async (formData: FormData) => {
        const title = formData.get("title") as string;
        const desc = formData.get("description") as string;
        const dueDate = formData.get("dueDate") as string;
        const sectionType = formData.get("sectionType") as string;

        execute({
            title,
            description: desc,
            dueDate,
            sectionType,
        });
    };

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    return (
        <div className="w-full rounded-md border-neutral-300 border min-h-[158px] relative">
            <form action={onSubmit} className="w-full h-full">
                <div className="p-2 flex flex-col items-start w-full">
                    <FormInput id="title" ref={inputRef} placeholder="Task name" type="text" />

                    <AutosizeTextArea />
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
                        value={pathname.split("/").slice(-1)[0]}
                        readOnly
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
