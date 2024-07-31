"use client";

import { AddProjectModal } from "@/components/modals/add-project-modal";
import { Button } from "@/components/ui/button";
import { cn, createFormattedNameAndUrl } from "@/lib/utils";
import { Project } from "@prisma/client";
import {
    CalendarDays,
    CalendarFold,
    ChevronRight,
    CircleCheck,
    Hash,
    Inbox,
    LayoutGrid,
    Plus,
    PlusCircle,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const iconStyles = "w-5 h-5";

export const SidebarNav = ({ projects }: { projects: Project[] }) => {
    const [projectListOpen, setProjectListOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const pathname = usePathname();

    const sidebarRoutes = [
        {
            href: "/app/inbox",
            value: "Inbox",
            icon: <Inbox className={iconStyles} />,
            active: pathname === "/app/inbox",
        },
        {
            href: "/app/today",
            value: "Today",
            icon: <CalendarFold className={iconStyles} />,
            active: pathname === "/app/today",
        },
        {
            href: "/app/upcoming",
            value: "Upcoming",
            icon: <CalendarDays className={iconStyles} />,
            active: pathname === "/app/upcoming",
        },
        {
            href: "/app/completed",
            value: "Completed",
            icon: <CircleCheck className={iconStyles} />,
            active: pathname === "/app/completed",
        },
        {
            href: "/app/filters-labels",
            value: "Filters & Labels",
            icon: <LayoutGrid className={iconStyles} />,
            active: pathname === "/app/filters-labels",
        },
    ];

    return (
        <>
            <AddProjectModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

            <nav className="">
                <ul className="px-2 py-2">
                    <li className="flex items-center gap-x-2 px-2 py-1.5 mb-2 rounded-sm transition hover:bg-neutral-100 duration-150 cursor-pointer">
                        <PlusCircle className="w-6 h-6 text-highlight" />
                        <p className="text-orange-700">Add task</p>
                    </li>
                    {sidebarRoutes.map((item, idx) => (
                        <li
                            key={idx}
                            className={cn(
                                " px-2.5 py-1.5  rounded-sm transition hover:bg-neutral-100 cursor-pointer duration-150 text-main font-thin",
                                `${
                                    item.active
                                        ? "bg-orange-100 text-orange-700 hover:bg-orange-100"
                                        : ""
                                }`
                            )}
                        >
                            <Link href={item.href} className="flex items-center gap-x-2">
                                {item.icon}
                                <p>{item.value}</p>
                            </Link>
                        </li>
                    ))}
                </ul>
                <Link href={"/app/projects"}>
                    <div className=" ">
                        <div className="flex items-center bg-[#ffefe5] px-2 py-1.5 mt-5 rounded-sm ">
                            <p className=" text-black ">My Projects</p>

                            <div className="ml-auto group-hover:visible group-hover:opacity-100 invisible opacity-0 transition-opacity ">
                                <Button
                                    variant={"ghost"}
                                    size={"xs"}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        e.preventDefault();
                                        setModalOpen(true);
                                    }}
                                >
                                    <Plus className="size-4 text-neutral-400 hover:text-black" />
                                </Button>
                                <Button
                                    variant={"ghost"}
                                    size={"xs"}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        e.preventDefault();
                                        setProjectListOpen(!projectListOpen);
                                    }}
                                >
                                    <ChevronRight
                                        className={cn(
                                            `size-4 text-neutral-400 hover:text-black transition-transform duration-200`,
                                            projectListOpen ? "rotate-90" : "rotate-0"
                                        )}
                                    />
                                </Button>
                            </div>
                        </div>
                    </div>
                </Link>

                {projectListOpen && projects.length > 0 ? (
                    <ul>
                        {projects.map((project) => {
                            const { projectUrl } = createFormattedNameAndUrl(
                                project.name,
                                project.id
                            );

                            return (
                                <li
                                    key={project.id}
                                    className="px-4  my-2 py-2 rounded-sm flex items-center justify-between w-[90%] mx-auto hover:bg-neutral-200 transition-colors"
                                >
                                    <Link href={projectUrl}>
                                        <div className=" flex items-center gap-x-3  transition-colors">
                                            <Hash
                                                className="size-4"
                                                style={{ color: project.color }}
                                            />
                                            <span className="text-sm text-black font-thin">
                                                {project.name}
                                            </span>
                                        </div>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                ) : null}
            </nav>
        </>
    );
};
