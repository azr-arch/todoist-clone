import { AddTaskButton } from "@/app/(platform)/app/_components/add-task-btn";
import { TaskList } from "../_components/tasklist";
import { prismaDb } from "@/lib/db";
import { OverdueList } from "../_components/overdue-list";
import Image from "next/image";
import { CheckCircle } from "lucide-react";
import { getStartAndEndOfDay } from "@/lib/utils";
import { fetchTasks } from "@/lib/task-fetcher";

const TodayPage = async () => {
    const { startOfDay, endOfDay } = getStartAndEndOfDay();
    const { tasks, overdueTasks } = await fetchTasks({
        startDate: startOfDay,
        endDate: endOfDay,
        includeOverdue: true,
    });

    return (
        <div className="h-full">
            <div className="mb-10">
                <h1 className="text-3xl font-semibold hover:outline hover:outline-1 outline-neutral-200 rounded-md">
                    Today
                </h1>
                {tasks.length > 0 && (
                    <span className="text-neutral-500 text-sm font-thin flex items-center gap-x-1 mt-2 px-1">
                        <CheckCircle className="size-3" />
                        <span>{tasks.length}</span>
                        task
                    </span>
                )}
            </div>

            <div className="relative">
                <OverdueList data={overdueTasks} />
                <TaskList
                    data={tasks}
                    expiredItemExists={overdueTasks.length > 0}
                    ordering="priority"
                />
                <AddTaskButton />

                {/* Empty Page */}
                {overdueTasks.length <= 0 && tasks.length <= 0 ? <EmptyLists /> : null}
            </div>
        </div>
    );
};

function EmptyLists() {
    return (
        <div className="w-full mx-auto flex flex-col max-w-[300px] items-center justify-center ">
            <div className="w-[200px] h-[200px] relative">
                <Image src={"/assets/bag.png"} fill alt="bag" />
            </div>

            <div className="space-y-2 text-center">
                <h4 className="font-medium leading-none">Enjoy your well-deserved day off!</h4>
                <p className="text-sm text-neutral-300 ">
                    You can schedule your days off in the ‘Productivity’ section of your settings
                    menu.
                </p>
            </div>
        </div>
    );
}

export default TodayPage;
