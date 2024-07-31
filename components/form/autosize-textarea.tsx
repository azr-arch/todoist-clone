"use client";

import useAutosizeTextArea from "@/hooks/use-autosize-textarea";
import { cn } from "@/lib/utils";
import { useRef, useState } from "react";
import { useFormStatus } from "react-dom";

export const AutosizeTextArea = ({
    id = "description",
    defaultValue,
    disabled,
    className,
}: {
    id?: string;
    defaultValue?: string;
    disabled?: boolean;
    className?: string;
}) => {
    const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
    const [value, setValue] = useState(defaultValue || "");
    const { pending } = useFormStatus();

    const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
        const val = evt.target?.value;
        setValue(val);
    };

    useAutosizeTextArea(textAreaRef.current, value);

    return (
        <textarea
            id={id}
            name={id}
            onChange={handleChange}
            ref={textAreaRef}
            value={value}
            autoComplete="off"
            placeholder="Description"
            disabled={disabled || pending}
            className={cn(
                `font-thin text-sm h-[29px] leading-[1.5] text-black  placeholder::text-neutral-500 bg-transparent focus:outline-none resize-none w-full p-1`,
                className
            )}
        />
    );
};
