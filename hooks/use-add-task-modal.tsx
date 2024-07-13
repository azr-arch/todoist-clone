import { create } from "zustand";

type AddTaskModal = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

export const useAddTaskModal = create<AddTaskModal>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));
