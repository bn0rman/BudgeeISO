'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { getUserByKindeId, getOrganizationDocuments } from "@/lib/database-queries";
import { Loader2, FilePlus, FileQuestion, Download } from "lucide-react";
import Link from "next/link";

export default function DocumentsPage() {
  const { user } = useKindeBrowserClient();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<any>(null);
  const [documents, setDocuments] = useState<any[]>([]);
  const [organizationId, setOrganizationId] = useState<string | null>(null);

  // Fetch user data from Supabase
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user?.id) return;
      
      try {
        const userData = await getUserByKindeId(user.id);
        setUserData(userData);
        
        // If user belongs to an organization, set the organizationId
        if (userData?.organizations?.length > 0) {
          setOrganizationId(userData.organizations[0].id);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [user?.id]);

  // Fetch documents once we have the organizationId
  useEffect(() => {
    const fetchDocuments = async () => {
      if (!organizationId) return;
      
      setLoading(true);
      try {
        const documentsData = await getOrganizationDocuments(organizationId);
        setDocuments(documentsData || []);
      } catch (error) {
        console.error("Error fetching documents:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, [organizationId]);

  // Filter documents by type
  const requiredDocs = documents.filter(doc => doc.document_type === 'required');
  const policyDocs = documents.filter(doc => doc.document_type === 'policy');
  const procedureDocs = documents.filter(doc => doc.document_type === 'procedure');
  const recordDocs = documents.filter(doc => doc.document_type === 'record');

  // Render document item
  const renderDocumentItem = (doc: any) => {
    let statusColor = 'bg-gray-300';
    let badgeVariant: 'outline' | 'destructive' | 'secondary' = 'outline';
    let badgeClass = '';
    let badgeText = 'Pending';
    
    switch (doc.status) {
      case 'draft':
        statusColor = 'bg-orange-500';
        badgeVariant = 'secondary';
        badgeClass = 'bg-orange-100 text-orange-700 hover:bg-orange-200';
        badgeText = 'In Progress';
        break;
      case 'pending':
        statusColor = 'bg-red-500';
        badgeVariant = 'destructive';
        badgeClass = 'bg-red-500';
        badgeText = 'Required';
        break;
      case 'approved':
        statusColor = 'bg-green-500';
        badgeClass = 'border-green-200 text-green-700 bg-green-50';
        badgeText = 'Completed';
        break;
    }
    
    return (
      <div key={doc.id}>
        <div className="flex items-center">
          <div className={`w-2 h-2 rounded-full ${statusColor} mr-2`}></div>
          <div className="flex-1">
            <p className="text-sm font-medium">{doc.title}</p>
            <p className="text-xs text-muted-foreground">
              {doc.description || 'No description provided'}
            </p>
          </div>
          <div className="flex gap-2">
            <Badge variant={badgeVariant} className={badgeClass}>{badgeText}</Badge>
            {doc.file_url ? (
              <Button size="sm" variant="outline" asChild>
                <a href={doc.file_url} target="_blank" rel="noopener noreferrer">
                  <Download className="h-4 w-4 mr-1" />
                  View
                </a>
              </Button>
            ) : (
              <Button size="sm" variant="outline">Upload</Button>
            )}
          </div>
        </div>
        <Separator className="my-4" />
      </div>
    );
  };

  // Return loading state while data is being fetched
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-orange-500" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6 animate-fade-in">
        <h1 className="text-3xl font-bold gradient-text">ISO27001 Documentation</h1>
        <Button className="btn-orange">Upload Document</Button>
      </div>

      <div className="animate-on-scroll">
        <Tabs defaultValue="required" className="w-full">
          <TabsList className="bg-gray-100 p-1 mb-6">
            <TabsTrigger value="required" className="transition-all data-[state=active]:bg-black data-[state=active]:text-white">Required Documents</TabsTrigger>
            <TabsTrigger value="policies" className="transition-all data-[state=active]:bg-black data-[state=active]:text-white">Policies</TabsTrigger>
            <TabsTrigger value="procedures" className="transition-all data-[state=active]:bg-black data-[state=active]:text-white">Procedures</TabsTrigger>
            <TabsTrigger value="records" className="transition-all data-[state=active]:bg-black data-[state=active]:text-white">Records</TabsTrigger>
          </TabsList>

          <TabsContent value="required" className="space-y-4 mt-6">
            <Card className="border border-gray-200 shadow-sm hover-lift">
              <CardHeader>
                <CardTitle>Required Documents</CardTitle>
                <CardDescription>Documents needed for ISO27001 compliance</CardDescription>
              </CardHeader>
              <CardContent>
                {requiredDocs.length > 0 ? (
                  <div className="space-y-4">
                    {requiredDocs.map(renderDocumentItem)}
                  </div>
                ) : (
                  <div className="text-center py-8 flex flex-col items-center gap-4">
                    <FileQuestion className="h-12 w-12 text-gray-400" />
                    <div>
                      <p className="text-muted-foreground">No required documents found</p>
                      <Button className="mt-4 btn-orange" asChild>
                        <Link href="/dashboard/documents/create">
                          <FilePlus className="h-4 w-4 mr-2" />
                          Create Required Document
                        </Link>
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="policies" className="mt-6">
            <Card className="border border-gray-200 shadow-sm hover-lift">
              <CardHeader>
                <CardTitle>Security Policies</CardTitle>
                <CardDescription>Your organization&apos;s security policies</CardDescription>
              </CardHeader>
              <CardContent>
                {policyDocs.length > 0 ? (
                  <div className="space-y-4">
                    {policyDocs.map(renderDocumentItem)}
                  </div>
                ) : (
                  <div className="text-center py-8 flex flex-col items-center gap-4">
                    <FileQuestion className="h-12 w-12 text-gray-400" />
                    <div>
                      <p className="text-muted-foreground">No policy documents uploaded yet</p>
                      <Button className="mt-4 btn-orange" asChild>
                        <Link href="/dashboard/documents/create">
                          <FilePlus className="h-4 w-4 mr-2" />
                          Create Policy Document
                        </Link>
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="procedures" className="mt-6">
            <Card className="border border-gray-200 shadow-sm hover-lift">
              <CardHeader>
                <CardTitle>Security Procedures</CardTitle>
                <CardDescription>Your organization&apos;s security procedures</CardDescription>
              </CardHeader>
              <CardContent>
                {procedureDocs.length > 0 ? (
                  <div className="space-y-4">
                    {procedureDocs.map(renderDocumentItem)}
                  </div>
                ) : (
                  <div className="text-center py-8 flex flex-col items-center gap-4">
                    <FileQuestion className="h-12 w-12 text-gray-400" />
                    <div>
                      <p className="text-muted-foreground">No procedure documents uploaded yet</p>
                      <Button className="mt-4 btn-orange" asChild>
                        <Link href="/dashboard/documents/create">
                          <FilePlus className="h-4 w-4 mr-2" />
                          Create Procedure Document
                        </Link>
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="records" className="mt-6">
            <Card className="border border-gray-200 shadow-sm hover-lift">
              <CardHeader>
                <CardTitle>Security Records</CardTitle>
                <CardDescription>Your organization&apos;s security records</CardDescription>
              </CardHeader>
              <CardContent>
                {recordDocs.length > 0 ? (
                  <div className="space-y-4">
                    {recordDocs.map(renderDocumentItem)}
                  </div>
                ) : (
                  <div className="text-center py-8 flex flex-col items-center gap-4">
                    <FileQuestion className="h-12 w-12 text-gray-400" />
                    <div>
                      <p className="text-muted-foreground">No record documents uploaded yet</p>
                      <Button className="mt-4 btn-orange" asChild>
                        <Link href="/dashboard/documents/create">
                          <FilePlus className="h-4 w-4 mr-2" />
                          Create Record Document
                        </Link>
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 