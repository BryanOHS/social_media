import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { validateToken } from './app/Utils/AuthUtils';

export async function middleware(request: NextRequest) {
    const token = request.cookies.get("token");
    const url = new URL(request.url);


    // If the user is not logged in and tries to access a non-root path, redirect to /login
    if (url.pathname !== '/' && !token) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    // If the user is logged in, validate the token for other paths
    if (token) {
        const verifyResult = await validateToken(token.value);
        if (verifyResult) {
            if(request.nextUrl.pathname == "/"){
                return NextResponse.redirect(new URL("/home", request.url))
            }
            // Token is valid; allow the request to proceed
            return NextResponse.next();
        } else {
            // Token is invalid; delete it and redirect to /login
            const response = NextResponse.redirect(new URL('/', request.url));
            response.cookies.delete("token");
            return response;
        }
    }

    // If none of the above conditions match, allow the request to proceed
    return NextResponse.next();
}

// Configuration for the middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
