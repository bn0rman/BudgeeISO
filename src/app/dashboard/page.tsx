'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
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
  Loader2,
  RefreshCcw 
} from "lucide-react";

// Import data services
import { getControlStatistics, getControlsByCategory } from '@/services/controlsService';
import { getDocumentStatistics, getUserDocuments } from '@/services/documentsService';
import { getEstimatedCertificationTime } from '@/services/timelineService';
import { getUserTimeline } from '@/services/timelineService';

// Import types
import { IsoControl, Document, CertificationTimeline } from '@/../../types/database';

export default function Dashboard() {
  const { user, isLoading: isUserLoading } = useKindeBrowserClient();
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [isDataFetched, setIsDataFetched] = useState(false);
  
  // Prevent multiple data fetch requests
  const hasLoadedData = useRef(false);

  // State for real data
  const [controlStats, setControlStats] = useState<{
    completed: number;
    inProgress: number;
    notStarted: number;
    total: number;
    overallProgress: number;
  }>({
    completed: 0,
    inProgress: 0,
    notStarted: 0,
    total: 0,
    overallProgress: 0
  });
  
  const [controlsByCategory, setControlsByCategory] = useState<Record<string, IsoControl[]>>({});
  const [documents, setDocuments] = useState<Document[]>([]);
  const [documentStats, setDocumentStats] = useState<{
    pending: number;
    inProgress: number;
    completed: number;
    highPriority: number;
    total: number;
  }>({
    pending: 0,
    inProgress: 0,
    completed: 0,
    highPriority: 0,
    total: 0
  });
  
  const [estimatedMonths, setEstimatedMonths] = useState<number>(0);
  const [timeline, setTimeline] = useState<CertificationTimeline[]>([]);
  
  // Date for the current month/year
  const [currentDate] = useState(new Date());
  const formattedDate = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(currentDate);
  
  // Function to load data
  const loadData = async (userId: string) => {
    if (!userId) return;
    
    setIsDataLoading(true);
    setError(null);
    
    try {
      // Load all data in parallel
      const [
        controlStatsData,
        controlsByCategoryData,
        documentStatsData,
        documentsData,
        estimatedMonthsData,
        timelineData
      ] = await Promise.all([
        getControlStatistics(userId),
        getControlsByCategory(userId),
        getDocumentStatistics(userId),
        getUserDocuments(userId),
        getEstimatedCertificationTime(userId),
        getUserTimeline(userId)
      ]);
      
      setControlStats(controlStatsData);
      setControlsByCategory(controlsByCategoryData);
      setDocumentStats(documentStatsData);
      setDocuments(documentsData);
      setEstimatedMonths(estimatedMonthsData);
      setTimeline(timelineData);
      setIsDataFetched(true);
      hasLoadedData.current = true;
    } catch (err) {
      console.error('Error loading dashboard data:', err);
      setError('Failed to load dashboard data. Please try again later.');
      hasLoadedData.current = false;
    } finally {
      setIsDataLoading(false);
    }
  };
  
  // Handle manual refresh
  const handleRefresh = () => {
    if (user?.id) {
      hasLoadedData.current = false;
      setRetryCount(prev => prev + 1);
      loadData(user.id);
    }
  };
  
  // Load data when user is available
  useEffect(() => {
    // Skip if user not ready yet
    if (isUserLoading) return;
    
    if (!user?.id) {
      setIsDataLoading(false);
      return;
    }
    
    // Skip if already loaded or currently loading
    if (hasLoadedData.current || (isDataLoading && retryCount === 0)) return;
    
    const timeoutId = setTimeout(() => {
      loadData(user.id);
    }, 100); // Small delay to help with race conditions
    
    // Cleanup function to handle component unmounting or effect re-running
    return () => {
      clearTimeout(timeoutId);
    };
  }, [user?.id, isUserLoading, retryCount]);
  
  // Show loading state
  if (isUserLoading || isDataLoading) {
    return (
      <div className="p-6 flex flex-col items-center justify-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500 mb-4" />
        <p className="text-gray-500">Loading your ISO27001 dashboard...</p>
      </div>
    );
  }
  
  // Show error message
  if (error) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 gradient-text">ISO27001 Dashboard</h1>
        <Card className="border border-red-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-red-600 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Error Loading Dashboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>{error}</p>
            <Button 
              className="mt-4" 
              onClick={handleRefresh}
            >
              <RefreshCcw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  // Show empty state if we don't have data yet
  if (!isDataFetched && !isDataLoading) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 gradient-text">ISO27001 Dashboard</h1>
        <Card className="border border-orange-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-orange-600 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Dashboard Data Not Available
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>The dashboard data is still initializing. Please click the button below to refresh and see your dashboard.</p>
            <Button 
              className="mt-4" 
              onClick={handleRefresh}
            >
              <RefreshCcw className="mr-2 h-4 w-4" />
              Refresh Dashboard
            </Button>
          </CardContent>
        </Card>
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
          
          <Button 
            variant="outline" 
            size="sm" 
            className="rounded-md flex items-center gap-1.5 transition-all hover:bg-gray-100"
            onClick={handleRefresh}
          >
            <RefreshCcw className="h-4 w-4" />
            Refresh
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
            <Button className="transition-all bg-black hover:bg-gray-900 flex items-center gap-2">
              <UploadCloud className="h-4 w-4" />
              Upload Document
            </Button>
            <Button className="transition-all bg-black hover:bg-gray-900 flex items-center gap-2">
              <CalendarClock className="h-4 w-4" />
              Schedule Meeting
            </Button>
            <Button className="transition-all bg-black hover:bg-gray-900 flex items-center gap-2">
              <SearchCheck className="h-4 w-4" />
              Run Gap Analysis
            </Button>
            <Button className="transition-all bg-black hover:bg-gray-900 flex items-center gap-2">
              <FileText className="h-4 w-4" />
              View ISO Requirements
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
            <div className="text-3xl font-bold">{controlStats.overallProgress}%</div>
            <div className="mt-2">
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-orange-500 rounded-full" 
                  style={{ width: `${controlStats.overallProgress}%` }}
                ></div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2 flex items-center">
              <span className="inline-block mr-1 text-green-500">↑</span>
              Updated based on your progress
            </p>
          </CardContent>
        </Card>
        
        <Card className="border border-gray-200 shadow-sm hover-lift animate-on-scroll stagger-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Completed Controls</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{controlStats.completed}/{controlStats.total}</div>
            <p className="text-xs text-muted-foreground mt-2 flex items-center">
              <span className="inline-block mr-1 text-green-500">↑</span>
              {controlStats.inProgress} in progress
            </p>
          </CardContent>
        </Card>
        
        <Card className="border border-gray-200 shadow-sm hover-lift animate-on-scroll stagger-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Pending Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{documentStats.pending}</div>
            <p className="text-xs text-muted-foreground mt-2 flex items-center">
              <span className="inline-block mr-1 text-amber-500">!</span>
              {documentStats.highPriority} require immediate attention
            </p>
          </CardContent>
        </Card>
        
        <Card className="border border-gray-200 shadow-sm hover-lift animate-on-scroll stagger-3">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Est. Certification</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{estimatedMonths} mo</div>
            <p className="text-xs text-muted-foreground mt-2">
              Based on current progress
            </p>
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
                    {Object.entries(controlsByCategory).map(([category, controls]) => {
                      if (controls.length === 0) return null;
                      
                      // Calculate average progress for this category
                      const categoryProgress = Math.round(
                        controls.reduce((sum, control) => sum + control.progress, 0) / controls.length
                      );
                      
                      return (
                        <div key={category}>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">{category} {controls[0]?.name.split(' ')[0]}</span>
                            <span className="text-sm font-medium">{categoryProgress}%</span>
                          </div>
                          <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-orange-500 rounded-full" 
                              style={{ width: `${categoryProgress}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full transition-all hover:bg-gray-100 gap-2">
                    <ShieldCheck className="h-4 w-4" />
                    View All Controls
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
                    {documents.map(doc => {
                      let bgColor = 'bg-gray-50';
                      let dotColor = 'bg-gray-300';
                      let hoverColor = 'hover:bg-gray-100';
                      let badgeVariant = 'outline';
                      let badgeText = 'Pending';
                      let badgeClassName = '';
                      
                      if (doc.status === 'completed') {
                        bgColor = 'bg-green-50';
                        dotColor = 'bg-green-500';
                        hoverColor = 'hover:bg-green-100';
                        badgeVariant = 'outline';
                        badgeText = 'Completed';
                        badgeClassName = 'border-green-200 text-green-700 bg-green-50';
                      } else if (doc.priority === 'high') {
                        bgColor = 'bg-red-50';
                        dotColor = 'bg-red-500';
                        hoverColor = 'hover:bg-red-100';
                        badgeVariant = 'destructive';
                        badgeText = 'Required';
                        badgeClassName = 'bg-red-500';
                      } else if (doc.status === 'in_progress') {
                        bgColor = 'bg-amber-50';
                        dotColor = 'bg-amber-500';
                        hoverColor = 'hover:bg-amber-100';
                        badgeVariant = 'outline';
                        badgeText = 'In Progress';
                        badgeClassName = 'border-amber-200 text-amber-700 bg-amber-50';
                      }
                      
                      return (
                        <div 
                          key={doc.id} 
                          className={`flex items-center p-3 ${bgColor} rounded-lg transition-all ${hoverColor}`}
                        >
                          <div className={`w-2 h-2 rounded-full ${dotColor} mr-3`}></div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">{doc.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {doc.priority === 'high' && 'High priority'}
                              {doc.priority === 'medium' && 'Medium priority'}
                              {doc.priority === 'low' && 'Low priority'}
                              {doc.status === 'completed' && ' - Completed'}
                              {doc.status === 'in_progress' && ' - In progress'}
                            </p>
                          </div>
                          <Badge variant={badgeVariant as any} className={badgeClassName}>
                            {badgeText}
                          </Badge>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full transition-all hover:bg-gray-100 gap-2">
                    <FileEdit className="h-4 w-4" />
                    Manage Documents
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="audit-log" className="space-y-4">
              <Card className="border border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Recent actions and changes to your ISO27001 project</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-4">
                      <p className="text-center text-sm text-muted-foreground">Audit log will appear here as you make changes to your ISO27001 compliance project.</p>
                    </div>
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
                    {timeline.map((milestone, index) => {
                      // Style based on status
                      const isCompleted = milestone.status === 'completed';
                      const isActive = milestone.status === 'current';
                      const isPending = milestone.status === 'pending';
                      
                      const lineStyles = isCompleted ? 'bg-black' : isPending ? 'bg-gray-200 opacity-50' : 'bg-black';
                      const dotStyles = isCompleted ? 'bg-black' : isPending ? 'bg-gray-300' : 'bg-black';
                      const contentStyles = isPending ? 'opacity-60' : '';
                      
                      // Format the date if it exists
                      const formattedDate = milestone.milestone_date 
                        ? new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
                            .format(new Date(milestone.milestone_date))
                        : '';
                      
                      return (
                        <div 
                          key={milestone.id} 
                          className="relative pl-8 pb-8 pt-2"
                        >
                          {index < timeline.length - 1 && (
                            <div className={`absolute left-0 top-2 h-full w-px ${lineStyles}`}></div>
                          )}
                          <div className={`absolute left-0 top-2 h-4 w-4 rounded-full ${dotStyles} -ml-2`}></div>
                          <div className={contentStyles}>
                            <h4 className="text-sm font-bold">{milestone.milestone_name}</h4>
                            <p className="text-xs text-muted-foreground">
                              {isActive ? 'Current Phase' : formattedDate}
                            </p>
                            <p className="text-sm mt-1">{milestone.description}</p>
                          </div>
                        </div>
                      );
                    })}
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
