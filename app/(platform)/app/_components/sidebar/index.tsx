import { Project } from "@prisma/client";
import { prismaDb } from "@/lib/db";
import { SidebarWrapper } from "./sidebar-wrapper";

export const Sidebar = async () => {
    let projects: Project[];

    try {
        projects = await prismaDb.project.findMany({
            orderBy: {
                createdAt: "asc",
            },
        });
    } catch (error) {
        projects = [];
    }

    return <SidebarWrapper projects={projects} />;
};
