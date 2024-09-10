import { prismaDb } from "@/lib/db";
import { AddTaskButton } from "../../_components/add-task-btn";
import { LabelWithLists } from "@/lib/types";
import { Label } from "@prisma/client";
import { TaskItem } from "../../_components/task-item";
import { TaskList } from "../../_components/tasklist";
import { currentUser } from "@clerk/nextjs/server";

const LabelUrlPage = async ({ params }: { params: { labelUrl: string } }) => {
    const [labelName, labelId] = params.labelUrl.split("_");
    const formattedName = labelName.replace(/-/g, " ");

    let label;

    try {
        const user = await currentUser();
        // TODO: Optimize this query
        label = await prismaDb.label.findUnique({
            where: {
                id: labelId,
                clerkUserId: user?.id,
            },
            include: {
                tasks: {
                    include: {
                        task: {
                            include: {
                                labels: {
                                    select: {
                                        label: {
                                            select: {
                                                id: true,
                                                name: true,
                                                color: true,
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });
    } catch (error) {
        console.error("Internal server erorr: ", error);
    }

    return (
        <div className="h-full">
            <div className="mb-4 ">
                <h1 className="text-2xl font-semibold hover:outline hover:outline-1 outline-neutral-200 rounded-md ">
                    {formattedName}
                </h1>
            </div>

            {label?.tasks && label.tasks.length > 0 ? (
                <TaskList data={label.tasks.map((item) => item.task)} />
            ) : null}

            <div>
                <AddTaskButton labelId={labelId} />
            </div>
        </div>
    );
};

export default LabelUrlPage;
