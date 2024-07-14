"use client";

import useAutosizeTextArea from "@/hooks/use-autosize-textarea";
import { useRef, useState } from "react";
import { useFormStatus } from "react-dom";

export const AutosizeTextArea = ({
    value: defaultValue,
    disabled,
}: {
    value?: string;
    disabled?: boolean;
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
            name="description"
            onChange={handleChange}
            ref={textAreaRef}
            value={value}
            autoComplete="off"
            placeholder="Description"
            disabled={disabled || pending}
            className="font-thin text-sm h-[29px] leading-[1.5] text-black  placeholder::text-neutral-500 bg-transparent focus:outline-none resize-none w-full p-1"
        />
    );
};
