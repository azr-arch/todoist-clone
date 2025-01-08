import { Search } from "@/components/ui/search";
import { prismaDb } from "@/lib/db";
import { ProjectList } from "./_components/project-list";
import { Project } from "@prisma/client";
import { currentUser } from "@clerk/nextjs/server";
import { PageLayout } from "@/components/layout/page-layout";

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
        <PageLayout title="My Projects">
            <>
                <div>
                    <Search />
                </div>

                <div>
                    <ProjectList data={projects} />
                </div>
            </>
        </PageLayout>
    );
};

export default ProjectPage;
