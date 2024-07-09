import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
    return (
        <Link href="/">
            <div className="hover:opacity-75 transition items-center gap-x-2 hidden md:flex">
                <Image src={"/assets/logo.svg"} width={50} height={50} alt="Logo" />
                <h3 className="text-highlight font-medium text-2xl">todovex</h3>
            </div>
        </Link>
    );
};
