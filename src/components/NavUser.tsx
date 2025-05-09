"use client"

import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import Link from "next/link";
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

type User = {
  id?: string;
  given_name?: string | null;
  family_name?: string | null;
  email?: string | null;
  picture?: string | null;
  name?: string | null;
  avatar?: string | null;
}

type NavUserProps = {
  user: User | null | undefined;
}

export function NavUser({ user }: NavUserProps) {
  const { isMobile } = useSidebar()
  
  // Format the user's name from different possible sources
  const displayName = user?.name || 
    (user?.given_name && user?.family_name 
      ? `${user.given_name} ${user.family_name}` 
      : 'User');
  
  // Get avatar from different possible sources
  const avatarSrc = user?.avatar || user?.picture || '';
  
  // Create initials for the avatar fallback
  const getInitials = () => {
    if (user?.given_name && user?.family_name) {
      return `${user.given_name[0]}${user.family_name[0]}`;
    }
    if (user?.name) {
      const nameParts = user.name.split(' ');
      if (nameParts.length >= 2) {
        return `${nameParts[0][0]}${nameParts[1][0]}`;
      }
      return user.name[0];
    }
    return 'U';
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
              <LogoutLink>
                <DropdownMenuItem className="cursor-pointer rounded-md transition-colors hover:bg-red-50 hover:text-red-600">
                  <LogOutIcon className="h-4 w-4 mr-2" />
                  Log out
                </DropdownMenuItem>
              </LogoutLink>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
} 