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
    // Registering service worker
    // useEffect(() => {
    //     async function setUpServiceWorker() {
    //         try {
    //             await registerServiceWorker();
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     }

    //     setUpServiceWorker();
    // }, []);

    return (
        <div className="min-h-[55px] px-3 w-full flex items-center justify-between">
            {pathname.includes("/app/label") || pathname.includes("/app/filter") ? (
                <Link
                    href={"/app/filters-labels"}
                    className="px-1 text-xs py-1.5 rounded-sm text-neutral-500 hover:bg-neutral-100 hover:text-black transition-colors"
                >
                    Filters & Labels /
                </Link>
            ) : null}

            {pathname.includes("/app/project") ? (
                <Link
                    href={"/app/projects"}
                    className="px-1 text-xs py-1.5 rounded-sm text-neutral-500 hover:bg-neutral-100 hover:text-black transition-colors"
                >
                    My Projects /
                </Link>
            ) : null}
        </div>
    );
};
