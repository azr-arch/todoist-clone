import { Button } from "@/components/ui/button";
import { useSidebar } from "@/hooks/use-sidebar";
import { PanelLeft } from "lucide-react";

export const SidebarToggle = () => {
    const { isOpen, onClose, onOpen } = useSidebar();

    const toggle = () => {
        if (isOpen) {
            onClose();
            return;
        }

        onOpen();
    };

    return (
        <Button size={"icon"} onClick={toggle} variant={"ghost"}>
            <PanelLeft className="size-5 text-neutral-600 stroke-1 " />
        </Button>
    );
};
