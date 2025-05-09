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
  AlertTriangle 
} from "lucide-react";

export default function Dashboard() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 animate-fade-in">
        <h1 className="text-3xl font-bold mb-2 md:mb-0 gradient-text">ISO27001 Dashboard</h1>
        
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" className="rounded-md flex items-center gap-1.5 transition-all hover:bg-gray-100">
            <CalendarDays className="h-4 w-4" />
            July 2023
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
            <div className="text-3xl font-bold">42%</div>
            <div className="mt-2">
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-orange-500 rounded-full" 
                  style={{ width: "42%" }}
                ></div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2 flex items-center">
              <span className="inline-block mr-1 text-green-500">↑</span>
              +8% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card className="border border-gray-200 shadow-sm hover-lift animate-on-scroll stagger-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Completed Controls</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">38/114</div>
            <p className="text-xs text-muted-foreground mt-2 flex items-center">
              <span className="inline-block mr-1 text-green-500">↑</span>
              +12 this month
            </p>
          </CardContent>
        </Card>
        
        <Card className="border border-gray-200 shadow-sm hover-lift animate-on-scroll stagger-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Pending Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">14</div>
            <p className="text-xs text-muted-foreground mt-2 flex items-center">
              <span className="inline-block mr-1 text-amber-500">!</span>
              5 require immediate attention
            </p>
          </CardContent>
        </Card>
        
        <Card className="border border-gray-200 shadow-sm hover-lift animate-on-scroll stagger-3">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Est. Certification</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">4 mo</div>
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
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">A.5 Information Security Policies</span>
                        <span className="text-sm font-medium">75%</span>
                      </div>
                      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-orange-500 rounded-full" 
                          style={{ width: "75%" }}
                        ></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">A.6 Organization of Information Security</span>
                        <span className="text-sm font-medium">60%</span>
                      </div>
                      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-orange-500 rounded-full" 
                          style={{ width: "60%" }}
                        ></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">A.7 Human Resource Security</span>
                        <span className="text-sm font-medium">45%</span>
                      </div>
                      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-orange-500 rounded-full" 
                          style={{ width: "45%" }}
                        ></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">A.8 Asset Management</span>
                        <span className="text-sm font-medium">35%</span>
                      </div>
                      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-orange-500 rounded-full" 
                          style={{ width: "35%" }}
                        ></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">A.9 Access Control</span>
                        <span className="text-sm font-medium">20%</span>
                      </div>
                      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-orange-500 rounded-full" 
                          style={{ width: "20%" }}
                        ></div>
                      </div>
                    </div>
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
                    <div className="flex items-center p-3 bg-red-50 rounded-lg transition-all hover:bg-red-100">
                      <div className="w-2 h-2 rounded-full bg-red-500 mr-3"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Information Security Policy</p>
                        <p className="text-xs text-muted-foreground">High priority</p>
                      </div>
                      <Badge variant="destructive" className="bg-red-500">Required</Badge>
                    </div>
                    
                    <div className="flex items-center p-3 bg-amber-50 rounded-lg transition-all hover:bg-amber-100">
                      <div className="w-2 h-2 rounded-full bg-amber-500 mr-3"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Risk Assessment Methodology</p>
                        <p className="text-xs text-muted-foreground">Draft in progress</p>
                      </div>
                      <Badge variant="secondary" className="bg-amber-100 text-amber-700 hover:bg-amber-200">In Progress</Badge>
                    </div>
                    
                    <div className="flex items-center p-3 bg-green-50 rounded-lg transition-all hover:bg-green-100">
                      <div className="w-2 h-2 rounded-full bg-green-500 mr-3"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Asset Management Procedure</p>
                        <p className="text-xs text-muted-foreground">Completed last week</p>
                      </div>
                      <Badge variant="outline" className="border-green-200 text-green-700 bg-green-50">Completed</Badge>
                    </div>
                    
                    <div className="flex items-center p-3 bg-gray-50 rounded-lg transition-all hover:bg-gray-100">
                      <div className="w-2 h-2 rounded-full bg-gray-300 mr-3"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Incident Response Plan</p>
                        <p className="text-xs text-muted-foreground">Not started</p>
                      </div>
                      <Badge variant="outline">Pending</Badge>
                    </div>
                    
                    <div className="flex items-center p-3 bg-gray-50 rounded-lg transition-all hover:bg-gray-100">
                      <div className="w-2 h-2 rounded-full bg-gray-300 mr-3"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Business Continuity Plan</p>
                        <p className="text-xs text-muted-foreground">Not started</p>
                      </div>
                      <Badge variant="outline">Pending</Badge>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full transition-all hover:bg-gray-100 gap-2">
                    <FileEdit className="h-4 w-4" />
                    View Document Library
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="audit-log" className="space-y-4">
              <Card className="border border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle>Audit Log</CardTitle>
                  <CardDescription>Record of compliance activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-4 p-3 bg-blue-50 rounded-lg transition-all hover:bg-blue-100">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <FileText className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Password Policy updated</p>
                        <p className="text-xs text-muted-foreground">Today at 2:34 PM</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4 p-3 bg-green-50 rounded-lg transition-all hover:bg-green-100">
                      <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <Check className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Asset Inventory completed</p>
                        <p className="text-xs text-muted-foreground">Yesterday at 10:15 AM</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4 p-3 bg-amber-50 rounded-lg transition-all hover:bg-amber-100">
                      <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                        <AlertTriangle className="h-4 w-4 text-amber-600" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Risk assessment overdue</p>
                        <p className="text-xs text-muted-foreground">2 days ago</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4 p-3 bg-gray-50 rounded-lg transition-all hover:bg-gray-100">
                      <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                        <FileText className="h-4 w-4 text-gray-600" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Access Control Policy reviewed</p>
                        <p className="text-xs text-muted-foreground">July 10, 2023</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full transition-all hover:bg-gray-100">
                    View All Activities
                  </Button>
                </CardFooter>
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
                        <p className="text-xs text-muted-foreground">April 15, 2023</p>
                        <p className="text-sm mt-1">Started ISO27001 compliance journey</p>
                      </div>
                    </div>
                    
                    <div className="relative pl-8 pb-8 pt-2">
                      <div className="absolute left-0 top-2 h-full w-px bg-gray-200"></div>
                      <div className="absolute left-0 top-2 h-4 w-4 rounded-full bg-black -ml-2"></div>
                      <div>
                        <h4 className="text-sm font-bold">Gap Analysis Complete</h4>
                        <p className="text-xs text-muted-foreground">May 20, 2023</p>
                        <p className="text-sm mt-1">Identified key areas for improvement</p>
                      </div>
                    </div>
                    
                    <div className="relative pl-8 pb-8 pt-2">
                      <div className="absolute left-0 top-2 h-full w-px bg-gray-200"></div>
                      <div className="absolute left-0 top-2 h-4 w-4 rounded-full bg-black -ml-2"></div>
                      <div>
                        <h4 className="text-sm font-bold">Documentation Phase</h4>
                        <p className="text-xs text-muted-foreground">Current Phase</p>
                        <p className="text-sm mt-1">Developing required policies and procedures</p>
                      </div>
                    </div>
                    
                    <div className="relative pl-8 pb-8 pt-2">
                      <div className="absolute left-0 top-2 h-full w-px bg-gray-200 opacity-50"></div>
                      <div className="absolute left-0 top-2 h-4 w-4 rounded-full bg-gray-300 -ml-2"></div>
                      <div className="opacity-60">
                        <h4 className="text-sm font-bold">Internal Audit</h4>
                        <p className="text-xs text-muted-foreground">Estimated: October 2023</p>
                        <p className="text-sm mt-1">Verify implementation of controls</p>
                      </div>
                    </div>
                    
                    <div className="relative pl-8 pt-2">
                      <div className="absolute left-0 top-2 h-4 w-4 rounded-full bg-gray-300 -ml-2"></div>
                      <div className="opacity-60">
                        <h4 className="text-sm font-bold">Certification Audit</h4>
                        <p className="text-xs text-muted-foreground">Estimated: December 2023</p>
                        <p className="text-sm mt-1">External auditor assessment</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full transition-all hover:bg-gray-100">
                    View Full Timeline
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
