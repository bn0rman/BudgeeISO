'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/lib/supabase';
import dynamic from 'next/dynamic';

// Dynamically import the Auth component
const Auth = dynamic(
  () => import('@supabase/auth-ui-react').then((mod) => mod.Auth),
  { ssr: false }
);

type AuthFormProps = {
  view?: 'sign_in' | 'sign_up' | 'magic_link' | 'forgotten_password';
};

export function AuthForm({ view = 'sign_in' }: AuthFormProps) {
  const router = useRouter();
  const [authView, setAuthView] = useState(view);
  const [isLoaded, setIsLoaded] = useState(false);

  // Ensure component is fully mounted before rendering Auth
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) {
    return <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">Loading...</div>;
  }

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">
        {authView === 'sign_in' ? 'Sign In' : 
         authView === 'sign_up' ? 'Create an Account' : 
         authView === 'magic_link' ? 'Sign In with Magic Link' : 
         'Reset Password'}
      </h2>
      
      <Auth
        supabaseClient={supabase}
        view={authView}
        appearance={{ theme: ThemeSupa }}
        theme="light"
        showLinks={true}
        providers={['google', 'github']}
        redirectTo={`${window.location.origin}/auth/callback`}
        onViewChange={(newView: any) => setAuthView(newView)}
      />
    </div>
  );
} 