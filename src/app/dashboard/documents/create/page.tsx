'use client';

import { useEffect, useState } from 'react';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { Loader2 } from 'lucide-react';
import DocumentUploadForm from '@/components/DocumentUploadForm';
import { getUserByKindeId } from '@/lib/database-queries';

export default function CreateDocumentPage() {
  const { user } = useKindeBrowserClient();
  const [loading, setLoading] = useState(true);
  const [organizationId, setOrganizationId] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user?.id) return;
      
      try {
        const userData = await getUserByKindeId(user.id);
        
        // If user belongs to an organization, set the organizationId
        if (userData?.organizations?.length > 0) {
          setOrganizationId(userData.organizations[0].id);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user?.id]);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-orange-500" />
      </div>
    );
  }
  
  if (!organizationId) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6 gradient-text">Create Document</h1>
        <p>You need to be part of an organization to create documents.</p>
      </div>
    );
  }
  
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 gradient-text">Create Document</h1>
      <DocumentUploadForm organizationId={organizationId} />
    </div>
  );
} 