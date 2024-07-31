import { create } from "zustand";

type defaultFormValue = {
    filterId: string;
    name: string;
    query: string;
    color: string;
};

type AddFilterModal = {
    isOpen: boolean;
    onOpen: (data?: defaultFormValue) => void;
    onClose: () => void;
    // For edit functionality
    defaultFormValue?: defaultFormValue;
};

export const useAddFilterModal = create<AddFilterModal>((set) => ({
    defaultFormValue: undefined,
    isOpen: false,
    onOpen: (data) => set({ isOpen: true, defaultFormValue: data }),
    onClose: () => set({ isOpen: false, defaultFormValue: undefined }),
}));
