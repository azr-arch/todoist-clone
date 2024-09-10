"use client";

import { useSidebarAddTaskModal } from "@/hooks/use-sidebar-add-task-modal";
import { Dialog, DialogContent } from "../ui/dialog";
import { Header } from "./task-modal/header";
import { SidebarAddTaskForm } from "../form/sidebar-add-task-form";

export const SidebarAddTaskModal = () => {
    const isOpen = useSidebarAddTaskModal((state) => state.isOpen);
    const onClose = useSidebarAddTaskModal((state) => state.onClose);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="rounded-xl p-0">
                {/* TODO: Add skeletons */}
                {/* {!data ? <Header.Skeleton /> : <Header data={data} />} */}

                {/* <Separator className="w-full bg-neutral-100 h-[1px]" /> */}
                <SidebarAddTaskForm onCloseForm={onClose} />
            </DialogContent>
        </Dialog>
    );
};
