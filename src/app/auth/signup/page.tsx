import { SignUpForm } from '@/components/SignUpForm';

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12 sm:px-6 lg:px-8">
      <div className="mb-8 sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="text-3xl font-bold text-center">
          Budgee ISO
        </h1>
        <h2 className="mt-2 text-center text-lg text-gray-600">
          Create a new account
        </h2>
      </div>
      
      <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <SignUpForm />
      </div>
    </div>
  );
} 