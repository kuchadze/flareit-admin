import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const publicRouts = ['/auth', '/register'];

export default function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;
    const token = cookies().get('token');
    const pathIsPublic = publicRouts.includes(path);
    if (pathIsPublic && token) {
        return NextResponse.redirect(new URL('/', req.url));
    }

    if (!token && !pathIsPublic) {
        return NextResponse.redirect(new URL('/auth', req.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
