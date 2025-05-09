'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function DocumentsPage() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6 animate-fade-in">
        <h1 className="text-3xl font-bold gradient-text">ISO27001 Documentation</h1>
        <Button className="btn-orange">Upload Document</Button>
      </div>

      <div className="animate-on-scroll">
        <Tabs defaultValue="required" className="w-full">
          <TabsList className="bg-gray-100 p-1 mb-6">
            <TabsTrigger value="required" className="transition-all data-[state=active]:bg-black data-[state=active]:text-white">Required Documents</TabsTrigger>
            <TabsTrigger value="policies" className="transition-all data-[state=active]:bg-black data-[state=active]:text-white">Policies</TabsTrigger>
            <TabsTrigger value="procedures" className="transition-all data-[state=active]:bg-black data-[state=active]:text-white">Procedures</TabsTrigger>
            <TabsTrigger value="records" className="transition-all data-[state=active]:bg-black data-[state=active]:text-white">Records</TabsTrigger>
          </TabsList>

          <TabsContent value="required" className="space-y-4 mt-6">
            <Card className="border border-gray-200 shadow-sm hover-lift">
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
                    <div className="flex gap-2">
                      <Badge variant="destructive">Required</Badge>
                      <Button size="sm" variant="outline">Upload</Button>
                    </div>
                  </div>
                  <Separator />
                  
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mr-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Risk Assessment Methodology</p>
                      <p className="text-xs text-muted-foreground">Draft in progress</p>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant="secondary" className="bg-orange-100 text-orange-700 hover:bg-orange-200">In Progress</Badge>
                      <Button size="sm" variant="outline">View</Button>
                    </div>
                  </div>
                  <Separator />
                  
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Asset Management Procedure</p>
                      <p className="text-xs text-muted-foreground">Completed last week</p>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant="outline">Completed</Badge>
                      <Button size="sm" variant="outline">View</Button>
                    </div>
                  </div>
                  <Separator />
                  
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-gray-300 mr-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Incident Response Plan</p>
                      <p className="text-xs text-muted-foreground">Not started</p>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant="outline">Pending</Badge>
                      <Button size="sm" variant="outline">Upload</Button>
                    </div>
                  </div>
                  <Separator />
                  
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-gray-300 mr-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Business Continuity Plan</p>
                      <p className="text-xs text-muted-foreground">Not started</p>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant="outline">Pending</Badge>
                      <Button size="sm" variant="outline">Upload</Button>
                    </div>
                  </div>
                  <Separator />
                  
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Statement of Applicability</p>
                      <p className="text-xs text-muted-foreground">High priority</p>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant="destructive">Required</Badge>
                      <Button size="sm" variant="outline">Upload</Button>
                    </div>
                  </div>
                  <Separator />
                  
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Risk Treatment Plan</p>
                      <p className="text-xs text-muted-foreground">High priority</p>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant="destructive">Required</Badge>
                      <Button size="sm" variant="outline">Upload</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="policies" className="mt-6">
            <Card className="border border-gray-200 shadow-sm hover-lift">
              <CardHeader>
                <CardTitle>Security Policies</CardTitle>
                <CardDescription>Your organization&apos;s security policies</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center py-12">No policies have been uploaded yet</p>
                <div className="text-center">
                  <Button className="btn-orange">Upload Policy Document</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="procedures" className="mt-6">
            <Card className="border border-gray-200 shadow-sm hover-lift">
              <CardHeader>
                <CardTitle>Security Procedures</CardTitle>
                <CardDescription>Your organization&apos;s security procedures</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center py-12">No procedures have been uploaded yet</p>
                <div className="text-center">
                  <Button className="btn-orange">Upload Procedure Document</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="records" className="mt-6">
            <Card className="border border-gray-200 shadow-sm hover-lift">
              <CardHeader>
                <CardTitle>Security Records</CardTitle>
                <CardDescription>Your organization&apos;s security records</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center py-12">No records have been uploaded yet</p>
                <div className="text-center">
                  <Button className="btn-orange">Upload Record Document</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 