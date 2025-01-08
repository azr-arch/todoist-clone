import { create } from "zustand";

type CalendarStore = {
    todaysDate: Date;
    currentWeek: Date;
    setCurrentWeek: (date: Date) => void;
    resetToToday: () => void;
    moveToPreviousWeek: () => void;
    moveToNextWeek: () => void;
};

export const useCalendar = create<CalendarStore>((set) => ({
    todaysDate: new Date(),
    currentWeek: new Date(),
    setCurrentWeek: (date) => set({ currentWeek: date }),
    resetToToday: () => set({ currentWeek: new Date() }),
    moveToPreviousWeek: () =>
        set((state) => {
            const previousWeek = new Date(state.currentWeek);
            previousWeek.setDate(state.currentWeek.getDate() - 7);

            // Check if the previous week is before the current date
            if (previousWeek < state.todaysDate) {
                return state; // If it is then do not update it
            }

            return { currentWeek: previousWeek };
        }),
    moveToNextWeek: () =>
        set((state) => {
            const nextWeek = new Date(state.currentWeek);
            nextWeek.setDate(state.currentWeek.getDate() + 7);

            return { currentWeek: nextWeek };
        }),
}));
