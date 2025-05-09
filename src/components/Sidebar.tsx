'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavUser } from "@/components/NavUser";
import { 
  LayoutDashboard, 
  ShieldCheck, 
  FileText, 
  ClipboardList, 
  Settings 
} from "lucide-react";

type SidebarProps = {
  user: any;
};

export function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname();
  
  // Check if the given path is active
  const isActive = (path: string) => {
    if (path === '/dashboard' && pathname === '/dashboard') {
      return true;
    }
    
    if (path !== '/dashboard' && pathname.startsWith(path)) {
      return true;
    }
    
    return false;
  };

  return (
    /* Sidebar */
    <div className="w-64 bg-white shadow-lg border-r border-gray-100 flex flex-col h-full">
      <div className="p-6 border-b border-gray-100">
        <Link href="/" className="flex items-center transition-transform hover:scale-105">
          <h1 className="text-xl font-bold gradient-text">Budgee ISO</h1>
        </Link>
      </div>
      
      <nav className="px-4 py-6 flex-grow">
        <div className="space-y-1 animate-fade-in">
          <Link 
            href="/dashboard" 
            className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition-all ${
              isActive('/dashboard') 
                ? 'bg-black text-white hover:bg-gray-900' 
                : 'text-gray-700 hover:bg-gray-100 hover:text-black'
            }`}
          >
            <LayoutDashboard className="h-5 w-5 mr-3" />
            Dashboard
          </Link>
          
          <Link 
            href="/dashboard/controls" 
            className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition-all ${
              isActive('/dashboard/controls') 
                ? 'bg-black text-white hover:bg-gray-900' 
                : 'text-gray-700 hover:bg-gray-100 hover:text-black'
            }`}
          >
            <ShieldCheck className="h-5 w-5 mr-3" />
            Controls
          </Link>
          
          <Link 
            href="/dashboard/documents" 
            className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition-all ${
              isActive('/dashboard/documents') 
                ? 'bg-black text-white hover:bg-gray-900' 
                : 'text-gray-700 hover:bg-gray-100 hover:text-black'
            }`}
          >
            <FileText className="h-5 w-5 mr-3" />
            Documents
          </Link>
          
          <Link 
            href="/dashboard/audit-log" 
            className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition-all ${
              isActive('/dashboard/audit-log') 
                ? 'bg-black text-white hover:bg-gray-900' 
                : 'text-gray-700 hover:bg-gray-100 hover:text-black'
            }`}
          >
            <ClipboardList className="h-5 w-5 mr-3" />
            Audit Log
          </Link>
          
          <Link 
            href="/dashboard/settings" 
            className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition-all ${
              isActive('/dashboard/settings') 
                ? 'bg-black text-white hover:bg-gray-900' 
                : 'text-gray-700 hover:bg-gray-100 hover:text-black'
            }`}
          >
            <Settings className="h-5 w-5 mr-3" />
            Settings
          </Link>
        </div>
      </nav>
      
      <div className="px-4 py-4 border-t border-gray-100 animate-fade-in mt-auto">
        <NavUser user={user} />
      </div>
    </div>
  );
} 