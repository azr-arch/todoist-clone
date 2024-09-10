import { prismaDb } from "@/lib/db";
import { AddTaskButton } from "../../_components/add-task-btn";
import Image from "next/image";
import { TaskList } from "../../_components/tasklist";
import { AddSectionBtn } from "../../inbox/_components/add-section-btn";
import { SectionContainer } from "../../inbox/_components/section-container";
import { EmptyTasks } from "@/components/empty-tasks";
import { currentUser } from "@clerk/nextjs/server";

const ProjectUrlPage = async ({ params }: { params: { projectUrl: string } }) => {
    const [projectName, projectId] = params.projectUrl.split("_");
    const formattedName = projectName.replace(/-/g, " ");

    let project;
    let sections;

    try {
        const user = await currentUser();

        project = await prismaDb.project.findUnique({
            where: {
                id: projectId,
                clerkUserId: user?.id,
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
                clerkUserId: user?.id,
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
