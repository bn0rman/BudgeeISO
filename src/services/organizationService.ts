'use client';

import { createClient } from '@/utils/supabase/client';
import { OrganizationSettings } from '@/../../types/database';

/**
 * Get organization settings for a user
 */
export async function getOrganizationSettings(userId: string): Promise<OrganizationSettings | null> {
  try {
    const supabase = createClient();
    
    const { data, error } = await supabase
      .from('organization_settings')
      .select('*')
      .eq('user_id', userId)
      .single();
      
    if (error) {
      console.error('Error fetching organization settings:', error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('Error in getOrganizationSettings:', error);
    return null;
  }
}

/**
 * Update organization settings
 */
export async function updateOrganizationSettings(settings: OrganizationSettings): Promise<boolean> {
  try {
    const supabase = createClient();
    const { user_id, ...updateData } = settings;
    
    // Check if organization settings exist
    const { data: existingSettings, error: checkError } = await supabase
      .from('organization_settings')
      .select('id')
      .eq('user_id', user_id)
      .single();
      
    if (checkError && checkError.code !== 'PGRST116') { // PGRST116 is "not found" error
      console.error('Error checking organization settings:', checkError);
      return false;
    }
    
    let updateError;
    
    if (existingSettings?.id) {
      // Update existing settings
      const { error } = await supabase
        .from('organization_settings')
        .update({
          ...updateData,
          updated_at: new Date().toISOString()
        })
        .eq('id', existingSettings.id);
        
      updateError = error;
    } else {
      // Insert new settings
      const { error } = await supabase
        .from('organization_settings')
        .insert([{
          user_id,
          ...updateData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }]);
        
      updateError = error;
    }
    
    if (updateError) {
      console.error('Error updating organization settings:', updateError);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error in updateOrganizationSettings:', error);
    return false;
  }
} 