import Navbar from "@/components/shared/navbar";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen">
      <Navbar />

      <div className="container mx-auto px-4 py-8">{children}</div>

      {/* <Footer /> */}
    </main>
  );
}
