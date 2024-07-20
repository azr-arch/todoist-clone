import React, { useState, useRef, useEffect } from "react";
import { format, addDays, startOfWeek, endOfWeek, addWeeks } from "date-fns";
import { CalendarClockIcon, Calendar as CalendarIcon, CircleOff, Sofa, Sun, X } from "lucide-react";
import { cn, formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { Task } from "@prisma/client";
import { Input } from "./ui/input";

interface CustomCalendarProps {
    tasks?: Task[];
    defaultValue?: Date;
}

export function CustomCalendar({ tasks, defaultValue }: CustomCalendarProps) {
    const [date, setDate] = useState<Date | undefined>(defaultValue ? defaultValue : undefined);

    console.log({ defaultValue, date });
    const [open, setOpen] = useState(false);

    const [stringDate, setStringDate] = React.useState<string>("");
    const dateRef = useRef<null | HTMLInputElement>(null);

    const handleClear = () => {
        setDate(undefined);
    };

    const handleSelect = (selectedDate: Date | undefined) => {
        setDate(selectedDate);
        // onDateSelect(selectedDate);
        setOpen(false);
    };

    const menuItems = [
        {
            label: "Tomorrow",
            value: addDays(new Date(), 1),
            icon: <Sun className="w-4 h-4 text-orange-500 mr-4 " />,
        },
        {
            label: "This Weekend",
            value: startOfWeek(addDays(new Date(), 5), { weekStartsOn: 6 }),
            icon: <Sofa className="w-4 h-4 text-blue-400 mr-4" />,
        },
        {
            label: "Next Week",
            value: startOfWeek(addWeeks(new Date(), 1), { weekStartsOn: 1 }),
            icon: <CalendarClockIcon className="w-4 h-4 text-violet-500 mr-4" />,
        },
        {
            label: "No Date",
            value: undefined,
            icon: <CircleOff className="w-4 h-4 text-neutral-500 mr-4" />,
        },
    ];

    // TODO implement task count on calendar dates
    // const getTaskCountForDate = (date: Date) => {
    //     return tasks.filter(
    //         (task) =>
    //             task?.dueDate!.getDate() === date.getDate() &&
    //             task?.dueDate!.getMonth() === date.getMonth() &&
    //             task?.dueDate!.getFullYear() === date.getFullYear()
    //     ).length;
    // };

    useEffect(() => {
        if (dateRef.current && date) {
            dateRef.current.value = date.toDateString();
        }
    }, [date]);

    return (
        <>
            <input
                type="hidden"
                ref={dateRef}
                value={date ? date.toDateString() : ""}
                name="dueDate"
            />
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className={cn(
                            "justify-start text-left font-thin",
                            !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? formatDate(date) : <span className="text-sm f">Due date</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-fit p-0" align="start">
                    <div className="relative">
                        <Input
                            type="string"
                            placeholder="MM DD YYYY"
                            className="rounded-sm"
                            value={stringDate}
                            onChange={(e) => {
                                setStringDate(e.target.value);
                                const parsedDate = new Date(e.target.value);
                                if (parsedDate.toString() === "Invalid Date") {
                                    setDate(undefined);
                                } else {
                                    setDate(parsedDate);
                                }
                            }}
                        />

                        {/* Clear search date  */}
                        {stringDate && (
                            <Button
                                size={"xs"}
                                variant={"ghost"}
                                className="px-1 rounded-sm absolute right-2 top-1/2 -translate-y-1/2"
                                onClick={() => setStringDate("")}
                            >
                                <X className=" w-3 h-3 " />
                            </Button>
                        )}
                    </div>
                    <ol className="w-full py-1 flex flex-col items-start">
                        {menuItems.map((item) => (
                            <li key={item.label} className="w-full">
                                <Button
                                    className="w-full flex items-center justify-start font-thin px-2"
                                    variant={"ghost"}
                                    onClick={() => setDate(item.value)}
                                >
                                    {item.icon}
                                    {item.label}
                                </Button>
                            </li>
                        ))}
                    </ol>
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={handleSelect}
                        initialFocus

                        // TODO implement task count on calendar dates
                        // modifiers={{
                        //     hasTasks: (day) => getTaskCountForDate(day) > 0,
                        // }}
                        // modifiersStyles={{
                        //     hasTasks: {
                        //         position: "relative",
                        //     },
                        // }}
                        // components={{
                        //     DayContent: ({ date }) => (
                        //         <div className="relative">
                        //             {date.getDate()}
                        //             {getTaskCountForDate(date) > 0 && (
                        //                 <div
                        //                     className="absolute -top-1 -right-[6px] w-2 h-2 bg-blue-500 rounded-full"
                        //                     title={`${getTaskCountForDate(date)} tasks`}
                        //                 />
                        //             )}
                        //         </div>
                        //     ),
                        // }}
                    />
                    {date && (
                        <Button
                            variant="outline"
                            onClick={handleClear}
                            className="mt-2 ml-1 mb-1 text-sm text-destructive"
                            size="sm"
                        >
                            <X className="w-4 h-4 mr-1" /> Clear
                        </Button>
                    )}
                </PopoverContent>
            </Popover>
        </>
    );
}
