import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/app(.*)"]);

export default clerkMiddleware((auth, request) => {
    const { userId } = auth();

    if (userId && (request.nextUrl.pathname === "/" || request.nextUrl.pathname === "/app")) {
        const redirectUrl = new URL("/app/today", request.url);
        return NextResponse.redirect(redirectUrl);
    }

    if (isProtectedRoute(request)) {
        auth().protect().has;
    }

    return NextResponse.next();
});

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
