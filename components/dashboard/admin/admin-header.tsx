"use client";

import { useState } from "react";
import { Menu, Moon, Sun } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import {} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { AdminSidebar } from "./admin-sidebar";
import { TGetMeResponse } from "@/app/(auth)/_authActions/getMe";
import { Avatar } from "@base-ui/react";

export function AdminHeader({user}: {user: TGetMeResponse}) {
  const [open, setOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark");
    }
  };

  return (
    <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-border bg-background/95 px-4 md:px-6 backdrop-blur-md">
      {/* Mobile Drawer & Search */}
      <div className="flex items-center gap-3 md:gap-4 flex-1 max-w-md">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            className={buttonVariants({
              variant: "outline",
              size: "icon",
            })}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Sidebar Navigation</span>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-72 border-r border-border">
            <AdminSidebar onNavClick={() => setOpen(false)} />
          </SheetContent>
        </Sheet>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Theme Toggle Placeholder */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="h-9 w-9 text-muted-foreground hover:text-foreground"
        >
          {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          <span className="sr-only">Toggle Theme</span>
        </Button>
        {/* 
        //TODO:
        desgin here profile photo avatar from user.profilePhoto
        email user.email
        
         */}
         {}
      </div>
    </header>
  );
}
