import { CalendarDays, CalendarFold, Inbox } from "lucide-react";
import { SidebarHeader } from "./sidebar-header";

const iconStyles = "w-4 h-4";
const sidebarRoutes = [
    {
        href: "/app/inbox",
        value: "Inbox",
        icon: <Inbox className={iconStyles} />,
    },
    {
        href: "/app/today",
        value: "Today",
        icon: <CalendarFold className={iconStyles} />,
    },
    {
        href: "/app/upcoming",
        value: "Upcoming",
        icon: <CalendarDays className={iconStyles} />,
    },
];

export const Sidebar = () => {
    return (
        <aside className="w-[638px] h-screen bg-sidebar">
            {/* Header */}
            <SidebarHeader />
        </aside>
    );
};
