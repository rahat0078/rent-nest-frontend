"use client";

import { useState } from "react";
import {
  Bell,
  Search,
  Menu,
  Moon,
  Sun,
  User,
  LogOut,
  Shield,
  CheckCircle2,
} from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { AdminSidebar } from "./admin-sidebar";
import { cn } from "@/lib/utils";

export function AdminHeader() {
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

        <div className="relative w-full max-w-xs md:max-w-sm hidden sm:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search users, listings..."
            className="pl-9 h-9 text-sm bg-muted/40 border-border/80 focus-visible:bg-background"
          />
        </div>
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

        {/* Notifications Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger
            className={buttonVariants({
              variant: "ghost",
              size: "icon",
            })}
          >
            <Bell className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 p-0">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <span className="text-sm font-semibold">Notifications</span>
              <Badge variant="secondary" className="text-[10px] h-5">
                3 New
              </Badge>
            </div>
            <div className="divide-y divide-border/50 text-xs">
              <div className="p-3 hover:bg-muted/50 transition-colors flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-foreground">
                    New Property Listed
                  </p>
                  <p className="text-muted-foreground text-[11px] mt-0.5">
                    Landlord Rakib Hossain added a new apartment in Bashundhara.
                  </p>
                  <span className="text-[10px] text-muted-foreground/70 mt-1 block">
                    10 mins ago
                  </span>
                </div>
              </div>
              <div className="p-3 hover:bg-muted/50 transition-colors flex items-start gap-2.5">
                <Shield className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-foreground">
                    Pending Moderation Request
                  </p>
                  <p className="text-muted-foreground text-[11px] mt-0.5">
                    Rental Request #d41d requires approval verification.
                  </p>
                  <span className="text-[10px] text-muted-foreground/70 mt-1 block">
                    1 hour ago
                  </span>
                </div>
              </div>
            </div>
            <div className="p-2 text-center border-t border-border">
              <Button
                variant="ghost"
                size="sm"
                className="w-full text-xs text-muted-foreground h-8"
              >
                Mark all as read
              </Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Profile Avatar & Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "h-9 rounded-full pl-2 pr-3 flex items-center gap-2",
            )}
          >
            <Avatar className="h-7 w-7 border border-border">
              <AvatarImage
                src="https://i.pravatar.cc/300?img=1"
                alt="Ruhul Amin Rahat"
              />
              <AvatarFallback>RR</AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-start text-left hidden sm:flex">
              <span className="text-xs font-medium leading-none">
                Ruhul Amin
              </span>
              <span className="text-[10px] text-muted-foreground leading-none mt-1">
                System Admin
              </span>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  Ruhul Amin Rahat
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  rahat@example.com
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem className="cursor-pointer text-xs">
                <User className="mr-2 h-3.5 w-3.5" />
                <span>Profile Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer text-xs">
                <Shield className="mr-2 h-3.5 w-3.5" />
                <span>Security & Admin Logs</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer text-xs text-destructive focus:text-destructive">
              <LogOut className="mr-2 h-3.5 w-3.5" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
