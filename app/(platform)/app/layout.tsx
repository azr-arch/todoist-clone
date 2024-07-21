import { PathBasedButtons } from "./_components/path-based-buttons";
import { Sidebar } from "./_components/sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full h-full flex items-center justify-end">
            <Sidebar />
            <div
                style={{ width: "calc(100% - 280px)" }}
                className="  h-full bg-white flex flex-col items-start"
            >
                {/* Impment calendar events and view button here */}
                {/* From - "https://app.todoist.com/app/today" */}

                {/* This is server component, is there a way to check current url, and dynamically, render <Link to home />
                    when we are on specific page ?
                */}
                <PathBasedButtons />

                <div className="max-w-screen-md  mx-auto mt-3 w-full h-full self-stretch relative px-10 lg:px-8">
                    {children}
                </div>
            </div>
        </div>
    );
}
