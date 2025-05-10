'use client';

import { createClient } from '@/utils/supabase/client';
import { CertificationTimeline } from '@/../../types/database';

export async function getUserTimeline(userId: string): Promise<CertificationTimeline[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('certification_timeline')
    .select('*')
    .eq('user_id', userId)
    .order('milestone_date', { ascending: true });
  
  if (error) {
    console.error('Error fetching timeline:', error);
    return [];
  }
  
  return data || [];
}

export async function addTimelineMilestone(
  milestone: Omit<CertificationTimeline, 'id' | 'created_at' | 'updated_at'>
): Promise<string | null> {
  const supabase = createClient();
  const now = new Date().toISOString();
  
  const { data, error } = await supabase
    .from('certification_timeline')
    .insert({
      ...milestone,
      created_at: now,
      updated_at: now
    })
    .select('id')
    .single();
  
  if (error) {
    console.error('Error adding timeline milestone:', error);
    return null;
  }
  
  return data?.id || null;
}

export async function updateTimelineMilestoneStatus(
  milestoneId: string, 
  status: 'completed' | 'current' | 'pending'
): Promise<boolean> {
  const supabase = createClient();
  
  const { error } = await supabase
    .from('certification_timeline')
    .update({ 
      status,
      updated_at: new Date().toISOString() 
    })
    .eq('id', milestoneId);
  
  if (error) {
    console.error('Error updating timeline milestone status:', error);
    return false;
  }
  
  return true;
}

export async function getEstimatedCertificationTime(userId: string): Promise<number> {
  // Get controls and calculate overall progress
  const supabase = createClient();
  const { data: controls, error } = await supabase
    .from('iso_controls')
    .select('progress')
    .eq('user_id', userId);
  
  if (error || !controls || controls.length === 0) {
    // Default to 6 months if we can't calculate
    return 6;
  }
  
  // Calculate average progress
  const avgProgress = controls.reduce((sum, control) => sum + control.progress, 0) / controls.length;
  
  // Simple formula: assuming 100% progress = 0 months left, 0% = 12 months
  // Linear interpolation: certMonths = MAX_MONTHS * (1 - progress/100)
  const remainingMonths = Math.ceil(12 * (1 - avgProgress / 100));
  
  // Return at least 1 month, at most 12
  return Math.max(1, Math.min(12, remainingMonths));
} 