-- Create tables for BudgeeISO application
-- This schema defines the database structure for ISO27001 certification management

-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret-here';
ALTER DATABASE postgres SET "app.jwt_exp" TO 3600;

-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Organizations table
CREATE TABLE IF NOT EXISTS organizations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  logo_url TEXT,
  website TEXT,
  industry TEXT,
  size TEXT,
  description TEXT
);

-- Documents table
CREATE TABLE IF NOT EXISTS documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  title TEXT NOT NULL,
  description TEXT,
  file_url TEXT,
  status TEXT NOT NULL DEFAULT 'draft',
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  document_type TEXT
);

-- Controls table
CREATE TABLE IF NOT EXISTS controls (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'not-implemented',
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  control_number TEXT NOT NULL,
  evidence_url TEXT
);

-- Users table (connected with Kinde)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  kinde_id TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  avatar_url TEXT
);

-- User-Organization relationships (many-to-many)
CREATE TABLE IF NOT EXISTS user_organizations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'member',
  UNIQUE(user_id, organization_id)
);

-- Update triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_organizations_updated_at
BEFORE UPDATE ON organizations
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_documents_updated_at
BEFORE UPDATE ON documents
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_controls_updated_at
BEFORE UPDATE ON controls
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_user_organizations_updated_at
BEFORE UPDATE ON user_organizations
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Row Level Security Policies

-- Enable RLS on all tables
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE controls ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_organizations ENABLE ROW LEVEL SECURITY;

-- Users can only see their own user data
CREATE POLICY user_select_self ON users
FOR SELECT
USING (kinde_id = auth.uid());

CREATE POLICY user_update_self ON users
FOR UPDATE
USING (kinde_id = auth.uid());

-- Organization access policies
-- Users can only view organizations they belong to
CREATE POLICY org_select_member ON organizations
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM user_organizations
    JOIN users ON user_organizations.user_id = users.id
    WHERE user_organizations.organization_id = organizations.id
    AND users.kinde_id = auth.uid()
  )
);

-- Only admin users can update their organizations
CREATE POLICY org_update_admin ON organizations
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM user_organizations
    JOIN users ON user_organizations.user_id = users.id
    WHERE user_organizations.organization_id = organizations.id
    AND user_organizations.role = 'admin'
    AND users.kinde_id = auth.uid()
  )
);

-- Document access policies
-- Users can only view documents for organizations they belong to
CREATE POLICY doc_select_member ON documents
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM user_organizations
    JOIN users ON user_organizations.user_id = users.id
    WHERE user_organizations.organization_id = documents.organization_id
    AND users.kinde_id = auth.uid()
  )
);

-- Only the creator or admin can update documents
CREATE POLICY doc_update_creator_or_admin ON documents
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = documents.user_id
    AND users.kinde_id = auth.uid()
  ) OR
  EXISTS (
    SELECT 1 FROM user_organizations
    JOIN users ON user_organizations.user_id = users.id
    WHERE user_organizations.organization_id = documents.organization_id
    AND user_organizations.role = 'admin'
    AND users.kinde_id = auth.uid()
  )
);

-- Controls access policies
-- Users can only view controls for organizations they belong to
CREATE POLICY control_select_member ON controls
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM user_organizations
    JOIN users ON user_organizations.user_id = users.id
    WHERE user_organizations.organization_id = controls.organization_id
    AND users.kinde_id = auth.uid()
  )
);

-- Only the creator or admin can update controls
CREATE POLICY control_update_creator_or_admin ON controls
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = controls.user_id
    AND users.kinde_id = auth.uid()
  ) OR
  EXISTS (
    SELECT 1 FROM user_organizations
    JOIN users ON user_organizations.user_id = users.id
    WHERE user_organizations.organization_id = controls.organization_id
    AND user_organizations.role = 'admin'
    AND users.kinde_id = auth.uid()
  )
);

-- User-organization policies
-- Users can view their own memberships
CREATE POLICY user_org_select_self ON user_organizations
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = user_organizations.user_id
    AND users.kinde_id = auth.uid()
  )
);

-- Only admins can update user roles
CREATE POLICY user_org_update_admin ON user_organizations
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM user_organizations uo
    JOIN users ON uo.user_id = users.id
    WHERE uo.organization_id = user_organizations.organization_id
    AND uo.role = 'admin'
    AND users.kinde_id = auth.uid()
  )
); 