// TODO: Need to make a HOC for creating layout pages

export default function CompletedLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="h-full">
            <div className="mb-10 ">
                <h1 className="text-3xl font-semibold hover:outline hover:outline-1 outline-neutral-200 rounded-md ">
                    Activity
                </h1>
            </div>

            {children}
        </div>
    );
}
