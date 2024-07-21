"use client";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { AutosizeTextArea } from "@/components/form/autosize-textarea";
import { FormSubmit } from "@/components/form/form-submit";
import { usePathname } from "next/navigation";

import { createTask } from "@/actions/create-task";
import { useAction } from "@/hooks/use-action";
import { toast } from "sonner";
import { FormInput } from "@/components/form/form-input";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { AlertModal } from "@/components/modals/alert-modal";
import { CustomCalendar } from "@/components/custom-calendar";

interface AddTaskFormProps {
    onCloseForm: () => void;
    sectionId?: string;
    labelId?: string;
}

export const AddTaskForm = ({ onCloseForm, sectionId, labelId }: AddTaskFormProps) => {
    const [alertModalOpen, setAlertModalOpen] = useState(false);

    const { execute, fieldErrors, isLoading, errors } = useAction(createTask, {
        onComplete: () => {
            onCloseForm();
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
    const formRef = useRef<HTMLFormElement | null>(null);

    const formatSectionType = useMemo(
        () =>
            pathname.includes("/app/label")
                ? "label"
                : pathname.includes("/app/filter")
                ? "filter"
                : pathname.split("/").slice(-1)[0],
        [pathname]
    );

    const onSubmit = useCallback(
        async (formData: FormData) => {
            if (!inputRef.current?.value) return;

            const title = formData.get("title") as string;
            const desc = formData.get("description") as string;
            const dueDate = formData.get("dueDate") as string;
            const sectionType = formData.get("sectionType") as string;

            execute({
                title,
                description: desc,
                dueDate,
                sectionType,
                sectionId, // If section id is present then it belongs to, a section group ..
                labelId, // If label id is present
            });
        },
        [execute, labelId, sectionId]
    );

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    return (
        <>
            <AlertModal
                isOpen={alertModalOpen}
                onClose={() => setAlertModalOpen(false)}
                onConfirm={() => {
                    console.log("inconfirm ");
                    if (!inputRef.current) return;
                    inputRef.current.value = "";
                    onCloseForm();
                }}
                loading={isLoading}
                confirmLabel="Discard"
                title="Discard changes?"
                description="The changes you've made won't be saved."
            />

            <div className="w-full h-full rounded-md border-neutral-300 bg-white z-50 border min-h-[158px] relative">
                <form action={onSubmit} ref={formRef} className="w-full h-full">
                    <div className="p-2 flex flex-col items-start w-full">
                        <FormInput id="title" ref={inputRef} placeholder="Task name" type="text" />

                        <AutosizeTextArea />
                        <div className="mt-3">
                            <CustomCalendar
                                defaultValue={pathname === "/app/today" ? new Date() : undefined}
                            />
                        </div>
                    </div>

                    <Separator className="my-1 w-full bg-muted" />

                    <div className="px-2 pt-1 pb-2 flex items-center justify-between">
                        {/* Project DropDown menu */}
                        <input
                            name="sectionType"
                            type="hidden"
                            value={formatSectionType}
                            readOnly
                        />

                        <div className="ml-auto space-x-2">
                            <Button
                                type="button"
                                onClick={() => {
                                    console.log("inside cancel");
                                    if (inputRef.current?.value !== "") {
                                        setAlertModalOpen(true);
                                        return;
                                    }

                                    onCloseForm();
                                }}
                                variant={"outline"}
                            >
                                Cancel
                            </Button>
                            <FormSubmit />
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};
