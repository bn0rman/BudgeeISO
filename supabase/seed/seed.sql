-- Seed Data for BudgeeISO Application
-- This seed script provides sample data for testing the application

-- Create a test organization
INSERT INTO organizations (id, name, logo_url, website, industry, size, description)
VALUES 
(
  '6e3e53f9-6032-4c64-94f6-85e743353d0d',
  'Acme Corporation',
  'https://placehold.co/400x400?text=ACME',
  'https://acme.example.com',
  'Technology',
  '50-100',
  'A fictional company that specializes in innovative technology solutions'
);

-- Create a sample user
-- Note: The kinde_id should be replaced with an actual ID from your Kinde account
INSERT INTO users (id, kinde_id, email, name, avatar_url)
VALUES 
(
  '8c1c20d7-47df-4b0b-9c33-0c576a20a3d6',
  'kp_a264f8e71a514ebbbe59642a09c6fa52', -- Replace this with a real Kinde ID
  'admin@acme.example.com',
  'Admin User',
  'https://placehold.co/400x400?text=AU'
);

-- Associate the user with the organization
INSERT INTO user_organizations (user_id, organization_id, role)
VALUES 
(
  '8c1c20d7-47df-4b0b-9c33-0c576a20a3d6',
  '6e3e53f9-6032-4c64-94f6-85e743353d0d',
  'admin'
);

-- Insert sample documents
INSERT INTO documents (id, title, description, status, organization_id, user_id, document_type)
VALUES 
(
  'f8e7d6c5-b4a3-2c1d-0e9f-8a7b6c5d4e3f',
  'Information Security Policy',
  'The main policy document outlining our approach to information security',
  'pending',
  '6e3e53f9-6032-4c64-94f6-85e743353d0d',
  '8c1c20d7-47df-4b0b-9c33-0c576a20a3d6',
  'required'
),
(
  'a1b2c3d4-e5f6-7a8b-9c0d-e1f2a3b4c5d6',
  'Risk Assessment Methodology',
  'Procedures for identifying and evaluating information security risks',
  'draft',
  '6e3e53f9-6032-4c64-94f6-85e743353d0d',
  '8c1c20d7-47df-4b0b-9c33-0c576a20a3d6',
  'required'
),
(
  'b2c3d4e5-f6a7-8b9c-0d1e-f2a3b4c5d6e7',
  'Asset Management Procedure',
  'Procedures for managing information assets',
  'approved',
  '6e3e53f9-6032-4c64-94f6-85e743353d0d',
  '8c1c20d7-47df-4b0b-9c33-0c576a20a3d6',
  'procedure'
),
(
  'c3d4e5f6-a7b8-9c0d-1e2f-3a4b5c6d7e8f',
  'Password Policy',
  'Requirements for secure passwords across the organization',
  'approved',
  '6e3e53f9-6032-4c64-94f6-85e743353d0d',
  '8c1c20d7-47df-4b0b-9c33-0c576a20a3d6',
  'policy'
),
(
  'd4e5f6a7-b8c9-0d1e-2f3a-4b5c6d7e8f9a',
  'Backup Records Q1 2023',
  'Documentation of backup verification for Q1 2023',
  'approved',
  '6e3e53f9-6032-4c64-94f6-85e743353d0d',
  '8c1c20d7-47df-4b0b-9c33-0c576a20a3d6',
  'record'
);

-- Insert sample controls
-- A.5 Information Security Policies
INSERT INTO controls (id, control_number, name, description, status, organization_id, user_id)
VALUES
(
  'e5f6a7b8-c9d0-e1f2-a3b4-c5d6e7f8a9b0',
  'A.5.1.1',
  'Policies for information security',
  'A set of policies for information security should be defined, approved by management, published and communicated to employees and relevant external parties.',
  'implemented',
  '6e3e53f9-6032-4c64-94f6-85e743353d0d',
  '8c1c20d7-47df-4b0b-9c33-0c576a20a3d6'
),
(
  'f6a7b8c9-d0e1-f2a3-b4c5-d6e7f8a9b0c1',
  'A.5.1.2',
  'Review of policies for information security',
  'The policies for information security should be reviewed at planned intervals or if significant changes occur to ensure their continuing suitability, adequacy and effectiveness.',
  'in-progress',
  '6e3e53f9-6032-4c64-94f6-85e743353d0d',
  '8c1c20d7-47df-4b0b-9c33-0c576a20a3d6'
);

