'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signOutClient } from '@/lib/supabase-client';

export default function SignOutPage() {
  const router = useRouter();

  useEffect(() => {
    const performSignOut = async () => {
      try {
        await signOutClient();
        if (typeof window !== 'undefined') {
          window.location.href = '/?signout=true';
        } else {
          router.push('/?signout=true');
        }
      } catch (error) {
        console.error('Error signing out:', error);
        if (typeof window !== 'undefined') {
          window.location.href = '/';
        } else {
          router.push('/');
        }
      }
    };

    performSignOut();
  }, [router]);

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6 text-center">
        <h1 className="text-2xl font-bold">Signing out...</h1>
        <p className="text-muted-foreground">
          You&apos;re being signed out of your account.
        </p>
      </div>
    </div>
  );
} 