export default async function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="">{children}</div>
    </>
  );
}
