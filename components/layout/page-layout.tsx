import { CheckCircle } from "lucide-react";
import { ReactNode } from "react";

interface PageLayoutProps {
    title: string;
    taskCount?: number;
    children: ReactNode;
}

export const PageLayout = ({ title, taskCount, children }: PageLayoutProps) => {
    return (
        <div className="h-full">
            <div className="mb-10">
                <div className="space-y-2">
                    <h1 className="text-3xl mt-1 font-semibold hover:outline hover:outline-1 outline-neutral-200 rounded-md">
                        {title}
                    </h1>
                    {taskCount && taskCount > 0 && (
                        <span className="text-neutral-500 text-sm font-thin flex items-center gap-x-1 px-1">
                            <CheckCircle className="w-3 h-3" />
                            <span>{taskCount}</span>
                            task
                        </span>
                    )}
                </div>
            </div>

            {children}
        </div>
    );
};
