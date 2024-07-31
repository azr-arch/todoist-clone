"use client";

import { Button } from "@/components/ui/button";
import { SectionWithLists } from "@/lib/types";
import { ChevronDown, ChevronRight } from "lucide-react";
import { ElementRef, useRef, useState } from "react";
import { SectionActions } from "./section-actions";
import { useAction } from "@/hooks/use-action";
import { updateSection } from "@/actions/update-section";
import { Input } from "@/components/ui/input";
import { useEventListener } from "usehooks-ts";
import { FormSubmit } from "@/components/form/form-submit";

interface SectionHeaderProps {
    data?: SectionWithLists;
    isOpen: boolean;
    toggleListOpen: () => void;
}

export const SectionHeader = ({ data, isOpen, toggleListOpen }: SectionHeaderProps) => {
    const [title, setTitle] = useState(data?.title ?? "");
    const [isEditing, setIsEditing] = useState(false);
    const formRef = useRef<ElementRef<"form">>(null);

    const { execute: executeEdit } = useAction(updateSection, {
        onComplete: () => {
            disableEditing();
        },
    });

    const enableEditing = () => {
        setIsEditing(true);
    };

    const disableEditing = () => {
        setIsEditing(false);
    };

    const onEdit = (formData: FormData) => {
        const sectionId = formData.get("sectionId") as string;
        const sectionTitle = formData.get("sectionTitle") as string;

        executeEdit({
            title: sectionTitle,
            sectionId,
        });
    };

    const onBlur = () => {
        formRef.current?.requestSubmit();
    };

    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
            disableEditing();
        } else if (e.key === "Enter") {
            formRef.current?.requestSubmit();
        }
    };

    useEventListener("keydown", onKeyDown);

    return (
        <div className="flex items-center w-full">
            {isEditing ? (
                <form ref={formRef} action={onEdit} className="space-y-2 w-full mb-1">
                    <input type="hidden" value={data?.id} readOnly name="sectionId" />
                    <Input
                        type="text"
                        name="sectionTitle"
                        placeholder="Name this section"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        autoFocus
                        autoComplete="off"
                        onBlur={onBlur}
                    />

                    <div className="space-x-2">
                        <FormSubmit disabled={data?.title === title} label="Save" />

                        <Button type="button" variant={"ghost"} onClick={disableEditing}>
                            Cancel
                        </Button>
                    </div>
                </form>
            ) : (
                <>
                    <Button
                        variant={"ghost"}
                        onClick={toggleListOpen}
                        size={"xs"}
                        className="mr-1.5 px-1"
                    >
                        {isOpen ? (
                            <ChevronDown className="w-4 h-4" />
                        ) : (
                            <ChevronRight className="w-4 h-4" />
                        )}
                    </Button>
                    <div className="w-full border-b border-gray-200 flex items-center justify-between">
                        <h3
                            className="leading-loose font-medium cursor-pointer"
                            onDoubleClick={enableEditing}
                        >
                            {title}

                            <span className="text-xs font-thin text-neutral-500 ml-3">
                                {data?.tasks?.length}
                            </span>
                        </h3>

                        {data && <SectionActions data={data} enableEditing={enableEditing} />}
                    </div>
                </>
            )}
        </div>
    );
};
