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
                {/* <AddTaskButton /> */}
                <AddTaskForm />
            </div>
        </div>
    );
};

function AddTaskButton() {
    return (
        <div className="flex items-center gap-x-2">
            <Plus className="w-4 h-4 text-orange-500" />
            <p className="font-thin text-neutral-400 hover:text-orange-500 transition cursor-pointer">
                Add task
            </p>
        </div>
    );
}

export default TodayPage;
