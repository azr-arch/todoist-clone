import { prismaDb } from "@/lib/db";
import { AddTaskButton } from "../../_components/add-task-btn";
import { LabelWithLists } from "@/lib/types";
import { Label } from "@prisma/client";
import { TaskItem } from "../../_components/task-item";
import { TaskList } from "../../_components/tasklist";
import { PageLayout } from "@/components/layout/page-layout";

const FilterUrlPage = async ({ params }: { params: { filterUrl: string } }) => {
    const [filterName, filterId] = params.filterUrl.split("_");
    const formattedName = filterName.replace(/-/g, " ");

    let filter;

    try {
        filter = await prismaDb.filter.findUnique({
            where: {
                id: filterId,
            },
        });

        // TODO: Generate the query from filter.query
    } catch (error) {
        console.error("Internal server erorr: ", error);
    }

    return (
        <PageLayout title={formattedName}>
            <>
                {/* TODO THIS */}
                {/* {filter?.tasks && filter.tasks.length > 0 ? (
                <TaskList data={filter.tasks.map((item) => item.task)} filter={filter} />
            ) : null} */}
                <p className="text-neutral-300">No tasks in this filter at the moment</p>

                <div>
                    <AddTaskButton />
                </div>
            </>
        </PageLayout>
    );
};

export default FilterUrlPage;
