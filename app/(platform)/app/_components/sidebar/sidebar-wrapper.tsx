"use client";

import { Project } from "@prisma/client";
import { SidebarHeader } from "./sidebar-header";
import { SidebarNav } from "./sidebar-nav";
import { useEffect } from "react";
import { useSidebar } from "@/hooks/use-sidebar";

interface SidebarWrapperProps {
    projects: Project[];
}

export const SidebarWrapper = ({ projects }: SidebarWrapperProps) => {
    const { isOpen, onOpen, onClose } = useSidebar();

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                onClose();
            } else {
                onOpen();
            }
        };

        window.addEventListener("resize", handleResize);

        // Call initially to set the correct state on load
        handleResize();

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [onClose, onOpen]);

    return (
        <aside
            id="sidebar"
            data-state={isOpen}
            className="w-[280px] transition-transform duration-200 ease-in-out data-[state=false]:-translate-x-[100%] data-[state=true]:-translate-x-0 h-screen bg-sidebar fixed top-0 left-0 z-50 group"
        >
            {/* Header */}
            <SidebarHeader />

            {/* Nav */}
            <SidebarNav projects={projects} />
        </aside>
    );
};
