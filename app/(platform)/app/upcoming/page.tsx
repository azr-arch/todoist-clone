import { prismaDb } from "@/lib/db";
import { UpcomingList } from "./_components/upcoming-list";
import { fetchTasks } from "@/lib/task-fetcher";
import { Calendar } from "lucide-react";
import { CustomCalendar } from "@/components/custom-calendar";
import { UpcomingCalendar } from "./_components/upcoming-calendar";

const UpcomingPage = async () => {
    const { tasks: upcomingTasks } = await fetchTasks({
        startDate: new Date(),
    });

    // Todo add overdueList here and add drag and drop
    return (
        <div className="h-full">
            <div className="mb-10 ">
                <h1 className="text-3xl py-1 font-medium hover:outline hover:outline-1 outline-neutral-200 rounded-md ">
                    Upcoming
                </h1>
                <UpcomingCalendar />
            </div>

            <div>
                {/* Loop over tasks, and differentiately render them according to dates */}
                <UpcomingList data={upcomingTasks} />
            </div>
        </div>
    );
};

export default UpcomingPage;
