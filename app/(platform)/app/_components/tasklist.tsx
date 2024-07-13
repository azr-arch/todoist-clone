import { Task } from "@prisma/client";
import { TaskItem } from "./task-item";
import Image from "next/image";

interface TaskListProps {
    data?: Task[];
}

export const TaskList = ({ data }: TaskListProps) => {
    return (
        <div className="w-full  ">
            {data && data.length > 0 ? (
                <ul className="space-y-4 w-full">
                    {data.map((task) => {
                        return (
                            <li key={task.id}>
                                <TaskItem data={task} />
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <EmptyLists />
            )}
        </div>
    );
};

// Todo: Fix UI bug
function EmptyLists() {
    return (
        <div className="w-full  absolute z-40 flex flex-col max-w-[300px] items-center justify-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
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
