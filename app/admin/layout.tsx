export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen max-w-7xl mx-auto flex-col p-24">
      {children}
    </main>
  );
}