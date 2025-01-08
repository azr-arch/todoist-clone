import { AddTaskButton } from "@/app/(platform)/app/_components/add-task-btn";
import { TaskList } from "../_components/tasklist";
import { prismaDb } from "@/lib/db";
import { OverdueList } from "../_components/overdue-list";
import Image from "next/image";
import { CheckCircle } from "lucide-react";
import { getStartAndEndOfDay } from "@/lib/utils";
import { fetchTasks } from "@/lib/task-fetcher";
import { PageLayout } from "@/components/layout/page-layout";

const TodayPage = async () => {
    const { startOfDay, endOfDay } = getStartAndEndOfDay();
    const { tasks, overdueTasks } = await fetchTasks({
        startDate: startOfDay,
        endDate: endOfDay,
        includeOverdue: true,
    });

    return (
        <PageLayout title="Today" taskCount={tasks.length}>
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
        </PageLayout>
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
