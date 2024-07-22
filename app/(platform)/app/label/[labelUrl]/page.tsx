import { prismaDb } from "@/lib/db";
import { AddTaskButton } from "../../_components/add-task-btn";
import { LabelWithLists } from "@/lib/types";
import { Label } from "@prisma/client";
import { TaskItem } from "../../_components/task-item";
import { TaskList } from "../../_components/tasklist";

const LabelUrlPage = async ({ params }: { params: { labelUrl: string } }) => {
    const [labelName, labelId] = params.labelUrl.split("_");
    const formattedName = labelName.replace(/-/g, " ");

    let label;

    try {
        //TODO Optimize this query
        label = await prismaDb.label.findUnique({
            where: {
                id: labelId,
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

        // The label in the task, have 3 proprs, labelId, taskId, labelData, i want label to have only labelData not rest, how do i format it?
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
                <TaskList data={label.tasks.map((item) => item.task)} label={label} />
            ) : null}

            <div>
                <AddTaskButton labelId={labelId} />
            </div>
        </div>
    );
};

export default LabelUrlPage;
