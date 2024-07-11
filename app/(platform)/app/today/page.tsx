import { AddTaskButton } from "@/components/add-task-btn";
import { AddTaskForm } from "@/components/form/add-task-form";
import { Plus } from "lucide-react";

const TodayPage = () => {
    return (
        <div>
            <div className="mb-4">
                <h1 className="text-3xl font-semibold hover:outline hover:outline-1 outline-neutral-200 rounded-md ">
                    Today
                </h1>
            </div>

            <div>
                <AddTaskButton />
            </div>
        </div>
    );
};

export default TodayPage;
