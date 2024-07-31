"use client";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { AutosizeTextArea } from "@/components/form/autosize-textarea";
import { FormSubmit } from "@/components/form/form-submit";

import { usePathname } from "next/navigation";

import { useAction } from "@/hooks/use-action";
import { toast } from "sonner";
import { FormInput } from "@/components/form/form-input";
import { useEffect, useRef } from "react";
import { updateTask } from "@/actions/update-task";
import { CustomCalendar } from "@/components/custom-calendar";

// TODO: Add priort and label
interface EditTaskFormProps {
    onClose: () => void;
    taskId: string;
    defaultFormValues?: {
        title?: string;
        description?: string;
        dueDate?: Date;
        sectionType?: string;
    };
}

export const EditTaskForm = ({ onClose, defaultFormValues, taskId }: EditTaskFormProps) => {
    const { execute, fieldErrors, isLoading, errors } = useAction(updateTask, {
        onComplete: () => {
            onClose();
        },
        onSuccess: (data) => {
            toast("Task updated", {
                description: `The task has been successfully updated.`,
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
            taskId,
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
                    <FormInput
                        id="title"
                        ref={inputRef}
                        placeholder="Task name"
                        type="text"
                        defaultValue={defaultFormValues?.title}
                    />

                    <AutosizeTextArea defaultValue={defaultFormValues?.description} />
                    <div className="mt-3">
                        <CustomCalendar defaultValue={defaultFormValues?.dueDate} />
                    </div>
                </div>

                <Separator className="my-1 w-full bg-muted" />

                <div className="px-2 pt-1 pb-2 flex items-center justify-between">
                    {/* Project DropDown menu */}
                    <input
                        name="sectionType"
                        type="hidden"
                        value={defaultFormValues?.sectionType ?? pathname.split("/").slice(-1)[0]}
                        readOnly
                    />

                    <div className="ml-auto space-x-2">
                        <Button onClick={onClose} variant={"outline"}>
                            Cancel
                        </Button>
                        <FormSubmit />
                    </div>
                </div>
            </form>
        </div>
    );
};
