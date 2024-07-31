"use client";

import { useEffect, useState } from "react";
import { TaskModal } from "../modals/task-modal";

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <>
            <TaskModal />
        </>
    );
};
