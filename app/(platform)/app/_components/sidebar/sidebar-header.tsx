"use client";

import { Button } from "@/components/ui/button";
import {
    Menubar,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarTrigger,
} from "@/components/ui/menubar";
import { cn } from "@/lib/utils";
import { SignOutButton, useUser } from "@clerk/nextjs";
import { MenubarContent } from "@radix-ui/react-menubar";
import {
    Activity,
    ChevronDown,
    LogOut,
    Plus,
    Settings,
    Bell,
    PanelRight,
    PanelLeft,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { SidebarToggle } from "./sidebar-toggle";
import { useSidebar } from "@/hooks/use-sidebar";

const iconStyles = "w-4 h-4 ";

const menuItems = [
    {
        href: "/app/settings",
        value: "Settings",
        icon: <Settings className={iconStyles} />,
    },
    {
        value: "Add a team",
        icon: <Plus className={iconStyles} />,
    },
    {
        separator: true,
    },
    {
        href: "/app/activity",
        value: "Activity",
        icon: <Activity className={iconStyles} />,
    },
];

export const SidebarHeader = () => {
    const { user } = useUser();
    const { isOpen } = useSidebar();

    return (
        <div className="px-2 py-3 flex items-center w-full">
            {user && (
                <Menubar>
                    <MenubarMenu>
                        <MenubarTrigger className="p-1 select-none flex w-fit items-center gap-x-1 cursor-pointer hover:bg-neutral-200/60 rounded-sm transition duration-150 ">
                            <Image
                                src={user.imageUrl}
                                width={25}
                                height={25}
                                alt="User profile"
                                className="rounded-full object-cover"
                            />
                            <div className="flex items-center gap-x-1">
                                <p className="text-sm font-medium inline-flex">{user.firstName}</p>
                                <ChevronDown className="w-4 h-4" />
                            </div>
                        </MenubarTrigger>

                        <MenubarContent
                            side="bottom"
                            sideOffset={10}
                            className="w-[281px] bg-white shadow-menu rounded-md px-1 py-2"
                        >
                            {/* Loop over menu items to render Menu item  */}
                            {menuItems.map((item, idx) => {
                                // Reimplement with switch ??
                                if (item.separator) {
                                    return <MenubarSeparator key={idx} className="my-2" />;
                                }

                                return (
                                    <MenubarItem key={idx} className="rounded-sm">
                                        <div className="flex items-center gap-x-2 text-main">
                                            {item.icon}
                                            <p>{item.value}</p>
                                        </div>
                                    </MenubarItem>
                                );
                            })}

                            {/* Todo: bug when logout (page not found error ) */}
                            <MenubarItem>
                                <SignOutButton redirectUrl="/">
                                    <Button
                                        variant={"ghost"}
                                        className="px-0 py-0 h-fit text-main font-normal"
                                    >
                                        <LogOut className={cn("mr-2", iconStyles)} />
                                        Log out
                                    </Button>
                                </SignOutButton>
                            </MenubarItem>
                        </MenubarContent>
                    </MenubarMenu>
                </Menubar>
            )}

            <div
                className={cn(
                    `ml-auto space-x-1.5 transition-transform duration-200 ease-in-out`,
                    isOpen ? "translate-x-0" : "translate-x-14"
                )}
            >
                <Button size={"icon"} variant={"ghost"}>
                    <Bell className="size-5 text-neutral-600 stroke-1 " />
                </Button>
                <SidebarToggle />
            </div>
        </div>
    );
};
