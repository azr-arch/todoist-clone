"use client";

import { format, addDays, isSaturday, isSunday } from "date-fns";
import { Calendar as CalendarIcon, X } from "lucide-react";

import { cn, formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useEffect, useRef, useState } from "react";

// Todo: implement a way to use default value
export function DatePickerDemo({
    defaultValue,
    disabled,
}: {
    defaultValue?: string;
    disabled?: boolean;
}) {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const dateRef = useRef<null | HTMLInputElement>(null);

    const handleClear = () => setDate(undefined);

    useEffect(() => {
        if (dateRef.current && date) {
            dateRef.current.value = date.toDateString();
        }
    }, []);

    return (
        <>
            <input
                type="hidden"
                ref={dateRef}
                // value={date ? date.toDateString() : ""} // Convert date to ISO string or provide an empty string
                name="dueDate" // Optional: Set a name for form submission
            />
            <Popover>
                <PopoverTrigger asChild disabled={disabled}>
                    <Button
                        variant={"outline"}
                        className={cn(
                            "w-fit justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? (
                            formatDate(date) // Display formatted date (weekday or actual date)
                        ) : (
                            <span className="text-sm font-thin">Due date</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={(day) => {
                            setDate(day);

                            if (dateRef.current && day) {
                                dateRef.current.value = day.toDateString();
                            }
                        }}
                        initialFocus
                    />

                    {date && (
                        <Button
                            variant="outline"
                            onClick={handleClear}
                            className="mt-2 ml-1 mb-1 text-sm text-destructive"
                            size={"sm"}
                        >
                            <X className="w-4 h-4 mr-1" /> Clear
                        </Button>
                    )}
                </PopoverContent>
            </Popover>
        </>
    );
}
