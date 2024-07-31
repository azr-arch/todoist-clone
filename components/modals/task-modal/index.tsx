"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { useTaskModal } from "@/hooks/use-task-modal";
import { Plus, X } from "lucide-react";
import { Header } from "./header";
import { Separator } from "@/components/ui/separator";
import { Description } from "./description";
import Image from "next/image";
import { Task } from "@prisma/client";
import { useUser } from "@clerk/nextjs";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/lib/fetcher";
import { FullTask } from "@/lib/types";
import { useEffect, useState } from "react";

export const TaskModal = () => {
    const id = useTaskModal((state) => state.id);
    const isOpen = useTaskModal((state) => state.isOpen);
    const onClose = useTaskModal((state) => state.onClose);

    const { data, error, isLoading, refetch } = useQuery<FullTask>({
        queryKey: ["task", id],
        queryFn: () => fetcher(`/api/tasks/${id}`),
        enabled: !!id, // Only run the query when id is available
    });

    if (isLoading) <div>Loading</div>;
    if (error) <div>Error occured</div>;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="absolute h-[95vh] px-0 py-0 max-w-[864px] top-[5vh] xs:top-1/2 xs:-translate-y-1/2 rounded-t-lg  xs:rounded-b-lg translate-y-0 xs:w-[90%] flex flex-col  items-start gap-y-0 ">
                <DialogTitle className="hidden">Task details</DialogTitle>
                {/* TODO: Add skeletons */}
                {!data ? <Header.Skeleton /> : <Header data={data} />}

                <Separator className="w-full bg-neutral-100 h-[1px]" />

                {!data ? <Description.Skeleton /> : <Description data={data} />}

                <div className="py-1 bg-neutral-100 w-full md:w-[calc(100%-260px)] mt-5 md:py-0">
                    <div className="py-3 px-4 md:px-12 bg-white">
                        <Button
                            className="w-full md:w-fit md:px-1.5 md:py-1 h-[40px] text-[#202020] font-thin px-3 justify-start"
                            variant={"ghost"}
                        >
                            <Plus className="size-4 mr-4 md:mr-2 stroke-1" />
                            Add sub-task
                        </Button>
                    </div>
                </div>

                <CommentBar />
            </DialogContent>
        </Dialog>
    );
};

function CommentBar({ data }: { data?: Task }) {
    const { user } = useUser();

    return (
        <div className="w-full flex items-center  gap-x-4 py-4 px-5 md:w-[calc(100%-260px)]">
            <Image
                src={user?.imageUrl || ""}
                width={30}
                height={30}
                alt="Profile picture"
                className="rounded-full"
            />
            <Input className="h-8 rounded-xl font-thin" placeholder="Comment" />
        </div>
    );
}
