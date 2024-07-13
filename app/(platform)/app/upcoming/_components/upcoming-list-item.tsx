import { Task } from "@prisma/client";
import { Check, Delete, Edit, MoreHorizontal, MoreVertical, Trash } from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface UpcomingListItemProps {
    data: Task;
}

export const UpcomingListItem = ({ data }: UpcomingListItemProps) => {
    // TODO fix group hover bug
    return (
        <div className="w-full h-[58px] mb-2 border-b border-neutral-200 flex items-start gap-x-4 relative group">
            <div className="group rounded-full w-5 h-5 bg-transparent border cursor-pointer border-neutral-400  flex items-center justify-center">
                <Check className="text-neutral-400 w-[14px] h-[14px] transition-opacity opacity-0 group-hover:opacity-100 " />
            </div>
            <div className="truncate">
                <p className="text-neutral-700 font-thin text-sm leading-none">{data.title}</p>
                {data.description && (
                    <p className="font-thin text-neutral-500 text-xs ">{data.description}</p>
                )}
            </div>

            {/* Actions */}
            <DropdownMenu>
                <DropdownMenuTrigger className="ml-auto opacity-0 invisible group-hover:opacity-100 group-hover:visible">
                    <MoreHorizontal className="w-4 h-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    className="w-[251px]"
                    side="bottom"
                    sideOffset={4}
                    align="end"
                    alignOffset={-20}
                >
                    <DropdownMenuItem>
                        <Button
                            // onClick={enableEditing}
                            variant={"ghost"}
                            className="font-thin h-fit w-full flex items-center justify-start p-0"
                        >
                            <Edit className="w-5 h-5 mr-4" />
                            Edit
                        </Button>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Button
                            // onClick={() => setOpen(true)}
                            variant={"ghost"}
                            className="font-thin text-red-500  w-full flex items-center justify-start  hover:text-red-600 h-fit p-0"
                        >
                            <Trash className="w-5 h-5 mr-4" />
                            Delete
                        </Button>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};
