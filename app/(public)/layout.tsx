import Navbar from "@/components/shared/navbar";
import { getMe } from "@/app/(auth)/_authActions/getMe";
import Footer from "@/components/home/footer";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getMe();
  return (
    <main className="min-h-screen">
      <Navbar user={user.data} />

      <div>{children}</div>
      <Footer />
    </main>
  );
}
