import { prismaDb } from "@/lib/db";
import { TaskList } from "../_components/tasklist";
import { AddTaskButton } from "../_components/add-task-btn";
import { Task } from "@prisma/client";
import { TaskItem } from "../_components/task-item";

const InboxPage = async () => {
    const tasks = await prismaDb.task.findMany({
        orderBy: {
            order: "asc",
        },
    });

    if (!tasks) {
        return <h1>No task found</h1>;
    }

    return (
        <div className="h-full">
            <div className="mb-10 ">
                <h1 className="text-3xl font-semibold hover:outline hover:outline-1 outline-neutral-200 rounded-md ">
                    Inbox
                </h1>
            </div>
            <div>
                <TaskList data={tasks} className="h-[58px]" />
                <AddTaskButton />
            </div>
        </div>
    );
};

export default InboxPage;

// function InboxTaskList({ data }: { data?: Task[] }) {
//     return (
//         <div className="w-full  ">
//             {data && data.length > 0 ? (
//                 <ul className="space-y-4 w-full">
//                     {data.map((task) => {
//                         return (
//                             <li key={task.id}>
//                                 <TaskItem
//                                     data={task}
//                                     dueDateVisible={true}
//                                     className="h-[58px] bg-black"
//                                 />
//                             </li>
//                         );
//                     })}
//                 </ul>
//             ) : (
//                 // <EmptyLists />
//                 <p>Empty</p>
//             )}
//         </div>
//     );
// }
