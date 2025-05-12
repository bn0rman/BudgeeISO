"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  BellIcon,
  CreditCardIcon,
  LogOutIcon,
  MoreVerticalIcon,
  UserCircleIcon,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { signOutClient } from "@/lib/supabase-client";

// Type for Supabase User
type User = {
  id?: string;
  email?: string | null;
  user_metadata?: {
    name?: string | null;
    avatar_url?: string | null;
    full_name?: string | null;
  } | null;
}

interface NavUserProps {
  user: User | null;
}

export function NavUser({ user }: NavUserProps) {
  const { isMobile } = useSidebar()
  const router = useRouter();
  
  // Format the user's name from different possible sources
  const displayName = user?.user_metadata?.name || 
    user?.user_metadata?.full_name || 
    user?.email?.split('@')[0] || 
    'User';
  
  // Get avatar from metadata
  const avatarSrc = user?.user_metadata?.avatar_url || '';
  
  // Create initials for the avatar fallback
  const getInitials = () => {
    if (user?.user_metadata?.name) {
      const nameParts = user.user_metadata.name.split(' ');
      if (nameParts.length >= 2) {
        return `${nameParts[0][0]}${nameParts[1][0]}`;
      }
      return user.user_metadata.name[0];
    }
    if (user?.email) {
      return user.email[0].toUpperCase();
    }
    return 'U';
  };

  // Handle logout
  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      // Use our enhanced signout function
      await signOutClient();
      
      // Redirect to home with signout parameter
      if (typeof window !== 'undefined') {
        window.location.href = '/?signout=true';
      } else {
        router.push('/?signout=true');
      }
    } catch (error) {
      console.error('Error signing out:', error);
      router.push('/');
    }
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="transition-all hover:bg-gray-100 data-[state=open]:bg-gray-100 rounded-lg"
            >
              <Avatar className="h-9 w-9 rounded-full border-2 border-gray-200">
                <AvatarImage src={avatarSrc} alt={displayName} referrerPolicy="no-referrer" />
                <AvatarFallback className="bg-black text-white">{getInitials()}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{displayName}</span>
                <span className="truncate text-xs text-muted-foreground">
                  {user?.email || ''}
                </span>
              </div>
              <MoreVerticalIcon className="ml-auto size-4 text-gray-500" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg border border-gray-200 shadow-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-2 py-2 text-left text-sm border-b border-gray-100">
                <Avatar className="h-9 w-9 rounded-full border-2 border-gray-200">
                  <AvatarImage src={avatarSrc} alt={displayName} referrerPolicy="no-referrer" />
                  <AvatarFallback className="bg-black text-white">{getInitials()}</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{displayName}</span>
                  <span className="truncate text-xs text-muted-foreground">
                    {user?.email || ''}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuGroup className="p-1">
              <Link href="/dashboard/account" passHref>
                <DropdownMenuItem className="cursor-pointer rounded-md transition-colors hover:bg-gray-100">
                  <UserCircleIcon className="h-4 w-4 mr-2" />
                  Account
                </DropdownMenuItem>
              </Link>
              <Link href="/dashboard/billing" passHref>
                <DropdownMenuItem className="cursor-pointer rounded-md transition-colors hover:bg-gray-100">
                  <CreditCardIcon className="h-4 w-4 mr-2" />
                  Billing
                </DropdownMenuItem>
              </Link>
              <Link href="/dashboard/notifications" passHref>
                <DropdownMenuItem className="cursor-pointer rounded-md transition-colors hover:bg-gray-100">
                  <BellIcon className="h-4 w-4 mr-2" />
                  Notifications
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <div className="p-1">
              <DropdownMenuItem 
                onClick={handleLogout}
                className="cursor-pointer rounded-md transition-colors hover:bg-red-50 hover:text-red-600"
              >
                <LogOutIcon className="h-4 w-4 mr-2" />
                Log out
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
} 