'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Upload, ArrowLeft } from 'lucide-react';
import { addDocument } from '@/services/documentsService';

export default function DocumentUploadPage() {
  const router = useRouter();
  const { user, isLoading: isUserLoading } = useKindeBrowserClient();
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [documentUrl, setDocumentUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!user?.id) {
      setError('You must be logged in to upload documents');
      return;
    }
    
    if (!name.trim()) {
      setError('Document name is required');
      return;
    }
    
    setIsUploading(true);
    setError(null);
    
    try {
      const newDocId = await addDocument({
        user_id: user.id,
        name: name.trim(),
        description: description.trim() || undefined,
        status: 'pending',
        priority,
        document_url: documentUrl.trim() || undefined,
      });
      
      if (newDocId) {
        // Successfully added the document, redirect to documents page
        router.push('/dashboard/documents');
      } else {
        setError('Failed to upload document. Please try again.');
      }
    } catch (err) {
      console.error('Error uploading document:', err);
      setError('An error occurred while uploading the document.');
    } finally {
      setIsUploading(false);
    }
  };

  // Loading state
  if (isUserLoading) {
    return (
      <div className="p-6 flex flex-col items-center justify-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500 mb-4" />
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          size="sm" 
          className="gap-1 mr-4"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <h1 className="text-3xl font-bold gradient-text">Upload Document</h1>
      </div>
      
      <Card className="border border-gray-200 shadow-sm">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Document Information</CardTitle>
            <CardDescription>
              Add a new document to your ISO27001 documentation
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="name">Document Name *</Label>
              <Input
                id="name"
                placeholder="e.g. Information Security Policy"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Brief description of the document"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select 
                value={priority} 
                onValueChange={(value: 'low' | 'medium' | 'high') => setPriority(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="documentUrl">Document URL (Optional)</Label>
              <Input
                id="documentUrl"
                placeholder="e.g. https://drive.google.com/file/..."
                value={documentUrl}
                onChange={(e) => setDocumentUrl(e.target.value)}
              />
              <p className="text-xs text-gray-500">
                Enter a link to your document (Google Drive, Dropbox, etc.)
              </p>
            </div>
            
            {/* Future enhancement: Add actual file upload component */}
            <div className="mt-6 p-4 border border-dashed border-gray-300 rounded-md bg-gray-50 text-center">
              <p className="text-sm text-gray-500 mb-2">
                Direct file upload will be available in a future update
              </p>
              <p className="text-xs text-gray-400">
                For now, please use the Document URL field to link to externally hosted files
              </p>
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-between">
            <Button 
              type="button" 
              variant="outline"
              onClick={() => router.push('/dashboard/documents')}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="gap-2"
              disabled={isUploading || !name.trim()}
            >
              {isUploading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4" />
                  Add Document
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
} 