import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import { NavUser } from "@/components/NavUser";
import { 
  LayoutDashboard, 
  ShieldCheck, 
  FileText, 
  ClipboardList, 
  Settings 
} from "lucide-react";
import ScrollAnimations from "@/components/ScrollAnimations";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <div className="flex h-screen bg-gray-50">
      <ScrollAnimations />
      
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg border-r border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <Link href="/" className="flex items-center transition-transform hover:scale-105">
            <h1 className="text-xl font-bold gradient-text">Budgee ISO</h1>
          </Link>
        </div>
        
        <nav className="px-4 py-6">
          <div className="space-y-1 animate-fade-in">
            <Link href="/dashboard" className="flex items-center px-3 py-2.5 text-sm font-medium rounded-md bg-black text-white hover:bg-gray-900 transition-all">
              <LayoutDashboard className="h-5 w-5 mr-3" />
              Dashboard
            </Link>
            
            <Link href="/dashboard/controls" className="flex items-center px-3 py-2.5 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100 hover:text-black transition-all">
              <ShieldCheck className="h-5 w-5 mr-3" />
              Controls
            </Link>
            
            <Link href="/dashboard/documents" className="flex items-center px-3 py-2.5 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100 hover:text-black transition-all">
              <FileText className="h-5 w-5 mr-3" />
              Documents
            </Link>
            
            <Link href="/dashboard/audit-log" className="flex items-center px-3 py-2.5 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100 hover:text-black transition-all">
              <ClipboardList className="h-5 w-5 mr-3" />
              Audit Log
            </Link>
            
            <Link href="/dashboard/settings" className="flex items-center px-3 py-2.5 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100 hover:text-black transition-all">
              <Settings className="h-5 w-5 mr-3" />
              Settings
            </Link>
          </div>
        </nav>
        
        <div className="px-4 py-4 mt-auto border-t border-gray-100 animate-fade-in">
          <NavUser user={user} />
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 overflow-auto bg-gradient-to-b from-gray-50 to-white">
        <main className="animate-fade-in">{children}</main>
      </div>
    </div>
  );
} 