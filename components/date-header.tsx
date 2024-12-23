"use client";

interface Props {
    date: string;
}

export const DateHeader = ({ date }: Props) => {
    const formattedDate = new Date(date).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
    });
    const dayOfWeek = new Date(date).toLocaleDateString("en-US", {
        weekday: "long",
    });

    return (
        <h2 className=" w-full  text-black inline-flex items-center border-b border-b-muted">
            {formattedDate}
            <span className="mx-4 w-1.5 h-1.5 rounded-full bg-neutral-300" />
            {dayOfWeek}
        </h2>
    );
};
