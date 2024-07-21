import { AddTaskButton } from "../../_components/add-task-btn";

const LabelUrlPage = ({ params }: { params: { labelUrl: string } }) => {
    const [labelName, labelId] = params.labelUrl.split("_");
    const formattedName = labelName.replace(/-/g, " ");

    return (
        <div className="h-full">
            <div className="mb-4 ">
                <h1 className="text-2xl font-semibold hover:outline hover:outline-1 outline-neutral-200 rounded-md ">
                    {formattedName}
                </h1>
            </div>

            <div>
                <AddTaskButton labelId={labelId} />
            </div>
        </div>
    );
};

export default LabelUrlPage;
