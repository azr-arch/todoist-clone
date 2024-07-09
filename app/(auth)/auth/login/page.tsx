import { SignIn } from "@clerk/nextjs";

const LoginPage = () => {
    return (
        <div className="w-full flex items-center justify-center">
            <SignIn routing="hash" signUpUrl={process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL} />
        </div>
    );
};

export default LoginPage;
