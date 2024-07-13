"use client";

import { forwardRef } from "react";
import { useFormStatus } from "react-dom";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

import { cn } from "@/lib/utils";
import { FormErrors } from "./form-errors";

interface FormInputProps {
    id: string;
    label?: string;
    type?: string;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    errors?: Record<string, string[] | undefined>;
    className?: string;
    defaultValue?: string;
    onBlur?: () => void;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
    (
        {
            id,
            label,
            type,
            placeholder,
            required,
            disabled,
            errors,
            className,
            defaultValue = "",
            onBlur,
        },
        ref
    ) => {
        // Todo required UI changes
        const { pending } = useFormStatus();
        return (
            <div className="space-y-2 w-full">
                <div className="space-y-1 w-full">
                    {label ? (
                        <Label htmlFor={id} className="text-xs font-semibold text-neutral-700">
                            {label}
                        </Label>
                    ) : null}
                    <Input
                        onBlur={onBlur}
                        defaultValue={defaultValue}
                        ref={ref}
                        required={required}
                        name={id}
                        id={id}
                        placeholder={placeholder}
                        type={type}
                        disabled={pending || disabled}
                        autoComplete="off"
                        className={cn(
                            "font-medium text-black shadow-none border-none  focus-visible:ring-0 placeholder:text-neutral-400 bg-transparent w-full focus:outline-none p-1",
                            className
                        )}
                        aria-describedby={`${id}-error`}
                    />
                </div>
                <FormErrors id={id} errors={errors} />
            </div>
        );
    }
);

FormInput.displayName = "FormInput";
