import { prismaDb } from "@/lib/db";
import { AddTaskButton } from "../../_components/add-task-btn";
import { LabelWithLists } from "@/lib/types";
import { Label } from "@prisma/client";
import { TaskItem } from "../../_components/task-item";
import { TaskList } from "../../_components/tasklist";

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
        <div className="h-full">
            <div className="mb-4 ">
                <h1 className="text-2xl font-semibold hover:outline hover:outline-1 outline-neutral-200 rounded-md ">
                    {formattedName}
                </h1>
            </div>

            {/* TODO THIS */}
            {/* {filter?.tasks && filter.tasks.length > 0 ? (
                <TaskList data={filter.tasks.map((item) => item.task)} filter={filter} />
            ) : null} */}
            <p className="text-neutral-300">No tasks in this filter at the moment</p>

            <div>
                <AddTaskButton />
            </div>
        </div>
    );
};

export default FilterUrlPage;
