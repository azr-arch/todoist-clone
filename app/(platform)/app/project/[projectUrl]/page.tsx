import { prismaDb } from "@/lib/db";
import { AddTaskButton } from "../../_components/add-task-btn";
import Image from "next/image";
import { TaskList } from "../../_components/tasklist";
import { AddSectionBtn } from "../../inbox/_components/add-section-btn";
import { SectionContainer } from "../../inbox/_components/section-container";

const ProjectUrlPage = async ({ params }: { params: { projectUrl: string } }) => {
    const [projectName, projectId] = params.projectUrl.split("_");
    const formattedName = projectName.replace(/-/g, " ");

    let project;
    let sections;

    try {
        project = await prismaDb.project.findUnique({
            where: {
                id: projectId,
            },
            include: {
                sections: true,
                tasks: {
                    where: {
                        sectionId: null,
                        isCompleted: false,
                    },
                },
            },
        });

        sections = await prismaDb.section.findMany({
            where: {
                projectId,
            },
            include: {
                tasks: true,
            },
            orderBy: {
                order: "asc",
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

            <div></div>

            <div className="my-8">
                {project?.tasks && project?.tasks?.length > 0 ? (
                    <TaskList data={project.tasks} className="min-h-[42px] h-fit" />
                ) : null}

                <div className="mx-3">
                    <AddTaskButton />
                </div>
            </div>

            {/* Add a new section button */}
            <div className="my-1">
                <AddSectionBtn prevOrder={0} />
            </div>

            {sections && sections.length > 0 ? <SectionContainer data={sections} /> : null}

            {!project?.tasks || project?.tasks.length <= 0 ? <EmptyTasks /> : null}
        </div>
    );
};

export default ProjectUrlPage;

export function EmptyTasks() {
    return (
        <div className="w-full mx-auto flex flex-col max-w-[300px] items-center justify-center ">
            <div className="w-[200px] h-[200px] relative">
                <Image src={"/assets/bag.png"} fill alt="bag" />
            </div>

            <div className="space-y-2 text-center">
                <h4 className="font-medium leading-none">Start small (or dream big)...</h4>
                <p className="text-sm text-neutral-300 ">
                    Add your tasks or find a template to get started with your project.
                </p>
            </div>
        </div>
    );
}
