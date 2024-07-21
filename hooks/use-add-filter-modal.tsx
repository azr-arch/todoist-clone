import { create } from "zustand";

type AddFilterModal = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

export const useAddFilterModal = create<AddFilterModal>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));
