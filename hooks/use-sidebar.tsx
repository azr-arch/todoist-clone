import { create } from "zustand";

type SidebarStore = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

export const useSidebar = create<SidebarStore>((set) => ({
    isOpen: true,
    onOpen: () => {
        set({ isOpen: true });
        toggleSidebar(true);
    },
    onClose: () => {
        set({ isOpen: false });
        toggleSidebar(false);
    },
}));

function toggleSidebar(toggleTo: boolean) {
    // Reimplement this
    const sidebarEl = document.getElementById("sidebar");
    const appLayout = document.getElementById("app-layout");

    if (toggleTo) {
        sidebarEl?.setAttribute("data-state", "true");
        appLayout?.setAttribute("data-sidebar-open", "true");

        return;
    }

    sidebarEl?.setAttribute("data-state", "false");
    appLayout?.setAttribute("data-sidebar-open", "false");
}
