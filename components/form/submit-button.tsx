"use client";

import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

export const SubmitButton = () => {
    const { pending } = useFormStatus();

    return (
        <Button disabled={pending} variant={"destructive"}>
            Save
        </Button>
    );
};
