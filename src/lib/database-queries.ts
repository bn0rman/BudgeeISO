import { createServerClient } from './supabase-server';
import supabase from './supabase';
import { Database } from '@/types/supabase';

// Organization queries

/**
 * Get organizations for a user
 */
export async function getUserOrganizations(userId: string) {
  const { data, error } = await supabase
    .from('user_organizations')
    .select(`
      *,
      organizations (*)
    `)
    .eq('user_id', userId);

  if (error) {
    console.error('Error fetching user organizations:', error);
    return [];
  }

  return data;
}

/**
 * Get a single organization by ID
 */
export async function getOrganization(organizationId: string) {
  const { data, error } = await supabase
    .from('organizations')
    .select('*')
    .eq('id', organizationId)
    .single();

  if (error) {
    console.error('Error fetching organization:', error);
    return null;
  }

  return data;
}

// Document queries

/**
 * Get documents for an organization
 */
export async function getOrganizationDocuments(organizationId: string) {
  const { data, error } = await supabase
    .from('documents')
    .select(`
      *,
      users (id, name, email, avatar_url)
    `)
    .eq('organization_id', organizationId)
    .order('updated_at', { ascending: false });

  if (error) {
    console.error('Error fetching organization documents:', error);
    return [];
  }

  return data;
}

/**
 * Get a single document by ID
 */
export async function getDocument(documentId: string) {
  const { data, error } = await supabase
    .from('documents')
    .select(`
      *,
      users (id, name, email, avatar_url)
    `)
    .eq('id', documentId)
    .single();

  if (error) {
    console.error('Error fetching document:', error);
    return null;
  }

  return data;
}

/**
 * Create a new document
 */
export async function createDocument(document: Database['public']['Tables']['documents']['Insert']) {
  const { data, error } = await supabase
    .from('documents')
    .insert(document)
    .select()
    .single();

  if (error) {
    console.error('Error creating document:', error);
    return null;
  }

  return data;
}

// Control queries

/**
 * Get controls for an organization
 */
export async function getOrganizationControls(organizationId: string) {
  const { data, error } = await supabase
    .from('controls')
    .select(`
      *,
      users (id, name, email, avatar_url)
    `)
    .eq('organization_id', organizationId)
    .order('control_number', { ascending: true });

  if (error) {
    console.error('Error fetching organization controls:', error);
    return [];
  }

  return data;
}

/**
 * Get a single control by ID
 */
export async function getControl(controlId: string) {
  const { data, error } = await supabase
    .from('controls')
    .select(`
      *,
      users (id, name, email, avatar_url)
    `)
    .eq('id', controlId)
    .single();

  if (error) {
    console.error('Error fetching control:', error);
    return null;
  }

  return data;
}

/**
 * Create a new control
 */
export async function createControl(control: Database['public']['Tables']['controls']['Insert']) {
  const { data, error } = await supabase
    .from('controls')
    .insert(control)
    .select()
    .single();

  if (error) {
    console.error('Error creating control:', error);
    return null;
  }

  return data;
}

// User queries

/**
 * Get a user by their Kinde ID
 */
export async function getUserByKindeId(kindeId: string) {
  try {
    // First get the user without joins
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('kinde_id', kindeId)
      .single();

    if (userError) {
      console.error('Error fetching user by Kinde ID:', userError.message || userError);
      return null;
    }

    // Then fetch the organizations for this user
    if (userData) {
      const { data: orgData, error: orgError } = await supabase
        .from('user_organizations')
        .select(`
          id, 
          organization_id,
          role,
          organizations:organization_id(*)
        `)
        .eq('user_id', userData.id);

      if (orgError) {
        console.error('Error fetching user organizations:', orgError.message || orgError);
      } else {
        // Add organizations to user data
        return {
          ...userData,
          organizations: orgData || []
        };
      }
    }

    return userData;
  } catch (exception) {
    console.error('Exception fetching user by Kinde ID:', exception);
    return null;
  }
}

// Server-side admin functions (using service role key)

/**
 * Admin function to get all users (server-side only)
 */
export async function getAllUsers() {
  const supabaseServer = createServerClient();
  const { data, error } = await supabaseServer
    .from('users')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching all users:', error);
    return [];
  }

  return data;
}

/**
 * Admin function to get all organizations (server-side only)
 */
export async function getAllOrganizations() {
  const supabaseServer = createServerClient();
  const { data, error } = await supabaseServer
    .from('organizations')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching all organizations:', error);
    return [];
  }

  return data;
} 