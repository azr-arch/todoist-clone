import { prismaDb } from "@/lib/db";
import { AddTaskButton } from "../../_components/add-task-btn";
import { LabelWithLists } from "@/lib/types";
import { Label } from "@prisma/client";
import { TaskItem } from "../../_components/task-item";
import { TaskList } from "../../_components/tasklist";
import { currentUser } from "@clerk/nextjs/server";
import { PageLayout } from "@/components/layout/page-layout";

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
        <PageLayout title={formattedName}>
            {label?.tasks && label.tasks.length > 0 ? (
                <TaskList data={label.tasks.map((item) => item.task)} />
            ) : null}

            <div>
                <AddTaskButton labelId={labelId} />
            </div>
        </PageLayout>
    );
};

export default LabelUrlPage;
