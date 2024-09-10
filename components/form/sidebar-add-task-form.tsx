"use client";

import { usePathname } from "next/navigation";
import { CustomCalendar } from "../custom-calendar";
import { AutosizeTextArea } from "./autosize-textarea";
import { FormInput } from "./form-input";
import { PrioritySelect } from "./priority-select";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { Button } from "../ui/button";
import { FormSubmit } from "./form-submit";
import { Separator } from "../ui/separator";
import { useAction } from "@/hooks/use-action";
import { createTask } from "@/actions/create-task";
import { toast } from "sonner";
import { Priority } from "@prisma/client";

interface SidebarAddTaskFormProps {
    onCloseForm: () => void;
    sectionId?: string;
    labelId?: string;
}

export const SidebarAddTaskForm = ({
    onCloseForm,
    sectionId,
    labelId,
}: SidebarAddTaskFormProps) => {
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

    const formatSectionType = useMemo(
        () =>
            pathname.includes("/app/label")
                ? "label"
                : pathname.includes("/app/filter")
                ? "filter"
                : pathname.split("/").slice(-1)[0],
        [pathname]
    );

    const extractProjectId = useCallback(() => {
        return pathname.split("_")[1];
    }, [pathname]);

    const projectId = useMemo(
        () =>
            pathname.includes("/app/project")
                ? extractProjectId() // Extract projectId from url
                : undefined,
        [extractProjectId, pathname]
    );

    const onSubmit = useCallback(
        async (formData: FormData) => {
            if (!inputRef.current?.value) return;

            const title = formData.get("title") as string;
            const desc = formData.get("description") as string;
            const dueDate = formData.get("dueDate") as string;
            const sectionType = formData.get("sectionType") as string;
            const priority = formData.get("priority") as Priority;
            // const projectId = formData.get("projectId") as string;

            execute({
                title,
                description: desc,
                dueDate,
                sectionType,
                sectionId, // If section id is present then it belongs to, a section group ..
                labelId, // If label id is present
                priority,
                projectId,
            });
        },
        [execute, labelId, projectId, sectionId]
    );

    useEffect(() => {
        inputRef?.current?.focus();
    }, []);

    return (
        <form action={onSubmit} className="w-full h-full">
            <div className="p-4 flex flex-col items-start w-full">
                <FormInput
                    id="title"
                    ref={inputRef}
                    placeholder="Task name"
                    type="text"
                    className="text-xl"
                />

                <AutosizeTextArea />
                <div className="mt-3 flex items-center gap-2 ">
                    <CustomCalendar
                        defaultValue={pathname === "/app/today" ? new Date() : undefined}
                        className=""
                        btnClassName="h-[28px]  py-0 px-1.5 text-[13px]"
                    />
                    <PrioritySelect btnClassName="h-[28px]  py-0 px-1.5 text-[13px]" />
                </div>
            </div>

            <Separator className="my-1 w-full bg-muted" />

            <div className="px-2 pt-1 pb-2 flex items-center justify-between">
                {/* Project DropDown menu */}
                <input name="sectionType" type="hidden" value={formatSectionType} readOnly />

                {projectId ? (
                    <input name="projectId" type="hidden" value={projectId} readOnly />
                ) : null}

                <div className="ml-auto space-x-2">
                    <Button
                        type="button"
                        onClick={() => {
                            onCloseForm();
                        }}
                        variant={"outline"}
                    >
                        Cancel
                    </Button>
                    <FormSubmit label="Add Task" />
                </div>
            </div>
        </form>
    );
};
