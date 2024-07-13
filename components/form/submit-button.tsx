"use client";

import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

export const SubmitButton = ({ disabled }: { disabled?: boolean }) => {
    const { pending } = useFormStatus();

    return (
        <Button disabled={disabled || pending} variant={"destructive"}>
            Save
        </Button>
    );
};
