'use client';

import { useEffect, useState } from 'react';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
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
import { Loader2 } from 'lucide-react';

import { getUserOrganization, saveOrganizationSettings } from '@/services/organizationService';
import { OrganizationSettings } from '@/../../types/database';

export default function SettingsPage() {
  const { user, isLoading: isUserLoading } = useKindeBrowserClient();
  const [orgSettings, setOrgSettings] = useState<Partial<OrganizationSettings>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load organization settings when user is available
  useEffect(() => {
    async function loadSettings() {
      if (!user?.id || isUserLoading) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        const settings = await getUserOrganization(user.id);
        if (settings) {
          setOrgSettings(settings);
        }
      } catch (err) {
        console.error('Error loading organization settings:', err);
        setError('Failed to load organization settings');
      } finally {
        setIsLoading(false);
      }
    }
    
    loadSettings();
  }, [user?.id, isUserLoading]);

  // Update organization settings in state
  const handleOrgSettingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    
    setOrgSettings(prev => ({
      ...prev,
      [id]: value
    }));
  };

  // Save organization settings to database
  const handleSaveOrg = async () => {
    if (!user?.id) return;
    
    setIsSaving(true);
    setSaveSuccess(false);
    setError(null);
    
    try {
      // Convert employees to number if it exists
      const employeesNum = orgSettings.employees 
        ? parseInt(orgSettings.employees.toString()) 
        : undefined;
      
      const success = await saveOrganizationSettings({
        user_id: user.id,
        name: orgSettings.name,
        industry: orgSettings.industry,
        employees: employeesNum,
        region: orgSettings.region
      });
      
      if (success) {
        setSaveSuccess(true);
        
        // Reset success message after 3 seconds
        setTimeout(() => {
          setSaveSuccess(false);
        }, 3000);
      } else {
        setError('Failed to save organization settings');
      }
    } catch (err) {
      console.error('Error saving organization settings:', err);
      setError('Failed to save organization settings');
    } finally {
      setIsSaving(false);
    }
  };

  // Profile data from Kinde user object
  const profileData = {
    firstName: user?.given_name || '',
    lastName: user?.family_name || '',
    email: user?.email || '',
    picture: user?.picture || ''
  };

  if (isUserLoading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[300px]">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

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
          <Card>
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
              <CardDescription>Your profile is managed by Kinde</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First name</Label>
                  <Input id="firstName" value={profileData.firstName} disabled />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last name</Label>
                  <Input id="lastName" value={profileData.lastName} disabled />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={profileData.email} disabled />
              </div>
              
              <div className="pt-4">
                <p className="text-sm text-muted-foreground">
                  Your profile information is managed by your authentication provider.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="organization" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Organization Settings</CardTitle>
              <CardDescription>Manage your organization&apos;s information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {isLoading ? (
                <div className="flex justify-center p-4">
                  <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
                </div>
              ) : (
                <>
                  {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4">
                      {error}
                    </div>
                  )}
                  
                  {saveSuccess && (
                    <div className="bg-green-50 text-green-600 p-3 rounded-md mb-4">
                      Organization settings saved successfully!
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <Label htmlFor="name">Organization Name</Label>
                    <Input 
                      id="name" 
                      placeholder="Enter your organization name" 
                      value={orgSettings.name || ''}
                      onChange={handleOrgSettingChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry</Label>
                    <Input 
                      id="industry" 
                      placeholder="Enter your industry" 
                      value={orgSettings.industry || ''}
                      onChange={handleOrgSettingChange}
                    />
                  </div>
                  
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="employees">Number of Employees</Label>
                      <Input 
                        id="employees" 
                        placeholder="e.g. 250" 
                        type="number"
                        value={orgSettings.employees || ''}
                        onChange={handleOrgSettingChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="region">Region</Label>
                      <Input 
                        id="region" 
                        placeholder="e.g. North America" 
                        value={orgSettings.region || ''}
                        onChange={handleOrgSettingChange}
                      />
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button 
                      onClick={handleSaveOrg} 
                      disabled={isSaving}
                    >
                      {isSaving ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : 'Save Organization'}
                    </Button>
                  </div>
                </>
              )}
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
                  className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                  placeholder="Describe the scope of your certification..."
                ></textarea>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="locations">Physical Locations</Label>
                <Input id="locations" placeholder="e.g. HQ, Remote Offices" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="services">In-Scope Services/Products</Label>
                <Input id="services" placeholder="e.g. Cloud Services, Financial Software" />
              </div>
              
              <div className="pt-4">
                <Button>Save Scope</Button>
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
                      <p className="text-sm text-muted-foreground">Not generated yet</p>
                    </div>
                    <Button variant="outline" size="sm">Generate</Button>
                  </div>
                </div>
                
                <div className="bg-muted p-4 rounded-md">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Development API Key</p>
                      <p className="text-sm text-muted-foreground">Not generated yet</p>
                    </div>
                    <Button variant="outline" size="sm">Generate</Button>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-2">Available Integrations</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Connect your ISO27001 project with other tools.
                </p>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="border rounded-md p-4">
                    <p className="font-medium">Slack</p>
                    <p className="text-sm text-muted-foreground mb-3">Get notifications in your Slack channels</p>
                    <Button variant="outline" size="sm">Connect</Button>
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <p className="font-medium">Microsoft Teams</p>
                    <p className="text-sm text-muted-foreground mb-3">Send updates to Microsoft Teams</p>
                    <Button variant="outline" size="sm">Connect</Button>
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <p className="font-medium">JIRA</p>
                    <p className="text-sm text-muted-foreground mb-3">Create tickets from compliance tasks</p>
                    <Button variant="outline" size="sm">Connect</Button>
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <p className="font-medium">Google Workspace</p>
                    <p className="text-sm text-muted-foreground mb-3">Sync with Google Drive documents</p>
                    <Button variant="outline" size="sm">Connect</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 