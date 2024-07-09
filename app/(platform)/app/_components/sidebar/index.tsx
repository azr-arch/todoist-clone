import { SidebarHeader } from "./sidebar-header";
import { SidebarNav } from "./sidebar-nav";

export const Sidebar = () => {
    return (
        <aside className="w-[280px] h-screen bg-sidebar">
            {/* Header */}
            <SidebarHeader />

            {/* Nav */}
            <SidebarNav />
        </aside>
    );
};
