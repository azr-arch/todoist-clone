import { AddTaskButton } from "@/app/(platform)/app/_components/add-task-btn";
import { TaskList } from "../_components/tasklist";
import { prismaDb } from "@/lib/db";
import { OverdueList } from "../_components/overdue-list";

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

    // if (!tasks.length) {
    //     return <h1>No task found</h1>;
    // }

    return (
        <div className="h-full">
            <div className="mb-10">
                <h1 className="text-3xl font-semibold hover:outline hover:outline-1 outline-neutral-200 rounded-md">
                    Today
                </h1>
            </div>

            <div>
                <OverdueList data={overdueTasks} />
                <TaskList data={tasks} expiredItemExists={overdueTasks.length > 0} />
                <AddTaskButton />
            </div>
        </div>
    );
};

export default TodayPage;
