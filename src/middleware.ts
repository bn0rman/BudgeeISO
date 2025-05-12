import { NextRequest, NextResponse } from 'next/server';
import { createServerClient, type CookieOptions } from '@supabase/ssr';

export async function middleware(request: NextRequest) {
  // Get the pathname from the URL
  const url = new URL(request.url);
  const { pathname, searchParams } = url;
  
  console.log(`Middleware processing request for: ${pathname}`);
  
  // Check if this is a signout redirect
  const isSignoutRedirect = searchParams.has('signout');
  
  // Allow public routes without authentication checks
  const isPublicRoute = 
    pathname.startsWith('/_next') || 
    pathname.startsWith('/api/public') ||
    pathname === '/favicon.ico' ||
    pathname.startsWith('/logo');
  
  // Auth routes should be handled specially
  const isAuthRoute = pathname.startsWith('/auth');
  const isSignOutRoute = pathname === '/auth/signout';
  
  // Skip authentication check for public routes
  if (isPublicRoute) {
    console.log(`Skipping auth check for public route: ${pathname}`);
    return NextResponse.next();
  }
  
  // For signout route, we'll let it handle its own logic without redirecting
  if (isSignOutRoute) {
    console.log(`Processing signout route: ${pathname}`);
    return NextResponse.next();
  }

  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // Log all cookies for debugging
  console.log('Request cookies:');
  request.cookies.getAll().forEach(cookie => {
    console.log(`- ${cookie.name}: ${cookie.value ? 'present' : 'empty'}`);
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          const value = request.cookies.get(name)?.value;
          console.log(`Getting cookie: ${name} = ${value ? 'present' : 'empty'}`);
          return value;
        },
        set(name: string, value: string, options: CookieOptions) {
          // Only set in the response, not in the request
          console.log(`Setting cookie: ${name} = ${value ? 'present' : 'empty'}`);
          response.cookies.set(name, value, options);
        },
        remove(name: string, options: CookieOptions) {
          // Only set in the response, not in the request
          console.log(`Removing cookie: ${name}`);
          response.cookies.set(name, '', { ...options, maxAge: 0 });
        },
      },
    }
  );

  // If this is a signout redirect, clear all auth cookies in the response
  if (isSignoutRedirect) {
    console.log('Handling signout redirect - clearing auth cookies in middleware');
    response.cookies.set('sb-access-token', '', { maxAge: 0, path: '/' });
    response.cookies.set('sb-refresh-token', '', { maxAge: 0, path: '/' });
    response.cookies.set('supabase-auth-token', '', { maxAge: 0, path: '/' });
    
    // Create a URL without the signout parameter and redirect
    searchParams.delete('signout');
    const cleanUrl = `${url.origin}${url.pathname}${searchParams.toString() ? '?' + searchParams.toString() : ''}`;
    return NextResponse.redirect(cleanUrl);
  }

  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    
    // Add debugging
    console.log(`Session for ${pathname}: ${session ? 'Active' : 'None'}`);
    if (session) {
      console.log(`User: ${session.user.email}, Expires: ${new Date(session.expires_at! * 1000).toLocaleString()}`);
    }

    // Handle route access based on authentication
    const isPrivateRoute = pathname.startsWith('/dashboard');
    
    // Redirect unauthenticated users away from private routes
    if (isPrivateRoute && !session) {
      console.log(`Redirecting from ${pathname} to / - No session`);
      return NextResponse.redirect(new URL('/', request.url));
    }

    // Redirect authenticated users away from auth pages (except signout)
    if (isAuthRoute && session && !isSignOutRoute) {
      console.log(`Redirecting from ${pathname} to /dashboard - User has session`);
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  } catch (error) {
    console.error('Middleware auth error:', error);
    // On auth errors, redirect to home page for safety
    if (pathname.startsWith('/dashboard')) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|logo|api/public).*)',
  ],
};
