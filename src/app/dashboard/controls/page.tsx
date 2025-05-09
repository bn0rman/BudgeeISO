'use client';

import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { getUserByKindeId, getOrganizationControls } from "@/lib/database-queries";
import { Loader2, ShieldCheck, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Calculate progress percentage
const calculateProgress = (completed: number, total: number) => {
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
};

export default function ControlsPage() {
  const { user } = useKindeBrowserClient();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<any>(null);
  const [controls, setControls] = useState<any[]>([]);
  const [organizationId, setOrganizationId] = useState<string | null>(null);

  // Fetch user data from Supabase
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user?.id) return;
      
      try {
        const userData = await getUserByKindeId(user.id);
        setUserData(userData);
        
        // If user belongs to an organization, set the organizationId
        if (userData?.organizations?.length > 0) {
          setOrganizationId(userData.organizations[0].id);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [user?.id]);

  // Fetch controls once we have the organizationId
  useEffect(() => {
    const fetchControls = async () => {
      if (!organizationId) return;
      
      setLoading(true);
      try {
        const controlsData = await getOrganizationControls(organizationId);
        setControls(controlsData || []);
      } catch (error) {
        console.error("Error fetching controls:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchControls();
  }, [organizationId]);

  // Calculate metrics
  const totalControls = controls.length;
  const completedControls = controls.filter(c => c.status === 'implemented').length;
  const inProgressControls = controls.filter(c => c.status === 'in-progress').length;
  const notStartedControls = controls.filter(c => c.status === 'not-implemented').length;
  const certificationProgress = calculateProgress(completedControls, totalControls);

  // Group controls by category (using control_number prefix)
  const controlsByCategory = controls.reduce((acc: Record<string, any[]>, control) => {
    // Extract category from control number (e.g., "A.5.1.1" → "A.5")
    const category = control.control_number.split('.').slice(0, 2).join('.');
    
    if (!acc[category]) {
      acc[category] = [];
    }
    
    acc[category].push(control);
    return acc;
  }, {});

  // Return loading state while data is being fetched
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-orange-500" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 animate-fade-in gradient-text">ISO27001 Controls</h1>
      
      <Card className="mb-6 animate-on-scroll">
        <CardHeader>
          <CardTitle>Controls Overview</CardTitle>
          <CardDescription>Track and manage your ISO27001 controls</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2 text-center">
              <div className="text-3xl font-bold">{completedControls}</div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </div>
            <div className="space-y-2 text-center">
              <div className="text-3xl font-bold">{inProgressControls}</div>
              <div className="text-sm text-muted-foreground">In Progress</div>
            </div>
            <div className="space-y-2 text-center">
              <div className="text-3xl font-bold">{notStartedControls}</div>
              <div className="text-sm text-muted-foreground">Not Started</div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid gap-6 md:grid-cols-2 animate-on-scroll stagger-1">
        <Card>
          <CardHeader>
            <CardTitle>Certification Progress</CardTitle>
            <CardDescription>Overall completion of ISO27001 controls</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Overall Progress</span>
                <span className="text-sm font-medium">{certificationProgress}%</span>
              </div>
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-orange-500 rounded-full" 
                  style={{ width: `${certificationProgress}%` }}
                ></div>
              </div>
            </div>
            {totalControls > 0 ? (
              <p className="text-sm text-muted-foreground">
                {completedControls} of {totalControls} controls implemented
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">
                No controls have been added yet
              </p>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Controls by Status</CardTitle>
            <CardDescription>Distribution of control implementation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm">Implemented</span>
                </div>
                <div className="text-sm font-medium">{completedControls}</div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-orange-500 mr-2"></div>
                  <span className="text-sm">In Progress</span>
                </div>
                <div className="text-sm font-medium">{inProgressControls}</div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-gray-300 mr-2"></div>
                  <span className="text-sm">Not Implemented</span>
                </div>
                <div className="text-sm font-medium">{notStartedControls}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <h2 className="text-xl font-bold mt-8 mb-4 animate-on-scroll stagger-2">Controls by Category</h2>
      
      <div className="space-y-6 animate-on-scroll stagger-3">
        {Object.entries(controlsByCategory).length > 0 ? (
          Object.entries(controlsByCategory).map(([category, categoryControls]) => {
            const categoryCompletedControls = categoryControls.filter(c => c.status === 'implemented').length;
            const categoryProgress = calculateProgress(categoryCompletedControls, categoryControls.length);
            
            return (
              <Card key={category} className="hover-lift">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">{category} Controls</CardTitle>
                    <Badge variant="outline" className="bg-orange-50 text-orange-800">
                      {categoryCompletedControls}/{categoryControls.length} Completed
                    </Badge>
                  </div>
                  <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden mt-2">
                    <div 
                      className="h-full bg-orange-500 rounded-full" 
                      style={{ width: `${categoryProgress}%` }}
                    ></div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {categoryControls.map(control => (
                      <div key={control.id} className="flex items-start space-x-3">
                        {control.status === 'implemented' ? (
                          <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        ) : control.status === 'in-progress' ? (
                          <AlertTriangle className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
                        ) : (
                          <ShieldCheck className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                        )}
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h3 className="text-sm font-medium">
                              {control.control_number} - {control.name}
                            </h3>
                            <Badge 
                              variant={
                                control.status === 'implemented' ? 'outline' : 
                                control.status === 'in-progress' ? 'secondary' : 'outline'
                              }
                              className={
                                control.status === 'implemented' ? 'border-green-200 text-green-700 bg-green-50' : 
                                control.status === 'in-progress' ? 'bg-orange-100 text-orange-700' : 
                                'text-gray-500'
                              }
                            >
                              {control.status === 'implemented' ? 'Implemented' : 
                               control.status === 'in-progress' ? 'In Progress' : 
                               'Not Implemented'}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {control.description || 'No description provided'}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })
        ) : (
          <div className="text-center py-12">
            <ShieldCheck className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No Controls Found</h3>
            <p className="text-muted-foreground mb-6">
              Start implementing ISO27001 controls to track your progress
            </p>
            <Button className="btn-orange">Add Control</Button>
          </div>
        )}
      </div>
    </div>
  );
} 