"use client";

import { forwardRef } from "react";
import { useFormStatus } from "react-dom";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

import { cn } from "@/lib/utils";
import { FormErrors } from "./form-errors";
import { Select } from "@radix-ui/react-select";
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { PRIORITY } from "@/lib/constants";
import { Flag } from "lucide-react";
import { Priority } from "@prisma/client";

interface PrioritySelectProps {
    label?: string;
    className?: string;
    btnClassName?: string;
    defaultValue?: Priority;
}

export const PrioritySelect = forwardRef<HTMLInputElement, PrioritySelectProps>(
    ({ label, btnClassName, defaultValue }, ref) => {
        const { pending } = useFormStatus();

        return (
            <div className="w-full  rounded-sm">
                <div className="space-y-1 w-full  group">
                    {label ? (
                        <Label
                            htmlFor={"priority"}
                            className="text-xs font-semibold text-neutral-700 "
                        >
                            {label}
                        </Label>
                    ) : null}
                </div>
                <Select
                    disabled={pending}
                    defaultValue={defaultValue || Priority.p4}
                    name="priority"
                >
                    <SelectTrigger className={cn("hover:bg-black/10 focus:ring-0", btnClassName)}>
                        <SelectValue defaultValue={Priority.p4} />
                    </SelectTrigger>
                    <SelectContent>
                        {PRIORITY.map((item) => (
                            <SelectItem key={item.value} value={item.value}>
                                <div className="flex items-center w-full gap-x-2 ">
                                    <Flag
                                        className={cn(
                                            item.className,
                                            `size-4 stroke-1 fill-${item.fillColor}`
                                        )}
                                    />
                                    <span className="text-sm font-thin  text-neutral-600">
                                        {item.label}
                                    </span>
                                </div>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        );
    }
);

PrioritySelect.displayName = "PrioritySelect";
