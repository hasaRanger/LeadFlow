import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"

export async function proxy(req: NextRequest) {
    const session = await auth()
    const isLoggedIn = !!session?.user
    const isLoginPage = req.nextUrl.pathname === "/login"
    const isApiRoute = req.nextUrl.pathname.startsWith("/api")

    if (isApiRoute) return NextResponse.next()

    if (!isLoggedIn && !isLoginPage) {
        return NextResponse.redirect(new URL("/login", req.url))
    }

    if (isLoggedIn && isLoginPage) {
        return NextResponse.redirect(new URL("/dashboard", req.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - assets in public folder (e.g. /logo.png)
         */
        "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
    ],
}