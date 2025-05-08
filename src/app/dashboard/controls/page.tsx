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
      <h1 className="text-3xl font-bold mb-6">ISO27001 Controls</h1>
      
      <Card className="mb-6">
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
      
      <Card>
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
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">A.10 Cryptography</span>
                <span className="text-sm font-medium">15%</span>
              </div>
              <Progress value={15} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">A.11 Physical and Environmental Security</span>
                <span className="text-sm font-medium">40%</span>
              </div>
              <Progress value={40} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">A.12 Operations Security</span>
                <span className="text-sm font-medium">30%</span>
              </div>
              <Progress value={30} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">A.13 Communications Security</span>
                <span className="text-sm font-medium">25%</span>
              </div>
              <Progress value={25} className="h-2" />
            </div>
            
            <div className="mt-6 text-center">
              <Button>View All Controls</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 