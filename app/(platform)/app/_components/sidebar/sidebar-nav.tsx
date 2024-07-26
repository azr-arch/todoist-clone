"use client";

import { AddProjectModal } from "@/components/modals/add-project-modal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
    CalendarDays,
    CalendarFold,
    ChevronRight,
    CircleCheck,
    Inbox,
    LayoutGrid,
    Plus,
    PlusCircle,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const iconStyles = "w-5 h-5";

export const SidebarNav = () => {
    const [menuOpen, setMenuOpen] = useState(false);
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
            <AddProjectModal isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

            <nav>
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
                    <div className="group ">
                        <div className="flex items-center bg-[#ffefe5] px-2 py-1.5 mt-5 rounded-sm ">
                            <p className=" text-black ">My Projects</p>

                            <div className="ml-auto group-hover:visible group-hover:opacity-100 invisible opacity-0 transition-opacity ">
                                <Button
                                    variant={"ghost"}
                                    size={"xs"}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        e.preventDefault();
                                        setMenuOpen(true);
                                    }}
                                >
                                    <Plus className="size-4 text-neutral-400 hover:text-black" />
                                </Button>
                                <Button
                                    variant={"ghost"}
                                    size={"xs"}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setMenuOpen(!menuOpen);
                                    }}
                                >
                                    <ChevronRight
                                        className={cn(
                                            `size-4 text-neutral-400 hover:text-black transition-transform duration-200`,
                                            menuOpen ? "rotate-90" : "rotate-0"
                                        )}
                                    />
                                </Button>
                            </div>
                        </div>
                    </div>
                </Link>

                {/* <ol>
                    {}
                </ol> */}
            </nav>
        </>
    );
};
