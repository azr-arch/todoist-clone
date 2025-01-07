import { Activity, Plus, Settings } from "lucide-react";
import { ICON_STYLES } from "./constants";

export const USER_MENU_ITEMS = [
    {
        href: "/app/settings",
        value: "Settings",
        icon: <Settings className={ICON_STYLES} />,
    },
    {
        value: "Add a team",
        icon: <Plus className={ICON_STYLES} />,
    },
    {
        separator: true,
    },
    {
        href: "/app/activity",
        value: "Activity",
        icon: <Activity className={ICON_STYLES} />,
    },
];

export const NAV_ROUTE_ITEMS = [
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
