"use client";

import { useEffect, useState } from "react";
import { TaskModal } from "../modals/task-modal";
import { SidebarAddTaskModal } from "../modals/sidebar-add-task-modal";

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <>
            <TaskModal />
            <SidebarAddTaskModal />
        </>
    );
};
