'use client';

import { createClient } from '@/utils/supabase/client';

export async function initializeUserData(userId: string): Promise<boolean> {
  const supabase = createClient();
  
  try {
    // Check if user already has data
    const { data: existingData, error: checkError } = await supabase
      .from('iso_controls')
      .select('id')
      .eq('user_id', userId)
      .limit(1);
      
    if (checkError) {
      console.error('Error checking existing data:', checkError);
      return false;
    }
      
    if (existingData && existingData.length > 0) {
      // User already has data
      return true;
    }
    
    // Define default controls based on ISO27001 standards
    const defaultControls = [
      { control_id: 'A.5.1', name: 'Information Security Policies', category: 'A.5', description: 'Policies for information security', progress: 0, status: 'not_started' },
      { control_id: 'A.6.1', name: 'Internal Organization', category: 'A.6', description: 'Organization of information security', progress: 0, status: 'not_started' },
      { control_id: 'A.6.2', name: 'Mobile Devices and Teleworking', category: 'A.6', description: 'Secure teleworking and mobile devices', progress: 0, status: 'not_started' },
      { control_id: 'A.7.1', name: 'Prior to Employment', category: 'A.7', description: 'Security roles and responsibilities', progress: 0, status: 'not_started' },
      { control_id: 'A.7.2', name: 'During Employment', category: 'A.7', description: 'Information security awareness', progress: 0, status: 'not_started' },
      { control_id: 'A.7.3', name: 'Termination of Employment', category: 'A.7', description: 'Security in exit processes', progress: 0, status: 'not_started' },
      { control_id: 'A.8.1', name: 'Responsibility for Assets', category: 'A.8', description: 'Inventory and ownership of assets', progress: 0, status: 'not_started' },
      { control_id: 'A.8.2', name: 'Information Classification', category: 'A.8', description: 'Classification of information', progress: 0, status: 'not_started' },
      { control_id: 'A.8.3', name: 'Media Handling', category: 'A.8', description: 'Management of removable media', progress: 0, status: 'not_started' },
      { control_id: 'A.9.1', name: 'Business Requirements of Access Control', category: 'A.9', description: 'Access control policy', progress: 0, status: 'not_started' },
      { control_id: 'A.9.2', name: 'User Access Management', category: 'A.9', description: 'User registration and de-registration', progress: 0, status: 'not_started' },
      { control_id: 'A.9.3', name: 'User Responsibilities', category: 'A.9', description: 'Use of secret authentication', progress: 0, status: 'not_started' },
      { control_id: 'A.9.4', name: 'System and Application Access Control', category: 'A.9', description: 'Information access restriction', progress: 0, status: 'not_started' }
    ];
    
    // Add user_id to each control
    const now = new Date().toISOString();
    const controlsWithUserId = defaultControls.map(control => ({
      ...control,
      user_id: userId,
      created_at: now,
      updated_at: now
    }));
    
    // Insert default controls
    const { error: controlsError } = await supabase
      .from('iso_controls')
      .insert(controlsWithUserId);
    
    if (controlsError) {
      console.error('Error inserting default controls:', controlsError);
      return false;
    }
    
    // Insert default documents
    const { error: documentsError } = await supabase
      .from('documents')
      .insert([
        {
          user_id: userId,
          name: 'Information Security Policy',
          description: 'Main policy document outlining your approach to security',
          status: 'pending',
          priority: 'high',
          created_at: now,
          updated_at: now
        },
        {
          user_id: userId,
          name: 'Risk Assessment Template',
          description: 'Template for conducting risk assessments',
          status: 'pending',
          priority: 'medium',
          created_at: now,
          updated_at: now
        },
        {
          user_id: userId,
          name: 'Asset Management Procedure',
          description: 'Procedure for managing information assets',
          status: 'pending',
          priority: 'medium',
          created_at: now,
          updated_at: now
        },
        {
          user_id: userId,
          name: 'Acceptable Use Policy',
          description: 'Guidelines for acceptable use of IT resources',
          status: 'pending',
          priority: 'high',
          created_at: now,
          updated_at: now
        }
      ]);
    
    if (documentsError) {
      console.error('Error inserting default documents:', documentsError);
      return false;
    }
    
    // Insert default timeline
    const startDate = new Date();
    const twoMonthsAgo = new Date(startDate);
    twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);
    
    const oneMonthAgo = new Date(startDate);
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    
    const threeMonthsLater = new Date(startDate);
    threeMonthsLater.setMonth(threeMonthsLater.getMonth() + 3);
    
    const sixMonthsLater = new Date(startDate);
    sixMonthsLater.setMonth(sixMonthsLater.getMonth() + 6);
    
    const { error: timelineError } = await supabase
      .from('certification_timeline')
      .insert([
        {
          user_id: userId,
          milestone_name: 'Project Kickoff',
          milestone_date: twoMonthsAgo.toISOString(),
          status: 'completed',
          description: 'Started ISO27001 compliance journey',
          created_at: now,
          updated_at: now
        },
        {
          user_id: userId,
          milestone_name: 'Gap Analysis Complete',
          milestone_date: oneMonthAgo.toISOString(),
          status: 'completed',
          description: 'Identified key areas for improvement',
          created_at: now,
          updated_at: now
        },
        {
          user_id: userId,
          milestone_name: 'Documentation Phase',
          milestone_date: startDate.toISOString(),
          status: 'current',
          description: 'Developing required policies and procedures',
          created_at: now,
          updated_at: now
        },
        {
          user_id: userId,
          milestone_name: 'Internal Audit',
          milestone_date: threeMonthsLater.toISOString(),
          status: 'pending',
          description: 'Verify implementation of controls',
          created_at: now,
          updated_at: now
        },
        {
          user_id: userId,
          milestone_name: 'Certification Audit',
          milestone_date: sixMonthsLater.toISOString(),
          status: 'pending',
          description: 'External auditor assessment',
          created_at: now,
          updated_at: now
        }
      ]);
    
    if (timelineError) {
      console.error('Error inserting default timeline:', timelineError);
      return false;
    }
    
    // Create default organization settings (empty)
    const { error: orgError } = await supabase
      .from('organization_settings')
      .insert({
        user_id: userId,
        created_at: now,
        updated_at: now
      });
    
    if (orgError) {
      console.error('Error inserting default organization settings:', orgError);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error initializing user data:', error);
    return false;
  }
} 