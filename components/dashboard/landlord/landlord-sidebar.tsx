"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Home,
  Building2,
  Plus,
  FileText,
  HomeIcon,
  User,
} from "lucide-react";
import { useState } from "react";

export function LandlordSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { href: "/dashboard/landlord", label: "Dashboard", icon: Home },
    {
      href: "/dashboard/landlord/properties",
      label: "My Properties",
      icon: Building2,
    },
    {
      href: "/dashboard/landlord/properties/new",
      label: "Create Property",
      icon: Plus,
    },
    {
      href: "/dashboard/landlord/requests",
      label: "Rental Requests",
      icon: FileText,
    },
    {
      href: "/dashboard/landlord/profile",
      label: "My Profile",
      icon: User,
    },
    { href: "/", label: "Back Home", icon: HomeIcon },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed lg:relative top-0 left-0 h-screen w-72 bg-card border-r border-border transition-transform duration-300 z-40 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-border">
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
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
                        active
                          ? "bg-primary text-primary-foreground"
                          : "text-foreground hover:bg-muted"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
