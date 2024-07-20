import { AddTaskButton } from "@/app/(platform)/app/_components/add-task-btn";
import { TaskList } from "../_components/tasklist";
import { prismaDb } from "@/lib/db";
import { OverdueList } from "../_components/overdue-list";
import Image from "next/image";

const getStartAndEndOfDay = () => {
    const today = new Date();
    const startOfDay = new Date(today);
    startOfDay.setHours(0, 0, 0, 0); // Set time to midnight

    const endOfDay = new Date(today);
    endOfDay.setHours(23, 59, 59, 999); // Set time to just before midnight

    return { startOfDay, endOfDay };
};

const fetchTasks = async (startOfDay: Date, endOfDay: Date) => {
    const [tasks, overdueTasks] = await Promise.all([
        prismaDb.task.findMany({
            where: {
                isCompleted: {
                    not: true,
                },
                dueDate: {
                    gte: startOfDay,
                    lte: endOfDay,
                },
            },
            orderBy: {
                order: "asc",
            },
        }),
        prismaDb.task.findMany({
            where: {
                dueDate: {
                    lt: startOfDay,
                },
            },
            orderBy: {
                order: "asc",
            },
        }),
    ]);

    return { tasks, overdueTasks };
};

const TodayPage = async () => {
    const { startOfDay, endOfDay } = getStartAndEndOfDay();
    const { tasks, overdueTasks } = await fetchTasks(startOfDay, endOfDay);

    return (
        <div className="h-full">
            <div className="mb-10">
                <h1 className="text-3xl font-semibold hover:outline hover:outline-1 outline-neutral-200 rounded-md">
                    Today
                </h1>
            </div>

            <div className="relative">
                <OverdueList data={overdueTasks} />
                <TaskList data={tasks} expiredItemExists={overdueTasks.length > 0} />
                <AddTaskButton />

                {/* Empty Page */}
                {overdueTasks.length <= 0 && tasks.length <= 0 ? <EmptyLists /> : null}
            </div>
        </div>
    );
};

export function EmptyLists() {
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
