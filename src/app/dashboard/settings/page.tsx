'use client';

import { useEffect, useState } from "react";
import { getClientUser } from "@/lib/supabase-client";
import { createClientSupabaseClient } from "@/lib/supabase-client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

export default function SettingsPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [orgEditMode, setOrgEditMode] = useState(false);
  const [savingOrg, setSavingOrg] = useState(false);
  const [notification, setNotification] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    jobTitle: ''
  });
  const [orgData, setOrgData] = useState({
    name: '',
    industry: '',
    employees: '',
    region: '',
    scope: '',
    locations: '',
    services: ''
  });

  useEffect(() => {
    async function loadUserData() {
      try {
        const userData = await getClientUser();
        setUser(userData);
        
        if (userData) {
          const supabase = createClientSupabaseClient();
          
          // Load profile data
          const { data: profileData, error: profileError } = await supabase
            .from('user_profiles')
            .select('*')
            .eq('user_id', userData.id)
            .single();
            
          if (profileData && !profileError) {
            setProfileData({
              firstName: profileData.first_name || '',
              lastName: profileData.last_name || '',
              jobTitle: profileData.job_title || ''
            });
          }
          
          // Load organization data
          const { data: orgData, error: orgError } = await supabase
            .from('organizations')
            .select('*')
            .eq('user_id', userData.id)
            .single();
            
          if (orgData && !orgError) {
            setOrgData({
              name: orgData.name || '',
              industry: orgData.industry || '',
              employees: orgData.employees || '',
              region: orgData.region || '',
              scope: orgData.scope || '',
              locations: orgData.locations || '',
              services: orgData.services || ''
            });
          }
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadUserData();
  }, []);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [id]: value
    }));
  };
  
  const handleOrgChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setOrgData(prev => ({
      ...prev,
      [id]: value
    }));
  };
  
  const toggleEditMode = () => {
    if (editMode) {
      // If we're currently in edit mode and toggle, we want to save changes
      handleSaveProfile();
    } else {
      // Otherwise just enable edit mode
      setEditMode(true);
    }
  };
  
  const toggleOrgEditMode = () => {
    if (orgEditMode) {
      // If we're currently in edit mode and toggle, we want to save changes
      handleSaveOrganization();
    } else {
      // Otherwise just enable edit mode
      setOrgEditMode(true);
    }
  };
  
  const handleSaveProfile = async () => {
    if (!user) return;
    
    setSaving(true);
    setNotification({ type: null, message: '' });
    
    try {
      const supabase = createClientSupabaseClient();
      
      // Check if profile already exists
      const { data: existingProfile } = await supabase
        .from('user_profiles')
        .select('id')
        .eq('user_id', user.id)
        .single();
      
      if (existingProfile) {
        // Update existing profile
        const { error } = await supabase
          .from('user_profiles')
          .update({
            first_name: profileData.firstName,
            last_name: profileData.lastName,
            job_title: profileData.jobTitle,
            updated_at: new Date().toISOString()
          })
          .eq('user_id', user.id);
          
        if (error) throw error;
      } else {
        // Insert new profile
        const { error } = await supabase
          .from('user_profiles')
          .insert({
            user_id: user.id,
            first_name: profileData.firstName,
            last_name: profileData.lastName,
            job_title: profileData.jobTitle,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          });
          
        if (error) throw error;
      }
      
      setNotification({
        type: 'success',
        message: 'Profile updated successfully!'
      });
      
      // Exit edit mode after successful save
      setEditMode(false);
      
      // Auto-clear success message after 3 seconds
      setTimeout(() => {
        setNotification({ type: null, message: '' });
      }, 3000);
      
    } catch (error) {
      console.error('Error saving profile:', error);
      setNotification({
        type: 'error',
        message: 'There was a problem saving your profile information. Please try again.'
      });
    } finally {
      setSaving(false);
    }
  };

  const handleSaveOrganization = async () => {
    if (!user) return;
    
    setSavingOrg(true);
    setNotification({ type: null, message: '' });
    
    try {
      const supabase = createClientSupabaseClient();
      
      // Check if organization already exists
      const { data: existingOrg } = await supabase
        .from('organizations')
        .select('id')
        .eq('user_id', user.id)
        .single();
      
      if (existingOrg) {
        // Update existing organization
        const { error } = await supabase
          .from('organizations')
          .update({
            name: orgData.name,
            industry: orgData.industry,
            employees: orgData.employees,
            region: orgData.region,
            scope: orgData.scope,
            locations: orgData.locations,
            services: orgData.services,
            updated_at: new Date().toISOString()
          })
          .eq('user_id', user.id);
          
        if (error) throw error;
      } else {
        // Insert new organization
        const { error } = await supabase
          .from('organizations')
          .insert({
            user_id: user.id,
            name: orgData.name,
            industry: orgData.industry,
            employees: orgData.employees,
            region: orgData.region,
            scope: orgData.scope,
            locations: orgData.locations,
            services: orgData.services,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          });
          
        if (error) throw error;
      }
      
      setNotification({
        type: 'success',
        message: 'Organization updated successfully!'
      });
      
      // Exit edit mode after successful save
      setOrgEditMode(false);
      
      // Auto-clear success message after 3 seconds
      setTimeout(() => {
        setNotification({ type: null, message: '' });
      }, 3000);
      
    } catch (error) {
      console.error('Error saving organization:', error);
      setNotification({
        type: 'error',
        message: 'There was a problem saving your organization information. Please try again.'
      });
    } finally {
      setSavingOrg(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-6">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="organization">Organization</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="space-y-6">
          {notification.type && (
            <div className={`p-4 mb-4 rounded-md ${notification.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
              {notification.message}
            </div>
          )}
          
          <Card>
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
              <CardDescription>Manage your personal information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First name</Label>
                  <Input 
                    id="firstName" 
                    placeholder="Enter your first name" 
                    value={profileData.firstName}
                    onChange={handleProfileChange}
                    disabled={!editMode}
                    className={!editMode ? "bg-gray-100" : ""}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last name</Label>
                  <Input 
                    id="lastName" 
                    placeholder="Enter your last name" 
                    value={profileData.lastName}
                    onChange={handleProfileChange}
                    disabled={!editMode}
                    className={!editMode ? "bg-gray-100" : ""}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={user?.email || ''}
                  disabled 
                  className="bg-gray-100"
                />
                <p className="text-xs text-muted-foreground">Your email address is connected to your account and cannot be changed.</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="jobTitle">Job Title</Label>
                <Input 
                  id="jobTitle" 
                  placeholder="Enter your job title" 
                  value={profileData.jobTitle}
                  onChange={handleProfileChange}
                  disabled={!editMode}
                  className={!editMode ? "bg-gray-100" : ""}
                />
              </div>
              
              <div className="pt-4">
                <Button 
                  onClick={toggleEditMode} 
                  disabled={saving}
                >
                  {saving ? 'Saving...' : (editMode ? 'Save Changes' : 'Edit')}
                </Button>
                {editMode && (
                  <Button 
                    variant="outline" 
                    className="ml-2"
                    onClick={() => setEditMode(false)}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>Update your password</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input id="currentPassword" type="password" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type="password" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input id="confirmPassword" type="password" />
              </div>
              
              <div className="pt-4">
                <Button>Change Password</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="organization" className="space-y-6">
          {notification.type && (
            <div className={`p-4 mb-4 rounded-md ${notification.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
              {notification.message}
            </div>
          )}
          
          <Card>
            <CardHeader>
              <CardTitle>Organization Settings</CardTitle>
              <CardDescription>Manage your organization&apos;s information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Organization Name</Label>
                <Input 
                  id="name" 
                  placeholder="Enter your organization name" 
                  value={orgData.name}
                  onChange={handleOrgChange}
                  disabled={!orgEditMode}
                  className={!orgEditMode ? "bg-gray-100" : ""}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="industry">Industry</Label>
                <Input 
                  id="industry" 
                  placeholder="Enter your industry" 
                  value={orgData.industry}
                  onChange={handleOrgChange}
                  disabled={!orgEditMode}
                  className={!orgEditMode ? "bg-gray-100" : ""}
                />
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="employees">Number of Employees</Label>
                  <Input 
                    id="employees" 
                    placeholder="e.g. 250" 
                    value={orgData.employees}
                    onChange={handleOrgChange}
                    disabled={!orgEditMode}
                    className={!orgEditMode ? "bg-gray-100" : ""}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="region">Region</Label>
                  <Input 
                    id="region" 
                    placeholder="e.g. North America" 
                    value={orgData.region}
                    onChange={handleOrgChange}
                    disabled={!orgEditMode}
                    className={!orgEditMode ? "bg-gray-100" : ""}
                  />
                </div>
              </div>
              
              <div className="pt-4">
                <Button 
                  onClick={toggleOrgEditMode}
                  disabled={savingOrg}
                >
                  {savingOrg ? 'Saving...' : (orgEditMode ? 'Save Changes' : 'Edit')}
                </Button>
                {orgEditMode && (
                  <Button 
                    variant="outline" 
                    className="ml-2"
                    onClick={() => setOrgEditMode(false)}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Certification Scope</CardTitle>
              <CardDescription>Define the scope of your ISO27001 certification</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="scope">Certification Scope</Label>
                <textarea 
                  id="scope" 
                  className={`w-full min-h-[100px] rounded-md border border-input px-3 py-2 text-sm ring-offset-background ${!orgEditMode ? "bg-gray-100" : "bg-background"}`}
                  placeholder="Describe the scope of your certification..."
                  value={orgData.scope}
                  onChange={handleOrgChange}
                  disabled={!orgEditMode}
                ></textarea>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="locations">Physical Locations</Label>
                <Input 
                  id="locations" 
                  placeholder="e.g. HQ, Remote Offices" 
                  value={orgData.locations}
                  onChange={handleOrgChange}
                  disabled={!orgEditMode}
                  className={!orgEditMode ? "bg-gray-100" : ""}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="services">In-Scope Services/Products</Label>
                <Input 
                  id="services" 
                  placeholder="e.g. Cloud Services, Financial Software" 
                  value={orgData.services}
                  onChange={handleOrgChange}
                  disabled={!orgEditMode}
                  className={!orgEditMode ? "bg-gray-100" : ""}
                />
              </div>
              
              <div className="pt-4">
                <Button 
                  onClick={toggleOrgEditMode}
                  disabled={savingOrg}
                >
                  {savingOrg ? 'Saving...' : (orgEditMode ? 'Save Changes' : 'Edit')}
                </Button>
                {orgEditMode && (
                  <Button 
                    variant="outline" 
                    className="ml-2"
                    onClick={() => setOrgEditMode(false)}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="team" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Team Management</CardTitle>
              <CardDescription>Manage your team members</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground mb-4">
                No team members added yet
              </p>
              <div className="text-center">
                <Button>Invite Team Member</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Document Updates</p>
                  <p className="text-sm text-muted-foreground">Receive notifications when documents are updated</p>
                </div>
                <Switch />
              </div>
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Control Status Changes</p>
                  <p className="text-sm text-muted-foreground">Receive notifications when control statuses change</p>
                </div>
                <Switch />
              </div>
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Team Member Activity</p>
                  <p className="text-sm text-muted-foreground">Receive notifications about team member activities</p>
                </div>
                <Switch />
              </div>
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Approaching Deadlines</p>
                  <p className="text-sm text-muted-foreground">Receive reminders about approaching deadlines</p>
                </div>
                <Switch />
              </div>
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Weekly Summary</p>
                  <p className="text-sm text-muted-foreground">Receive a weekly summary of certification progress</p>
                </div>
                <Switch />
              </div>
              
              <div className="pt-4">
                <Button>Save Notification Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="api" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>API Settings</CardTitle>
              <CardDescription>Manage your API keys and integrations</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                API access allows you to integrate your existing systems with our ISO27001 platform.
              </p>
              
              <div className="space-y-4">
                <div className="bg-muted p-4 rounded-md">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Production API Key</p>
                      <p className="text-sm text-muted-foreground">Created on Feb 12, 2023</p>
                    </div>
                    <Button variant="outline" size="sm">Regenerate</Button>
                  </div>
                  <div className="mt-2 bg-background p-2 rounded border">
                    <p className="font-mono text-sm">••••••••••••••••••••••••••••••</p>
                  </div>
                </div>
                
                <div className="bg-muted p-4 rounded-md">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Development API Key</p>
                      <p className="text-sm text-muted-foreground">Created on Mar 5, 2023</p>
                    </div>
                    <Button variant="outline" size="sm">Regenerate</Button>
                  </div>
                  <div className="mt-2 bg-background p-2 rounded border">
                    <p className="font-mono text-sm">••••••••••••••••••••••••••••••</p>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button>Create New API Key</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 