import { create } from "zustand";

type defaultFormValue = {
    labelId: string;
    name: string;
    color: string;
};

type AddLabelModal = {
    isOpen: boolean;
    onOpen: (data?: defaultFormValue) => void;
    onClose: () => void;
    // For edit functionality
    defaultFormValue?: defaultFormValue;
};

export const useAddLabel = create<AddLabelModal>((set) => ({
    defaultFormValue: undefined,
    isOpen: false,
    onOpen: (data) => set({ isOpen: true, defaultFormValue: data }),
    onClose: () => set({ isOpen: false, defaultFormValue: undefined }),
}));
