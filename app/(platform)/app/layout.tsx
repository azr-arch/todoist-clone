import { Sidebar } from "./_components/sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full h-full flex items-center justify-end">
            <Sidebar />
            <div style={{ width: "calc(100% - 280px)" }} className="  h-full bg-white flex">
                {/* Impment calendar events and view button here */}
                {/* From - "https://app.todoist.com/app/today" */}

                <div className="max-w-screen-md mx-auto mt-14 w-full h-full self-stretch relative px-6">
                    {children}
                </div>
            </div>
        </div>
    );
}
