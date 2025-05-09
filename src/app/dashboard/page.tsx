'use client';

import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { 
  UploadCloud, 
  CalendarClock, 
  SearchCheck, 
  FileText,
  ShieldCheck,
  FileEdit,
  FileCheck,
  CalendarDays,
  Check,
  AlertTriangle,
  Loader2
} from "lucide-react";
import { useEffect, useState } from "react";
import { getUserByKindeId, getOrganizationDocuments, getOrganizationControls } from "@/lib/database-queries";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Link from "next/link";

// Calculate progress percentage
const calculateProgress = (completed: number, total: number) => {
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
};

export default function Dashboard() {
  const { user } = useKindeBrowserClient();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<any>(null);
  const [documents, setDocuments] = useState<any[]>([]);
  const [controls, setControls] = useState<any[]>([]);
  const [organizationId, setOrganizationId] = useState<string | null>(null);

  // Get current date for display
  const currentDate = new Date();
  const formattedDate = new Intl.DateTimeFormat('en-US', { 
    month: 'long',
    year: 'numeric'
  }).format(currentDate);

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

  // Fetch documents and controls once we have the organizationId
  useEffect(() => {
    const fetchData = async () => {
      if (!organizationId) return;
      
      setLoading(true);
      try {
        // Fetch documents and controls in parallel
        const [documentsData, controlsData] = await Promise.all([
          getOrganizationDocuments(organizationId),
          getOrganizationControls(organizationId)
        ]);
        
        setDocuments(documentsData || []);
        setControls(controlsData || []);
      } catch (error) {
        console.error("Error fetching organization data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [organizationId]);

  // Calculate metrics
  const totalControls = controls.length;
  const completedControls = controls.filter(c => c.status === 'implemented').length;
  const inProgressControls = controls.filter(c => c.status === 'in-progress').length;
  const pendingDocuments = documents.filter(d => d.status === 'draft' || d.status === 'pending').length;
  const certificationProgress = calculateProgress(completedControls, totalControls);

  // Group controls by category (using control_number prefix)
  const controlCategories = controls.reduce((acc: Record<string, { total: number, completed: number }>, control) => {
    // Extract category from control number (e.g., "A.5.1.1" → "A.5")
    const category = control.control_number.split('.').slice(0, 2).join('.');
    
    if (!acc[category]) {
      acc[category] = { total: 0, completed: 0 };
    }
    
    acc[category].total += 1;
    if (control.status === 'implemented') {
      acc[category].completed += 1;
    }
    
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
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 animate-fade-in">
        <h1 className="text-3xl font-bold mb-2 md:mb-0 gradient-text">ISO27001 Dashboard</h1>
        
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" className="rounded-md flex items-center gap-1.5 transition-all hover:bg-gray-100">
            <CalendarDays className="h-4 w-4" />
            {formattedDate}
          </Button>
          
          <Button variant="outline" size="sm" className="rounded-md flex items-center gap-1.5 transition-all hover:bg-gray-100">
            <FileCheck className="h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>
      
      {/* Quick Actions - Wrapped in Card */}
      <Card className="mb-8 border border-gray-200 shadow-sm hover-lift animate-on-scroll">
        <CardHeader className="pb-2">
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks to help you get started</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button className="transition-all bg-black hover:bg-gray-900 flex items-center gap-2" asChild>
              <Link href="/dashboard/documents">
                <UploadCloud className="h-4 w-4" />
                Upload Document
              </Link>
            </Button>
            <Button className="transition-all bg-black hover:bg-gray-900 flex items-center gap-2">
              <CalendarClock className="h-4 w-4" />
              Schedule Meeting
            </Button>
            <Button className="transition-all bg-black hover:bg-gray-900 flex items-center gap-2">
              <SearchCheck className="h-4 w-4" />
              Run Gap Analysis
            </Button>
            <Button className="transition-all bg-black hover:bg-gray-900 flex items-center gap-2" asChild>
              <Link href="/dashboard/controls">
                <FileText className="h-4 w-4" />
                View ISO Requirements
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {/* Stats Cards */}
        <Card className="border border-gray-200 shadow-sm hover-lift animate-on-scroll">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Certification Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{certificationProgress}%</div>
            <div className="mt-2">
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-orange-500 rounded-full" 
                  style={{ width: `${certificationProgress}%` }}
                ></div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2 flex items-center">
              <span className="inline-block mr-1 text-green-500">↑</span>
              Updated based on control implementation
            </p>
          </CardContent>
        </Card>
        
        <Card className="border border-gray-200 shadow-sm hover-lift animate-on-scroll stagger-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Completed Controls</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{completedControls}/{totalControls}</div>
            <p className="text-xs text-muted-foreground mt-2 flex items-center">
              <span className="inline-block mr-1 text-green-500">↑</span>
              {inProgressControls} in progress
            </p>
          </CardContent>
        </Card>
        
        <Card className="border border-gray-200 shadow-sm hover-lift animate-on-scroll stagger-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Pending Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{pendingDocuments}</div>
            <p className="text-xs text-muted-foreground mt-2 flex items-center">
              <span className="inline-block mr-1 text-amber-500">!</span>
              {pendingDocuments > 0 ? 'Requires attention' : 'All documents complete'}
            </p>
          </CardContent>
        </Card>
        
        <Card className="border border-gray-200 shadow-sm hover-lift animate-on-scroll stagger-3">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Est. Certification</CardTitle>
          </CardHeader>
          <CardContent>
            {certificationProgress < 80 ? (
              <>
                <div className="text-3xl font-bold">{Math.ceil((100 - certificationProgress) / 20)} mo</div>
                <p className="text-xs text-muted-foreground mt-2">
                  Based on current progress
                </p>
              </>
            ) : (
              <>
                <div className="text-3xl font-bold">Ready</div>
                <p className="text-xs text-muted-foreground mt-2">
                  Schedule your audit
                </p>
              </>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* Main Dashboard Content */}
      <div className="grid gap-8">
        {/* Activity Tabs (Full Width) */}
        <div className="animate-on-scroll">
          <Tabs defaultValue="controls" className="w-full">
            <TabsList className="bg-gray-100 p-1 mb-6">
              <TabsTrigger value="controls" className="transition-all data-[state=active]:bg-black data-[state=active]:text-white">Controls</TabsTrigger>
              <TabsTrigger value="documents" className="transition-all data-[state=active]:bg-black data-[state=active]:text-white">Documents</TabsTrigger>
              <TabsTrigger value="audit-log" className="transition-all data-[state=active]:bg-black data-[state=active]:text-white">Audit Log</TabsTrigger>
              <TabsTrigger value="timeline" className="transition-all data-[state=active]:bg-black data-[state=active]:text-white">Timeline</TabsTrigger>
            </TabsList>
            
            <TabsContent value="controls" className="space-y-4">
              <Card className="border border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle>ISO27001 Controls Progress</CardTitle>
                  <CardDescription>Track progress across control categories</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {Object.entries(controlCategories).map(([category, { total, completed }]) => {
                      const percentage = calculateProgress(completed, total);
                      return (
                        <div key={category}>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">{category} Controls</span>
                            <span className="text-sm font-medium">{percentage}%</span>
                          </div>
                          <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-orange-500 rounded-full" 
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}

                    {Object.keys(controlCategories).length === 0 && (
                      <p className="text-center text-muted-foreground py-6">
                        No controls data available. Start implementing controls to track progress.
                      </p>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full transition-all hover:bg-gray-100 gap-2" asChild>
                    <Link href="/dashboard/controls">
                      <ShieldCheck className="h-4 w-4" />
                      View All Controls
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="documents" className="space-y-4">
              <Card className="border border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle>Required Documents</CardTitle>
                  <CardDescription>Documents needed for ISO27001 compliance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {documents.length > 0 ? (
                      documents.slice(0, 5).map(doc => {
                        let statusColor = 'bg-gray-50 hover:bg-gray-100';
                        let dotColor = 'bg-gray-300';
                        let badgeVariant: 'outline' | 'destructive' | 'secondary' = 'outline';
                        let badgeClass = '';
                        
                        switch (doc.status) {
                          case 'draft':
                            statusColor = 'bg-amber-50 hover:bg-amber-100';
                            dotColor = 'bg-amber-500';
                            badgeVariant = 'secondary';
                            badgeClass = 'bg-amber-100 text-amber-700 hover:bg-amber-200';
                            break;
                          case 'pending':
                            statusColor = 'bg-red-50 hover:bg-red-100';
                            dotColor = 'bg-red-500';
                            badgeVariant = 'destructive';
                            badgeClass = 'bg-red-500';
                            break;
                          case 'approved':
                            statusColor = 'bg-green-50 hover:bg-green-100';
                            dotColor = 'bg-green-500';
                            badgeClass = 'border-green-200 text-green-700 bg-green-50';
                            break;
                        }
                        
                        return (
                          <div 
                            key={doc.id}
                            className={`flex items-center p-3 rounded-lg transition-all ${statusColor}`}
                          >
                            <div className={`w-2 h-2 rounded-full ${dotColor} mr-3`}></div>
                            <div className="flex-1">
                              <p className="text-sm font-medium">{doc.title}</p>
                              <p className="text-xs text-muted-foreground">
                                {doc.status === 'approved' ? 'Completed' : 
                                 doc.status === 'draft' ? 'In progress' : 'Required'}
                              </p>
                            </div>
                            <Badge 
                              variant={badgeVariant} 
                              className={badgeClass}
                            >
                              {doc.status === 'approved' ? 'Completed' : 
                               doc.status === 'draft' ? 'In Progress' : 'Required'}
                            </Badge>
                          </div>
                        );
                      })
                    ) : (
                      <p className="text-center text-muted-foreground py-6">
                        No documents available. Create your first document to get started.
                      </p>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full transition-all hover:bg-gray-100 gap-2" asChild>
                    <Link href="/dashboard/documents">
                      <FileEdit className="h-4 w-4" />
                      Manage Documents
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="audit-log" className="space-y-4">
              <Card className="border border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Recent actions and changes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-center text-muted-foreground py-6">
                      Audit logs will be available as you start using the system.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="timeline" className="space-y-4">
              <Card className="border border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle>Certification Timeline</CardTitle>
                  <CardDescription>Key milestones for your ISO27001 journey</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-0">
                    <div className="relative pl-8 pb-8 pt-2">
                      <div className="absolute left-0 top-2 h-full w-px bg-gray-200"></div>
                      <div className="absolute left-0 top-2 h-4 w-4 rounded-full bg-black -ml-2"></div>
                      <div>
                        <h4 className="text-sm font-bold">Project Kickoff</h4>
                        <p className="text-xs text-muted-foreground">{new Date().toLocaleDateString()}</p>
                        <p className="text-sm mt-1">Started ISO27001 compliance journey</p>
                      </div>
                    </div>
                    
                    <div className="relative pl-8 pb-8 pt-2">
                      <div className="absolute left-0 top-2 h-full w-px bg-gray-200"></div>
                      <div className="absolute left-0 top-2 h-4 w-4 rounded-full bg-black -ml-2"></div>
                      <div>
                        <h4 className="text-sm font-bold">Gap Analysis</h4>
                        <p className="text-xs text-muted-foreground">Current Phase</p>
                        <p className="text-sm mt-1">Identify key areas for improvement</p>
                      </div>
                    </div>
                    
                    <div className="relative pl-8 pb-8 pt-2">
                      <div className="absolute left-0 top-2 h-full w-px bg-gray-200 opacity-50"></div>
                      <div className="absolute left-0 top-2 h-4 w-4 rounded-full bg-gray-300 -ml-2"></div>
                      <div className="opacity-60">
                        <h4 className="text-sm font-bold">Documentation Phase</h4>
                        <p className="text-xs text-muted-foreground">Next Phase</p>
                        <p className="text-sm mt-1">Develop required policies and procedures</p>
                      </div>
                    </div>
                    
                    <div className="relative pl-8 pb-8 pt-2">
                      <div className="absolute left-0 top-2 h-full w-px bg-gray-200 opacity-50"></div>
                      <div className="absolute left-0 top-2 h-4 w-4 rounded-full bg-gray-300 -ml-2"></div>
                      <div className="opacity-60">
                        <h4 className="text-sm font-bold">Internal Audit</h4>
                        <p className="text-xs text-muted-foreground">Estimated: 3 months from now</p>
                        <p className="text-sm mt-1">Verify implementation of controls</p>
                      </div>
                    </div>
                    
                    <div className="relative pl-8 pt-2">
                      <div className="absolute left-0 top-2 h-4 w-4 rounded-full bg-gray-300 -ml-2"></div>
                      <div className="opacity-60">
                        <h4 className="text-sm font-bold">Certification Audit</h4>
                        <p className="text-xs text-muted-foreground">Estimated: 6 months from now</p>
                        <p className="text-sm mt-1">External auditor assessment</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
