import { LoaderCircleIcon } from "lucide-react";
import Image from "next/image";

export const LoadingUI = () => {
    return (
        <div className="w-full h-full bg-white flex items-center justify-center">
            <div className="space-y-2 flex flex-col items-center justify-center">
                <Image src={"/assets/logo.svg"} width={120} height={120} alt="Logo" />
                <LoaderCircleIcon className="w-6 h-6 text-orange-600 animate-spin" />
            </div>
        </div>
    );
};
