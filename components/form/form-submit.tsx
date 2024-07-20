"use client";

import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

export const FormSubmit = ({
    disabled,
    label,
    className,
    icon,
    variant = "destructive",
}: {
    disabled?: boolean;
    label?: string;
    className?: string;
    icon?: JSX.Element;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "highlight";
}) => {
    const { pending } = useFormStatus();
    return (
        <Button
            className={className}
            type="submit"
            disabled={disabled || pending}
            variant={variant}
        >
            {icon}
            {label ? label : "Save"}
        </Button>
    );
};
