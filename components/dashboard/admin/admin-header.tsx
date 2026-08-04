"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Menu, LogOut } from "lucide-react";
import { toast } from "sonner";

import { buttonVariants, Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { AdminSidebar } from "./admin-sidebar";
import { getMe, TGetMeResponse } from "@/app/(auth)/_authActions/getMe";
import { logoutUser } from "@/app/(auth)/_authActions/logoutUser";

export function AdminHeader() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const [user, setUser] = useState<TGetMeResponse | null>(null);
  const [loading, setLoading] = useState(true);

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
      toast.error("Failed to log out");
    }
  };

  const defaultAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    user?.name || "Admin",
  )}&background=random`;

  return (
    <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-border bg-background/95 px-4 md:px-6 backdrop-blur-md">
      {/* Mobile Drawer */}
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

      {/* Right Controls - Same layout as Tenant & Landlord Header */}
      <div className="flex items-center gap-4">
        {loading ? (
          <div className="h-9 w-32 bg-muted animate-pulse rounded-md" />
        ) : user ? (
          <div className="flex items-center gap-3">
            <div className="relative w-9 h-9 rounded-full overflow-hidden border border-border">
              <Image
                unoptimized
                src={user.profilePhoto || defaultAvatar}
                alt={user.name || "Admin"}
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
              {user.role || "Admin"}
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
