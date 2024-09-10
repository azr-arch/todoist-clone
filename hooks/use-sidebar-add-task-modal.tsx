import { create } from "zustand";

type SidebarAddTaskModal = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

export const useSidebarAddTaskModal = create<SidebarAddTaskModal>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));
