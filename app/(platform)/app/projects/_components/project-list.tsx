import { Project, Section } from "@prisma/client";
import { Hash, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { ProjectItem } from "./project-item";

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
