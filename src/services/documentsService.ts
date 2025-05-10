'use client';

import { createClient } from '@/utils/supabase/client';
import { Document } from '@/../../types/database';

/**
 * Get all documents for a user
 */
export async function getUserDocuments(userId: string): Promise<Document[]> {
  try {
    const supabase = createClient();
    
    const { data, error } = await supabase
      .from('documents')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error('Error fetching user documents:', error);
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error('Error in getUserDocuments:', error);
    return [];
  }
}

/**
 * Get document statistics for a user
 */
export async function getDocumentStatistics(userId: string) {
  try {
    const supabase = createClient();
    
    const { data, error } = await supabase
      .from('documents')
      .select('status, priority')
      .eq('user_id', userId);
      
    if (error) {
      console.error('Error fetching document statistics:', error);
      throw error;
    }
    
    // Calculate statistics
    const total = data.length;
    const completed = data.filter((doc: { status: string }) => doc.status === 'completed').length;
    const inProgress = data.filter((doc: { status: string }) => doc.status === 'in_progress').length;
    const pending = data.filter((doc: { status: string }) => doc.status === 'pending').length;
    const highPriority = data.filter((doc: { priority: string }) => doc.priority === 'high').length;
    
    return {
      completed,
      inProgress,
      pending,
      highPriority,
      total
    };
  } catch (error) {
    console.error('Error in getDocumentStatistics:', error);
    return {
      completed: 0,
      inProgress: 0,
      pending: 0,
      highPriority: 0,
      total: 0
    };
  }
}

/**
 * Update document status
 */
export async function updateDocumentStatus(
  documentId: string, 
  status: 'pending' | 'in_progress' | 'completed' | 'rejected'
): Promise<boolean> {
  try {
    const supabase = createClient();
    
    const { error } = await supabase
      .from('documents')
      .update({ 
        status,
        updated_at: new Date().toISOString() 
      })
      .eq('id', documentId);
      
    if (error) {
      console.error('Error updating document status:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error in updateDocumentStatus:', error);
    return false;
  }
}

/**
 * Add a new document
 */
export async function addDocument(documentData: {
  user_id: string;
  name: string;
  description?: string;
  status: 'pending' | 'in_progress' | 'completed' | 'rejected';
  priority: 'low' | 'medium' | 'high';
  document_url?: string;
}): Promise<string | null> {
  try {
    const supabase = createClient();
    
    const now = new Date().toISOString();
    const { data, error } = await supabase
      .from('documents')
      .insert([
        {
          ...documentData,
          created_at: now,
          updated_at: now
        }
      ])
      .select('id')
      .single();
      
    if (error) {
      console.error('Error adding document:', error);
      return null;
    }
    
    return data.id;
  } catch (error) {
    console.error('Error in addDocument:', error);
    return null;
  }
}

export async function getDocumentsByStatus(userId: string): Promise<Record<string, Document[]>> {
  const documents = await getUserDocuments(userId);
  
  return documents.reduce((grouped, document) => {
    const status = document.status;
    
    if (!grouped[status]) {
      grouped[status] = [];
    }
    
    grouped[status].push(document);
    return grouped;
  }, {} as Record<string, Document[]>);
} 