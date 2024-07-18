"use client";

import { cn } from "@/lib/utils";
import { CalendarDays, CalendarFold, CircleCheck, Inbox, PlusCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const iconStyles = "w-5 h-5";

export const SidebarNav = () => {
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
    ];

    return (
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
        </nav>
    );
};
