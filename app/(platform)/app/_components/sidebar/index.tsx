import { Project } from "@prisma/client";
import { SidebarHeader } from "./sidebar-header";
import { SidebarNav } from "./sidebar-nav";
import { prismaDb } from "@/lib/db";

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

    return (
        <aside
            id="sidebar"
            data-state={"true"}
            className="w-[280px] transition-transform duration-200 ease-in-out data-[state=false]:-translate-x-[100%] data-[state=true]:-translate-x-0 h-screen bg-sidebar fixed top-0 left-0 z-50 group"
        >
            {/* Header */}
            <SidebarHeader />

            {/* Nav */}
            <SidebarNav projects={projects} />
        </aside>
    );
};
