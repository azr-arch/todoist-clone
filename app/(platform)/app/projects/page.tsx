import { Search } from "@/components/ui/search";
import { prismaDb } from "@/lib/db";
import { ProjectList } from "./_components/project-list";
import { Project } from "@prisma/client";
import { currentUser } from "@clerk/nextjs/server";

const ProjectPage = async () => {
    let projects: Project[];

    try {
        const user = await currentUser();
        projects = await prismaDb.project.findMany({
            where: {
                clerkUserId: user?.id,
            },
            orderBy: {
                createdAt: "asc",
            },
        });
    } catch (error) {
        projects = [];
    }

    return (
        <div className="h-full">
            <div className="mb-6 ">
                <h1 className="text-3xl font-semibold hover:outline hover:outline-1 outline-neutral-200 rounded-md ">
                    My Projects
                </h1>
            </div>

            <div>
                <Search />
            </div>

            <div>
                <ProjectList data={projects} />
            </div>
        </div>
    );
};

export default ProjectPage;
