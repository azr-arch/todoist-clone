import { Logo } from "@/components/logo";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="w-full h-full max-w-screen-lg mx-auto p-6 ">
            <header className="flex items-center pb-12">
                <Logo />
            </header>
            {children}
        </div>
    );
};

export default AuthLayout;
