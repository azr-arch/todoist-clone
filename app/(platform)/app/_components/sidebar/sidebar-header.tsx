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
import { UserMenu } from "./user-menu";

export const SidebarHeader = () => {
    const { isOpen } = useSidebar();

    return (
        <div className="px-2 py-3 flex items-center w-full">
            <UserMenu />

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
