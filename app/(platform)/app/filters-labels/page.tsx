import { prismaDb } from "@/lib/db";
import { CollapsibleList } from "./_components/collapsible-list";
import { FilterList } from "./_components/filter-list";
import { LabelList } from "./_components/label-list";
import { Filter, Label } from "@prisma/client";

const FiltersAndLabelsPage = async () => {
    let labels: Label[];
    let filters: Filter[];
    try {
        labels = await prismaDb.label.findMany({
            orderBy: {
                order: "asc",
            },
            include: {
                tasks: true,
            },
        });

        filters = await prismaDb.filter.findMany({
            orderBy: {
                order: "asc",
            },
        });
    } catch (error) {
        labels = [];
        filters = [];
    }

    return (
        <div className="h-full">
            <div className="mb-10 ">
                <h1 className="text-3xl font-semibold hover:outline hover:outline-1 outline-neutral-200 rounded-md ">
                    Filters & labels
                </h1>
            </div>

            <div className="space-y-6">
                <FilterList data={filters} />
                <LabelList data={labels} />
            </div>
        </div>
    );
};

export default FiltersAndLabelsPage;