-- A.6 Organization of information security
INSERT INTO controls (id, control_number, name, description, status, organization_id, user_id)
VALUES
(
  'a7b8c9d0-e1f2-a3b4-c5d6-e7f8a9b0c1d2',
  'A.6.1.1',
  'Information security roles and responsibilities',
  'All information security responsibilities should be defined and allocated.',
  'implemented',
  '6e3e53f9-6032-4c64-94f6-85e743353d0d',
  '8c1c20d7-47df-4b0b-9c33-0c576a20a3d6'
),
(
  'b8c9d0e1-f2a3-b4c5-d6e7-f8a9b0c1d2e3',
  'A.6.1.2',
  'Segregation of duties',
  'Conflicting duties and areas of responsibility should be segregated to reduce opportunities for unauthorized or unintentional modification or misuse of the organization's assets.',
  'not-implemented',
  '6e3e53f9-6032-4c64-94f6-85e743353d0d',
  '8c1c20d7-47df-4b0b-9c33-0c576a20a3d6'
),
(
  'c9d0e1f2-a3b4-c5d6-e7f8-a9b0c1d2e3f4',
  'A.6.1.3',
  'Contact with authorities',
  'Appropriate contacts with relevant authorities should be maintained.',
  'not-implemented',
  '6e3e53f9-6032-4c64-94f6-85e743353d0d',
  '8c1c20d7-47df-4b0b-9c33-0c576a20a3d6'
);

-- A.7 Human resource security
INSERT INTO controls (id, control_number, name, description, status, organization_id, user_id)
VALUES
(
  'd0e1f2a3-b4c5-d6e7-f8a9-b0c1d2e3f4a5',
  'A.7.1.1',
  'Screening',
  'Background verification checks on all candidates for employment should be carried out in accordance with relevant laws, regulations and ethics and should be proportional to the business requirements, the classification of the information to be accessed and the perceived risks.',
  'in-progress',
  '6e3e53f9-6032-4c64-94f6-85e743353d0d',
  '8c1c20d7-47df-4b0b-9c33-0c576a20a3d6'
),
(
  'e1f2a3b4-c5d6-e7f8-a9b0-c1d2e3f4a5b6',
  'A.7.1.2',
  'Terms and conditions of employment',
  'The contractual agreements with employees and contractors should state their and the organization's responsibilities for information security.',
  'implemented',
  '6e3e53f9-6032-4c64-94f6-85e743353d0d',
  '8c1c20d7-47df-4b0b-9c33-0c576a20a3d6'
);

-- A.8 Asset management
INSERT INTO controls (id, control_number, name, description, status, organization_id, user_id)
VALUES
(
  'f2a3b4c5-d6e7-f8a9-b0c1-d2e3f4a5b6c7',
  'A.8.1.1',
  'Inventory of assets',
  'Assets associated with information and information processing facilities should be identified and an inventory of these assets should be drawn up and maintained.',
  'in-progress',
  '6e3e53f9-6032-4c64-94f6-85e743353d0d',
  '8c1c20d7-47df-4b0b-9c33-0c576a20a3d6'
),
(
  'a3b4c5d6-e7f8-a9b0-c1d2-e3f4a5b6c7d8',
  'A.8.1.2',
  'Ownership of assets',
  'Assets maintained in the inventory should be owned.',
  'not-implemented',
  '6e3e53f9-6032-4c64-94f6-85e743353d0d',
  '8c1c20d7-47df-4b0b-9c33-0c576a20a3d6'
);

-- A.9 Access control
INSERT INTO controls (id, control_number, name, description, status, organization_id, user_id)
VALUES
(
  'b4c5d6e7-f8a9-b0c1-d2e3-f4a5b6c7d8e9',
  'A.9.1.1',
  'Access control policy',
  'An access control policy should be established, documented and reviewed based on business and information security requirements.',
  'not-implemented',
  '6e3e53f9-6032-4c64-94f6-85e743353d0d',
  '8c1c20d7-47df-4b0b-9c33-0c576a20a3d6'
),
(
  'c5d6e7f8-a9b0-c1d2-e3f4-a5b6c7d8e9f0',
  'A.9.1.2',
  'Access to networks and network services',
  'Users should only be provided with access to the network and network services that they have been specifically authorized to use.',
  'in-progress',
  '6e3e53f9-6032-4c64-94f6-85e743353d0d',
  '8c1c20d7-47df-4b0b-9c33-0c576a20a3d6'
);
