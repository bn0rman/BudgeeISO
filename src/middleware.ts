import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";
import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase-server";

export default withAuth(
  async function middleware(req: NextRequest) {
    // Only run this for authenticated users
    const user = req.auth?.user;
    const path = req.nextUrl.pathname;

    // Skip checks for non-authenticated routes
    if (!user || !user.id) {
      return NextResponse.next();
    }

    // Skip for API routes and non-dashboard routes
    if (path.startsWith('/api/') || (!path.startsWith('/dashboard') && !path.startsWith('/onboarding'))) {
      return NextResponse.next();
    }

    try {
      // Create a server-side Supabase client
      const supabase = createServerClient();
      
      // Check if user exists in our DB
      const { data: userData } = await supabase
        .from('users')
        .select('id')
        .eq('kinde_id', user.id)
        .single();

      if (!userData) {
        // User exists in Kinde but not in our DB, let the webhook handle it
        // and then redirect to onboarding
        if (path !== '/onboarding') {
          return NextResponse.redirect(new URL('/onboarding', req.url));
        }
        return NextResponse.next();
      }

      // Check if user belongs to an organization
      const { data: userOrgs } = await supabase
        .from('user_organizations')
        .select('id')
        .eq('user_id', userData.id)
        .limit(1);

      // If user doesn't have an organization, redirect to onboarding
      if (!userOrgs || userOrgs.length === 0) {
        if (path !== '/onboarding') {
          return NextResponse.redirect(new URL('/onboarding', req.url));
        }
      } else if (path === '/onboarding') {
        // If user already has an organization and tries to access onboarding, redirect to dashboard
        return NextResponse.redirect(new URL('/dashboard', req.url));
      }
    } catch (error) {
      console.error('Error in middleware:', error);
    }

    return NextResponse.next();
  },
  {
    // Specify routes that require authentication
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ['/dashboard/:path*', '/onboarding'],
};
