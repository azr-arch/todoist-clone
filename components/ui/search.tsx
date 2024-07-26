"use client";

import React from "react";
import { InputProps } from "./input";
import { cn } from "@/lib/utils";
import { SearchIcon } from "lucide-react";

export type SearchProps = React.InputHTMLAttributes<HTMLInputElement>;

const Search = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
    return (
        <div
            className={cn(
                "flex h-9 items-center rounded-md border border-neutral-300 bg-white pl-3 text-sm  focus-within:border-neutral-500",
                className
            )}
        >
            <SearchIcon className="h-[16px] w-[16px]" />
            <input
                {...props}
                type="search"
                ref={ref}
                className="w-full font-thin px-1.5 py-1 placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            />
        </div>
    );
});

Search.displayName = "Search";

export { Search };
