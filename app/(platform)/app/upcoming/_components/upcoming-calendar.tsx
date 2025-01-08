"use client";

import { CustomCalendar } from "@/components/custom-calendar";
import { CalendarWeekNav } from "./calendar-week-nav";
import { useCalendar } from "@/hooks/use-calendar";

// DO THIs
export const UpcomingCalendar = () => {
    const { currentWeek } = useCalendar();

    return (
        <div className="flex items-center">
            <CustomCalendar
                defaultValue={currentWeek}
                showMenu={false}
                side="bottom"
                className="w-fit"
                btnClassName="border-0 shadow-none h-fit py-1 px-1.5"
                clearnBtnEnabled={false}
            />
            <CalendarWeekNav />
        </div>
    );
};
