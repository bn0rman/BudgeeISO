'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Loader2, Save, Building2, ArrowLeft } from 'lucide-react';

import { getOrganizationSettings, updateOrganizationSettings } from '@/services/organizationService';
import { OrganizationSettings } from '@/../../types/database';

export default function OrganizationSettingsPage() {
  const router = useRouter();
  const { user, isLoading: isUserLoading } = useKindeBrowserClient();
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState<Partial<OrganizationSettings>>({
    organization_name: '',
    industry: '',
    employee_count: '',
    address: '',
    contact_person: '',
    phone_number: '',
    scope_statement: '',
    compliance_goals: '',
  });
  
  // Load organization settings when component mounts
  useEffect(() => {
    async function loadSettings() {
      if (!user?.id || isUserLoading) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        const settings = await getOrganizationSettings(user.id);
        if (settings) {
          setFormData(settings);
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
  
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear success message when form is modified
    if (saveSuccess) setSaveSuccess(false);
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!user?.id) {
      setError('User not authenticated');
      return;
    }
    
    setIsSaving(true);
    setError(null);
    setSaveSuccess(false);
    
    try {
      const success = await updateOrganizationSettings({
        ...formData,
        user_id: user.id,
      });
      
      if (success) {
        setSaveSuccess(true);
        // Scroll to top to show success message
        window.scrollTo(0, 0);
      } else {
        setError('Failed to save organization settings');
      }
    } catch (err) {
      console.error('Error saving organization settings:', err);
      setError('An error occurred while saving organization settings');
    } finally {
      setIsSaving(false);
    }
  };
  
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          size="sm" 
          className="gap-1 mr-4"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <h1 className="text-3xl font-bold gradient-text">Organization Settings</h1>
      </div>
      
      {isLoading || isUserLoading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-gray-500 mb-4" />
          <p className="text-gray-500">Loading organization settings...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <Card className="border border-gray-200 shadow-sm">
            <CardHeader>
              <div className="flex items-center mb-2">
                <Building2 className="h-5 w-5 mr-2 text-gray-500" />
                <CardTitle>Organization Information</CardTitle>
              </div>
              <CardDescription>
                Please provide information about your organization for ISO27001 certification
              </CardDescription>
              
              {saveSuccess && (
                <div className="mt-2 bg-green-50 text-green-700 p-3 rounded-md">
                  Organization settings saved successfully
                </div>
              )}
              
              {error && (
                <div className="mt-2 bg-red-50 text-red-600 p-3 rounded-md">
                  {error}
                </div>
              )}
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Basic Information</h3>
                
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="organization_name">Organization Name *</Label>
                    <Input
                      id="organization_name"
                      name="organization_name"
                      value={formData.organization_name || ''}
                      onChange={handleInputChange}
                      placeholder="Your company name"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry</Label>
                    <Input
                      id="industry"
                      name="industry"
                      value={formData.industry || ''}
                      onChange={handleInputChange}
                      placeholder="e.g. Healthcare, Finance, Technology"
                    />
                  </div>
                </div>
                
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="employee_count">Number of Employees</Label>
                    <Input
                      id="employee_count"
                      name="employee_count"
                      value={formData.employee_count || ''}
                      onChange={handleInputChange}
                      placeholder="e.g. 50-100"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address || ''}
                      onChange={handleInputChange}
                      placeholder="Company address"
                    />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Contact Information</h3>
                
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="contact_person">Primary Contact Person</Label>
                    <Input
                      id="contact_person"
                      name="contact_person"
                      value={formData.contact_person || ''}
                      onChange={handleInputChange}
                      placeholder="Primary contact name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone_number">Phone Number</Label>
                    <Input
                      id="phone_number"
                      name="phone_number"
                      value={formData.phone_number || ''}
                      onChange={handleInputChange}
                      placeholder="Contact phone number"
                    />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">ISO27001 Information</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="scope_statement">Information Security Scope Statement</Label>
                  <Textarea
                    id="scope_statement"
                    name="scope_statement"
                    value={formData.scope_statement || ''}
                    onChange={handleInputChange}
                    placeholder="Define the scope of your information security management system (ISMS)"
                    rows={4}
                  />
                  <p className="text-xs text-gray-500">
                    This defines what parts of your organization are covered by your ISO27001 certification
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="compliance_goals">Compliance Goals</Label>
                  <Textarea
                    id="compliance_goals"
                    name="compliance_goals"
                    value={formData.compliance_goals || ''}
                    onChange={handleInputChange}
                    placeholder="What are your organization's goals for ISO27001 compliance?"
                    rows={4}
                  />
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push('/dashboard/settings')}
              >
                Cancel
              </Button>
              
              <Button
                type="submit"
                className="gap-2"
                disabled={isSaving || isLoading}
              >
                {isSaving ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Save Settings
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </form>
      )}
    </div>
  );
} 