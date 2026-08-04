"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Menu, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { toast } from "sonner";
import { getMe, TGetMeResponse } from "@/app/(auth)/_authActions/getMe";
import { logoutUser } from "@/app/(auth)/_authActions/logoutUser";

interface TenantHeaderProps {
  onMenuClick?: () => void;
  pageTitle?: string;
}

export default function TenantHeader({
  onMenuClick,
  pageTitle = "Dashboard",
}: TenantHeaderProps) {
  const [user, setUser] = useState<TGetMeResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getMe();
        if (response?.data) {
          setUser(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch user data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (error) {
      // toast.error("Failed to log out");
    }
  };

  const defaultAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    user?.name || "User",
  )}&background=random`;

  return (
    <header className="fixed top-0 right-0 left-0 md:left-64 h-16 bg-card border-b border-border flex items-center justify-between px-6 z-30">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={onMenuClick}
        >
          <Menu className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-lg font-semibold text-foreground">{pageTitle}</h1>
          <p className="text-sm text-muted-foreground">
            {user?.name ? `Welcome back, ${user.name}!` : "Welcome back!"}
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {loading ? (
          <div className="h-9 w-32 bg-muted animate-pulse rounded-md" />
        ) : user ? (
          <div className="flex items-center gap-3">
            <div className="relative w-9 h-9 rounded-full overflow-hidden border border-border">
              <Image
                unoptimized
                src={user.profilePhoto || defaultAvatar}
                alt={user.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-sm font-medium text-foreground leading-none">
                {user.name}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {user.email}
              </p>
            </div>
            <span className="hidden lg:inline-block text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded bg-primary/10 text-primary">
              {user.role}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              title="Logout"
              className="text-muted-foreground hover:text-destructive transition-colors ml-4"
            >
              <LogOut className="w-5 h-5" /> Logout
            </Button>
          </div>
        ) : null}
      </div>
    </header>
  );
}
