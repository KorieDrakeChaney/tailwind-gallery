export default function ComponentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen w-full flex-col items-center p-24">
      {children}
    </main>
  );
}
