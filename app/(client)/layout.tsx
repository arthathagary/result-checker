import Navbar from "@/components/navbar/NavBar";

export default async function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <div className="">{children}</div>
    </>
  );
}
