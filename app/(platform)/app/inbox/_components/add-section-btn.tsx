"use client";

import { createSection } from "@/actions/create-section";
import { FormInput } from "@/components/form/form-input";
import { FormSubmit } from "@/components/form/form-submit";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAction } from "@/hooks/use-action";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useFormStatus } from "react-dom";

export const AddSectionBtn = ({ prevOrder = 0 }: { prevOrder?: number }) => {
    // what do i name the state that will handle rendering of Adding section form
    const [showSectionForm, setShowSectionForm] = useState(false);

    const pathname = usePathname();

    const enableSectionForm = () => {
        setShowSectionForm(true);
    };

    const disableSectionForm = () => {
        setShowSectionForm(false);
    };

    if (showSectionForm) {
        return <SectionTitleForm onClose={disableSectionForm} prevOrder={prevOrder} />;
    }

    return (
        <div className="group w-full h-6   bg-transparent cursor-pointer">
            {/* Button to open the title form  */}
            <div
                onClick={enableSectionForm}
                className="w-full h-full flex items-center opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-200"
            >
                <span className="bg-orange-500 h-[1px] grow" />
                <span className="text-orange-500 px-4">Add a section</span>
                <span className="bg-orange-500 h-[1px] grow" />
            </div>
        </div>
    );
};

function SectionTitleForm({ onClose, prevOrder }: { onClose: () => void; prevOrder: number }) {
    const [inputValue, setInputValue] = useState("");
    const inputRef = useRef<HTMLInputElement | null>(null);

    const pathname = usePathname();

    const extractUrl = useCallback(() => {
        return pathname.split("_")[1];
    }, [pathname]);

    const projectId = useMemo(
        () =>
            pathname.includes("/app/project")
                ? extractUrl() // Extract projectId from url
                : null,
        [extractUrl, pathname]
    );

    const { execute } = useAction(createSection, {
        onSuccess: () => {
            console.log("success");
            onClose();
        },
        onError: (err) => console.log(err),
        onComplete: () => console.log("completed"),
    });

    const handleSubmit = (formData: FormData) => {
        const sectionTitle = formData.get("sectionTitle") as string;
        const projectId = formData.get("projectId") as string;
        console.log({ sectionTitle, projectId });

        execute({
            title: sectionTitle,
            prevOrder: prevOrder,
            projectId: projectId ? projectId : undefined,
        });
    };

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    return (
        <form action={handleSubmit} className="space-y-2">
            <div className="">
                <Input
                    ref={inputRef}
                    type="text"
                    name="sectionTitle"
                    placeholder="Name this section"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
            </div>
            <div className="flex items-center gap-x-2 ">
                {projectId && <input type="hidden" name="projectId" value={projectId} />}

                <FormSubmit label="Add section" disabled={!inputValue} />

                <Button onClick={onClose} type="button" variant={"ghost"}>
                    Cancel
                </Button>
            </div>
        </form>
    );
}
