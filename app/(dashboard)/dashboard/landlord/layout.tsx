import { LandlordSidebar } from "@/components/dashboard/landlord/landlord-sidebar"

export default function LandlordLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <LandlordSidebar />
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        {children}
      </div>
    </div>
  )
}
