import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AuditLogPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Audit Log</h1>
      
      <div className="mb-6">
        <Tabs defaultValue="all" className="w-full">
          <TabsList>
            <TabsTrigger value="all">All Activities</TabsTrigger>
            <TabsTrigger value="documents">Document Changes</TabsTrigger>
            <TabsTrigger value="controls">Control Updates</TabsTrigger>
            <TabsTrigger value="users">User Actions</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Activity Log</CardTitle>
          <CardDescription>Record of compliance activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium">Password Policy updated</p>
                    <p className="text-sm text-muted-foreground">Today at 2:34 PM</p>
                  </div>
                  <Button variant="outline" size="sm">View Details</Button>
                </div>
                <p className="text-sm mt-2">John Doe updated the Password Policy document with new requirements for password complexity.</p>
              </div>
            </div>
            <Separator />
            
            <div className="flex items-start space-x-4">
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium">Asset Inventory completed</p>
                    <p className="text-sm text-muted-foreground">Yesterday at 10:15 AM</p>
                  </div>
                  <Button variant="outline" size="sm">View Details</Button>
                </div>
                <p className="text-sm mt-2">Sarah Johnson completed the Asset Inventory for Q2 2023, identifying 15 new assets.</p>
              </div>
            </div>
            <Separator />
            
            <div className="flex items-start space-x-4">
              <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium">Access review conducted</p>
                    <p className="text-sm text-muted-foreground">Feb 15, 2023</p>
                  </div>
                  <Button variant="outline" size="sm">View Details</Button>
                </div>
                <p className="text-sm mt-2">Michael Smith conducted a quarterly access review, resulting in 5 access revocations.</p>
              </div>
            </div>
            <Separator />
            
            <div className="flex items-start space-x-4">
              <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium">Risk assessment updated</p>
                    <p className="text-sm text-muted-foreground">Feb 10, 2023</p>
                  </div>
                  <Button variant="outline" size="sm">View Details</Button>
                </div>
                <p className="text-sm mt-2">Emily Brown updated the organizational risk assessment, adding 3 new risks related to cloud services.</p>
              </div>
            </div>
            <Separator />
            
            <div className="flex items-start space-x-4">
              <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium">Security incident reported</p>
                    <p className="text-sm text-muted-foreground">Feb 5, 2023</p>
                  </div>
                  <Button variant="outline" size="sm">View Details</Button>
                </div>
                <p className="text-sm mt-2">David Wilson reported a potential phishing attempt. Incident response team was mobilized.</p>
              </div>
            </div>
            <Separator />
            
            <div className="flex items-start space-x-4">
              <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium">Business continuity test conducted</p>
                    <p className="text-sm text-muted-foreground">Jan 28, 2023</p>
                  </div>
                  <Button variant="outline" size="sm">View Details</Button>
                </div>
                <p className="text-sm mt-2">IT team conducted a scheduled business continuity test with successful recovery of critical systems.</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-center">
            <Button variant="outline">Load More</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 