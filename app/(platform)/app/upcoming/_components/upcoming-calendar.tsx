import { CustomCalendar } from "@/components/custom-calendar";

export const UpcomingCalendar = () => {
    // complete this!
    return (
        <div>
            <CustomCalendar
                defaultValue={new Date()}
                showMenu={false}
                side="bottom"
                className="w-fit"
                btnClassName="border-0 shadow-none h-fit py-1 px-1.5"
                clearnBtnEnabled={false}
            />

            {/* <CalendarWeeks /> */}
        </div>
    );
};
