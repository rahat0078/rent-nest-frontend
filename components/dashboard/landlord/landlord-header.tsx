"use client";

import { Bell, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LandlordHeaderProps {
  title: string;
  description?: string;
}

export function LandlordHeader({ title, description }: LandlordHeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-background border-b border-border ml-10 lg:ml-0">
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{title}</h1>
          {description && (
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          )}
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon">
            <Bell className="w-5 h-5 text-muted-foreground" />
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="w-5 h-5 text-muted-foreground" />
          </Button>
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="text-sm font-bold text-primary">JD</span>
          </div>
        </div>
        {/* 
        //TODO: User info + logout button
        */}
      </div>
    </header>
  );
}
