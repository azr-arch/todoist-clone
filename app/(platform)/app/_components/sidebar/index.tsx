import { SidebarHeader } from "./sidebar-header";
import { SidebarNav } from "./sidebar-nav";

export const Sidebar = () => {
    return (
        <aside className="w-[280px] h-screen bg-sidebar fixed top-0 left-0 z-50">
            {/* Header */}
            <SidebarHeader />

            {/* Nav */}
            <SidebarNav />
        </aside>
    );
};
