import { Sidebar } from "./_components/sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full h-full flex items-center">
            <Sidebar />
            <div className="grow self-stretch bg-white">
                {/* Impment calendar events and view button here */}
                {/* From - "https://app.todoist.com/app/today" */}

                <div className="max-w-screen-md mx-auto mt-14">{children}</div>
            </div>
        </div>
    );
}
