// Component to show and edit Title & Description
"use client";

import { updateTask } from "@/actions/update-task";
import { AutosizeTextArea } from "@/components/form/autosize-textarea";
import { FormSubmit } from "@/components/form/form-submit";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAction } from "@/hooks/use-action";
import { AlignLeft } from "lucide-react";
import { title } from "process";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export const TaskDetails = (props: { title: string; description?: string; taskId: string }) => {
    const [title, setTitle] = useState(props.title);
    const [description, setDescription] = useState(props.description);

    const [isEditing, setIsEditing] = useState(false);

    const enableEditing = () => {
        setIsEditing(true);
    };

    const disableEditing = () => {
        setIsEditing(false);
    };

    const handleChange = (title?: string, description?: string) => {
        if (title) setTitle(title);
        if (description) setDescription(description);
    };

    return (
        <div className="">
            {isEditing ? (
                <Form
                    title={title}
                    description={description}
                    onClose={disableEditing}
                    taskId={props.taskId}
                    handleChange={handleChange}
                />
            ) : (
                <div className="cursor-pointer" onClick={enableEditing}>
                    <h2 className="text-xl text-[#202020]">{title}</h2>
                    <p className="text-neutral-600 font-thin  text-sm mt-4 inline-flex items-center">
                        <AlignLeft className="size-4 mr-0.5 stroke-1" />
                        {description || "Description"}
                    </p>
                </div>
            )}
        </div>
    );
};

function Form({
    title,
    description,
    onClose,
    taskId,
    handleChange,
}: {
    title?: string;
    description?: string;
    taskId: string;
    onClose: () => void;
    handleChange: (title?: string, description?: string) => void;
}) {
    const { execute } = useAction(updateTask, {
        onSuccess: (data) => {
            handleChange(data.title, data.description || "");
            onClose();
        },
        onError: (err) => {
            toast(err);
        },
    });

    const onSubmit = (formData: FormData) => {
        const title = formData.get("title") as string;
        const description = formData.get("description") as string;

        execute({
            title,
            description,
            taskId,
        });
    };

    return (
        <form action={onSubmit} className="w-full">
            {/* How do i addd a onLcick on div, that does this, get to know which input arounds this click was made, 
    and have them current Focus, 
            */}
            <div className="rounded-md border border-neutral-400 p-1 ">
                <AutosizeTextArea
                    id={"title"}
                    defaultValue={title}
                    className="text-xl text-[#202020] font-normal"
                />
                <AutosizeTextArea
                    id={"description"}
                    defaultValue={description}
                    className="text-neutral-600  mt-2 font-thin "
                />
            </div>

            <div className="flex items-center justify-end py-1.5 gap-x-2">
                <Button variant={"secondary"} type="button" onClick={onClose}>
                    Cancel
                </Button>
                <FormSubmit label="Save" />
            </div>
        </form>
    );
}
