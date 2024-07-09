"use client";

import { useAuth, UserButton } from "@clerk/nextjs";
import { Logo } from "./logo";
import Link from "next/link";
import { Button } from "./ui/button";

export const Header = () => {
    const { isSignedIn } = useAuth();

    return (
        <header className=" flex items-center pb-12 justify-between ">
            <Logo />

            {isSignedIn ? (
                <UserButton />
            ) : (
                <div className=" flex items-center gap-x-8">
                    <Link href={"/auth/login"}>
                        <Button variant={"ghost"}>Log in</Button>
                    </Link>

                    <Link href={"/auth/register"} className="">
                        <Button variant={"highlight"}>Start for free</Button>
                    </Link>
                </div>
            )}
        </header>
    );
};
