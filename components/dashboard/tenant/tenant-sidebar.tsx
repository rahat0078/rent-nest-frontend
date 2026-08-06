"use client";

import { useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  FileText,
  CreditCard,
  Star,
  User,
  ChevronLeft,
  ChevronRight,
  LogOut,
  HomeIcon,
  Home,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface TenantSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function TenantSidebar({
  isOpen = true,
  onClose,
}: TenantSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard/tenant",
      active: true,
    },
    {
      label: "My Rental Requests",
      icon: FileText,
      href: "/dashboard/tenant/requests",
    },
    {
      label: "Payment History",
      icon: CreditCard,
      href: "/dashboard/tenant/payments",
    },
    { label: "Reviews", icon: Star, href: "/dashboard/tenant/reviews" },
    { label: "Profile", icon: User, href: "/dashboard/tenant/profile" },
    { label: "Back Home", icon: HomeIcon, href: "/" },
  ];

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen bg-card border-r border-border transition-all duration-300 z-40 ${
          collapsed ? "w-20" : "w-64"
        } hidden md:flex flex-col`}
      >
        {/* Header */}
        <div className="p-6 flex items-center justify-between">
          {!collapsed && (
            <Link
              href="/"
              className="hidden sm:flex items-center gap-2.5 shrink-0"
            >
              <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center shadow-sm">
                <span className="text-primary-foreground font-bold text-lg">
                  <Home />
                </span>
              </div>
              <span className="text-lg font-semibold text-foreground">
                RentNest
              </span>
            </Link>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="w-8 h-8"
          >
            {collapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  item.active
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-secondary"
                }`}
              >
                <Icon className="w-5 h-5 shrink-0" />
                {!collapsed && (
                  <span className="text-sm font-medium">{item.label}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Section */}
      </aside>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 bg-black/50 z-30 md:hidden transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-card border-r border-border flex flex-col z-40 md:hidden transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="p-6 flex items-center justify-between">
          <h1 className="text-xl font-bold text-primary">RentNest</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="w-8 h-8"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  item.active
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-secondary"
                }`}
                onClick={onClose}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
