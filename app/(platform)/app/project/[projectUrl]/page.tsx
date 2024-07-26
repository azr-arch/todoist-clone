import { prismaDb } from "@/lib/db";
import { AddTaskButton } from "../../_components/add-task-btn";

const ProjectUrlPage = async ({ params }: { params: { projectUrl: string } }) => {
    const [projectName, projectId] = params.projectUrl.split("_");
    const formattedName = projectName.replace(/-/g, " ");

    let project;

    try {
        project = await prismaDb.project.findUnique({
            where: {
                id: projectId,
            },
            include: {
                sections: true,
                tasks: true,
            },
        });

        // TODO: Generate the query from project.query
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

            <div>{/* <AddTaskButton /> */}</div>
        </div>
    );
};

export default ProjectUrlPage;
