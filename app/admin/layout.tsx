import Navbar from "@/components/navbar/NavBar";
import { AuthProvider } from "@/app/Providers";

export default async function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AuthProvider>
        <div className="">{children}</div>
      </AuthProvider>
    </>
  );
}
