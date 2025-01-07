"use client";

import { Button } from "@/components/ui/button";
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarTrigger,
} from "@/components/ui/menubar";
import { Skeleton } from "@/components/ui/skeleton";
import { ICON_STYLES } from "@/lib/constants";
import { USER_MENU_ITEMS } from "@/lib/navigation-items";
import { cn } from "@/lib/utils";
import { SignOutButton, useUser } from "@clerk/nextjs";
import { ChevronDown, LogOut } from "lucide-react";
import Image from "next/image";

export const UserMenu = () => {
    const { user } = useUser();

    if (!user) {
        // Return Skeleton
        return <Skeleton className="w-24 h-7 rounded-md ml-1" />;
    }

    return (
        <Menubar>
            <MenubarMenu>
                <MenubarTrigger className="p-1 select-none flex w-fit items-center gap-x-1 cursor-pointer hover:bg-neutral-200/60 rounded-sm transition duration-150 ">
                    {user && (
                        <>
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
                        </>
                    )}
                </MenubarTrigger>

                <MenubarContent
                    side="bottom"
                    sideOffset={10}
                    className="w-[281px] bg-white shadow-menu rounded-md px-1 py-2"
                >
                    {/* Loop over menu items to render Menu item  */}
                    {USER_MENU_ITEMS.map((item, idx) => {
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
                                <LogOut className={cn("mr-2", ICON_STYLES)} />
                                Log out
                            </Button>
                        </SignOutButton>
                    </MenubarItem>
                </MenubarContent>
            </MenubarMenu>
        </Menubar>
    );
};
