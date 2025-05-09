'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { getUserByKindeId } from '@/lib/database-queries';
import supabase from '@/lib/supabase';

export default function OnboardingPage() {
  const router = useRouter();
  const { user } = useKindeBrowserClient();
  const [loading, setLoading] = useState(false);
  const [orgName, setOrgName] = useState('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id || !orgName.trim()) return;
    
    setLoading(true);
    try {
      // Get the user from the database (created by the webhook)
      const userData = await getUserByKindeId(user.id);
      if (!userData) {
        console.error('User not found in database');
        return;
      }
      
      // Create organization
      const { data: orgData, error: orgError } = await supabase
        .from('organizations')
        .insert({
          name: orgName,
          // You can add more fields here if needed
        })
        .select()
        .single();
        
      if (orgError) throw orgError;
      
      // Link user to organization
      const { error: linkError } = await supabase
        .from('user_organizations')
        .insert({
          user_id: userData.id,
          organization_id: orgData.id,
          role: 'admin'
        });
        
      if (linkError) throw linkError;
      
      // Redirect to dashboard
      router.push('/dashboard');
      router.refresh();
    } catch (error) {
      console.error('Error during onboarding:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold gradient-text">Welcome to BudgeeISO</CardTitle>
          <CardDescription>Let&apos;s set up your organization to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="orgName">Organization Name</Label>
              <Input 
                id="orgName" 
                placeholder="Enter your organization name" 
                value={orgName} 
                onChange={(e) => setOrgName(e.target.value)}
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full btn-orange" 
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Organization'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 