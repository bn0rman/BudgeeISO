import Link from 'next/link';
import { MailCheck } from 'lucide-react';

export default function VerifyEmailPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md mx-auto p-8 bg-white rounded-lg shadow-md text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 mb-4">
          <MailCheck className="h-6 w-6 text-indigo-600" />
        </div>
        
        <h1 className="text-2xl font-bold mb-2">Check your email</h1>
        
        <p className="text-gray-600 mb-6">
          We&apos;ve sent you a verification link to complete your signup process.
          Please check your inbox and click the link to continue.
        </p>
        
        <p className="text-sm text-gray-500 mb-4">
          If you don&apos;t see the email, check your spam folder.
        </p>
        
        <Link href="/auth/signin" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
          Back to sign in
        </Link>
      </div>
    </div>
  );
} 