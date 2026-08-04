"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { getMe, TGetMeResponse } from "@/app/(auth)/_authActions/getMe";
import { logoutUser } from "@/app/(auth)/_authActions/logoutUser";

interface LandlordHeaderProps {
  title: string;
  description?: string;
}

export function LandlordHeader({ title, description }: LandlordHeaderProps) {
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
        console.error("Failed to fetch landlord data", error);
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

  // Extract initials if profile photo isn't present
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="sticky top-0 z-30 bg-background border-b border-border ml-10 lg:ml-0">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left Section: Page Title & Description */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">{title}</h1>
          {description && (
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          )}
        </div>

        {/* Right Section: Actions & User Info */}
        <div className="flex items-center gap-3">
         

          {/* User Profile & Logout Section */}
          {loading ? (
            <div className="h-10 w-36 bg-muted animate-pulse rounded-full" />
          ) : user ? (
            <div className="flex items-center gap-3 pl-2 border-l border-border">
              {/* Avatar / Initials */}
              <div className="relative w-10 h-10 rounded-full overflow-hidden bg-primary/20 flex items-center justify-center border border-border">
                {user.profilePhoto ? (
                  <Image
                  unoptimized
                    src={user.profilePhoto}
                    alt={user.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <span className="text-sm font-bold text-primary">
                    {getInitials(user.name || "Landlord")}
                  </span>
                )}
              </div>

              {/* User Meta */}
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-foreground leading-none">
                  {user.name}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {user.email}
                </p>
              </div>

              {/* Role Badge */}
              <span className="hidden xl:inline-block text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded bg-primary/10 text-primary">
                {user.role}
              </span>

              {/* Logout Button */}
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
      </div>
    </header>
  );
}