'use client';

import { getClientUser, isClientAuthenticated, createClientSupabaseClient } from "@/lib/supabase-client";
import { Sidebar } from "@/components/Sidebar";
import ScrollAnimations from "@/components/ScrollAnimations";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true);
        const isAuth = await isClientAuthenticated();
        
        if (!isAuth) {
          // Redirect to home if not authenticated
          router.push('/');
          return;
        }
        
        const userData = await getClientUser();
        setUser(userData);
      } catch (error) {
        console.error('Error checking authentication:', error);
        // On error, redirect to home as well
        router.push('/');
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
    
    // Set up auth state change listener
    const supabase = createClientSupabaseClient();
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event);
        
        if (event === 'SIGNED_OUT' || !session) {
          // User is signed out, redirect to home
          router.push('/');
          return;
        }
        
        // User is signed in, update user data
        if (session) {
          setUser(session.user);
        }
      }
    );
    
    // Clean up subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  // Show loading state while checking auth
  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  // If we get here, user should be authenticated
  return (
    <div className="flex h-screen bg-background">
      <ScrollAnimations />
      
      <Sidebar user={user} />
      
      {/* Main content */}
      <div className="flex-1 overflow-auto bg-gradient-to-b from-background to-background/90">
        <main className="animate-fade-in">{children}</main>
      </div>
    </div>
  );
} 