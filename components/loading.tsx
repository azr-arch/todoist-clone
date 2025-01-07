import { LoaderCircleIcon } from "lucide-react";
import Image from "next/image";

export const LoadingUI = ({ withLogo = true }: { withLogo: boolean }) => {
    return (
        <div className="w-full h-full  flex items-center justify-center">
            <div className="space-y-2 flex flex-col items-center justify-center">
                {withLogo && <Image src={"/assets/logo.svg"} width={120} height={120} alt="Logo" />}
                <LoaderCircleIcon className="w-6 h-6 text-blue-500 animate-spin" />
            </div>
        </div>
    );
};
