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

export default function ControlsPage() {
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
              <div className="text-3xl font-bold">38</div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </div>
            <div className="space-y-2 text-center">
              <div className="text-3xl font-bold">26</div>
              <div className="text-sm text-muted-foreground">In Progress</div>
            </div>
            <div className="space-y-2 text-center">
              <div className="text-3xl font-bold">50</div>
              <div className="text-sm text-muted-foreground">Not Started</div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="animate-on-scroll stagger-1">
        <CardHeader>
          <CardTitle>Control Categories</CardTitle>
          <CardDescription>Progress by ISO27001 Annex A</CardDescription>
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
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">A.10 Cryptography</span>
                <span className="text-sm font-medium">15%</span>
              </div>
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-orange-500 rounded-full" 
                  style={{ width: "15%" }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">A.11 Physical and Environmental Security</span>
                <span className="text-sm font-medium">40%</span>
              </div>
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-orange-500 rounded-full" 
                  style={{ width: "40%" }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">A.12 Operations Security</span>
                <span className="text-sm font-medium">30%</span>
              </div>
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-orange-500 rounded-full" 
                  style={{ width: "30%" }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">A.13 Communications Security</span>
                <span className="text-sm font-medium">25%</span>
              </div>
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-orange-500 rounded-full" 
                  style={{ width: "25%" }}
                ></div>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <Button className="btn-orange">View All Controls</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 