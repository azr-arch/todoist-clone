import { AddTaskButton } from "@/components/add-task-btn";
import { AddTaskForm } from "@/components/form/add-task-form";
import { Plus } from "lucide-react";
import { TaskList } from "../_components/tasklist";
import { prismaDb } from "@/lib/db";

const TodayPage = async () => {
    const tasks = await prismaDb.task.findMany({
        where: {
            sectionType: {
                equals: "today",
            },
        },
    });

    return (
        <div>
            <div className="mb-10">
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
