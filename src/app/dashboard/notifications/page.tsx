import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function NotificationsPage() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Notification Settings</h1>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Email Notifications</CardTitle>
            <CardDescription>
              Configure which email notifications you want to receive.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="cert-updates">Certification Updates</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications about certification status changes.
                  </p>
                </div>
                <Switch id="cert-updates" defaultChecked />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="doc-reminders">Document Reminders</Label>
                  <p className="text-sm text-muted-foreground">
                    Get reminders when documents need to be reviewed or updated.
                  </p>
                </div>
                <Switch id="doc-reminders" defaultChecked />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="audit-alerts">Audit Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Be notified about upcoming audits and audit results.
                  </p>
                </div>
                <Switch id="audit-alerts" defaultChecked />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="marketing-emails">Marketing Emails</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive information about new features and services.
                  </p>
                </div>
                <Switch id="marketing-emails" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notification Frequency</CardTitle>
            <CardDescription>
              Choose how often you would like to receive notifications.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="justify-start">
                <span className="h-4 w-4 rounded-full bg-black mr-2"></span>
                Immediate
              </Button>
              <Button variant="outline" className="justify-start">
                <span className="h-4 w-4 rounded-full bg-gray-200 mr-2"></span>
                Daily Digest
              </Button>
              <Button variant="outline" className="justify-start">
                <span className="h-4 w-4 rounded-full bg-gray-200 mr-2"></span>
                Weekly Summary
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Mobile Notifications</CardTitle>
            <CardDescription>
              Configure push notifications for the mobile app.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="push-notifications">Push Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Enable or disable push notifications for the mobile app.
                </p>
              </div>
              <Switch id="push-notifications" defaultChecked />
            </div>
            
            <div className="flex justify-end">
              <Button>Save Preferences</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 