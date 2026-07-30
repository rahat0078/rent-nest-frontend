import Navbar from "@/components/shared/navbar";
import { getMe } from "@/app/(auth)/_authActions/getMe";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getMe();
  return (
    <main className="min-h-screen">
      <Navbar user={user.data} />

      <div className="container mx-auto px-4 py-8">{children}</div>

      {/* <Footer /> */}
    </main>
  );
}
