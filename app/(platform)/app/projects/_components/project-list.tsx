import { Project, Section } from "@prisma/client";
import { Hash, MoreHorizontal } from "lucide-react";
import Link from "next/link";

interface ProjectListProps {
    data: Project[];
}

export const ProjectList = ({ data }: ProjectListProps) => {
    return (
        <div className="my-7 space-y-2">
            <p className="text-sm text-neutral-500 ">
                {data.length <= 0 ? "0" : data.length} projects
            </p>

            {data.length > 0 ? (
                <ul>
                    {data.map((item) => (
                        <li key={item.id}>
                            <ProjectItem data={item} />
                        </li>
                    ))}
                </ul>
            ) : null}
        </div>
    );
};

function ProjectItem({ data }: { data: Project }) {
    const formattedProjectName = data.name.replace(/\s+/g, "-");
    const projectUrl = `/app/project/${formattedProjectName}_${data.id}`;

    return (
        <Link href={projectUrl}>
            <div className="w-full flex items-center min-h-[51px] rounded-md hover:bg-neutral-100 transition-colors px-2">
                <div className="flex items-center gap-x-2">
                    <Hash className="size-4 font-thin" style={{ color: data.color }} />
                    <span className="font-thin text-sm text-neutral-600">{data.name}</span>
                </div>

                <MoreHorizontal className="size-6 ml-auto" />
            </div>
        </Link>
    );
}
