import { getMe } from "@/app/(auth)/_authActions/getMe";
import { AdminHeader } from "@/components/dashboard/admin/admin-header";
import { AdminSidebar } from "@/components/dashboard/admin/admin-sidebar";
import React from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = getMe()
  return (
    <div className="min-h-screen bg-background flex font-sans antialiased">
      {/* Desktop Permanent Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 fixed inset-y-0 z-30">
        <AdminSidebar />
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:pl-64 min-w-0">
        <AdminHeader user={user} />
        <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          {children}
        </main>
      </div>
    </div>
  );
}