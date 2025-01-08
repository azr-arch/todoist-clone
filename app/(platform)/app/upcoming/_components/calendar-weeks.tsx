"use client";

import { useCalendar } from "@/hooks/use-calendar";
import { cn, getDaysOfWeek } from "@/lib/utils";

export const CalendarWeeks = () => {
    const { currentWeek } = useCalendar();

    const daysOfWeek = getDaysOfWeek(currentWeek);

    return (
        <div className="w-full px-4 grid  grid-cols-7">
            {daysOfWeek.map((day, idx) => {
                const active = currentWeek.toDateString() === day.toDateString();
                const expiredDate = day < new Date();

                return (
                    <button
                        key={idx}
                        className={cn(
                            "px-4 font-thin py-1 transition hover:bg-neutral-200 text-neutral-700 rounded-sm text-sm",
                            expiredDate &&
                                "cursor-not-allowed text-neutral-300 hover:bg-transparent",
                            active && "font-medium"
                        )}
                    >
                        {day.toLocaleDateString("en-US", { weekday: "short" })}

                        <span
                            className={cn(
                                "ml-1",
                                active && "bg-blue-400 px-1 text-white font-medium rounded-sm"
                            )}
                        >
                            {day.getDate()}
                        </span>
                    </button>
                );
            })}
        </div>
    );
};
