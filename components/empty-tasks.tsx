import Image from "next/image";

export const EmptyTasks = () => {
    return (
        <div className="w-full mx-auto flex flex-col max-w-[300px] items-center justify-center ">
            <div className="w-[200px] h-[200px] relative">
                <Image src={"/assets/bag.png"} fill alt="bag" />
            </div>

            <div className="space-y-2 text-center">
                <h4 className="font-medium leading-none">Start small (or dream big)...</h4>
                <p className="text-sm text-neutral-300 ">
                    Add your tasks or find a template to get started with your project.
                </p>
            </div>
        </div>
    );
};
