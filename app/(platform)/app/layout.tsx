import { PathBasedButtons } from "./_components/path-based-buttons";
import { Sidebar } from "./_components/sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full h-full flex items-center justify-end ">
            <Sidebar />
            <div
                style={{ minWidth: "calc(100% - 280px)" }}
                className="h-full bg-white flex flex-col items-start data-[sidebar-open=false]:w-full"
                data-sidebar-open="true"
                id="app-layout"
            >
                {/* Impment calendar events and view button here */}
                {/* From - "https://app.todoist.com/app/today" */}

                <PathBasedButtons />

                <div className="max-w-[850px]  mx-auto mt-3 w-full h-full self-stretch relative px-10 lg:px-8">
                    {children}
                </div>
            </div>
        </div>
    );
}
