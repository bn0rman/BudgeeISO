'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/lib/supabase';
import { AlertCircle, CheckCircle } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback?next=/auth/reset-password`,
      });
      
      if (error) throw error;
      
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Failed to send reset password link');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12 sm:px-6 lg:px-8">
      <div className="mb-8 sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="text-3xl font-bold text-center">
          Budgee ISO
        </h1>
        <h2 className="mt-2 text-center text-lg text-gray-600">
          Reset your password
        </h2>
      </div>
      
      <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        {success ? (
          <div className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mb-4">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-medium mb-2">Check your email</h3>
            <p className="text-gray-600 mb-6">
              We&apos;ve sent you a link to reset your password. Please check your inbox.
            </p>
            <Link href="/auth/signin" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
              Back to sign in
            </Link>
          </div>
        ) : (
          <form onSubmit={handleResetPassword} className="space-y-4">
            {error && (
              <div className="bg-red-50 p-3 rounded-md flex items-start gap-2 text-red-800 text-sm">
                <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <p>{error}</p>
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
              <p className="text-xs text-gray-500">
                Enter the email address associated with your account, and we&apos;ll send you a link to reset your password.
              </p>
            </div>
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={loading}
            >
              {loading ? 'Sending link...' : 'Send reset link'}
            </Button>
            
            <div className="text-center text-sm">
              Remember your password?{' '}
              <Link href="/auth/signin" className="font-medium text-indigo-600 hover:text-indigo-500">
                Back to sign in
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
} 