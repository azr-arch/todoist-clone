import { Task } from "@prisma/client";
import { TaskItem } from "./task-item";

interface TaskListProps {
    data?: Task[];
}

export const TaskList = ({ data }: TaskListProps) => {
    return (
        <ul>
            {data?.map((task) => {
                return (
                    <li key={task.id}>
                        <TaskItem data={task} />
                    </li>
                );
            })}
        </ul>
    );
};
