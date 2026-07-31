import type { ReactNode } from "react";

export default function dashboardLayout({ children }: { children: ReactNode }) {
  return <main className="min-h-screen">{children}</main>;
}
