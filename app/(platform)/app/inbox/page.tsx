import { prismaDb } from "@/lib/db";
import { TaskList } from "../_components/tasklist";
import { AddTaskButton } from "../_components/add-task-btn";
import { Task } from "@prisma/client";
import { TaskItem } from "../_components/task-item";
import { AddSectionBtn } from "./_components/add-section-btn";
import { SectionContainer } from "./_components/section-container";

const InboxPage = async () => {
    const tasks = await prismaDb.task.findMany({
        where: {
            isCompleted: {
                not: true,
            },
            sectionId: {
                equals: null,
            },
        },
        orderBy: {
            order: "asc",
        },
        include: {
            labels: {
                select: {
                    label: true,
                },
            },
        },
    });

    const sections = await prismaDb.section.findMany({
        where: {
            project: null,
        },
        include: {
            tasks: true,
        },
        orderBy: {
            order: "asc",
        },
    });

    if (!tasks) {
        return <h1>No task found</h1>;
    }

    return (
        <div className="h-full">
            <div className="w-full">
                <div className="mb-10 px-5">
                    <h1 className="text-3xl font-semibold hover:outline hover:outline-1 outline-neutral-200 rounded-md ">
                        Inbox
                    </h1>
                </div>
                <div className="px-4">
                    <TaskList data={tasks} className="h-[58px]" />
                    <AddTaskButton />
                </div>

                {/* Add a new section button */}
                <div className="my-1">
                    <AddSectionBtn prevOrder={0} />
                </div>
            </div>

            <SectionContainer data={sections} />
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
