import { type ClassValue, clsx } from "clsx";
import { addDays, format } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const formatDate = (date: Date): string => {
    const today = new Date();
    const tomorrow = addDays(today, 1);
    const endOfWeek = addDays(today, 6); // End of the week is 7 days from today

    if (date >= today && date <= endOfWeek) {
        if (date.toDateString() === today.toDateString()) {
            return "Today";
        } else if (date.toDateString() === tomorrow.toDateString()) {
            return "Tomorrow";
        } else {
            return format(date, "EEEE"); // Full weekday name (e.g., "Monday")
        }
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

export const generateHeading = (date: Date) => {
    const options = { day: "numeric", month: "short", weekday: "long" };
    const formattedDate = date.toLocaleDateString("en-US", options).split(", ");

    const day = formattedDate[1].split(" ")[0];
    const month = formattedDate[1].split(" ")[1];
    const weekday = formattedDate[0];

    return `${day} ${month} ‧ Today ‧ ${weekday}`;
};

// Example usage:
/* ---------------------
const today = new Date();
console.log(generateHeading(today)); // Output: "18 Jul ‧ Today ‧ Thursday"
-------------------------------------------------------------------------- */

export const createFormattedNameAndUrl = (name: string, id: string) => {
    const formattedProjectName = name.replace(/\s+/g, "-");
    const projectUrl = `/app/project/${formattedProjectName}_${id}`;

    return { formattedProjectName, projectUrl };
};
