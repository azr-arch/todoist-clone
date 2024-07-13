"use client";

import { useEffect, useState } from "react";
import { Dialog } from "./ui/dialog";
import { Modal } from "./ui/modal";
import { Button } from "./ui/button";

interface AlertModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    loading: boolean;
    confirmLabel?: string;
    title?: string;
    description?: string;
}

export const AlertModal = ({
    isOpen,
    onClose,
    onConfirm,
    loading,
    confirmLabel,
    title,
    description,
}: AlertModalProps) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <Modal
            title={title ?? "Are you sure ?"}
            description={description ?? "This action cannot be undone."}
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className="pt-6 space-x-2  flex items-center justify-end w-full">
                <Button disabled={loading} variant={"outline"} onClick={onClose}>
                    Cancel
                </Button>
                <Button disabled={loading} variant={"destructive"} onClick={onConfirm}>
                    {confirmLabel ?? "Continue"}
                </Button>
            </div>
        </Modal>
    );
};
