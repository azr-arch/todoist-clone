"use client";

import { useUser } from "@clerk/nextjs";
import Image from "next/image";

export const SidebarHeader = () => {
    const { user } = useUser();
    return (
        <div className="p-2">
            {user && (
                <div>
                    <Image src={user.imageUrl} width={15} height={15} alt="User profile" />
                    <span className="text-base font-medium">{user.username}</span>
                </div>
            )}
        </div>
    );
};
