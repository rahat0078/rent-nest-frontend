'use client'

import { Bell, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

interface TenantHeaderProps {
  onMenuClick?: () => void
  pageTitle?: string
}

export default function TenantHeader({ onMenuClick, pageTitle = 'Dashboard'}: TenantHeaderProps) {
  return (
    <header className="fixed top-0 right-0 left-0 md:left-64 h-16 bg-card border-b border-border flex items-center justify-between px-6 z-30">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="md:hidden" onClick={onMenuClick}>
          <Menu className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-lg font-semibold text-foreground">{pageTitle}</h1>
          <p className="text-sm text-muted-foreground">Welcome back!</p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
        </Button>
        <Image
        unoptimized
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop"
          alt="User"
          width={40}
          height={40}
          className="rounded-full w-10 h-10 cursor-pointer hover:opacity-80 transition-opacity"
        />

        {/* 
        //TODO: User info + logout button
        */}
      </div>
    </header>
  )
}
