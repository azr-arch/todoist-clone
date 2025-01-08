import { type ClassValue, clsx } from "clsx";
import { addDays, format } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const formatDate = (date: Date, forUpcoming = false): string => {
    const today = new Date();
    const tomorrow = addDays(today, 1);
    const endOfWeek = addDays(today, 6); // End of the week is 7 days from today

    if (forUpcoming) {
        // Format for upcoming view: "Month Name Year" (e.g., "December 2024")
        return format(date, "MMMM yyyy");
    } else if (date >= today && date <= endOfWeek) {
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
    const options: Intl.DateTimeFormatOptions = { day: "numeric", month: "short", weekday: "long" };
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

//

export const getStartAndEndOfDay = () => {
    const today = new Date();
    const startOfDay = new Date(today);
    startOfDay.setHours(0, 0, 0, 0); // Set time to midnight

    const endOfDay = new Date(today);
    endOfDay.setHours(23, 59, 59, 999); // Set time to just before midnight

    return { startOfDay, endOfDay };
};

export const generateInitialDates = (days = 30) => {
    const dates = [];
    const today = new Date();

    for (let i = 0; i < days; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        dates.push(date.toISOString().split("T")[0]); // Format as YYYY-MM-DD
    }

    return dates;
};

export const generateMoreDates = (page: number, daysPerPage = 30) => {
    const dates = [];
    const startDate = new Date();
    startDate.setDate(startDate.getDate() + page * daysPerPage);

    for (let i = 0; i < daysPerPage; i++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);
        dates.push(date.toISOString().split("T")[0]); // Format as YYYY-MM-DD
    }

    return dates;
};

export const getDaysOfWeek = (date: Date) => {
    // First get the start of week
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay() + 1);

    return Array.from({ length: 7 }, (_, idx) => {
        const day = new Date(startOfWeek);
        day.setDate(startOfWeek.getDate() + idx);
        return day;
    });
};
