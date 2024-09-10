import { prismaDb } from "@/lib/db";
import { TaskList } from "../_components/tasklist";
import { AddTaskButton } from "../_components/add-task-btn";
import { Task } from "@prisma/client";
import { TaskItem } from "../_components/task-item";
import { AddSectionBtn } from "./_components/add-section-btn";
import { SectionContainer } from "./_components/section-container";
import Image from "next/image";
import { fetchTasks } from "@/lib/task-fetcher";
import { currentUser } from "@clerk/nextjs/server";

const InboxPage = async () => {
    const user = await currentUser();

    const { tasks, overdueTasks } = await fetchTasks({
        sectionId: undefined,
        projectId: undefined,
    });

    const sections = await prismaDb.section.findMany({
        where: {
            projectId: null,
            clerkUserId: user?.id,
        },
        include: {
            tasks: true,
        },
        orderBy: {
            order: "asc",
        },
    });

    return (
        <div className="h-full">
            <div className="w-full">
                <div className="mb-10 px-5">
                    <h1 className="text-3xl font-semibold hover:outline hover:outline-1 outline-neutral-200 rounded-md ">
                        Inbox
                    </h1>
                </div>
                <div className="px-4">
                    <TaskList data={tasks} className="h-fit gap-0" />
                    <AddTaskButton />
                </div>

                {/* Add a new section button */}
                <div className="my-1">
                    <AddSectionBtn prevOrder={0} />
                </div>

                {!tasks || (tasks.length <= 0 && <EmptyLists />)}
            </div>

            <SectionContainer data={sections} />
        </div>
    );
};

export default InboxPage;

function EmptyLists() {
    return (
        <div className="w-full mx-auto flex flex-col max-w-[300px] items-center justify-center ">
            <div className="w-[200px] h-[200px] relative">
                <Image src={"/assets/bag.png"} fill alt="bag" />
            </div>

            <div className="space-y-2 text-center">
                <h4 className="font-medium leading-none">Your peace of mind is priceless</h4>
                <p className="text-sm text-neutral-300 ">
                    Well done! All your tasks are organized in the right place.
                </p>
            </div>
        </div>
    );
}
