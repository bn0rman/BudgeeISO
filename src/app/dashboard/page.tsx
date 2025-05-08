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

export default function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">ISO27001 Dashboard</h1>
      
      {/* Quick Actions - Wrapped in Card */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button>Upload Document</Button>
            <Button>Schedule Meeting</Button>
            <Button>Run Gap Analysis</Button>
            <Button>View ISO Requirements</Button>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Stats Cards */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Certification Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42%</div>
            <div className="mt-2">
              <Progress value={42} className="h-2" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              +8% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Completed Controls</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">38/114</div>
            <p className="text-xs text-muted-foreground">
              +12 this month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14</div>
            <p className="text-xs text-muted-foreground">
              5 require immediate attention
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Est. Certification</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4 mo</div>
            <p className="text-xs text-muted-foreground">
              Based on current progress
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Main Dashboard Content */}
      <div className="grid gap-6 mt-6">
        {/* Activity Tabs (Full Width) */}
        <div className="space-y-6">
          <Tabs defaultValue="controls" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="controls">Controls</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="audit-log">Audit Log</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
            </TabsList>
            <TabsContent value="controls" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>ISO27001 Controls Progress</CardTitle>
                  <CardDescription>Track progress across control categories</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">A.5 Information Security Policies</span>
                        <span className="text-sm font-medium">75%</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">A.6 Organization of Information Security</span>
                        <span className="text-sm font-medium">60%</span>
                      </div>
                      <Progress value={60} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">A.7 Human Resource Security</span>
                        <span className="text-sm font-medium">45%</span>
                      </div>
                      <Progress value={45} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">A.8 Asset Management</span>
                        <span className="text-sm font-medium">35%</span>
                      </div>
                      <Progress value={35} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">A.9 Access Control</span>
                        <span className="text-sm font-medium">20%</span>
                      </div>
                      <Progress value={20} className="h-2" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">View All Controls</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="documents" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Required Documents</CardTitle>
                  <CardDescription>Documents needed for ISO27001 compliance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Information Security Policy</p>
                        <p className="text-xs text-muted-foreground">High priority</p>
                      </div>
                      <Badge variant="destructive">Required</Badge>
                    </div>
                    <Separator />
                    
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Risk Assessment Methodology</p>
                        <p className="text-xs text-muted-foreground">Draft in progress</p>
                      </div>
                      <Badge variant="secondary">In Progress</Badge>
                    </div>
                    <Separator />
                    
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Asset Management Procedure</p>
                        <p className="text-xs text-muted-foreground">Completed last week</p>
                      </div>
                      <Badge variant="outline">Completed</Badge>
                    </div>
                    <Separator />
                    
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-gray-300 mr-2"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Incident Response Plan</p>
                        <p className="text-xs text-muted-foreground">Not started</p>
                      </div>
                      <Badge variant="outline">Pending</Badge>
                    </div>
                    <Separator />
                    
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-gray-300 mr-2"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Business Continuity Plan</p>
                        <p className="text-xs text-muted-foreground">Not started</p>
                      </div>
                      <Badge variant="outline">Pending</Badge>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">View Document Library</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="audit-log" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Audit Log</CardTitle>
                  <CardDescription>Record of compliance activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-4">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Password Policy updated</p>
                        <p className="text-xs text-muted-foreground">Today at 2:34 PM</p>
                      </div>
                    </div>
                    <Separator />
                    
                    <div className="flex items-start space-x-4">
                      <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Asset Inventory completed</p>
                        <p className="text-xs text-muted-foreground">Yesterday at 10:15 AM</p>
                      </div>
                    </div>
                    <Separator />
                    
                    <div className="flex items-start space-x-4">
                      <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Access review conducted</p>
                        <p className="text-xs text-muted-foreground">Feb 15, 2023</p>
                      </div>
                    </div>
                    <Separator />
                    
                    <div className="flex items-start space-x-4">
                      <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Risk assessment updated</p>
                        <p className="text-xs text-muted-foreground">Feb 10, 2023</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">View Complete Log</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            {/* New Timeline Tab */}
            <TabsContent value="timeline" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Certification Timeline</CardTitle>
                  <CardDescription>Your ISO27001 journey</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="mr-4 h-4 w-4 rounded-full bg-green-500 mt-0.5"></div>
                      <div>
                        <p className="text-sm font-medium">Gap Analysis</p>
                        <p className="text-xs text-muted-foreground">Completed Jan 2023</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="mr-4 h-4 w-4 rounded-full bg-green-500 mt-0.5"></div>
                      <div>
                        <p className="text-sm font-medium">ISMS Scope Defined</p>
                        <p className="text-xs text-muted-foreground">Completed Feb 2023</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="mr-4 h-4 w-4 rounded-full bg-yellow-500 mt-0.5"></div>
                      <div>
                        <p className="text-sm font-medium">Documentation</p>
                        <p className="text-xs text-muted-foreground">In progress (42%)</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="mr-4 h-4 w-4 rounded-full bg-gray-300 mt-0.5"></div>
                      <div>
                        <p className="text-sm font-medium">Implementation</p>
                        <p className="text-xs text-muted-foreground">Starting May 2023</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="mr-4 h-4 w-4 rounded-full bg-gray-300 mt-0.5"></div>
                      <div>
                        <p className="text-sm font-medium">Internal Audit</p>
                        <p className="text-xs text-muted-foreground">Scheduled Aug 2023</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="mr-4 h-4 w-4 rounded-full bg-gray-300 mt-0.5"></div>
                      <div>
                        <p className="text-sm font-medium">Certification Audit</p>
                        <p className="text-xs text-muted-foreground">Target Oct 2023</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">View Detailed Plan</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
