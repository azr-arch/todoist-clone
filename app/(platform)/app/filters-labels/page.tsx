import { prismaDb } from "@/lib/db";
import { CollapsibleList } from "./_components/collapsible-list";
import { FilterList } from "./_components/filter-list";
import { LabelList } from "./_components/label-list";
import { Label } from "@prisma/client";
import { LabelsWithLists } from "@/lib/types";

const FiltersAndLabelsPage = async () => {
    let labels: Label[];
    try {
        labels = await prismaDb.label.findMany({
            orderBy: {
                order: "asc",
            },
            include: {
                tasks: true,
            },
        });
    } catch (error) {
        labels = [];
    }

    return (
        <div className="h-full">
            <div className="mb-10 ">
                <h1 className="text-3xl font-semibold hover:outline hover:outline-1 outline-neutral-200 rounded-md ">
                    Filters & labels
                </h1>
            </div>

            <div className="space-y-6">
                <FilterList />
                <LabelList data={labels} />
            </div>
        </div>
    );
};

export default FiltersAndLabelsPage;
