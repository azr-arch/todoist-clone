import { prismaDb } from "@/lib/db";
import { UpcomingList } from "./_components/upcoming-list";

const UpcomingPage = async () => {
    const upcomingTasks = await prismaDb.task.findMany({
        where: {
            dueDate: {
                gte: new Date(),
            },
        },
        orderBy: {
            order: "asc",
        },
    });

    return (
        <div className="h-full">
            <div className="mb-10 ">
                <h1 className="text-3xl font-semibold hover:outline hover:outline-1 outline-neutral-200 rounded-md ">
                    Upcoming
                </h1>
            </div>

            <div>
                {/* Loop over tasks, and differentiately render them according to dates */}
                <UpcomingList data={upcomingTasks} />
            </div>
        </div>
    );
};

export default UpcomingPage;
