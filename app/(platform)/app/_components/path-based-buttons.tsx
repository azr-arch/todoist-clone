"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Maybe rename to Pathbased nav

export const PathBasedButtons = () => {
    const pathname = usePathname();

    // TODO: implement this
    // Related to notifications and task reminders

    return (
        <div className="h-[55px] my-2 px-3  ml-9 w-full flex items-center justify-between relative">
            {pathname.includes("/app/label/") || pathname.includes("/app/filter/") ? (
                <Link
                    href={"/app/filters-labels"}
                    className="px-1 text-xs py-1.5 mb-1 rounded-sm text-neutral-500 hover:bg-neutral-100 hover:text-black transition-colors"
                >
                    <span className="hidden md:block">Filters & Labels /</span>

                    <span className="md:hidden ">...</span>
                </Link>
            ) : null}
            {pathname.includes("/app/projects/") ? (
                <Link
                    href={"/app/projects"}
                    className="px-1 text-xs py-1.5 mb-1 rounded-sm text-neutral-500 hover:bg-neutral-100 hover:text-black transition-colors"
                >
                    My Projects /
                </Link>
            ) : null}
        </div>
    );
};
