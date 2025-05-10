'use client';

import { useEffect, useState } from 'react';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
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
import { Loader2, UploadCloud, PlusCircle } from 'lucide-react';
import Link from 'next/link';

// Import services and types
import { getUserDocuments, updateDocumentStatus } from '@/services/documentsService';
import { Document } from '@/../../types/database';

export default function DocumentsPage() {
  const { user, isLoading: isUserLoading } = useKindeBrowserClient();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('required');
  
  // State for updating document status
  const [updatingDocId, setUpdatingDocId] = useState<string | null>(null);
  
  // Filter documents based on the active tab
  const filteredDocuments = documents.filter(doc => {
    if (activeTab === 'required') {
      return doc.priority === 'high';
    } else if (activeTab === 'policies') {
      return doc.name.toLowerCase().includes('policy');
    } else if (activeTab === 'procedures') {
      return doc.name.toLowerCase().includes('procedure');
    } else if (activeTab === 'records') {
      return doc.name.toLowerCase().includes('record');
    }
    return true;
  });
  
  useEffect(() => {
    async function loadDocuments() {
      if (!user?.id || isUserLoading) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        const docs = await getUserDocuments(user.id);
        setDocuments(docs);
      } catch (err) {
        console.error('Error loading documents:', err);
        setError('Failed to load documents');
      } finally {
        setIsLoading(false);
      }
    }
    
    loadDocuments();
  }, [user?.id, isUserLoading]);
  
  // Function to handle document status update
  const handleStatusUpdate = async (docId: string, newStatus: 'pending' | 'in_progress' | 'completed' | 'rejected') => {
    if (!user?.id) return;
    
    setUpdatingDocId(docId);
    
    try {
      const success = await updateDocumentStatus(docId, newStatus);
      
      if (success) {
        // Update local state
        setDocuments(prev => 
          prev.map(doc => 
            doc.id === docId 
              ? { ...doc, status: newStatus, updated_at: new Date().toISOString() } 
              : doc
          )
        );
      } else {
        setError('Failed to update document status');
      }
    } catch (err) {
      console.error('Error updating document status:', err);
      setError('Failed to update document status');
    } finally {
      setUpdatingDocId(null);
    }
  };
  
  // Function to get the appropriate button text based on document status
  const getActionButtonText = (doc: Document) => {
    if (doc.status === 'completed') return 'View';
    if (doc.status === 'in_progress') return 'Continue';
    return 'Start';
  };
  
  // Function to get the next status when the action button is clicked
  const getNextStatus = (doc: Document) => {
    if (doc.status === 'pending') return 'in_progress';
    if (doc.status === 'in_progress') return 'completed';
    return doc.status;
  };
  
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6 animate-fade-in">
        <h1 className="text-3xl font-bold gradient-text">ISO27001 Documentation</h1>
        <Link href="/dashboard/documents/upload">
          <Button className="bg-black hover:bg-gray-900">
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Document
          </Button>
        </Link>
      </div>

      {isLoading || isUserLoading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-gray-500 mb-4" />
          <p className="text-gray-500">Loading documents...</p>
        </div>
      ) : error ? (
        <Card className="border border-red-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-red-600">Error Loading Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{error}</p>
            <Button 
              className="mt-4" 
              onClick={() => window.location.reload()}
            >
              Try Again
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="animate-on-scroll">
          <Tabs 
            defaultValue="required" 
            className="w-full"
            onValueChange={setActiveTab}
          >
            <TabsList className="bg-gray-100 p-1 mb-6">
              <TabsTrigger value="required" className="transition-all data-[state=active]:bg-black data-[state=active]:text-white">Required Documents</TabsTrigger>
              <TabsTrigger value="policies" className="transition-all data-[state=active]:bg-black data-[state=active]:text-white">Policies</TabsTrigger>
              <TabsTrigger value="procedures" className="transition-all data-[state=active]:bg-black data-[state=active]:text-white">Procedures</TabsTrigger>
              <TabsTrigger value="records" className="transition-all data-[state=active]:bg-black data-[state=active]:text-white">Records</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="space-y-4 mt-6">
              <Card className="border border-gray-200 shadow-sm hover-lift">
                <CardHeader>
                  <CardTitle>
                    {activeTab === 'required' && 'Required Documents'}
                    {activeTab === 'policies' && 'Security Policies'}
                    {activeTab === 'procedures' && 'Security Procedures'}
                    {activeTab === 'records' && 'Security Records'}
                  </CardTitle>
                  <CardDescription>
                    {activeTab === 'required' && 'Documents needed for ISO27001 compliance'}
                    {activeTab === 'policies' && 'Your organization\'s security policies'}
                    {activeTab === 'procedures' && 'Your organization\'s security procedures'}
                    {activeTab === 'records' && 'Your organization\'s security records'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {filteredDocuments.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground mb-4">No {activeTab} documents found</p>
                      <Link href="/dashboard/documents/upload">
                        <Button className="bg-black hover:bg-gray-900">
                          <UploadCloud className="h-4 w-4 mr-2" />
                          Add {activeTab === 'required' ? 'Required Document' : 
                              activeTab === 'policies' ? 'Policy Document' :
                              activeTab === 'procedures' ? 'Procedure Document' : 'Record Document'}
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {filteredDocuments.map((doc, index) => {
                        // Determine dot color based on status and priority
                        let dotColor = 'bg-gray-300';
                        if (doc.status === 'completed') {
                          dotColor = 'bg-green-500';
                        } else if (doc.status === 'in_progress') {
                          dotColor = 'bg-orange-500';
                        } else if (doc.priority === 'high') {
                          dotColor = 'bg-red-500';
                        }
                        
                        // Determine badge styling
                        let BadgeComponent;
                        if (doc.status === 'completed') {
                          BadgeComponent = <Badge variant="outline" className="text-green-700">Completed</Badge>;
                        } else if (doc.status === 'in_progress') {
                          BadgeComponent = <Badge variant="secondary" className="bg-orange-100 text-orange-700">In Progress</Badge>;
                        } else if (doc.priority === 'high') {
                          BadgeComponent = <Badge variant="destructive">Required</Badge>;
                        } else {
                          BadgeComponent = <Badge variant="outline">Pending</Badge>;
                        }
                        
                        return (
                          <div key={doc.id}>
                            <div className="flex items-center">
                              <div className={`w-2 h-2 rounded-full ${dotColor} mr-2`}></div>
                              <div className="flex-1">
                                <p className="text-sm font-medium">{doc.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {doc.description || (
                                    <>
                                      {doc.status === 'completed' && 'Completed'}
                                      {doc.status === 'in_progress' && 'In progress'}
                                      {doc.status === 'pending' && doc.priority === 'high' && 'High priority'}
                                      {doc.status === 'pending' && doc.priority === 'medium' && 'Medium priority'}
                                      {doc.status === 'pending' && doc.priority === 'low' && 'Low priority'}
                                    </>
                                  )}
                                </p>
                              </div>
                              <div className="flex gap-2">
                                {BadgeComponent}
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => handleStatusUpdate(doc.id, getNextStatus(doc))}
                                  disabled={updatingDocId === doc.id || doc.status === 'completed'}
                                >
                                  {updatingDocId === doc.id ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                  ) : (
                                    getActionButtonText(doc)
                                  )}
                                </Button>
                              </div>
                            </div>
                            {index < filteredDocuments.length - 1 && <Separator className="my-4" />}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
} 