import Navbar from "@/components/shared/navbar";
import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen">
      <Navbar />

      <div className="container mx-auto min-h-[calc(100vh-64px)] flex flex-col justify-center px-4">
        {children}
      </div>
    </main>
  );
}
