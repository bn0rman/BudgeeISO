export interface IsoControl {
  id: string;
  user_id: string;
  control_id: string;
  name: string;
  description?: string;
  category: string;
  status: 'not_started' | 'in_progress' | 'completed';
  progress: number;
  created_at: string;
  updated_at: string;
}

export interface Document {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  status: 'pending' | 'in_progress' | 'completed' | 'rejected';
  priority: 'low' | 'medium' | 'high';
  document_url?: string;
  created_at: string;
  updated_at: string;
}

export interface OrganizationSettings {
  id?: string;
  user_id: string;
  organization_name: string;
  industry?: string;
  employee_count?: string;
  address?: string;
  contact_person?: string;
  phone_number?: string;
  scope_statement?: string;
  compliance_goals?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CertificationTimeline {
  id: string;
  user_id: string;
  milestone_name: string;
  description?: string;
  status: 'pending' | 'current' | 'completed';
  milestone_date?: string;
  created_at: string;
  updated_at: string;
} 