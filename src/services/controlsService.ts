'use client';

import { createClient } from '@/utils/supabase/client';
import { IsoControl } from '@/../../types/database';

export async function getUserControls(userId: string): Promise<IsoControl[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('iso_controls')
    .select('*')
    .eq('user_id', userId);
  
  if (error) {
    console.error('Error fetching controls:', error);
    return [];
  }
  
  return data || [];
}

/**
 * Get controls grouped by category
 */
export async function getControlsByCategory(userId: string): Promise<Record<string, IsoControl[]>> {
  try {
    const supabase = createClient();
    
    const { data, error } = await supabase
      .from('iso_controls')
      .select('*')
      .eq('user_id', userId)
      .order('category');
      
    if (error) {
      console.error('Error fetching controls by category:', error);
      throw error;
    }
    
    // Group controls by category
    const groupedControls: Record<string, IsoControl[]> = {};
    
    data.forEach((control: IsoControl) => {
      const category = control.category;
      if (!groupedControls[category]) {
        groupedControls[category] = [];
      }
      groupedControls[category].push(control);
    });
    
    return groupedControls;
  } catch (error) {
    console.error('Error in getControlsByCategory:', error);
    return {};
  }
}

/**
 * Update the progress of a specific control
 */
export async function updateControlProgress(controlId: string, progress: number): Promise<boolean> {
  try {
    const supabase = createClient();
    
    // Determine status based on progress
    let status: 'not_started' | 'in_progress' | 'completed' = 'not_started';
    if (progress === 100) {
      status = 'completed';
    } else if (progress > 0) {
      status = 'in_progress';
    }
    
    // Update the control
    const { error } = await supabase
      .from('iso_controls')
      .update({ 
        progress, 
        status,
        updated_at: new Date().toISOString()
      })
      .eq('id', controlId);
      
    if (error) {
      console.error('Error updating control progress:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error in updateControlProgress:', error);
    return false;
  }
}

/**
 * Get statistics about control progress
 */
export async function getControlStatistics(userId: string): Promise<{ 
  completed: number; 
  inProgress: number; 
  notStarted: number;
  total: number;
  overallProgress: number;
}> {
  try {
    const supabase = createClient();
    
    // Get counts by status
    const { data, error } = await supabase
      .from('iso_controls')
      .select('status, progress')
      .eq('user_id', userId);
      
    if (error) {
      console.error('Error fetching control statistics:', error);
      throw error;
    }
    
    // Calculate statistics
    const total = data.length;
    const completed = data.filter((control: { status: string }) => control.status === 'completed').length;
    const inProgress = data.filter((control: { status: string }) => control.status === 'in_progress').length;
    const notStarted = data.filter((control: { status: string }) => control.status === 'not_started').length;
    
    // Calculate overall progress (average of all control progress values)
    const overallProgress = Math.round(
      data.reduce((sum: number, control: { progress: number }) => sum + control.progress, 0) / (total || 1)
    );
    
    return {
      completed,
      inProgress,
      notStarted,
      total,
      overallProgress
    };
  } catch (error) {
    console.error('Error in getControlStatistics:', error);
    return {
      completed: 0,
      inProgress: 0,
      notStarted: 0,
      total: 0,
      overallProgress: 0
    };
  }
} 