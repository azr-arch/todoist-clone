import { AddTaskButton } from "@/app/(platform)/app/_components/add-task-btn";
import { TaskList } from "../_components/tasklist";
import { prismaDb } from "@/lib/db";

const TodayPage = async () => {
    const today = new Date();
    const startOfDay = new Date(today);
    startOfDay.setHours(0, 0, 0, 0); // Set time to midnight

    const endOfDay = new Date(today);
    endOfDay.setHours(23, 59, 59, 999); // Set time to just before midnight

    const tasks = await prismaDb.task.findMany({
        where: {
            dueDate: {
                gte: startOfDay,
                lte: endOfDay,
            },
        },
        orderBy: {
            order: "asc",
        },
    });

    if (!tasks) {
        return <h1>No task found</h1>;
    }

    return (
        <div className="h-full ">
            <div className="mb-10 ">
                <h1 className="text-3xl font-semibold hover:outline hover:outline-1 outline-neutral-200 rounded-md ">
                    Today
                </h1>
            </div>

            <div>
                <TaskList data={tasks} />
                <AddTaskButton />
            </div>
        </div>
    );
};

export default TodayPage;
