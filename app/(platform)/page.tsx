import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
    return (
        <div className="w-full  ">
            <div className="space-y-3 max-w-xl text-center mx-auto">
                <h1 className="text-[5vw] font-medium leading-[1.1]">
                    Organize Your Tasks Efficiently
                </h1>
                <p className="text-neutral-500  text-sm lg:text-xl">
                    Simplify Life for You and Your Team with Our Top-Rated Task Manager
                </p>
                <Link href="/auth/register">
                    <Button size={"lg"} variant={"highlight"} className="mx-auto mt-5">
                        Start for free
                    </Button>
                </Link>
            </div>
        </div>
    );
}
