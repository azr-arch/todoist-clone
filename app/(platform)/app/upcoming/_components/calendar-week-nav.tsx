"use client";

import { useCalendar } from "@/hooks/use-calendar";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const CalendarWeekNav = () => {
    const { moveToPreviousWeek, resetToToday, moveToNextWeek, currentWeek, todaysDate } =
        useCalendar();

    return (
        <div className="ml-auto">
            <div className="border-[1px]  text-xs overflow-hidden text-neutral-500 border-neutral-400 rounded-sm flex items-center">
                <button
                    disabled={currentWeek.toDateString() === todaysDate.toDateString()}
                    onClick={moveToPreviousWeek}
                    className="border-r-[1px] p-2 border-neutral-400 hover:bg-neutral-300 disabled:cursor-not-allowed disabled:bg-neutral-100"
                >
                    <ChevronLeft className="w-3 h-3" />
                </button>
                <button onClick={resetToToday} className="px-2 hover:bg-neutral-300">
                    Today
                </button>
                <button
                    onClick={moveToNextWeek}
                    className="border-l-[1px] p-2 border-neutral-400 hover:bg-neutral-300"
                >
                    <ChevronRight className="w-3 h-3" />
                </button>
            </div>
        </div>
    );
};
