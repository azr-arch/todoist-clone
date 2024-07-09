import { SignUp } from "@clerk/nextjs";

const RegisterPage = () => {
    return (
        <div className="w-full flex items-center justify-center">
            <SignUp routing="hash" signInUrl={process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL} />
        </div>
    );
};

export default RegisterPage;
