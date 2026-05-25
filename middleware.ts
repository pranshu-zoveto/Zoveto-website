import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  // Only apply basic auth to the /dashboard route and its sub-routes
  if (req.nextUrl.pathname.startsWith('/dashboard')) {
    const basicAuth = req.headers.get('authorization');

    if (basicAuth) {
      const authValue = basicAuth.split(' ')[1];
      const [user, pwd] = atob(authValue).split(':');

      const expectedUser = process.env.ADMIN_EMAIL;
      const expectedPwd = process.env.ADMIN_PASSWORD;

      // If credentials match, allow access
      if (user === expectedUser && pwd === expectedPwd) {
        return NextResponse.next();
      }
    }

    // If credentials don't match or aren't provided, prompt for them
    return new NextResponse('Unauthorized', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Dashboard"',
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  // Run this middleware only on /dashboard and all paths under it
  matcher: ['/dashboard/:path*'],
};
