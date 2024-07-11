"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useRef, useState } from "react";

// Todo: Left here
export function DatePickerDemo() {
    const [date, setDate] = useState<Date>();

    const handleClear = () => setDate(undefined);
    const dateRef = useRef<null | string>(null);

    const handleChangeDateRef = () => {
        if (date) {
        }
    };

    return (
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
                        if (!day) return;

                        setDate(day);
                        dateRef.current = format(day, "yyyy-MM-dd");
                    }}
                    initialFocus
                />
                <input type="hidden" value={dateRef.current!} name="dueDate" />

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
    );
}
