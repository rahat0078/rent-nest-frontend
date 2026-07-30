"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Menu, X, LogOut, LayoutDashboard, User } from "lucide-react";
import Image from "next/image";

interface NavbarProps {
  isLoggedIn?: boolean;
  userImage?: string;
  userName?: string;
  onLogout?: () => void;
}

export default function Navbar({
  isLoggedIn = false,
  userImage = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
  userName = "John Doe",
  onLogout = () => {},
}: NavbarProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  // Handle outside click for profile dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileDropdownOpen(false);
      }
    }

    if (isProfileDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isProfileDropdownOpen]);

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Name - Left (hidden on mobile) */}
          <Link
            href="/"
            className="hidden sm:flex items-center gap-2.5 shrink-0"
          >
            <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-primary-foreground font-bold text-lg">
                R
              </span>
            </div>
            <span className="text-lg font-semibold text-foreground">
              RentHub
            </span>
          </Link>

          {/* Mobile Logo - Center on small screens */}
          <Link
            href="/"
            className="sm:hidden flex items-center gap-2 shrink-0 absolute left-1/2 transform -translate-x-1/2"
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-primary-foreground font-bold text-base">
                R
              </span>
            </div>
          </Link>

          {/* Desktop Navigation - Middle */}
          <div className="hidden md:flex items-center gap-1">
            <Link
              href="/"
              className="px-3.5 py-2 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground rounded-md transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              href="/properties"
              className="px-3.5 py-2 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground rounded-md transition-colors duration-200"
            >
              Properties
            </Link>
          </div>

          {/* Mobile Navigation Center - Visible on mobile only */}
          <div className="flex md:hidden items-center gap-1">
            <Link
              href="/"
              className="px-3 py-2 text-xs font-medium text-foreground hover:bg-accent hover:text-accent-foreground rounded-md transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              href="/properties"
              className="px-3 py-2 text-xs font-medium text-foreground hover:bg-accent hover:text-accent-foreground rounded-md transition-colors duration-200"
            >
              Properties
            </Link>
          </div>

          {/* Right Side - Desktop */}
          <div className="hidden md:flex items-center gap-3">
            {isLoggedIn ? (
              <div ref={profileRef} className="relative">
                <button
                  onClick={() =>
                    setIsProfileDropdownOpen(!isProfileDropdownOpen)
                  }
                  onMouseEnter={() => setIsProfileDropdownOpen(true)}
                  className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/30 hover:border-primary transition-colors duration-200 shadow-sm"
                  aria-label="Profile menu"
                >
                  <Image
                    unoptimized
                    width={400}
                    height={400}
                    src={userImage}
                    alt={userName}
                    className="w-full h-full object-cover"
                  />
                </button>

                {isProfileDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-56 bg-card border border-border rounded-xl shadow-lg py-2 z-10"
                    onMouseEnter={() => setIsProfileDropdownOpen(true)}
                    onMouseLeave={() => setIsProfileDropdownOpen(false)}
                  >
                    <div className="flex flex-col space-y-1 p-4">
                      <p className="text-sm font-medium leading-none">John</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        john@gmail.com
                      </p>
                    </div>
                    <button className="w-full px-4 py-2.5 text-sm text-left text-foreground hover:bg-accent hover:text-accent-foreground flex items-center gap-3 transition-colors duration-150">
                      <LayoutDashboard className="w-4 h-4" />
                      Dashboard
                    </button>
                    <button className="w-full px-4 py-2.5 text-sm text-left text-foreground hover:bg-accent hover:text-accent-foreground flex items-center gap-3 transition-colors duration-150">
                      <User className="w-4 h-4" />
                      Profile
                    </button>
                    <button
                      onClick={() => {
                        setIsProfileDropdownOpen(false);
                        onLogout();
                      }}
                      className="w-full px-4 py-2.5 text-sm text-left text-destructive hover:bg-destructive/10 flex items-center gap-3 transition-colors duration-150 border-t border-border"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2.5">
                <Link
                  href="/signin"
                  className="px-4 py-2 text-sm font-medium text-primary border border-primary/30 rounded-lg hover:bg-primary/10 hover:border-primary transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-200 shadow-sm"
                >
                  Register
                </Link>
                
              </div>
            )}
          </div>

          {/* Mobile Profile and Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            {isLoggedIn && (
              <div ref={profileRef} className="relative">
                <button
                  className="w-9 h-9 rounded-full overflow-hidden border-2 border-primary/30 hover:border-primary transition-colors duration-200 shadow-sm"
                  aria-label="Profile menu"
                >
                  <Image
                    unoptimized
                    width={400}
                    height={400}
                    src={userImage}
                    alt={userName}
                    className="w-full h-full object-cover"
                  />
                </button>
              </div>
            )}
            <button
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
              className="p-2 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {isDrawerOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isDrawerOpen && (
        <div className="md:hidden bg-card border-b border-border">
          <div className="px-4 py-3 space-y-2">
            <div className="border-t border-border pt-3 mt-2">
              {isLoggedIn ? (
                <>
                  <div className="px-4 py-2 flex items-center gap-3 mb-2">
                    <Image
                      unoptimized
                      width={400}
                      height={400}
                      src={userImage}
                      alt={userName}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="text-sm font-medium text-foreground">
                      {userName}
                    </span>
                  </div>
                  <button className="w-full px-4 py-2.5 text-sm text-left text-foreground hover:bg-accent hover:text-accent-foreground rounded-lg flex items-center gap-3 transition-colors duration-150">
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                  </button>
                  <button className="w-full px-4 py-2.5 text-sm text-left text-foreground hover:bg-accent hover:text-accent-foreground rounded-lg flex items-center gap-3 transition-colors duration-150">
                    <User className="w-4 h-4" />
                    Profile
                  </button>
                  <button
                    onClick={() => {
                      setIsDrawerOpen(false);
                      onLogout();
                    }}
                    className="w-full px-4 py-2.5 text-sm text-left text-destructive hover:bg-destructive/10 rounded-lg flex items-center gap-3 transition-colors duration-150"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link
                    href="/signin"
                    className="px-4 py-2.5 text-sm font-medium text-center text-primary border border-primary/30 rounded-lg hover:bg-primary/10 hover:border-primary transition-colors duration-200"
                    onClick={() => setIsDrawerOpen(false)}
                  >
                    Sign In
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
