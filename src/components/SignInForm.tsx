'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { AlertCircle } from 'lucide-react';

export function SignInForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<string | null>(null);

  // Check initial auth state
  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      console.log("Initial auth check:", data.session ? "Logged in" : "Not logged in");
    };
    checkAuth();
  }, []);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setDebugInfo(null);
    setLoading(true);
    
    try {
      console.log("Attempting sign in for:", email);
      
      // Use server-side authentication endpoint
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to sign in');
      }
      
      setDebugInfo("Authentication successful! Redirecting to dashboard...");
      console.log("Authentication successful, session created server-side");
      
      // We need to refresh the client-side session after server-side auth
      await supabase.auth.getSession();
      
      // Navigate using router after a short delay to ensure session is updated
      setTimeout(() => {
        if (typeof window !== 'undefined') {
          window.location.href = "/dashboard";
        } else {
          router.push("/dashboard");
        }
      }, 500);
    } catch (err: any) {
      console.error("Sign in error:", err);
      setError(err.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="w-full">
      <form onSubmit={handleSignIn} className="space-y-4">
        {error && (
          <div className="bg-red-50 p-3 rounded-md flex items-start gap-2 text-red-800 text-sm">
            <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
            <p>{error}</p>
          </div>
        )}
        
        {debugInfo && (
          <div className="bg-blue-50 p-3 rounded-md text-blue-800 text-sm">
            <p>{debugInfo}</p>
          </div>
        )}
        
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email" 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com" 
            required
            autoComplete="email"
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link href="/auth/forgot-password" className="text-xs text-indigo-600 hover:text-indigo-500">
              Forgot password?
            </Link>
          </div>
          <Input 
            id="password" 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••" 
            required
            autoComplete="current-password"
          />
        </div>
        
        <Button 
          type="submit" 
          className="w-full" 
          disabled={loading}
        >
          {loading ? 'Signing in...' : 'Sign in'}
        </Button>
        
        <div className="text-center text-sm">
          Don&apos;t have an account?{' '}
          <Link href="/auth/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
} 