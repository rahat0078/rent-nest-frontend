"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, LogOut, LayoutDashboard, User, Home } from "lucide-react";
import { TGetMeResponse } from "@/app/(auth)/_authActions/getMe";
import { logoutUser } from "@/app/(auth)/_authActions/logoutUser";

interface NavbarProps {
  user?: TGetMeResponse | null;
}

export default function Navbar({ user }: NavbarProps) {
  const userImage = user?.profilePhoto;
  const userName = user?.name || "User";
  const userEmail = user?.email || "";
  const isLoggedIn = !!user;

  const dashboardRoute = isLoggedIn
    ? user.role === "ADMIN"
      ? "/dashboard/admin"
      : user.role === "TENANT"
        ? "/dashboard/tenant"
        : user.role === "LANDLORD"
          ? "/dashboard/landlord"
          : "/"
    : "/";

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  // Fallback initials for user avatar
  const userInitials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const handleLogout = async () => {
    setIsProfileDropdownOpen(false);
    setIsDrawerOpen(false);
    await logoutUser();
  };

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
          {/* Logo - Desktop */}
          <Link
            href="/"
            className="hidden sm:flex items-center gap-2.5 shrink-0"
          >
            <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-primary-foreground font-bold text-lg">
                <Home/>
              </span>
            </div>
            <span className="text-lg font-semibold text-foreground">
              RentNest
            </span>
          </Link>

          {/* Logo - Mobile Center */}
          <Link
            href="/"
            className="sm:hidden flex items-center gap-2 shrink-0 absolute left-1/2 transform -translate-x-1/2"
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-primary-foreground font-bold text-base">
                R
              </span>
            </div>
            <span className="text-base font-semibold text-foreground">
              RentNest
            </span>
          </Link>

          {/* Navigation Links - Middle */}
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

          {/* Mobile Links Left */}
          <div className="flex md:hidden items-center gap-1">
            <Link
              href="/"
              className="px-2.5 py-1.5 text-xs font-medium text-foreground hover:bg-accent rounded-md transition-colors"
            >
              Home
            </Link>
            <Link
              href="/properties"
              className="px-2.5 py-1.5 text-xs font-medium text-foreground hover:bg-accent rounded-md transition-colors"
            >
              Properties
            </Link>
          </div>

          {/* Desktop Right Controls */}
          <div className="hidden md:flex items-center gap-3">
            {isLoggedIn ? (
              <div ref={profileRef} className="relative">
                <button
                  type="button"
                  onClick={() => setIsProfileDropdownOpen((prev) => !prev)}
                  className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/30 hover:border-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 flex items-center justify-center bg-muted"
                  aria-label="User profile menu"
                >
                  {userImage ? (
                    <Image
                      unoptimized
                      width={40}
                      height={40}
                      src={userImage}
                      alt={userName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-sm font-semibold text-primary">
                      {userInitials}
                    </span>
                  )}
                </button>

                {/* Profile Dropdown Menu */}
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-card border border-border rounded-xl shadow-lg py-2 z-50">
                    <div className="flex flex-col space-y-1 px-4 py-3 border-b border-border">
                      <p className="text-sm font-semibold leading-none text-foreground">
                        {userName}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground truncate">
                        {userEmail}
                      </p>
                    </div>

                    <div className="py-1">
                      <Link
                        href={dashboardRoute}
                        onClick={() => setIsProfileDropdownOpen(false)}
                        className="w-full px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground flex items-center gap-3 transition-colors duration-150"
                      >
                        <LayoutDashboard className="w-4 h-4 text-muted-foreground" />
                        Dashboard
                      </Link>

                      <Link
                        href="/dashboard/profile"
                        onClick={() => setIsProfileDropdownOpen(false)}
                        className="w-full px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground flex items-center gap-3 transition-colors duration-150"
                      >
                        <User className="w-4 h-4 text-muted-foreground" />
                        Profile
                      </Link>
                    </div>

                    <div className="border-t border-border pt-1">
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full px-4 py-2 text-sm text-left text-destructive hover:bg-destructive/10 flex items-center gap-3 transition-colors duration-150"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2.5">
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-medium text-primary border border-primary/30 rounded-lg hover:bg-primary/10 hover:border-primary transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-200 shadow-sm"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsDrawerOpen((prev) => !prev)}
              className="p-2 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
              aria-label="Toggle drawer navigation"
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
        <div className="md:hidden bg-card border-b border-border px-4 py-4 space-y-3">
          {isLoggedIn ? (
            <div className="space-y-2">
              <div className="flex items-center gap-3 pb-3 border-b border-border">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-muted flex items-center justify-center border">
                  {userImage ? (
                    <Image
                      unoptimized
                      width={40}
                      height={40}
                      src={userImage}
                      alt={userName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-sm font-semibold text-primary">
                      {userInitials}
                    </span>
                  )}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-foreground">
                    {userName}
                  </span>
                  <span className="text-xs text-muted-foreground truncate max-w-50">
                    {userEmail}
                  </span>
                </div>
              </div>

              <Link
                href={dashboardRoute}
                onClick={() => setIsDrawerOpen(false)}
                className="w-full px-3 py-2.5 text-sm text-foreground hover:bg-accent rounded-lg flex items-center gap-3 transition-colors"
              >
                <LayoutDashboard className="w-4 h-4 text-muted-foreground" />
                Dashboard
              </Link>

              <Link
                href="/dashboard/profile"
                onClick={() => setIsDrawerOpen(false)}
                className="w-full px-3 py-2.5 text-sm text-foreground hover:bg-accent rounded-lg flex items-center gap-3 transition-colors"
              >
                <User className="w-4 h-4 text-muted-foreground" />
                Profile
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="w-full px-3 py-2.5 text-sm text-left text-destructive hover:bg-destructive/10 rounded-lg flex items-center gap-3 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2 pt-1">
              <Link
                href="/login"
                onClick={() => setIsDrawerOpen(false)}
                className="w-full py-2.5 text-center text-sm font-medium text-primary border border-primary/30 rounded-lg hover:bg-primary/10 transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                onClick={() => setIsDrawerOpen(false)}
                className="w-full py-2.5 text-center text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
