import { Priority } from "@prisma/client";
import { Flag } from "lucide-react";

export const NavRoutes = [
    {
        href: "/features",
        label: "Features",
    },
    {
        href: "/teams",
        label: "For Teams",
    },
    {
        href: "/pricing",
        label: "Pri",
    },
    {
        href: "/features",
        label: "Features",
    },
    {
        href: "/features",
        label: "Features",
    },
];

export const COLORS = [
    {
        value: "#808081",
        label: "Charcoal",
    },
    {
        value: "#b8255f",
        label: "Berry Red",
    },
    {
        value: "#ff0000", // Red
        label: "Red",
    },
    {
        value: "#ffa500", // Orange
        label: "Orange",
    },
    {
        value: "#ffff00", // Yellow
        label: "Yellow",
    },
    {
        value: "#808000", // Olive Green
        label: "Olive Green",
    },
    {
        value: "#32cd32", // Lime Green
        label: "Lime Green",
    },
    {
        value: "#008000", // Green
        label: "Green",
    },
    {
        value: "#98ff98", // Mint Green
        label: "Mint Green",
    },
];

export const PRIORITY = [
    {
        label: "Priority 1",
        value: Priority.p1,
        className: "size-3 text-red-500 fill-red-500",
    },
    {
        label: "Priority 2",
        value: Priority.p2,
        className: "size-3 text-yellow-500 fill-yellow-500",
    },
    {
        label: "Priority 3",
        value: Priority.p3,
        className: "size-3 text-blue-400 fill-blue-400",
    },
    {
        label: "Priority 4",
        value: Priority.p4,
        className: "size-3 text-black ",
    },
];
