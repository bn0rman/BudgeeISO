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
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={avatarSrc} alt={displayName} referrerPolicy="no-referrer" />
                <AvatarFallback className="rounded-lg">{getInitials()}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{displayName}</span>
                <span className="truncate text-xs text-muted-foreground">
                  {user?.email || ''}
                </span>
              </div>
              <MoreVerticalIcon className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={avatarSrc} alt={displayName} referrerPolicy="no-referrer" />
                  <AvatarFallback className="rounded-lg">{getInitials()}</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{displayName}</span>
                  <span className="truncate text-xs text-muted-foreground">
                    {user?.email || ''}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link href="/dashboard/account" passHref>
                <DropdownMenuItem className="cursor-pointer">
                  <UserCircleIcon className="h-4 w-4" />
                  Account
                </DropdownMenuItem>
              </Link>
              <Link href="/dashboard/billing" passHref>
                <DropdownMenuItem className="cursor-pointer">
                  <CreditCardIcon className="h-4 w-4" />
                  Billing
                </DropdownMenuItem>
              </Link>
              <Link href="/dashboard/notifications" passHref>
                <DropdownMenuItem className="cursor-pointer">
                  <BellIcon className="h-4 w-4" />
                  Notifications
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <LogoutLink>
              <DropdownMenuItem className="cursor-pointer">
                <LogOutIcon className="h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </LogoutLink>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
} 