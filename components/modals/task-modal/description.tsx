"use client";

import { CustomCalendar } from "@/components/custom-calendar";
import { PrioritySelect } from "@/components/form/priority-select";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { FullTask } from "@/lib/types";
import { Priority, Task } from "@prisma/client";
import { AlignLeft, CalendarDaysIcon, Circle, Inbox, Plus } from "lucide-react";
import { TaskDetails } from "./task-details";

interface DescriptionProps {
    data: FullTask;
}

export const Description = ({ data }: DescriptionProps) => {
    return (
        <div className="px-4 pt-4 w-full ">
            <div className="w-full flex items-start gap-x-4 md:w-[calc(100%-260px)]">
                <div className="flex items-center size-7 justify-center">
                    <Circle className="text-neutral-400 size-4" />
                </div>

                <TaskDetails
                    title={data.title}
                    description={data.description || ""}
                    taskId={data.id}
                />
            </div>

            <div
                className=" text-[#202020] space-y-2
                hidden md:block absolute z-40 right-0 top-[48px] md:h-[calc(100%-48px)] w-[260px] bg-[#fcfaf8] px-4 py-3
                "
            >
                {/* Separate them into components */}
                <div className="border-b border-neutral-200/50 py-2">
                    <span className="font-thin px-2.5 text-xs text-neutral-500">Project</span>
                    <Button
                        className="w-full hover:bg-[#ffaaa1]/20 text-[#202020] text-start justify-start px-3 font-thin"
                        variant={"ghost"}
                    >
                        <Inbox className="size-4  mr-4 stroke-1" />
                        Inbox
                    </Button>
                </div>

                {/* I am using custom calender, here, but its now being visible once the trigger is cliecked, 
upon debuggin the logs tells that, the state open is being rendered as true, but immediately logs as false, why is it happening?  */}
                <div className="border-b border-neutral-200/50 pb-2">
                    <CustomCalendar
                        className="w-full"
                        btnClassName="outline-0 bg-transparent hover:bg-[#ffaaa1]/20 border-0  w-full shadow-none px-3 gap-x-2 text-[#202020]"
                        side="bottom"
                        align="center"
                        defaultValue={data?.dueDate ? new Date(data.dueDate) : undefined}
                    />
                </div>

                <div className="border-b border-neutral-200/50 py-2">
                    <span className="font-thin px-2.5 text-xs text-neutral-500">Priority</span>
                    <PrioritySelect
                        className="w-full "
                        btnClassName="border-0  shadow-none hover:bg-neutral-100 gap-x-2 transition-colors text-lg"
                        defaultValue={data?.priority as Priority}
                    />
                </div>

                <p className="my-4 text-sm text-neutral-400 font-thin">
                    TODO: Add labels and remainders
                </p>
            </div>

            {/* Mobile version */}
            <MobileLayoutDescription />
        </div>
    );
};

function MobileLayoutDescription() {
    return (
        <div className="block md:hidden mt-5 text-[#202020] space-y-1">
            {/* Separate them into components */}
            <Button
                className="w-full text-[#202020] text-start justify-start px-3 font-thin"
                variant={"ghost"}
            >
                <Inbox className="size-4  mr-4 stroke-1" />
                Inbox
            </Button>

            {/* I am using custom calender, here, but its now being visible once the trigger is cliecked, 
upon debuggin the logs tells that, the state open is being rendered as true, but immediately logs as false, why is it happening?  */}
            <CustomCalendar
                className="w-full"
                btnClassName="outline-0 border-0  w-full shadow-none px-3 gap-x-2 text-[#202020]"
                side="bottom"
                align="center"
            />

            <PrioritySelect
                className="w-full"
                btnClassName="border-0 focus-within:ring-offset-0 outline-0 shadow-none hover:bg-neutral-100 gap-x-2 transition-colors text-lg"
            />
        </div>
    );
}

Description.Skeleton = function DescriptionSkeleton() {
    return (
        <div className="px-4 pt-4 w-full ">
            <div className="w-full flex items-start gap-x-4 md:w-[calc(100%-260px)]">
                <div className="flex items-center size-7 justify-center">
                    <Skeleton className="size-4 bg-neutral-200" />
                </div>

                <div className="space-y-2">
                    <Skeleton className="w-14 h-[28px] bg-neutral-200" />
                    <Skeleton className="w-10 h-[18px] bg-neutral-200" />
                </div>
            </div>

            <div
                className="  space-y-2
        hidden md:block absolute z-50 right-0 top-[48px] md:h-[calc(100%-48px)] w-[260px] bg-[#fcfaf8] px-4 py-3
    "
            >
                <div className="border-b border-neutral-200/50 py-2">
                    <Skeleton className="bg-neutral-200 w-[85px] h-9 rounded-md" />
                </div>

                <div className="border-b border-neutral-200/50 pb-2">
                    <Skeleton className="bg-neutral-200 w-[85px] h-9 rounded-md" />
                </div>

                <div className="border-b border-neutral-200/50 py-2">
                    <Skeleton className="bg-neutral-200 w-[85px] h-9 rounded-md" />
                </div>
            </div>

            {/* Mobile version */}
            <div className="block md:hidden mt-5 space-y-1">
                <Skeleton className="bg-neutral-200 w-full h-9 rounded-md" />

                {/* I am using custom calender, here, but its now being visible once the trigger is cliecked, 
upon debuggin the logs tells that, the state open is being rendered as true, but immediately logs as false, why is it happening?  */}
                <Skeleton className="bg-neutral-200 w-full h-9 rounded-md" />

                <Skeleton className="bg-neutral-200 w-full h-9 rounded-md" />
            </div>
        </div>
    );
};
