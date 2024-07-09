import { Header } from "@/components/header";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full h-full max-w-screen-xl mx-auto bg-mai p-6">
            <Header />
            {children}
        </div>
    );
}
