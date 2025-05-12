-- Create user_profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  job_title VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create index on user_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON user_profiles(user_id);

-- Set up Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Users can view and update only their own profile
CREATE POLICY "Users can view their own profile"
  ON user_profiles
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
  ON user_profiles
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile"
  ON user_profiles
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create or replace function to handle profile updates
CREATE OR REPLACE FUNCTION handle_user_profile_update()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update the updated_at field
CREATE TRIGGER update_user_profile_updated_at
BEFORE UPDATE ON user_profiles
FOR EACH ROW
EXECUTE FUNCTION handle_user_profile_update();

-- Create organizations table
CREATE TABLE IF NOT EXISTS organizations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name VARCHAR(255),
  industry VARCHAR(255),
  employees VARCHAR(100),
  region VARCHAR(255),
  scope TEXT,
  locations TEXT,
  services TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create index on user_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_organizations_user_id ON organizations(user_id);

-- Set up Row Level Security
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Users can view and update only their own organization
CREATE POLICY "Users can view their own organization"
  ON organizations
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own organization"
  ON organizations
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own organization"
  ON organizations
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create or replace function to handle organization updates
CREATE OR REPLACE FUNCTION handle_organization_update()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update the updated_at field
CREATE TRIGGER update_organization_updated_at
BEFORE UPDATE ON organizations
FOR EACH ROW
EXECUTE FUNCTION handle_organization_update();
