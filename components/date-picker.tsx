"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useRef, useState } from "react";

// Todo: implement a way to use default value
export function DatePickerDemo({ defaultValue }: { defaultValue?: string }) {
    const [date, setDate] = useState<Date>();
    const dateRef = useRef<null | HTMLInputElement>(null);

    const handleClear = () => setDate(undefined);

    return (
        <>
            <input
                type="hidden"
                ref={dateRef}
                // value={date ? date.toDateString() : ""} // Convert date to ISO string or provide an empty string
                name="dueDate" // Optional: Set a name for form submission
            />
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant={"outline"}
                        className={cn(
                            "w-fit justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? (
                            format(date, "PPP")
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
