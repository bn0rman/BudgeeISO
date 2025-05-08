"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

type SidebarMenuContextType = {
  isMobile: boolean
}

const SidebarMenuContext = React.createContext<SidebarMenuContextType>({
  isMobile: false,
})

export function useSidebar() {
  return React.useContext(SidebarMenuContext)
}

export function SidebarMenu({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  // This is a simplified implementation - you might want to add actual mobile detection
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIfMobile()
    window.addEventListener('resize', checkIfMobile)
    
    return () => {
      window.removeEventListener('resize', checkIfMobile)
    }
  }, [])

  return (
    <SidebarMenuContext.Provider value={{ isMobile }}>
      <div className={cn("flex flex-col", className)} {...props}>
        {children}
      </div>
    </SidebarMenuContext.Provider>
  )
}

export function SidebarMenuItem({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("px-3", className)}
      {...props}
    >
      {children}
    </div>
  )
}

export function SidebarMenuButton({
  children,
  className,
  size = "default",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: "default" | "sm" | "lg"
}) {
  const sizeClasses = {
    default: "p-2",
    sm: "p-1",
    lg: "p-3",
  }

  return (
    <button
      className={cn(
        "flex w-full items-center justify-start gap-2 rounded-md transition-colors hover:bg-gray-100",
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
} 