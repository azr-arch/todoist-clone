import { type ClassValue, clsx } from "clsx";
import { addDays, format } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const formatDate = (date: Date): string => {
    const today = new Date();
    const tomorrow = addDays(today, 1);

    if (date.toDateString() === today.toDateString()) {
        return "Today";
    } else if (date.toDateString() === tomorrow.toDateString()) {
        return "Tomorrow";
    } else if (date <= addDays(today, 6)) {
        // Display weekday names up to next Thursday
        return format(date, "EEEE"); // Full weekday name (e.g., "Monday")
    } else {
        return format(date, "d/M/y"); // Display formatted date (e.g., "15/3/23")
    }
};

export function reorder<T>(list: T[], startIndex: number, endIndex: number) {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
}
